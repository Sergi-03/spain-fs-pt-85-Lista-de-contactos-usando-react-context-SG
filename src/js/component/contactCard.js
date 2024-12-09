import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ContactCard = () => {
    const [contacts, setContacts] = useState([
        {
            id: 1, 
            name: "Sergi", 
            phone: "123456789", 
            email: "sergi@example.com", 
            address: "123 Main St"
        }
    ]);

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

    async function createContact() {
        try {
            let response = await fetch("https://playground.4geeks.com/contact/agendas/sergi/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contacts) 
            });

            console.log(response);
            if (response.ok) console.log("Contact created!");
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Could not create contact", error);
        }
    }
    async function deleteContact(id) {
        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/sergi/contacts/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log(`Contact with id ${id} deleted`);
                setContacts(contacts.filter(contact => contact.id !== id));
            } else {
                console.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Could not delete contact", error);
        }
    }

    useEffect(() => {
        createAgenda();
        createContact();
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
                                    <Link to={`/add`}>
                                        <i className="fa-solid fa-pen"></i>
                                    </Link>
                                    <i
                                        className="fa-solid fa-trash"
                                        onClick={() => deleteContact(contact.id)}
                                    ></i>
                                </span>
                            </li>

                            <li>
                                <i className="fa-solid fa-location-dot"></i><span>{contact.address}</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-phone"></i><span>{contact.phone}</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope"></i><span>{contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};
