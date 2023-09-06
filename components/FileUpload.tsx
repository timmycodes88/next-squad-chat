'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { X } from 'lucide-react'
import Image from 'next/image'
import { UploadFileResponse } from 'uploadthing/client'

interface FileUploadProps {
  endpoint: 'serverImage' | 'messageFile'
  value: string
  onChange: (url?: string) => void
}

export default function FileUpload({
  endpoint,
  value,
  onChange,
}: FileUploadProps) {
  const fileType = value?.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative w-20 h-20'>
        <Image src={value} alt='Upload' fill className='rounded-full' />
        <button
          onClick={() => onChange('')}
          type='button'
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-1 -right-1 shadow-sm hover:bg-rose-700'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    )
  }

  const onClientUploadComplete = (res: UploadFileResponse[] | undefined) => {
    onChange(res?.[0].url)
  }

  const onUploadError = (err: Error) => {
    console.log(err)
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
    />
  )
}
