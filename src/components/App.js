import React from 'react';
import JumbotronFluid from './elements/JumbotronFluid';
import UserList from './UserList';

class App extends React.PureComponent {
	render() {
		return (
			<div className="App">
				<JumbotronFluid
					heading="User CRUD"
					lead="Using an API for User CRUD operations in React Applications"
				/>
				<UserList {...this.props} />
			</div>
		);
	}
}

export default App;
