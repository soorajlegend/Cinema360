"use client"

import { useEffect, useRef, useState } from "react"
import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"
import FullscreenControl from "./fullscreen-contol"
import { useEventListener } from "usehooks-ts"
import VolumeControl from "./volume-control"


interface LiveVideoProps {
    participant: Participant
}


const LiveVideo = ({ participant }: LiveVideoProps) => {

    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [volume, setVolume] = useState(0)

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current)
            }
        });


    const toggleFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else if (videoRef?.current) {
            videoRef.current.requestFullscreen();
        }
    }

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const onToggleChange = () => {
        const isMuted = volume === 0;
        setVolume(isMuted ? 50 : 0)
        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen)
    }

    useEffect(() => {
        onVolumeChange(0)
    }, [])

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef)


    return (
        <div
            ref={wrapperRef}
            className="relative h-full flex"
        >

            <video
                ref={videoRef}
                width="100%"
            />
            {/* <button
                className="w-full h-full cursor-defauslt"
            > */}
            <div
                onDoubleClick={toggleFullScreen}
                className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
                <div className="absolute bottom-0 h-14 w-full flex items-center justify-between bg-gradient-to-t from-neutral-900 px-4">
                    <VolumeControl
                        value={volume}
                        onChange={(value) => onVolumeChange(value)}
                        onToggle={onToggleChange}
                    />
                    <FullscreenControl
                        isFullscreen={isFullscreen}
                        onToggle={toggleFullScreen}
                    />
                </div>
            </div>
            {/* </button> */}
        </div>
    )
}

export default LiveVideo