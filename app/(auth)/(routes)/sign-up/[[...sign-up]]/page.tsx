import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp 
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/(routes)/quiz" // Redirect to the quiz page after sign-up
      />
    </div>
  )
}