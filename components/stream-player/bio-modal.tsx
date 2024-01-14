"use client"

import { FormEvent, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";

interface BioModalProps {
    initialValue: string | null;
}

const BioModal = ({ initialValue }: BioModalProps) => {

    const [value, setValue] = useState(initialValue || '');
    const closeRef = useRef<HTMLButtonElement>(null)
    const [isPending, startTransition] = useTransition();



    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success("User bio updated")
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
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit bio data</DialogTitle>
                </DialogHeader>
                <form 
                onSubmit={onSubmit}
                className="space-y-4"
                >
                    <Textarea
                        placeholder="User bio"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                    />
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
    )
}

export default BioModal