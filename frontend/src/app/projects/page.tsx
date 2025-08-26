"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage(){
    const BACKEND_API = process.env.BACKEND_API;

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const responseProjects = fetch(BACKEND_API + "/projects/get_all_project_cards");

        if(responseProjects?.data){
            setProjects(responseProjects.data);
        }
    }, [])

    return(
        <div>
            hi
        </div>
    );
}
