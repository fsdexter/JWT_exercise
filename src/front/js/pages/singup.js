import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import "../../styles/home.scss";

// URL del backend
import { API_BASE_URL } from "../constants";

export const SingUp = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleSingUp = e => {
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

		fetch("https://3001-violet-turkey-imwclhlm.ws-eu16.gitpod.io/api/sing_up", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
		// actions.SingUp(email, password).then(() => {
		// 	history.push("/login");
		// });
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
			</div>
		</div>
	);
};
