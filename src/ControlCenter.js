import React, { Component } from 'react'
import './ControlCenter.css'

class ControlCenter extends Component {
  handleReset() {
    this.props.handleReset()
  }

  render() {
    return (
      <div className="ControlCenter">
        <button name="startAgain" onClick={this.handleReset.bind(this)}>
          Start Again
        </button>
      </div>
    )
  }
}

export default ControlCenter
