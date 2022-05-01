import './RandM.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RandM() {
	const [rm, setRm] = useState([]);

	function fetcher() {
		fetch('https://rickandmortyapi.com/api/character')
			.then((response) => response.json())
			.then((data) => setRm(data.results))
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		fetcher();
	}, []);

	return rm.length === 0 ? (
		<div className="loading">
			<h2>Loading...</h2>
		</div>
	) : (
		<>
			<div className="wrapper">
				{rm.map(({ name, image }) => {
					return (
						<div className="box" key={name}>
							<h4>{name}</h4>
							<img className="img" src={`${image}`} alt={`${name}`} />
						</div>
					);
				})}{' '}
			</div>
		</>
	);
}
