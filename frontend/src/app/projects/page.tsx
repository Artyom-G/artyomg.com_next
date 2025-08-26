"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage(){
    const BACKEND_API = process.env.BACKEND_API;

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/projects/get_all_project_cards`);
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };

        fetchProjects();
    }, []);

    return(
        <div>
            hi
        </div>
    );
}
