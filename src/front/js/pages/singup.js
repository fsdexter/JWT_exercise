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
		actions.SingUp(email, password).then(() => {
			console.log(">>>>>>>>>>>>>>>>>>>>USER ADDED TO DE DATA BASE<<<<<<<<<<<<<<<<<<<<");
			// 	history.push("/login");
		});
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
