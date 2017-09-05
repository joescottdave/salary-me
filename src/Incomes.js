import React from 'react';
import IncomesVis from './IncomesVis';
import './Incomes.css';

class Incomes extends React.Component {

    render() {
        return (
            <div className="Incomes" ref="canvas"><IncomesVis monthly={this.props.monthly} /></div>
        )
    }
}

export default Incomes;