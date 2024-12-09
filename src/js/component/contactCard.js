import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContacts();
	}, []);

	return (
		<>
			<div className="d-flex justify-content-end">
				<Link to="/add">
					<button type="button" className="btn btn-success">Add new contact</button>
				</Link>
			</div>

			{store.contacts.map((contact) => (
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
										onClick={() => actions.deleteContact(contact.id)}
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
