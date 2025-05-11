"use client"
import { signUpAction } from "@/lib/actions";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "../load.css"

export default function Signup() {
  const { user, refresh } = useAuth();
  if (user != null) redirect("/");
  const [loading, setLoading] = useState(false);  
  return (
    <div className={`min-w-64 max-w-[32rem] mt-10 mx-auto before:rounded-md ${loading && "load"}`}>
    <form action={(e) => {
        signUpAction(e)
        refresh();
    }}
    
    className={`bg-background flex-1 flex flex-col min-w-full p-4 rounded-md font-mono`}>
      <h1 className="text-2xl font-medium text-yellow-400">Sign up</h1>
      <p className="text-sm text text-foreground">
        Already have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="username">Username</Label>
        <input className="cut-edge-tr" name="username" placeholder="player123" />
        <Label htmlFor="email">Email</Label>
        <input className="cut-edge-tr" name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <input className="cut-edge-tr"
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          required
        />
        <Button className="mt-7" variant={"cy"}
          onClick={() => {setLoading(true)}}
        >
          Sign up
        </Button>
      </div>
    </form>
    </div>
  );
}
