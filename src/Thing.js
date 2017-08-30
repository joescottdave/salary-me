import React, { Component } from 'react';
import './Thing.css';
import CPI from './CPI';

class Thing extends Component {
    constructor() {
        super();
        this.state = {
            county: '',
            takeHomePay: 0 
        };
    }

    componentDidMount(){
        this._takeHomePay();
        this._fetchLocalArea();        
    }

    _fetchLocalArea() {
        const main = this;
        fetch("https://api.postcodes.io/postcodes/"+ this.props.userInfo.userPostcode)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                main.setState({county: data.result.admin_district})
            })
    }

    _fetchLocalInfoGraph() {
        const main = this;
        fetch("https://api.zoopla.co.uk/api/v1/zed_index?area=NW10&output_type=outcode&api_key=vayfanxrjnwwuvcnkra3c7gq")
        .then(function(response){
            console.log(response);
        })
    }

    _takeHomePay() {
        let salary = this.props.userInfo.userSalary;
        var liability = salary > (52*157) ? ((salary - (52*157))*0.12).toFixed(2) : 0;
        console.log('liability ' + liability.toString())
        if (salary < 100000 && salary < 45001) {
            this.setState({ takeHomePay: (((((salary-11500)*0.8) + 11500)-liability)/12).toFixed(2) })
        }else{
            throw error;
        };
    }

    render() {
        return (
            <div className="Thing">
                Hello {this.props.userInfo.userName}!
                <br/>
                Your monthly take home pay is £{this.state.takeHomePay}
                <br/>
                And you live in {this.state.county}
                <CPI takeHomePay={this.state.takeHomePay}/>
            </div>
        )
    }
}

export default Thing;