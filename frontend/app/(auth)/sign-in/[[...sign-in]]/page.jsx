import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <SignIn path="/sign-in" routing="path" signInUrl="/sign-in" />
  )
}

export default SignInPage
