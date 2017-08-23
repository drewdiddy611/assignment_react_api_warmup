import React from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";

const STATE_ADD = "add";
const STATE_EDIT = "edit";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: STATE_ADD
    };
  }

  render() {
    const { onSubmit, error } = this.props;
    return (
      <form className="container" onSubmit={onSubmit(this.state)}>
        <h1>
          {this.state !== STATE_EDIT ? "Add New" : "Edit"} User
        </h1>
        <Showable show={error}>
          <Alert type="danger">Oops, there was a problem...</Alert>
        </Showable>
        <InputGroup name="first_name" labelText="First Name">
          <Input name="first_name" />
        </InputGroup>
        <InputGroup name="last_name" labelText="Last Name">
          <Input name="last_name" />
        </InputGroup>
        <InputGroup name="avatar" labelText="Photo Link">
          <Input name="avatar" />
        </InputGroup>
        <Button type="submit" onClick={this.onUserFormSubmit} color="primary">
          Save User
        </Button>
      </form>
    );
  }
}

export default UserForm;
