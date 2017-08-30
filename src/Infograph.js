import React, { Component } from 'react';
import './Infograph.css';
import Thing from './Thing';
import ControlCenter from './ControlCenter';


class Infograph extends Component {
    constructor(props){
        super(props);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset() {
        this.props.handleReset();
    }
    render() {
        return (
            <div className="Infograph">
                <Thing userInfo = {this.props.userInfo} />
                <ControlCenter handleReset={this.handleReset}/>
            </div>
        )
    }
}

export default Infograph;