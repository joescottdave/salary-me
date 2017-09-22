import React, {Component} from 'react';
import Card from './Card';
import './Welcome.css';

// import ScrollAnimation from 'react-animate-on-scroll';

class Welcome extends Component {
    render() {
        return (
            <Card>
            <div className="Welcome">
                <h2 className="splash">Welcome to your dashboard, {this.props.name}</h2>
            </div>
            </Card>
        );
    }
}

export default Welcome;