"use client"

import { Button } from "@/components/ui/button";
import { Lamp } from "@/components/ui/lamp";
import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";

export default function Home() {
  return (
        <div className="mx-auto grid grid-cols-2 gap-10 px-10">
          {/* col 1 */}
          <div>
          <h2 className="text-3xl">La gestione della campagna</h2>
            <ul>
              <li>Gestire i dati dei player</li>
              <li>Semplificare il ruolo del DM</li>
              <li>Agevolare i Calcoli</li>
              <li>Possibilmente rendere più immersivo il tutto</li>
            </ul>
          </div>
          {/* col 2 */}
          <div className="text-center pt-8 grid grid-cols-1 gap-9">
            <Link href={"/sign-in"}>
            <Button className="">Sign in</Button>
            </Link>
            <Link href={"/sign-up"}>
            <Button className="">Sign up</Button>
            </Link>
          </div>
        </div>        
  );
}
