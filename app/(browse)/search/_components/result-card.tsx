import Thumbnail, { ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import VerifiedMark from '@/components/verified-mark'
import { CustomCardStream } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface ResultCradProps {
    data: CustomCardStream;
}

const ResultCard = ({ data }: ResultCradProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail
                        src={data.thumbnailUrl}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                            {data.user.username}
                        </p>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4" >
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
                <Skeleton className='h-2.5 w-12' />
            </div>
        </div >
    )
}

export default ResultCard