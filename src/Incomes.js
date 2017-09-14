import React from 'react';
import IncomesVis from './IncomesVis';

class Incomes extends React.Component {

    render() {
        return (
            <div className="Incomes" ref="canvas"><IncomesVis salary={this.props.salary} /></div>
        )
    }
}

export default Incomes;