import React, { Component } from 'react'
import JumbotronFluid from './elements/JumbotronFluid'
import UserList from './UserList'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import Button from './elements/Button'

class App extends Component {
  constructor() {
    super()

    // Initialize users in state as an empty array and
    // set isFetching to false.
    this.state = {
      users: [],
      isFetching: false,
    }
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({isFetching: true})

    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    // Add a delay to the URL and reset isFetching upon
    // completion of the request.
    fetch('https://reqres.in/api/users?delay=3')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json.data,
          isFetching: false,
        })
      })
  }

  onAddUser = (e) => {
    e.preventDefault()
    console.log('submitted!')
  }

  render() {
    const {users, isFetching} = this.state

    return (
      <div className="App">
        <JumbotronFluid
          heading="User CRUD"
          lead="Using an API for User CRUD operations in React Applications"
        />
        <UserList users={users} isFetching={isFetching} />
        <hr />
          <form className="container" onSubmit={this.onAddUser}>
            <h1>Add a New User</h1>
            <InputGroup name="name" labelText="Name">
              <Input name="name" />
            </InputGroup>
            <InputGroup name="photo" labelText="Photo Link">
              <Input name="photo" />
            </InputGroup>
            <Button type="submit">Save User</Button>
          </form>
      </div>
    )
  }
}

export default App
