import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? 
        <>
        <Link href={"/sign-up"}>
          <Button>Sign-up</Button>
        </Link>
        <p>or</p>
        <Link href={"/sign-in"}>
          <Button>Sign-in</Button>
        </Link>
        </>:
        <Link href={"/randwork"}>
          <Button>Go Play</Button>
        </Link>
        }
      </main>
    </>
  );
}
