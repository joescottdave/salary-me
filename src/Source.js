import React, { Component } from "react";
import "./Source.css";

class Source extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="source-link">
        <a href={this.props.href} target="_blank">
          Source
        </a>
      </div>
    );
  }
}

export default Source;
