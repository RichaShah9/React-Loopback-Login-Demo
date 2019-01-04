import React, { Component } from "react";
import Service from "./service";
import {
  Button,
  Segment,
  Grid,
  Header,
  Form,
  Message
} from "semantic-ui-react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };

    this.service = new Service();
  }

  register = () => {
    const { member } = this.state;
    if (member && member.password !== member.confirmPassword) {
      alert("password not matched");
    } else {
      this.service.post("Members", { ...member }).then(res => {
        if (res && res.error) {
          alert(res.error.message);
        }
      });
    }
  };

  handleChange = e => {
    const { member } = this.state;
    member[e.target.name] = e.target.value;
    this.setState({
      member
    });
  };

  render() {
    return (
      <div
        className="signup-form"
        style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" icon textAlign="center">
              <Header.Content>SIGN UP</Header.Content>
            </Header>
            <Form onSubmit={this.register}>
              <Segment raised>
                <Form.Input
                  label="Full Name"
                  placeholder="Full name"
                  required
                  name="name"
                  value={this.state.member.name}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={this.state.member.email}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Password"
                  placeholder="Password"
                  type="Password"
                  required
                  name="password"
                  value={this.state.member.password}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="Password"
                  required
                  name="confirmPassword"
                  value={this.state.member.confirmPassword}
                  onChange={this.handleChange}
                />

                <Button type="submit" basic circular color="blue">
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message>
              <b>
                Already member? <a href="/"> Login</a>
              </b>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
