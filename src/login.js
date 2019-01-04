import React, { Component } from "react";
import Service from "./service";
import { Button, Icon, Form, Grid, Header, Segment } from "semantic-ui-react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {
        email: "",
        password: ""
      }
    };
    this.service = new Service();
  }

  login = member => {
    this.service.post("Members/login", { ...member }).then(res => {
      if (res && res.error) {
        alert(res.error.message);
      } else {
        window.localStorage.setItem(
          "members_accessToken",
          JSON.stringify({ accessToken: res && res.id })
        );
        this.props.history.push(`/`);
      }
    });
  };

  handleChange = e => {
    const { member } = this.state;
    member[e.target.name] = e.target.value;
    this.setState({
      member
    });
  };

  forgotPassword = () => {
    this.service.post("/Members/reset", { email: this.state.member.email });
  };

  createAccount = () => {
    this.props.history.push("/register");
  };

  render() {
    const { member } = this.state;

    return (
      <div style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>Sign In</Header.Content>
            </Header>
            <Grid>
              <Segment raised style={{ width: "100%", marginTop: 10 }}>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email"
                  value={this.state.member.email}
                  onChange={this.handleChange}
                  name="email"
                  style={{ marginBottom: 10 }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.member.password}
                  onChange={this.handleChange}
                  style={{ marginBottom: 10 }}
                />
                <Button
                  circular
                  basic
                  color="blue"
                  fluid
                  size="large"
                  onClick={() => this.login(member)}
                  style={{ marginBottom: 10 }}
                >
                  Sign In
                </Button>
                <Button
                  animated="fade"
                  circular
                  basic
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.createAccount}
                  style={{ marginBottom: 10 }}
                >
                  <Button.Content visible>New to us?</Button.Content>
                  <Button.Content hidden>Sign Up</Button.Content>
                </Button>
                <Button
                  circular
                  basic
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.forgotPassword}
                >
                  Forgot Password
                </Button>
              </Segment>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
