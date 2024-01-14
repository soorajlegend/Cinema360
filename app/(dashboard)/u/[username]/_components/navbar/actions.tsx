import {  UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
const Actions = async () => {

    return (
        <div className='flex items-center justify-end gap-x-2'>
            <div className="flex items-center gap-x-4">
                <Button
                    size="sm"
                    variant="ghost"
                    className='text-muted-foreground hover:text-primary'
                    asChild
                >
                    <Link href="/">
                        <LogOut className='w-5 h-5 mr-2' />
                        Exit
                    </Link>
                </Button>
                <UserButton
                    afterSignOutUrl='/'
                />
            </div>
        </div>
    )
}

export default Actions