"use client"

import { Button } from '@/components/ui/button'
import Hint from '@/components/hint'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

const Toggle = () => {

    const {
        collapsed,
        onCollapse,
        onExpand
    } = useCreatorSidebar((state) => state)

    const label = collapsed ? 'Expand' : 'Collapse'

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4 transition-all">
                    <Hint
                        side='right'
                        label={label}
                        asChild
                    >
                        <Button
                            onClick={onExpand}
                            className='h-auto p-2'
                            variant="ghost"
                        >
                            <ArrowRightFromLine className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full transition-all">
                    <p className='hidden lg:block'>
                        Dashboard
                    </p>
                    <Hint
                        side='right'
                        label={label}
                        asChild
                    >
                        <Button
                            onClick={onCollapse}
                            className='h-auto p-2 ml-auto'
                            variant="ghost"
                        >
                            <ArrowLeftFromLine className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className='h-6 w-[100px]' />
            <Skeleton className='h-6 w-6' />
        </div>
    )
}

export default Toggle