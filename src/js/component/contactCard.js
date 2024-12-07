import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const ContactCard = () => {
    const [contactName, setContactName] = useState([])

    async function getContacts() {
        try {
            let response = await fetch("https://playground.4geeks.com/contact/agendas")
            console.log(response);
            if(response.ok) console.log("Could fetch data!");
            let data = await response.json()
            console.log(data);
            setContactName(data.agendas)
            
            
            
        } catch (error) {
            console.error("Could not fetch data", error);
            
        }
    }
    useEffect(() => {
        getContacts()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-success">Add new contact</button>
            </div>
    
            <div className="d-flex align-items-start">
                <div>
                    <img className="circle" src="https://picsum.photos/170/170/" alt="contact" />
                </div>
    
                <div className="col-md-6 single-contact">
                    <ul>
                        {contactName.filter(item => item.id === 2).map((item, index) => (
                            <li key={index} className="contact-item">
                                {item.slug} 
                                <span className="edit-delete-icons">
                                    <i className="fa-solid fa-pen"></i>
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                            </li>
                        ))}
                        <li>
                            <i className="fa-solid fa-location-dot"></i><span> 5842 Hillcrest Rd</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i><span> (870) 288-4149</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope"></i><span> mike.ana@example.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}