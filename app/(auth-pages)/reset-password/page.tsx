import { resetPasswordAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "../load.css"

export default async function ResetPassword(props: {
  searchParams: Promise<any>;
}) {
  const searchParams = await props.searchParams;
  const out = () => {
    if(searchParams.error) return searchParams.error
    if(searchParams.success) return searchParams.success
    return undefined
  }
  return (
    <form className="flex flex-col w-full mx-auto bg-black/70 font-mono backdrop-blur-sm rounded max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium text-yellow-400">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      {out() != undefined &&
        <span>{out()}</span>
      }
      <Button variant={"cy"} formAction={resetPasswordAction}>
        Reset password
      </Button>
    </form>
  );
}
