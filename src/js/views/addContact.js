import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const AddContact = () => {
	const [contact, setContact] = useState({ name: '', phone: '', email: '', address: '' });
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		actions.createContact(contact);
		navigate('/');
	};

	return (
		<div className="container">
            <h2 className="my-4 text-center">Add a new contact</h2>
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
                        placeholder="Enter contact name"
                        required 
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
                        placeholder="Enter phone number"
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input 
                        id="phone"
                        type="text" 
                        name="phone" 
                        value={contact.phone} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Enter email"
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        value={contact.email} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Enter address"
                        required 
                    />
                </div>
                <div className="form-group d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to="/">
                    <button type="button" class="btn btn-link">Go back</button>
                    </Link>
                </div>
            </form>
        </div>
	);
};

export default AddContact;
