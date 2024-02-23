import { SignIn } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl={'/events'}
        afterSignUpUrl={'/events'}
      />
    </div>
  )
}
