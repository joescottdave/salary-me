import React from 'react';
import IncomesVis from './IncomesVis';

class Incomes extends React.Component {

    render() {
        return (
            <div className="Incomes"><IncomesVis monthly={this.props.monthly} /></div>
        )
    }
}

export default Incomes;