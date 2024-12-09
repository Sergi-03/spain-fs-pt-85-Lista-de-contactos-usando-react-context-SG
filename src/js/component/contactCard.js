import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ContactCard = () => {
    const [contacts, setContacts] = useState([]);

    async function createAgenda() {
        try {
            let response = await fetch("https://playground.4geeks.com/contact/agendas/sergi", {
                method: "POST"
            });
            console.log(response);
            if (response.ok) console.log("Agenda created!");
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Could not create agenda", error);
        }
    }

    async function getContacts() {
        try {
            let response = await fetch("https://playground.4geeks.com/contact/agendas/sergi/contacts", {
                method: "GET"
            });

            if (response.status == 404) {
                createAgenda();  
            }

            if (response.ok) {
                let data = await response.json();
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Could not get contacts", error);
        }
    }

    async function deleteContact(id) {
        try {
            const url = `https://playground.4geeks.com/contact/agendas/sergi/contacts/${id}`;
            let response = await fetch(url, { method: "DELETE" });

            if (response.ok) {
                console.log(`Contact with id ${id} deleted`);
                setContacts(contacts.filter(contact => contact.id !== id));
            } else {
                const errorMessage = await response.text();
                console.error("Failed to delete contact", errorMessage);
                alert(`Error deleting contact: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error in deleting contact", error);
        }
    }

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-end">
                <Link to="/add">
                    <button type="button" className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            {contacts.map((contact) => (
                <div key={contact.id} className="d-flex align-items-start">
                    <div>
                        <img className="circle" src="https://picsum.photos/170/170/" alt="contact" />
                    </div>

                    <div className="col-md-6 single-contact">
                        <ul>
                            <li className="contact-item">
                                {contact.name}
                                <span className="edit-delete-icons">
                                    <Link to={`/edit/${contact.id}`}>
                                        <i className="fa-solid fa-pen"></i>
                                    </Link>
                                    <i
                                        className="fa-solid fa-trash"
                                        onClick={() => deleteContact(contact.id)}
                                    ></i>
                                </span>
                            </li>
                            <li><i className="fa-solid fa-location-dot"></i><span>{contact.address}</span></li>
                            <li><i className="fa-solid fa-phone"></i><span>{contact.phone}</span></li>
                            <li><i className="fa-solid fa-envelope"></i><span>{contact.email}</span></li>
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};
