import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = () => {
	const { store, actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false)
	const [contactToDelete, setContactToDelete] = useState(null)

	useEffect(() => {
		actions.getContacts();
	}, []);

	const handleDeleteClick = (contactId) => {
		setContactToDelete(contactId)
		setShowModal(true)
	}

	const handleConfirmDelete = () => {
		if(contactToDelete) {
			actions.deleteContact(contactToDelete)
			setShowModal(false)
		}
	}

	const handleCancelDelete = () => {
		setShowModal(false)
	}

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
										onClick={() => handleDeleteClick(contact.id)}
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
			{showModal && (
				<div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Are you sure?</h5>
								<button type="button" className="close" onClick={handleCancelDelete}>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<p>If you delete this thing the entire universe will go down!</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" onClick={handleCancelDelete}>
									Oh no!
								</button>
								<button type="button" className="btn btn-secondary" onClick={handleConfirmDelete}>
									Yes baby!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
