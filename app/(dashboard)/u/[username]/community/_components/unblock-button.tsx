"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnBlockButtonProps {
    userId: string
}

const UnblockButton = ({ userId }: UnBlockButtonProps) => {
    const [isPending, startTransition] = useTransition();


    const handleUnblock = () => {

        startTransition(() => {
            onUnblock(userId)
                .then((result) => toast.success(`You unblocked ${result.blocked.username}`))
                .catch(() => toast.error("Somthing went wrong"))
        })
    }

    return (
        <Button
            disabled={isPending}
            onClick={handleUnblock}
            variant="link"
            size="sm"
            className="text-blue-500"
        >
            Unblock
        </Button>
    )
}

export default UnblockButton