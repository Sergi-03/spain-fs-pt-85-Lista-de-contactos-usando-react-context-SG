const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
			createAgenda: async () => {
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
			},

			getContacts: async () => {
				try {
					let response = await fetch("https://playground.4geeks.com/contact/agendas/sergi/contacts", {
						method: "GET"
					});

					if (response.status == 404) {
						await getActions().createAgenda();
					}

					if (response.ok) {
						let data = await response.json();
						setStore({ contacts: data.contacts });
					}
				} catch (error) {
					console.error("Could not get contacts", error);
				}
			},

			deleteContact: async (id) => {
				try {
					const url = `https://playground.4geeks.com/contact/agendas/sergi/contacts/${id}`;
					let response = await fetch(url, { method: "DELETE" });

					if (response.ok) {
						console.log(`Contact with id ${id} deleted`);
						const store = getStore();
						const updatedContacts = store.contacts.filter(contact => contact.id !== id);
						setStore({ contacts: updatedContacts });
					} else {
						const errorMessage = await response.text();
						console.error("Failed to delete contact", errorMessage);
						alert(`Error deleting contact: ${errorMessage}`);
					}
				} catch (error) {
					console.error("Error in deleting contact", error);
				}
			},

			createContact: async (payload) => {
				try {
					let response = await fetch("https://playground.4geeks.com/contact/agendas/sergi/contacts", {
						method: "POST",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(payload)
					});
					let data = await response.json();
					console.log("Contact created:", data);
					getActions().getContacts();
				} catch (error) {
					console.error("Could not create contact", error);
				}
			},

			editContact: async (id, updatedContact) => {
				try {
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/sergi/contacts/${id}`, {
						method: "PUT",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updatedContact)
					});
					let data = await response.json();
					console.log("Contact updated:", data);
					getActions().getContacts();
				} catch (error) {
					console.error("Error in updating contact", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
