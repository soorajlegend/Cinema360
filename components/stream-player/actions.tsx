"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionProps {
    isFollowing: boolean;
    hostIdentity: string;
    isHost: boolean;
}

const Actions = ({
    isFollowing,
    hostIdentity,
    isHost
}: ActionProps) => {

    const { userId } = useAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in")
        }

        if (isHost) return

        if (isFollowing) {
            startTransition(() => {
                onUnfollow(hostIdentity)
                    .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                    .catch(() => toast.error("Something went wrong"))
            })
        } else {
            startTransition(() => {
                onFollow(hostIdentity)
                    .then((data) => toast.success(`You are now following ${data.following.username}`))
                    .catch(() => toast.error("Something went wrong"))
            })
        }

    }

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "w-4 h-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}

export default Actions