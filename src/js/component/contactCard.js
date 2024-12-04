import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const ContactCard = () => {

    async function getContacts() {
        try {
            let response = await fetch("https://playground.4geeks.com/contact/agendas")
            console.log(response);
            if(response.ok) console.log("Could fetch data!");
            let data = await response.json()
            console.log(data);
            
            
            
        } catch (error) {
            console.error("Could not fetch data", error);
            
        }
    }
    useEffect(() => {
        getContacts()
    }, [])

    return (
        <div className="card my-3">

        </div>
    );
};
