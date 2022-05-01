import React, { useState } from 'react';
import './AddClient.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

//TODO: yup library, formik

export default function AddClient() {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');

	function add(name, surname, email) {
		let regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		regex.test(email)
			? axios
					.post('http://localhost:3000/clients', {
						id: uuidv4(),
						name: name,
						surname: surname,
						email: email,
					})
					.then((resp) => {
						//TODO: toast library
						console.log(resp);
					})
					.catch((err) => {
						console.log(err);
					})
			: alert('Niepoprawne dane');
	}

	return (
		<div className="form-container">
			<form className="form">
				{/* label */}
				<input
					name="name"
					value={name}
					className="input"
					placeholder="name..."
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					name="surname"
					value={surname}
					className="input"
					placeholder="surname..."
					onChange={(e) => setSurname(e.target.value)}
				/>
				<input
					name="email"
					value={email}
					className="input"
					placeholder="email..."
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="back"
					onClick={() => {
						add(name, surname, email);
					}}
				>
					Wyślij
				</button>
			</form>
		</div>
	);
}
