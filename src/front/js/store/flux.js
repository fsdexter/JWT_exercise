const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			SingUp: async (email, password) => {
				const raw = JSON.stringify({
					email: email,
					password: password
				});

				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/singup", requestOptions);
					if (response.status !== 200) {
						alert("Something went wrong");
						return false;
					}

					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: access_token });
					return true;
				} catch (error) {
					console.error("Something went wrong try again");
				}
			}
		}
	};
};

export default getState;
