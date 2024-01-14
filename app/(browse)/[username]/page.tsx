import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser, isBlockedUser } from "@/lib/block-service";
import StreamPlayer from "@/components/stream-player";

const UserPage = async ({ params }: { params: { username: string } }) => {

    const user = await getUserByUsername(params.username);

    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    const isBlockingUser = await isBlockedUser(user.id);

    if (isBlocked) {
        notFound();
    }

    
    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    )
}

export default UserPage