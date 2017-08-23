import React from 'react';
import JumbotronFluid from './elements/JumbotronFluid';
import UserList from './UserList';

class App extends React.PureComponent {
	render() {
		const {
			users,
			isFetching,
			error,
			onDataSetChanged,
			onDeleteUser
		} = this.props;

		return (
			<div className="App">
				<JumbotronFluid
					heading="User CRUD"
					lead="Using an API for User CRUD operations in React Applications"
				/>
				<UserList
					users={users}
					isFetching={isFetching}
					error={error}
					onDataSetChanged={onDataSetChanged}
					onDeleteUser={onDeleteUser}
				/>
			</div>
		);
	}
}

export default App;
