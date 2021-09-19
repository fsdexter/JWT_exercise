import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleLogin = () => {
		actions.Login(email, password).then(() => {
			history.push("/private");
		});
	};

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
};
