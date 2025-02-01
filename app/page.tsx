import { Button } from "@/components/ui/button";
import CyberCard from "@/components/ui/cybercard";
import Link from "next/link";

export default function Home() {
  return (
        <div className="mx-auto w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16 gap-10 px-10 justify-items-center">
          <CyberCard title="Sign-in">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis mollitia eum iste, iure quod nulla sapiente incidunt earum soluta similique voluptatibus tempora laudantium minus quas fuga doloribus expedita! Illo, numquam!
            <Link href={"/sign-in"}>
              <Button variant={"link"} className="text-2xl">Sign in</Button>
            </Link>
          </CyberCard>
          <CyberCard title="Sign-up">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis mollitia eum iste, iure quod nulla sapiente incidunt earum soluta similique voluptatibus tempora laudantium minus quas fuga doloribus expedita! Illo, numquam!
            <Link href={"/sign-up"}>
              <Button variant={"link"} className="text-2xl">Sign up</Button>
            </Link>
          </CyberCard>
          <div className="md:col-span-2 lg:col-auto flex md:w-1/2 lg:w-full justify-center">
          <CyberCard title="See more">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis mollitia eum iste, iure quod nulla sapiente incidunt earum soluta similique voluptatibus tempora laudantium minus quas fuga doloribus expedita! Illo, numquam!
          </CyberCard>
          </div>
        </div>        
  );
}

{/* <div>
<h2 className="text-3xl">La gestione della campagna</h2>
  <ul>
    <li>Gestire i dati dei player</li>
    <li>Semplificare il ruolo del DM</li>
    <li>Agevolare i Calcoli</li>
    <li>Possibilmente rendere più immersivo il tutto</li>
  </ul>
</div>
<div className="text-center pt-8 grid grid-cols-1 gap-9">
  <Link href={"/sign-in"}>
  <Button className="">Sign in</Button>
  </Link>
  <Link href={"/sign-up"}>
  <Button className="">Sign up</Button>
  </Link>
</div> */}