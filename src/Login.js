import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_users } from './redux/usersSlice';
import { login } from './redux/authSlice';
import './Login.css';
import axios from 'axios';
export default function Login() {
	const [userName, setUserName] = useState('');
	const [userPass, setUserPass] = useState('');
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();


	useEffect(() => {
		const fetch_data = axios
			.get('http://localhost:3000/users')
			.then((resp) => {
				dispatch(fetch_users(resp.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function userFiltration(item) {
		if (item.login === userName && item.password === userPass) {
			return true;
		}
		return false;
	}

	function logger() {
		let filteredData = users.users.filter(userFiltration);
		if (filteredData.length > 0) {
			dispatch(login(filteredData[0].login));
    
    
		} else {
			alert(
				'Podane dane są nieprawidłowe, spróbuj ponownie lub zarejestruj konto :) '
			);
			return window.location.reload();
		}
	}

	return (
		<div className="wrap">
			<div className="box">
				<h3>Zaloguj się aby rozpocząć</h3>
				<input
					value={userName}
					className="login"
					placeholder="Login..."
					onChange={(e) => setUserName(e.target.value)}
				/>
				<input
					value={userPass}
					className="login"
					placeholder="Password..."
					onChange={(e) => setUserPass(e.target.value)}
				/>
				<button className="login-btn" onClick={logger}>
					login
				</button>
				<p className="p-login">
					Nie masz jeszcze konta ? <a href="#">Zarejestruj się</a>
				</p>
			</div>
		</div>
	);
}
