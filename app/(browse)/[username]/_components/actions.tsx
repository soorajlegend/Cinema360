"use client"

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean,
    isBlockedUser: boolean
    userId: string
}

const Actions = ({ isFollowing, isBlockedUser, userId }: ActionsProps) => {

    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}`);
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => {
                    toast.success(`You have unfollowed ${data.following.username}`);
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleOnBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(`You have blocked ${data?.blocked.username}`);
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleUnBlock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    toast.success(`You have unblocked ${data.blocked.username}`);
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }


    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    const onBlockUser = () => {
        if (isBlockedUser) {
            handleUnBlock()
        } else {
            handleOnBlock()
        }
    }


    return (
        <div className="flex space-x-3">
            <Button
                disabled={isPending}
                onClick={onClick}
                variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                disabled={isPending}
                onClick={onBlockUser}
                variant={isBlockedUser ? "default" : "destructive"}>
                {isBlockedUser ? "Unblock" : "Block"}
            </Button>
        </div>
    );
}

export default Actions;