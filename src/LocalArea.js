import React, {Component} from 'react';
import './LocalArea.css';
import * as d3 from 'd3';
import myData from './houseprices2017.json';

class LocalArea extends Component {
    constructor() {
        super()
        this.state = {
            area_name: '',
            area_code: ''
        }
    }

    _drawGraph(area_code) {
        const main = this;

            var localHousePriceInfo = myData.filter(function(obj){
                return obj.Area_Code === area_code;
            });
            var ukHousePriceInfo = myData.filter(function(obj){
                return obj.Area_Code === 'K02000001';
            });

            var svg = d3.select('.houseprice-svg'),
            margin = {top:20, right:20, bottom:30, left:50},
            width = 480 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom,
            g = svg.append("g").attr("class", "first-group").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
            var parseTime = d3.timeParse("%Y-%m-%d");
    
            var x = d3.scaleTime()
                .rangeRound([0, width]);
    
            var y = d3.scaleLinear()
                .rangeRound([height,0]);
    
            var line = d3.line()
                .x(function(d) { return x(parseTime(d.Date)); })
                .y(function(d) { return y(+d.Average_Price); });

            x.domain(d3.extent(localHousePriceInfo, function(d) { return parseTime(d.Date); }));
            y.domain(d3.extent([...ukHousePriceInfo, ...localHousePriceInfo], function(d) { return +d.Average_Price; }));
    
            g.append("g").attr("class", "bottom-axis")
                .attr("transform", "translate(0," + height +")")
                .call(d3.axisBottom(x))
            .select(".domain")
                .remove();
            
            g.append("g").attr("class", "left-axis")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Avg House Price (£)");
            
            g.append("path")
                .datum(ukHousePriceInfo)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);
            
            g.append("path")
                .datum(localHousePriceInfo)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);
    }

    async componentWillMount() {
        const req = await fetch("https://api.postcodes.io/postcodes/"+ this.props.postcode);
        const response = await req.json();
        const drawGraph = await this._drawGraph(response.result.codes.admin_district)
        this.setState({area_name: response.result.admin_district, area_code: response.result.codes.admin_district });
        drawGraph();
    }

    render() {
        return (
            <div className="LocalArea">
                <h3>You live in {this.state.area_name} ({this.state.area_code})</h3>
                <svg className="houseprice-svg"></svg>
            </div>
        )
    }
}

export default LocalArea;