"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import { providers } from "next-auth/providers"
import login  from "next-auth/middleware";
import { useState } from "react";
export function LoginPage() {
    const [loading, setLoading] = useState(false);

    async function login(){

        if (process.env.NODE_ENV ==="production") {
            return;
        }}

        try {
        setLoading (true);
        await signIn(providers.Google,{callbackUrl: "/site"});
        }
        catch (e) {
        setLoading (value: false);
        } finally {
        setLoading (value: false);
        return (

    return (<>
        </>);
};