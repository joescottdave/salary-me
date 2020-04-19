import React, { Component } from "react";

class Postcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      county: ""
    };
  }

  componentDidMount() {
    const main = this;
    fetch("https://api.postcodes.io/postcodes/" + this.props.postcode)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        main.setState({ county: data.result.admin_district });
      });
  }

  render() {
    return (
      <div>
        this is a postcode box thing and you live in {this.state.county}
      </div>
    );
  }
}

export default Postcode;
