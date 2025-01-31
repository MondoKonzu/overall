import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FormInsertBuild from "@/components/fromBuilding";
import Usercard from "@/components/usercard";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }


  return (
    <div>
      <Usercard></Usercard>
    </div>
  );
}