import React, { Component } from "react";
import Service from "./service";
import { Button, Grid, Header } from "semantic-ui-react";

const service = new Service();

export default class Profile extends Component {
  logout = () => {
    try {
      service.post("Members/logout");
      window.localStorage.setItem("members_accessToken", JSON.stringify({}));
      this.props.history.push("/login");
    } catch (e) {}
  };

  render() {
    return (
      <div
        style={{
          marginTop: 150,
          marginLeft: 50,
          marginRight: 50,
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" icon textAlign="center">
              <Header.Content>Welcome Home</Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
        <Button
          style={{ width: "30%" }}
          circular
          basic
          color="blue"
          fluid
          size="large"
          onClick={this.logout}
        >
          Logout
        </Button>
      </div>
    );
  }
}
