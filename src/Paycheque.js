import React, { Component } from "react";
import Card from "./Card";
import "./Paycheque.css";
import PieVis from "./PieVis";

class Paycheque extends Component {
  render() {
    return (
      <div className="Paycheque">
        <Card>
          <h2>Let's look at your income and contributions</h2>
          <h3>According to our tax calculator:</h3>
          <ul className="Paycheque-List">
            <li className="Payche-List-Item">
              On an annual salary of £
              {this.props.salary
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </li>
            <li className="Payche-List-Item">
              You will pay approximately{" "}
              <span className="highlight">£{this.props.tax}</span> in income tax
            </li>
            <li className="Payche-List-Item">
              and make national insurance contributions of{" "}
              <span className="highlight">
                £{this.props.contribution.toFixed(2)}
              </span>
            </li>
            <li className="Payche-List-Item">
              leaving you with{" "}
              <span className="highlight">
                <strong>£{this.props.takeHomePay}</strong>
              </span>{" "}
              a month!
            </li>
          </ul>
          <PieVis
            tax={this.props.tax}
            contribution={this.props.contribution}
            takehome={this.props.takeHomePay}
          />
          <h2>Your effective tax rate is {this.props.taxEffect.toFixed(0)}%</h2>
        </Card>
      </div>
    );
  }
}

export default Paycheque;
