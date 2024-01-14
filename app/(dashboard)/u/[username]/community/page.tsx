import React from 'react'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { getBlockedUsers } from '@/lib/block-service'
import { format } from 'date-fns'


const CommunityPage = async () => {

    const blockedUsers = await getBlockedUsers();

    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: block.blocked.createdAt
    }))

    return (
        <div className='p-6'>
            <div className="mb-4">
                <h1 className='text-2xl font-bold'>Community settings</h1>
                <div className=" mx-auto py-10">
                    <DataTable
                        columns={columns}
                        data={formattedData}
                        filterColumn='username'
                        filterLabel='By username'
                    />
                </div>
            </div>
        </div>
    )
}

export default CommunityPage