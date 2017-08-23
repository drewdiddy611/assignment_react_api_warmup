import React, { Component } from 'react';
import App from '../components/App';
import serialize from 'form-serialize';

class AppContainer extends Component {
	constructor() {
		super();

		// Initialize users in state as an empty array and
		// set isFetching to false.
		this.state = {
			users: [],
			isFetching: false,
			error: null
		};
	}

	componentDidMount() {
		// Before performing the fetch, set isFetching to true
		this.setState({ isFetching: true });

		// After component mounts, call the API to get the
		// users, then update state which triggers re-render.
		// Add a delay to the URL and reset isFetching upon
		// completion of the request.
		fetch('https://reqres.in/api/users?delay=1')
			.then(response => response.json())
			.then(json => {
				this.setState({
					users: json.data,
					isFetching: false
				});
			});
	}

	onDataSetChanged = type => async e => {
		e.preventDefault();
		const form = e.target;

		// Create headers to set the content type to json
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		// Form body.
		const body = serialize(form, { hash: true });
		const id = body.id;
		const options = {
			headers: headers,
			method: type === 'add' ? 'POST' : 'PUT',
			body: JSON.stringify(body)
		};

		// Before performing the fetch, set isFetching to true
		this.setState({ isFetching: true });

		try {
			let url = 'https://reqres.in/api/users';
			if (id && typeof id === 'string') {
				url += `/${id}`;
			}
			let response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}

			let json = await response.json();
			let users = this.state.users;
			if (id) {
				//edit
				const index = this.state.users.findIndex(user => user.id === id);
				users.splice(index, 1, json);
			} else {
				users = [...this.state.users, json];
			}
			this.setState(
				{
					isFetching: false,
					users
				},
				() => {
					if (form && type !== 'delete') {
						form.reset();
					}
				}
			);
		} catch (error) {
			console.log(error);
			this.setState({
				isFetching: false,
				error
			});
		}
	};

	onDataSetChanged2 = (type, entityId) => async e => {
		e.preventDefault();
		const form = e.target;

		const options = {
			method: type === 'delete' ? 'DELETE' : type === 'add' ? 'POST' : 'PUT'
		};

		let body;
		if (type !== 'delete') {
			// Create headers to set the content type to json
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');

			// Form body.
			body = serialize(form, { hash: true });

			options.headers = headers;
			options.body = JSON.stringify(body);
		}
		const id = entityId || +body.id || undefined;

		// Before performing the fetch, set isFetching to true
		this.setState({ isFetching: true });

		try {
			let url = 'https://reqres.in/api/users';
			if (id && !isNaN(id)) {
				url += `/${id}`;
			}
			let response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}

			let json = await response.json();
			let users = this.state.users;
			if (id) {
				//edit
				const index = this.state.users.findIndex(user => user.id === id);
				users.splice(index, 1, json);
			} else {
				users = [...this.state.users, json];
			}
			this.setState(
				{
					isFetching: false,
					users
				},
				() => {
					if (form && type !== 'delete') {
						form.reset();
					}
				}
			);
		} catch (error) {
			console.log(error);
			this.setState({
				isFetching: false,
				error
			});
		}
	};

	onDeleteUser = async () => {
		const options = {
			method: 'DELETE'
		};

		this.setState({
			isFetching: true
		});
		try {
			let response = await fetch('https://reqres.in/api/users', options);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			let json = await response.json();
			this.setState({
				isFetching: false,
				users: [...this.state.users, json]
			});
		} catch (error) {
			console.log(error);
			this.setState({
				isFetching: false,
				error
			});
		}
	};

	render() {
		return (
			<App
				onDataSetChanged={this.onDataSetChanged2}
				onDeleteUser={this.onDeleteUser}
				{...this.state}
			/>
		);
	}
}

export default AppContainer;
