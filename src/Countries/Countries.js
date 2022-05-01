// Państwo - Stolica - Powierzchnia - Języki Urzędowe - Populacja

import styles from './Countries.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Countries() {
	const [originalData,setOriginalData]=useState([]);
	const [countries, setCountries] = useState([]);
	const [sorted, setSorted] = useState(null);

	function sorter(key) {
		const newCountries=[...originalData];
		if (key === 'area') {
			setCountries(newCountries.sort((a, b) => b.area - a.area));
			setSorted('area');
		}else if(key ==='population'){
            setCountries(countries.sort((a, b) => b.population - a.population));
			setSorted('population');
        }else{
            setCountries(originalData)
        }
	}

	useEffect(() => {
		function fetcher() {
			axios
				.get('https://restcountries.com/v3.1/all')
				.then((resp) => {
					setOriginalData(resp.data);
					setCountries(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		fetcher();
		
	}, []);

	return originalData.length === 0 ? (
		<div className={styles.loading}>
			<h2>Loading...</h2>
		</div>
	) : (
		<>
			<div className="user-table">
				<div>
					<button className="back" onClick={() => {sorter("reload")}}>Reset</button>
					<button className="back" onClick={() => {sorter("area")}}>
						Sort by Area
					</button>
					<button className="back" onClick={() => {sorter("population")}}>Sort by Population</button>
				</div>

				<table>
					<thead>
						<tr>
							<th>No.</th>
							<th>Name</th>
							<th>Stolica</th>
							<th>Powierzchnia[㎢]</th>
							<th>Języki</th>
							<th>Populacja[mln]</th>
						</tr>
					</thead>
					<tbody>
						{countries.map(
							(
								{ name, capital, population, area, languages },
								counter
							) => (
									<tr key={counter}>
										<td>{counter+1}</td>
										<td>{name.common}</td>
										<td>{capital}</td>
										<td>{area / 1000}</td>
										<td>
											{languages === undefined
												? 'N/A'
												: Object.values(languages).map((el) => {
														return <li key={el}>{el}</li>;
												  })}
										</td>
										<td>{population / 1_000_000}</td>
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
