import React, { Component } from 'react';
import * as d3 from 'd3';
import { extent } from 'd3-array';

class Vis extends Component {
    componentDidMount() {
        const context = this.setContext();
        this.drawGraph(context);
    }

    setContext() {
        var detectWidth = document.querySelector('.Card').clientWidth;
        var width = detectWidth *(9/10),
        // detectWidth > 375 ? d3.min([650, detectWidth]) : 338,
        height = width * (3/4);

        return d3.select(this.refs.vis).append('svg')
            .attr('class', 'housing-vis')
            .attr('height', height)
            .attr('width', width)
            .append('g');
    }

    getHousePrice(houseprice) {
        this.props.getHousePrice(houseprice);
    }

    getAvgRent(avg_rent) {
        this.props.getAvgRent(avg_rent);
    }

    higherOrLower(val1, val2) {
        this.props.higherOrLower(val1, val2)
    }

    drawGraph(context) {
        const main = this;
        d3.queue()
        .defer(d3.json, './data/Average-prices-2017-06.json')
        .defer(d3.json, './data/rents-consolid-with-avgs.json')
        .await(function(error, data, data2){
            if (error) throw error;

            var postcode = main.props.postcode;
            console.log(postcode);

            var avg_rent = data2.filter(function(obj){
                return obj.area === postcode.substring(0,2).toUpperCase();
            })

            main.getAvgRent(avg_rent[0].avg);

            var parseTime = d3.timeParse("%Y-%m-%d")
            // two sets of data
            var localHousePriceInfo = data.filter(function(obj){
                return obj.Area_Code === main.props.area_code;
            });

            var ukHousePriceInfo = data.filter(function(obj){
                return obj.Area_Code === 'K02000001' && obj.Date >= '1995-02-01';
            });

            console.log(ukHousePriceInfo[1]);

            // passing information back to parent
            var localLength = localHousePriceInfo.length;
            var ukLength = ukHousePriceInfo.length;
            main.higherOrLower(+localHousePriceInfo[localLength-1].Average_Price, +ukHousePriceInfo[ukLength-1].Average_Price);
            main.getHousePrice(+localHousePriceInfo[localLength-1].Average_Price);

            // getting & setting some measurements
            var margin = {top:20, right:20, bottom:30, left:50},
            width = document.querySelector('.housing-vis').clientWidth - margin.left - margin.right,
            height = document.querySelector('.housing-vis').clientHeight - margin.top - margin.bottom;

            context.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // drawing the graph
            
            var x = d3.scaleTime()
                .rangeRound([0, width]);
            
            var y = d3.scaleLinear()
                .rangeRound([height,0]);
    
            var line = d3.line()
                .x(function(d) { return x(parseTime(d.Date)); })
                .y(function(d) { return y(+d.Average_Price); });
    
            x.domain(d3.extent(localHousePriceInfo, function(d) { return parseTime(d.Date); }));
            y.domain(d3.extent([...ukHousePriceInfo, ...localHousePriceInfo], function(d) { return +d.Average_Price; }));
            
            var bars = context.append('g')
                .attr('class', 'bars');
            
            var bar = bars.selectAll('.bar')
                .data(localHousePriceInfo);

            bar
                .enter()
                .append('rect')
                .attr('class', function(d) { return 'bar ' + 'x' + d.Date; })
                .attr('x', function(d) { return x(parseTime(d.Date)); })
                .attr('y', 0)
                .attr('width', width/150)
                .attr('height', height)
                .attr('fill', 'rgba(10,10,10,0)')
                .attr('opacity', 0)
                .on('mouseover', barOnHover)
                .on('mouseout', barOffHover);

            var circles = context.append('g')
                .attr('class', 'circles');

            var circle = circles.selectAll('.circle')
                .data([...localHousePriceInfo, ...ukHousePriceInfo]);
            
            circle
                .enter()
                .append('circle')
                .attr('class', function(d) { return 'circle ' + 'x' + d.Date; })
                .attr('r', '5px')
                .attr('cx', function(d) { return x(parseTime(d.Date)); })
                .attr('cy', function(d){ return y(+d.Average_Price); })
                .attr('fill', function(d) {
                    if (d.Region_Name == 'United Kingdom') {
                        return 'steelblue';
                    } else {
                        return 'red';
                    }
                })
                .attr('opacity', 0)
                .on('mouseover', barOnHover)
                .on('mouseout', barOffHover);

            

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

            

            function barOnHover(e) {
                var selection = '.' + this.classList[1];
                d3.selectAll(selection).attr('opacity', 1);
            }

            function barOffHover(e) {
                var selection = '.' + this.classList[1];
                d3.selectAll(selection).attr('opacity', 0);
            }
        })
    }

    render() {
        return (
            <div ref="vis"></div>
        )
    }
}

export default Vis;