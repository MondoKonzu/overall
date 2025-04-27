"use client"
import { Button } from "@/components/ui/button";
import CyberCard from "@/components/ui/cybercard";
import Link from "next/link";
import { useAuth } from "./AuthContext";

export default function Home() {
  const {refresh} = useAuth()
  setTimeout(refresh, 1000)
  return (
        <div className="mx-auto md:w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16 gap-10 px-3 md:px-10 justify-items-center">
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