import { forgotPasswordAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "../load.css"
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<any>;
}) {
  const searchParams = await props.searchParams;
    const out = () => {
    if(searchParams.error) return searchParams.error
    if(searchParams.success) return searchParams.success
    return undefined
  }
  return (
    <>
      <form className="flex-1 flex flex-col w-1/3 gap-2 bg-black/70 p-4 rounded font-mono backdrop-blur-sm text-foreground [&>input]:mb-6 mx-auto">
        <div>
          <h1 className="text-2xl font-medium text-yellow-400" >Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline text-yellow-400" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <input name="email" placeholder="you@example.com" required />
          {out() != undefined &&
            <span>{out()}</span>
          }
          <Button variant={"cy"} formAction={forgotPasswordAction}>
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
}
