import './UserDetail.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function UserDetail() {
	const params = useParams();
	const [user, setUser] = useState([]);

	async function fetcher() {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users/${params.userId}`
		);
		const user = await response.json();
		console.log(user);
		setUser([user]);
	}

	useEffect(() => {
		fetcher();
	}, []);

	return user.length === 0 ? (
		<div>loading...</div>
	) : (
		<>
            <button className='back'><Link to={"/users"}>Go back to Users List</Link></button>
			<div className="user-table">
				<h1>USER DETAIL</h1>
				<table>
					{user.map(({ id, name, username, email, phone, address }) => {
						return (
							<tbody key={id}>
								<tr>
									<th>Name</th>
									<td>{name}</td>
								</tr>
								<tr>
									<th>Username</th>
									<td>{username}</td>
								</tr>
								<tr>
									<th>E-mail</th>
									<td>{email}</td>
								</tr>
								<tr>
									<th>Phone no.</th>
									<td>{phone}</td>
								</tr>
								<tr>
									<th>Street</th>
									<td>{address.street}</td>
								</tr>
								<tr>
									<th>Zip Code</th>
									<td>{address.zipcode}</td>
								</tr>
								<tr>
									<th>City</th>
									<td>{address.city}</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		</>
	);
}
