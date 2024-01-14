import { cn } from '@/lib/utils'
import React from 'react'


const LiveBadge = ({ className }: { className?: string }) => {
    return (
        <div className={cn(
            "bg-rose-500 text-center p-0.5 px-1.5 rounded-[8px] uppercase text-[10px] border border-background font-semibold tracking-wide w-auto",
            className
        )}>
            Live
        </div>
    )
}

export default LiveBadge