import React from 'react';
import * as d3 from 'd3';

class IncomesVis extends React.Component {
    constructor(props) {
        super(props)
        this.setState = {monthly: props.monthly,
        width: props.width}
    }

    componentDidMount(){
        const context = this.setContext();
        this.drawIncomeGraph();
    }

    setContext() {
           d3.select(this.refs.incomesVis).append('svg')
           .attr('class', 'incomes-vis')
           .attr('height', 480*(3/4) )
           .attr('width', 480 )
           .append('g')
           .attr('class','incomes-vis-g');
    }

    drawIncomeGraph() {
        const main = this;
        const afterTaxSalary = main.props.monthly*12
        const context = d3.select('.incomes-vis-g');

        d3.json('./data/aftertaxincomepercentiles15-16.json', function(data) {
            var i;
            var percent = 0;
            for(i=data.length-1; i>0; i--){
                if(data[i]['2014-15']<afterTaxSalary){
                percent = data[i]['Percentile']
                break
                }
            }

            var margin = {top: 20, left: 70, right: 20, bottom: 30 },
                width = 480 - margin.left - margin.right,
                height = 480*(3/4) - margin.top - margin.bottom;

            context.attr("transform", "translate(" + margin.left + "," + margin.top +")")

            var x = d3.scaleLinear()
                .domain([1,99])
                .rangeRound([0,width]);

            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ return d['2014-15']; })])
                .rangeRound([height,0]);
            
            var drawline = d3.line()
                .x(function(d) { 
                    return x(d['Percentile'])
                    }
                )
                .y(function(d) {
                    return y(d['2014-15'])
                    }
                );

            context.append("g").attr("class", "bottom-axis")
                .attr("transform", "translate(0," + height +")")
                .call(d3.axisBottom(x).tickArguments([10]))
                .append('text')
                .attr('fill', '#000')
                .attr('x', width)
                .attr('y', 6-margin.top)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Income Taxpayers by Decile');

            context.append("g").attr("class", "left-axis")
                .call(d3.axisLeft(y).tickValues([data[32]['2014-15'],data[65]['2014-15'],data[98]['2014-15']]))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Annual Income (£)");

            context.append('path')
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr('d', drawline );

            context.append('g')
                .selectAll('.you')
                .data([afterTaxSalary])
                .enter().append('circle')
                .attr('class', 'you')
                .attr('cx', function(){ return x(percent); })
                .attr('cy', function(d){ return y(d); })
                .attr('r', 5)
                .attr('fill', 'red');
            
        });
    }

    render() {
        return (
            <div ref='incomesVis'></div>
        )
    }
}

export default IncomesVis;