import React from 'react';
import UserCard from './UserCard';
import UserForm from './UserForm';

const EMPTY_USER = {
	first_name: '',
	last_name: '',
	avatar: ''
};
class UserList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userForm: {
				type: UserForm.STATE_ADD
			},
			user: EMPTY_USER
		};
	}

	onEditUser = user => e => {
		e.preventDefault();

		this.setState({
			userForm: { type: UserForm.STATE_EDIT },
			user
		});
	};

	onUserFormTextChanged = e => {
		this.setState({
			user: Object.assign({}, this.state.user, {
				[e.target.name]: e.target.value
			})
		});
	};

	onUserFormSubmit = e => {
		this.setState({
			user: EMPTY_USER,
			userForm: { type: UserForm.STATE_ADD }
		});
	};

	render() {
		const {
			users,
			isFetching,
			error,
			onDataSetChanged,
			onDeleteUser
		} = this.props;
		// Generate the UserCard for each user
		const userList = users.map(user =>
			<UserCard
				user={user}
				key={user.id}
				onDeleteUser={onDeleteUser}
				onEditUser={this.onEditUser}
			/>
		);
		// card-group is the layout wrapper for Bootstrap
		// 4 cards. Add ternary operator to conditionally
		// show Loading... if in the process of fetching.
		return (
			<div className="container">
				<h1>User List</h1>
				<div className="card-group">
					{isFetching ? <p>Loading...</p> : userList}
				</div>
				<br />
				<UserForm
					{...this.state}
					onUserFormTextChanged={this.onUserFormTextChanged}
					onUserFormSubmit={this.onUserFormSubmit}
					onDataSetChanged={onDataSetChanged}
					error={error}
				/>
			</div>
		);
	}
}

export default UserList;
