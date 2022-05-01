import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

//rafc

export default function Clients() {
	const [client, setClient] = useState([]);
    console.log(client)
	useEffect(() => {
		axios
			.get(`http://localhost:3000/clients`)
			.then((resp) => {
				setClient(resp.data);
			})
			.catch((err) => {
				console.log(err);
			}).finally(()=>{
				//TODO: setIsLoading false
			});
            console.log(client)
	}, []);

	function deleteClient(id) {
        console.log(client[0])
		axios
			.delete(`http://localhost:3000/clients/${id}`)
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((error) => {
				console.log(error);
			});

            setClient(client.filter(cl => cl.id !== id))
	}

	return client.length === 0 ? (
		<div>loading...</div>
	) : (
		<>
			<div className="user-table">
				<h1>Clients List</h1>
				<button className="back">
					<Link to="/add">Add Client</Link>
				</button>
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
							<th>Surname</th>
							<th>e-mail</th>
							<th>Delete</th>
							<th>Edit</th>
						</tr>
					</thead>
					{client.map(({ id, name, surname, email }) => {
						return (
							<tbody key={id}>
								<tr>
									<td>{id}</td>
									<td>{name}</td>
									<td>{surname}</td>
									<td>{email}</td>
									<td>
										<button className="back" onClick={()=> {deleteClient(id)}}>Delete</button>
									</td>
									<td>
										<Link to={`/edit/${id}`}><button className="back">Edit</button></Link>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		</>
	);
}
