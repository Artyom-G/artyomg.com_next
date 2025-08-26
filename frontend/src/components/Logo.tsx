"use client";

import React, { useState } from 'react';
import CircleButton from "@/components/CircleButton";
import logoUrl from "@assets/logo.svg";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
    const router = useRouter();

    return (
        <CircleButton onClick={() => router.push("/")} radius={70} strokeWidth={4}>
            <Image src={logoUrl} alt="AryomG Logo"/>
        </CircleButton>
    );
};

export default Logo;
