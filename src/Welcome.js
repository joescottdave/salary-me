import React, {Component} from 'react';

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <h2>Welcome to your dashboard, {this.props.name}!</h2>
            </div>  
        );
    }
}

export default Welcome;