import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import "../../styles/home.scss";

import { API_BASE_URL } from "../constants";

export const SingUp = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSingUp = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: email,
			password: password
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://3001-cyan-monkey-hn430x61.ws-eu16.gitpod.io/api/singup", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
		// 	actions.SingUp(email, password).then(() => {
		// 		alert("loged");
		// 		history.pushState("/login");
		// 	});
	};
	const test = () => {
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		console.log({ API_BASE_URL });
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	};

	return (
		<div className="text-center mt-5">
			<h1>SingUp</h1>
			<div>
				<input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={handleSingUp}>SingUp</button>
				<button onClick={test}>test</button>
			</div>
		</div>
	);
};
