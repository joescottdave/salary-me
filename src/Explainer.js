import React, { Component } from 'react'
import './Explainer.css'

class Explainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reveal: false
    }
  }

  handleClick() {
    this.setState({ reveal: !this.state.reveal })
  }

  render() {
    return (
      <div className="Explainer">
        <p className="Explainer-Link" onClick={this.handleClick.bind(this)}>
          Explain this graphic...
        </p>
        {this.state.reveal ? this.props.children : null}
      </div>
    )
  }
}

// early incarnation
//
// const Explainer = ({children}) => (
//     <div className="Explainer">{children}</div>
// )

export default Explainer
