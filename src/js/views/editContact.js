import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const EditContact = () => {
	const { id } = useParams(); 
	const navigate = useNavigate();
	const [contact, setContact] = useState({ name: '', phone: '', email: '', address: '' });
	const { actions } = useContext(Context);

	useEffect(() => {
		fetch(`https://playground.4geeks.com/contact/agendas/sergi/contacts/${id}`)
			.then((response) => response.json())
			.then((data) => setContact(data))
			.catch((error) => console.log(error));
	}, [id]);

	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		actions.editContact(id, contact);
		navigate('/');
	};

	return (
		<div className="container">
            <h2 className="my-4 text-center">Edit Contact</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="form-group mb-3">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        id="name"
                        type="text" 
                        name="name" 
                        value={contact.name} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input 
                        id="address"
                        type="text" 
                        name="address" 
                        value={contact.address} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Phone</label>
                    <input 
                        id="phone"
                        type="text" 
                        name="phone" 
                        value={contact.phone} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        value={contact.email} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>
                <div className="form-group d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <Link to="/">
                    <button type="button" class="btn btn-secondary">Go back</button>
                    </Link>
                </div>
            </form>
        </div>
	);
};

export default EditContact;
