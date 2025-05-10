"use client"
import { signInAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "../load.css"

export default function Login() {
  const {user ,refresh} = useAuth();
  const [loading, setLoading] = useState(false);
  if(user != null) redirect("/");
    return (
  <div className={`min-w-64 max-w-[32rem] mt-10 mx-auto before:rounded-md font-mono ${loading && "load"}`}>
        <form action={(e) => {
          signInAction(e)
          refresh()
        }} className={`bg-background flex-1 flex flex-col min-w-full p-4 rounded-md`}>
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <Button className="font-bold text-lg" variant={"cy"}
        onClick={() => {
          setLoading(true)
          setTimeout(() => {
            if(user == null){
              setLoading(false)
            }
          }, 10000)
        }
        }>
          Sign in
        </Button>
      </div>
    </form>
  </div>
  );
}
