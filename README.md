# restonode client

### Tech

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [Redux](https://redux.js.org/) - An open-source JavaScript library for managing application state.
* [react-redux](https://github.com/reduxjs/react-redux) - Official React bindings for Redux.
* [Material-UI](https://material-ui.com/) - React components that implement Google's Material Design.


* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](http://expressjs.com/) - fast node.js network app framework


### Installation

restonode-client requires [restonode-server] to be running first.

Configure GOOGLE_API_KEY in api.js from the server, and in CreateOrderForm.js from the client, otherwise it would use demo data.

```sh
$ cd restonode-server
$ yarn install
$ yarn start
```

```sh
$ cd restonode-client
$ yarn install
$ yarn start
```

