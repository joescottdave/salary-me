import React, {Component} from 'react';
import './LocalArea.css';
import Vis from './Vis';

class LocalArea extends Component {
    constructor() {
        super()
        this.state = {
            area_name: undefined,
            area_code: undefined
        }
    }

    async componentWillMount() {
        const req = await fetch("https://api.postcodes.io/postcodes/"+ this.props.postcode);
        const response = await req.json();
        this.setState({area_name: response.result.admin_district, area_code: response.result.codes.admin_district });
    }

    render() {
        return (
            <div className="LocalArea">
                <h3>You live in {this.state.area_name} ({this.state.area_code})</h3>
                {(this.state.area_code === undefined) ?
                    null : <Vis area_code={this.state.area_code} />  
                }
                
            </div>
        )
    }
}

export default LocalArea;