import React from "react";
import { connect } from "react-redux";
import * as orderAction from '../actions/orderAction';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class CreateOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      lastName: "",
      phoneNumber: "",
      position: null
    };
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    let order = {
      name: this.state.name,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      lat: this.state.position !== null ? this.state.position.lat() : "1.000", //Default lat
      lon: this.state.position !== null ? this.state.position.lon() : "2.000" //Default lon
    };
    this.props.createOrder(order);
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { error, loading, orders } = this.props;
    const { classes } = this.props;
    const { position } = this.state;
    var durationOrder = 0;
     console.log("orders:"+orders);
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (orders.length > 0){
      let t = new Date();
      t.setSeconds(t.getSeconds() + orders[0].duration);
      durationOrder = t.toString();
    }

    return (
      <div>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
          <TextField
            id="last-name"
            label="Last Name"
            className={classes.textField}
            value={this.state.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            className={classes.textField}
            value={this.state.phoneNumber}
            onChange={this.handleChange("phoneNumber")}
            margin="normal"
          />
          <input
            placeholder="Enter a location"
            ref={ref => (this.autocomplete = ref)}
            type="text"
          />
          
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Send Order
          </Button>
          <TextField
            id="eta"
            label="ETA food delivery"
            className={classes.textField}
            value={durationOrder}
            margin="normal"
            fullWidth
            readOnly={true}
          />
        </form>
        <Map
          {...this.props}
          center={position}
          centerAroundCurrentLocation={false}
          containerStyle={{
            height: "100vh",
            position: "relative",
            width: "100%"
          }}
        >
          <Marker position={position} />
        </Map>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <CreateOrderForm {...props} />
  </Map>
);

// const mapStateToProps = (state, ownProps) => {
//   console.log(state);
//   return {
//     contacts: state.contacts.items
//   }
// };

const mapStateToProps = state => ({
  orders: state.orders.items,
  loading: state.orders.loading,
  error: state.orders.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: order => dispatch(orderAction.createOrder(order)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    GoogleApiWrapper({
      apiKey: "GOOGLE_API_KEY"
    })(MapWrapper)
  )
);
