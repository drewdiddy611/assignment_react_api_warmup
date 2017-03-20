import React, { Component } from 'react'
import JumbotronFluid from './elements/JumbotronFluid'
import UserList from './UserList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <JumbotronFluid
          heading="User CRUD"
          lead="Using an API for User CRUD operations"
        />
        <UserList />
      </div>
    );
  }
}

export default App
