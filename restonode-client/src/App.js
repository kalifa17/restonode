import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CreateOrderForm from "./components/CreateOrderForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    };
  }

  render() {
    return (
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Restnode: Restaurant Mgmt System
            </Typography>
          </Toolbar>
        </AppBar>
        <CreateOrderForm />
      </div>
    );
  }
}

export default App;
