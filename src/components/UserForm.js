import React from 'react';
import Input from './elements/Input';
import InputGroup from './elements/InputGroup';
import Button from './elements/Button';
import Alert from './elements/Alert';
import Showable from './elements/Showable';

class UserForm extends React.Component {
	onTextChanged = e => {
		this.props.onUserFormTextChanged(e);
	};

	onDataSetChanged = type => e => {
		this.props.onDataSetChanged(type)(e);
		this.props.onUserFormSubmit(e);
	};

	render() {
		const { first_name, last_name, avatar, id } = this.props.user;
		const { onDataSetChanged, error } = this.props;
		return (
			<form
				className="container"
				onSubmit={this.onDataSetChanged(this.props.userForm.type)}
			>
				<h1>
					{this.props.userForm.type !== UserForm.STATE_EDIT
						? 'Add New'
						: 'Edit'}{' '}
					User
				</h1>
				<Showable show={error}>
					<Alert type="danger">Oops, there was a problem...</Alert>
				</Showable>
				<InputGroup name="first_name" labelText="First Name">
					<Input
						name="first_name"
						value={first_name}
						onChange={this.onTextChanged}
					/>
				</InputGroup>
				<InputGroup name="last_name" labelText="Last Name">
					<Input
						name="last_name"
						value={last_name}
						onChange={this.onTextChanged}
					/>
				</InputGroup>
				<InputGroup name="avatar" labelText="Photo Link">
					<Input name="avatar" value={avatar} onChange={this.onTextChanged} />
				</InputGroup>
				{id ? <input type="hidden" name="id" value={id} /> : ''}
				<Button type="submit" onClick={this.onUserFormSubmit} color="primary">
					Save User
				</Button>
			</form>
		);
	}
}

UserForm.STATE_ADD = 'add';
UserForm.STATE_EDIT = 'edit';

export default UserForm;
