"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { LoginButton } from "./_component/loginpage";
import { signIn } from "next-auth/react";

import login from "next-auth/middleware";
import { useState } from "react";
export function LoginPage() {
  return (
    <div>
      <LoginButton />
    </div>
  );
}
