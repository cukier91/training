import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from './redux/customerSlicer';
import axios from 'axios';
export default function Customers() {
	const dispatch = useDispatch();
	const customer = useSelector((state) => state.customers.customers);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(3);
    const [sort, setSort] = useState(null)


	useEffect(() => {
		const fetchData = axios
			.get(`http://localhost:3000/customers?_page=${page}&_limit=${limit}`)
			.then((resp) => {
				dispatch(fetchCustomers({data:[resp.data], page:page, limit:limit, sortedBy:sort}));
			})
			.catch((err) => {
				console.log(err);
			});		
	}, [page]);
    console.log(customer)

	return customer.length === 0 ? (
		<div>loading...</div>
	) : (
		<>
			<div className="user-table">
				<h1>Customers List</h1>
				<table>
                    <thead>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Date of Registration</th>
                    <th>End of Subscription</th>
                    </thead>
					{customer.data[0].map(
						({ id, name, surname, dateOfRegistration, endOfSubscription }) => {
							return (
								<tbody key={id}>
									<tr>
										<td>{name}</td>
                                        <td>{surname}</td>
                                        <td>{dateOfRegistration}</td>
                                        <td> {endOfSubscription}</td>
									</tr>
								
								</tbody>
							);
						}
					)}
				</table>
                <button onClick={() => {setPage(page + 1)}}>{'>'}</button>
                <button onClick={() => {setPage(page - 1)}}>{'<'}</button>
			</div>
            
		</>
	);
}
