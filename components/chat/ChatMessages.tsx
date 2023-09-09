'use client'

import { Member, Message, Profile } from '@prisma/client'
import ChatWelcome from './ChatWelcome'
import useChatQuery from '@/hooks/useChatQuery'
import { Loader2, ServerCrash } from 'lucide-react'
import { Fragment } from 'react'
import ChatItem from './ChatItem'
import { format } from 'date-fns'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

interface ChatMessagesProps {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, any>
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
  type: 'channel' | 'conversation'
}

type MessageWithMemberWithProfile = Message & {
  member: Member & { profile: Profile }
}

export default function ChatMessages({
  name,
  member,
  chatId,
  socketUrl,
  apiUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    })

  if (status === 'loading')
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-20 w-20 animate-spin text-zinc-500' />
        <p className='text-sm pt-2 text-zinc-500 dark:text-zinc-400'>
          Loading messages...
        </p>
      </div>
    )
  if (status === 'error')
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <ServerCrash className='h-20 w-20 text-zinc-500' />
        <p className='text-sm pt-2 text-zinc-500 dark:text-zinc-400'>
          Something went wrong!
        </p>
      </div>
    )

  return (
    <div className='flex-1 flex flex-col py-4 overflow-y-auto'>
      <div className='flex-1' />
      <ChatWelcome type={type} name={name} />
      <div className='flex flex-col-reverse mt-auto'>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                content={message.content}
                member={message.member}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
