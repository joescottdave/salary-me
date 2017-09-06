import React, {Component} from 'react';
import { extent } from 'd3-array';
import { json } from 'd3-request';
import Vis from './Vis';

class LocalArea extends Component {
    constructor() {
        super()
        this.state = {
            area_name: undefined,
            area_code: undefined,
            house_prices: undefined
        }
    }

    async componentWillMount() {
        const main = this;
        const req = await fetch("https://api.postcodes.io/postcodes/"+ this.props.postcode);
        const response = await req.json();
        this.setState({area_name: response.result.admin_district, area_code: response.result.codes.admin_district });

    }

    render() {
        return (
            <div className="LocalArea">
                
                {(this.state.area_code === undefined) ?
                    null 
                    :
                    <div>
                    <h3>You live in {this.state.area_name}</h3>
                    <Vis area_code={this.state.area_code} />  
                    </div>
                }
                
            </div>
        )
    }
}

export default LocalArea;