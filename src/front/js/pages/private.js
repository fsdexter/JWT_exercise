import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container row text-center mt-5  d-flex justify-content-center">
			{!store.token ? (
				<>
					<h1>Error!!!</h1>
					<p>An error occurred during LOGIN please try again</p>
					<Link to="/login">
						<button className="btn btn-primary">Pleas go to login</button>
					</Link>
				</>
			) : (
				<>
					<button onClick={() => actions.Secret()} className="btn btn-danger">
						SECRET MESSAGE
					</button>
					<button onClick={() => actions.logout()} className="btn btn-primary">
						LOGOUT
					</button>
				</>
			)}
		</div>
	);
};
