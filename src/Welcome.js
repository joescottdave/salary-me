import React, {Component} from 'react';

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <h2>Welcome {this.props.name}!</h2>
                <h3>Let's learn some things about you...</h3>
            </div>  
        );
    }
}

export default Welcome;