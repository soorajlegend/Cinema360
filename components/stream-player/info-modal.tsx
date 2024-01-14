"use client"

import { FormEvent, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { FileUploader } from "../uploader";
import Image from "next/image";
import Hint from "../hint";
import { Trash } from "lucide-react";

interface InfoModalProps {
    initialName: string;
    initialThumbnail: string | null;
}

const InfoModal = ({ initialName, initialThumbnail }: InfoModalProps) => {

    const closeRef = useRef<HTMLButtonElement>(null)
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName)
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnail)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Stream updated")
                    setThumbnailUrl("");
                    if (closeRef?.current) {
                        closeRef.current.click();
                    }
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated")
                    if (closeRef?.current) {
                        closeRef.current.click();
                    }
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Stream Name"
                            onChange={(e) => onChange(e)}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-[4px] overflow-hidden w-full border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint
                                        label="Remove thumbnail"
                                        side="left"
                                        asChild>
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5 hover:bg-white/70 transition rounded-sm"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    fill
                                    src={thumbnailUrl}
                                    alt={name}
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl border outline-dashed outline-muted">
                                <FileUploader
                                    endpoint="thumbnailUploader"
                                    onChange={setThumbnailUrl}
                                    onComplete={() => closeRef?.current?.click()}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose
                            asChild
                            ref={closeRef}
                        >
                            <Button
                                variant="ghost"
                                type="button"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default InfoModal;