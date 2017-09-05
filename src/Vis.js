import React, { Component } from 'react';
import * as d3 from 'd3';

class Vis extends Component {
    componentDidMount() {
        const context = this.setContext();
        this.drawGraph(context);
    }

    setContext() {
        return d3.select(this.refs.vis).append('svg')
            .attr('class', 'housing-vis')
            .attr('height', '300px')
            .attr('width', '480px')
            .append('g')
    }

    drawGraph(context) {
        const main = this;
        d3.json('./data/Average-prices-2017-06.json', function(data){

            // two sets of data
            var localHousePriceInfo = data.filter(function(obj){
                return obj.Area_Code === main.props.area_code;
            });

            var ukHousePriceInfo = data.filter(function(obj){
                return obj.Area_Code === 'K02000001';
            });

            // getting & setting some measurements
            var margin = {top:20, right:20, bottom:30, left:50},
            width = document.querySelector('.housing-vis').clientWidth - margin.left - margin.right,
            height = document.querySelector('.housing-vis').clientHeight - margin.top - margin.bottom;

            context.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // drawing the graph
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
    
            context.append("g").attr("class", "bottom-axis")
                .attr("transform", "translate(0," + height +")")
                .call(d3.axisBottom(x));
            
            context.append("g").attr("class", "left-axis")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Average Sold Price");
            
            context.append("path")
                .datum(ukHousePriceInfo)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);
            
            context.append("path")
                .datum(localHousePriceInfo)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            d3.select('.LocalArea').append('div')
                .attr('class', 'Explainer')
                .text('Hello there');
        })
    }

    render() {
        return (
            <div ref="vis"></div>
        )
    }
}

export default Vis;