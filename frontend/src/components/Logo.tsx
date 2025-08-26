"use client";

import React, { useState } from 'react';
import CircleButton from "@/components/CircleButton";
import logoUrl from "@assets/logo.svg";
import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <CircleButton onClick={() => window.open("/", "_blank")} radius={70} strokeWidth={4}>
            <Image src={logoUrl} alt="AryomG Logo"/>
        </CircleButton>
    );
};

export default Logo;
