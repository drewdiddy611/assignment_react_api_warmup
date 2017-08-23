import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";

class App extends React.PureComponent {

  onEditUser = () => {
    this.userForm.setState({
      type='edit'
    })
  }

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
          onDeleteUser={onDeleteUser}
        />
        <br />
        <UserForm onSubmit={onDataSetChanged} error={error} />
      </div>
    );
  }
}

export default App;
