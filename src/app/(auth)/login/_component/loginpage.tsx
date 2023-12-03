import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { signIn } from "next-auth/react";
import login  from "next-auth/middleware";
export function LoginButton() {
    const [loading,setLoading] = useState(false);

    async function login(){ 
    if (process.env.NODE_ENV ==="production") {
    return;
    }
    try {
        setLoading(true);
        await signIn('google',{
            callbackUrl: "/site"})
        }   
catch (e) {
    setLoading (value: false);
} finally {
setLoading (value: false);
}