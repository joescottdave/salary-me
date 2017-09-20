import React from 'react';
import * as d3 from 'd3';

class IncomesVis extends React.Component {
    constructor(props) {
        super(props)
        this.setState = {salary: props.salary,
        width: props.width}
    }

    handleIncomeInfo(info) {
        this.props.handleIncomeInfo(info);
    }

    componentDidMount(){
        const context = this.setContext();
        this.drawIncomeGraph();
    }

    setContext() {
        var detectWidth = document.querySelector('.Container').clientWidth;
        var width = detectWidth > 375 ? d3.min([650, detectWidth]) : 375,
        height = width * (3/4);

        return d3.select(this.refs.incomesVis).append('svg')
           .attr('class', 'incomes-vis')
           .attr('height', height )
           .attr('width', width )
           .append('g')
           .attr('class','incomes-vis-g');
    }

    drawIncomeGraph() {
        const main = this;
        const salary = main.props.salary;
        const context = d3.select('.incomes-vis-g');

        var contextwidth = document.querySelector('.incomes-vis').clientWidth;

        d3.queue()
            .defer(d3.json, './data/beforetaxincomepercentiles.json')
            .defer(d3.json, './data/aftertaxincomepercentiles15-16.json')
            .await(function(error, data, data2) {
            
            var percent = function(salary) {
                var percent;
                var i;
                for(i=data.length-1; i>=0; i--){
                    if(data[i]['2014-15']<=salary){
                    percent = data[i]['Percentile']
                    break
                    } else {
                    percent = 0
                    }
                }

                return percent
            }

            main.handleIncomeInfo(percent(salary));

            var margin = {top: 20, left: 70, right: 20, bottom: 30 },
                width = contextwidth - margin.left - margin.right,
                height = contextwidth*(3/4) - margin.top - margin.bottom;

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
                .call(d3.axisLeft(y).tickValues([data[32]['2014-15'],data[65]['2014-15'],data2[98]['2014-15'],data[98]['2014-15']]))
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
                .attr("stroke-width", 0.5)
                .attr('d', drawline );
            
            context.append('path')
                .datum(data2)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 0.5)
                .attr('d', drawline );

            
                
            var pm = context.append('g')
                .attr('class', 'pm');

            pm.append('path')
                .attr('class', 'pm-line')
                .attr('d', function(d){ return 'M' + x(percent(150402)) + ' ' + height + 'V ' + y(150402) ; })
                .attr('fill', 'red')
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', '2px');

            pm.append('text')
                .attr('class', 'pm-text')
                .attr('x', x(percent(150402)) - margin.right - 95 )
                .attr('y', y(150402) + 15)
                .attr('fill', 'rgba(0,0,0,0.5)')
                .text('Prime Minister');

            var nurse = context.append('g')
                .attr('class', 'nurse');

            nurse.append('path')
                .attr('class', 'nurse-line')
                .attr('d', function(d){ return 'M' + x(percent(22128)) + ' ' + height + 'V ' + y(22128) ; })
                .attr('fill', 'red')
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', '2px');

            nurse.append('text')
                .attr('class', 'nurse-text')
                .attr('x', x(percent(22128)) - 50)
                .attr('y', y(22128) + 25)
                .attr('fill', 'rgba(0,0,0,0.5)')
                .text('Nurse');

            var doctor = context.append('g')
                .attr('class', 'doctor');

            doctor.append('path')
                .attr('class', 'doctor-line')
                .attr('d', function(d){ return 'M' + x(percent(22636)) + ' ' + height + 'V ' + y(22636) ; })
                .attr('fill', 'red')
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', '2px');

            doctor.append('text')
                .attr('class', 'doctor-text')
                .attr('x', x(percent(22636)) + 5)
                .attr('y', y(22636) + 25)
                .attr('fill', 'rgba(0,0,0,0.5)')
                .text('Junior Doctor');
            
            var mw = context.append('g')
                .attr('class', 'mw');

            mw.append('path')
                .attr('class', 'mw-line')
                .attr('d', function(d){ return 'M' + x(percent(13650)) + ' ' + height + 'V ' + y(13650); })
                .attr('fill', 'red')
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', '2px');

            mw.append('text')
                .attr('class', 'mw-text')
                .attr('x', x(percent(13650)) -75)
                .attr('y', y(13650) - 8)
                .attr('fill', 'rgba(0,0,0,0.5)')
                .text('National Living Wage');
            
            if (salary >= 10300) {
            var you = context.append('g')
                .attr('class', 'you');

            you.append('path')
                .attr('class', 'you-line')
                .attr('d', function(d){ return 'M' + x(percent(salary)) + ' ' + height + 'V' + y(salary) ; })
                .attr('fill', 'red')
                .attr('stroke', 'black')
                .attr('stroke-width', '2px');
            
            you.append('text')
                .attr('class', 'you-text')
                .attr('x', x(percent(salary)) + 5 )
                .attr('y', y(salary) + 20)
                .attr('fill', 'black')
                .text('You');
            }
            });
    }

    render() {
        return (
            <div ref='incomesVis'></div>
        )
    }
}

export default IncomesVis;