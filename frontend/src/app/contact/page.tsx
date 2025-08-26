"use client";

import React, { useRef, useState } from "react";
import particles from "@/assets/particles_calm";
import ContactForm from "@/components/ContactForm"
import BackgroundParticles from "@/components/BackgroundParticles";

const ContactPage: React.FC = () => {

    return (
        <>
            <BackgroundParticles particles={particles}/>
            <ContactForm />
        </>
    );
};

export default ContactPage;
