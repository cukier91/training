import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EditClient() {
	const [client, setClient] = useState([]);

	const params = useParams();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		axios
			.get(`http://localhost:3000/clients/${params.clientId}`)
			.then((resp) => {
				setClient(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function edit(name, surname, email) {
		axios
			.put(`http://localhost:3000/clients/${params.clientId}`, {
				id: useParams.clientId,
				name: name.length ===0? client.name: name,
				surname: surname.length ===0? client.surname: surname,
				email: email.length===0? client.email: email,
			})
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return client.length === 0 ? (
		<div>loading...</div>
	) : (
		<div className="form-container">
			<form className="form">
				<input
					name="name"
					value={name}
					className="input"
					placeholder={`${client.name}`}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					name="surname"
					value={surname}
					className="input"
					placeholder={`${client.surname}`}
					onChange={(e) => setSurname(e.target.value)}
				/>
				<input
					name="email"
					value={email}
					className="input"
					placeholder={`${client.email}`}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					className="back"
					onClick={() => {
						edit(name, surname, email);
					}}
				>
					<a href="/clients"> Zmień </a>
				</button>
			</form>
		</div>
	);
}
