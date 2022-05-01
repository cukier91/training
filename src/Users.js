import './Users.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Users() {
	const [data, setData] = useState([]);

	async function fetcher() {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		const users = await response.json();
		setData(users);
	}

	useEffect(() => {
		fetcher();
	}, []);

	return (
		<>
			<div className="users-table">
				<h1>Users list</h1>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						{data.map((element) => {
							return (
								<tr key={element.id}>
									<td>{element.id}</td>
									<td>
										<Link to={`/user/${element.id}`}>{element.name}</Link>
									</td>
									<td>{element.username}</td>
								</tr>
							);
						})}
					</tbody>
					<Outlet />
				</table>
			</div>
		</>
	);
}
