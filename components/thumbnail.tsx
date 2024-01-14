import Image from "next/image";
import UserAvatar from "./user-avatar";
import { Skeleton } from "./ui/skeleton";
import LiveBadge from "./live-badge";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
}

const Thumbnail = ({
    src,
    fallback,
    isLive,
    username
}: ThumbnailProps) => {

    let content;

    if (!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-xl">
                <UserAvatar
                    imageUrl={fallback}
                    username={username}
                    isLive={isLive}
                    size="lg"
                    showBadge
                />
            </div>
        )
    } else {
        content = (
            <Image
                src={src}
                alt={username}
                fill
                className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-xl bg-background" />
        )
    }

    return (
        <div className="group aspect-video relative rounded-2xl cursor-pointer">
            <div className="rounded-xl absolute inset-0 bg-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
            {content}
            {isLive && src && (
                <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}

export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    )
}

export default Thumbnail