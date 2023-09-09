import { Member, Profile } from '@prisma/client'

interface ChatItemProps {
  id: string
  content: string
  member: Member & { profile: Profile }
  timestamp: string
  fileUrl: string | null
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, any>
}

export default function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  return <div>ChatItem</div>
}
