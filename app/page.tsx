import { Button } from "@/components/ui/button";
import CyberCard from "@/components/ui/cybercard";
import Link from "next/link";

export default function Home() {
  return (
        <div className="w-full md:mx-auto md:w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-16 gap-10 px-1 justify-items-center">
          <CyberCard title="Sign-in">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis mollitia eum iste, iure quod nulla sapiente incidunt earum soluta similique voluptatibus tempora laudantium minus quas fuga doloribus expedita! Illo, numquam!
            <br />
            <Link href={"/sign-in"}>
              <Button variant={"link"} className="text-2xl">Sign in</Button>
            </Link>
          </CyberCard>
          <CyberCard title="Sign-up">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis mollitia eum iste, iure quod nulla sapiente incidunt earum soluta similique voluptatibus tempora laudantium minus quas fuga doloribus expedita! Illo, numquam!
            <br />
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