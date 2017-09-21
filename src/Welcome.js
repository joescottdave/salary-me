import React, {Component} from 'react';
import Card from './Card';
import './Welcome.css';

class Welcome extends Component {
    render() {
        return (
            <Card>
            <div className="Welcome">
                <h2 className="splash">Welcome to your dashboard,</h2>
                <h2 className="splash-name">{this.props.name}!</h2>
            </div>  
            </Card>
        );
    }
}

export default Welcome;