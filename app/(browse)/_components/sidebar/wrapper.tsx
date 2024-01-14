"use client"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { ToggleSkeleton } from "./toggle"
import { RecommendedSkeleton } from "./recommended"
import { useIsClient } from "usehooks-ts"
import { FollowingSkeleton } from "./following"

const Wrapper = ({ children }: { children: React.ReactNode }) => {

    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state)

    if (!isClient) return (
        <aside
            className="fixed transition-all left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50"
        >
           <ToggleSkeleton />
           <FollowingSkeleton />
           <RecommendedSkeleton />
        </aside>
    )

    return (
        <aside className={cn(
            "fixed transition-all left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50",
            collapsed && "lg:w-[70px]"
        )}>
            {children}
        </aside>
    )
}

export default Wrapper