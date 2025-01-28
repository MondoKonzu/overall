import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { fetchPlayers } from "../data-handler";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const names = await fetchPlayers();

  return (
    <>
    <div>Peperoni senza sale</div>
    {names ? names.map(player => <p key={player.name}>{player.name}</p>) : null }

    </>
    );
}