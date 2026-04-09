import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <SignUp path="/sign-up" routing="path" signUpUrl="/sign-up" />
  )
}

export default SignUpPage
