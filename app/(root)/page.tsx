import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function SetupPage () {
  return (
    <>
      <p>Protected route</p>
      <UserButton afterSignOutUrl='/' />
    </>
  )
}
