import { ModeToggle } from '@/components/ModeToggle'

export default function page() {
  return (
    <div className='text-3xl text-indigo-500 font-bold'>
      PROTECTED ROUTE
      <ModeToggle />
    </div>
  )
}
