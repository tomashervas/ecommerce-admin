"use client"

import { useStoreModal } from '@/hooks/useStoreModal'
import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function SetupPage () {

  const onOpen = useStoreModal((state)=>state.onOpen)
  const isOpen = useStoreModal((state)=>state.isOpen)

  useEffect(()=>{
    if (!isOpen) onOpen()
  },[isOpen, onOpen])

  return (
    <div>
      <p>Protected route</p>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}
