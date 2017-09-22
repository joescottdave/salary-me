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
        height = width * (3/4) + 50;

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
            .await(function(error, data) {
            
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

            var margin = {top: 20, left: 45, right: 20, bottom: 30 },
                width = contextwidth - margin.left - margin.right,
                height = contextwidth*(3/4) - margin.top - margin.bottom;

            context.attr("transform", "translate(" + margin.left + "," + margin.top +")")

            var color = d3.scaleThreshold()
                .domain([34,67])
                .range(['#ffad64', '#0081d9', '#f14f80' ]);

            var x = d3.scaleLinear()
                .domain([0,100])
                .rangeRound([0,width]);

            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ return d['2014-15']; })])
                .rangeRound([height,0]);

            var band = d3.scaleBand()
                .domain(data.map(function(d) {
                    return d['Percentile'];
                }))
                .range([0, width]);


            context.append("g").attr("class", "bottom-axis")
                .attr("transform", "translate(0," + height +")")
                .call(d3.axisBottom(x).tickArguments([10]))
                .append('text')
                .attr('fill', '#000')
                .attr('x', width)
                .attr('y', 20)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Income Taxpayers by Percentile');

            context.append("g").attr("class", "left-axis")
                .call(d3.axisLeft(y).tickValues([data[32]['2014-15'],data[65]['2014-15'],data[98]['2014-15']]))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Annual Income (£)");

            var hoz_lines = context.append('g')
                .attr('class', 'hoz_lines');

            var hoz_line = hoz_lines.selectAll('.hoz_line')
                .data([17400,29000,162000])
                .enter().append('line')
                .attr('class', 'hoz_line')
                .attr('x1', x(0))
                .attr('x2', function(d) { return x(percent(d)); } )
                .attr('y1', function(d) { return y(d); })
                .attr('y2', function(d) { return y(d); })
                .attr('stroke', 'gray')
                .attr('stroke-width', '0.5px');              

            var linemarks = context.append('g')
                .attr('class', 'linemarks');
            
            var linemark = linemarks.selectAll('.linemark')
                .data(data);

            linemark
                .enter()
                .append('rect')
                .attr('class', 'linemark')
                .attr('x', function(d) { return x(d['Percentile']); })
                .attr('width', band.bandwidth()/2)
                .attr('height', function(d) { return height - y(d['2014-15']) })
                .attr('y', function(d) { return y(d['2014-15']); })
                .attr('fill', function(d) { return color(d['Percentile']); })
                .attr('opacity', 1);

            // var textmarks = context.append('g')
            //     .attr('class', 'textmarks')


            context.append('text')
                .attr('class', 'textmark-you')
                .attr('fill', color(percent(salary)))
                .attr('text-anchor', function() {
                    if (percent(salary) >= 33 && percent(salary) <= 48 || percent(salary) > 81) {
                        return "end";
                    } else {
                        return "start";
                    }
                })
                // .attr('transform', 'rotate(-90)')
                .attr('x', x(percent(salary)))
                .attr('y', y(salary) - 25)
                .text('You');

            context.append('line')
                .attr('x1', x(percent(salary)))
                .attr('x2', x(percent(salary)) + 3)
                .attr('y1', y(salary) - 2)
                .attr('y2', y(salary) - 20)
                .attr('stroke', color(percent(salary)))
                .attr('stroke-width', "1px");

            context.append('text')
                .attr('class', 'textmark-nurse')
                .attr('fill', color(percent(22128)))
                .attr('text-anchor', 'end')
                .attr('x', x(percent(22128)))
                .attr('y', y(22128) - 40)
                .text('Nurse');
            
            context.append('line')
                .attr('x1', x(percent(22128)))
                .attr('x2', x(percent(22128)))
                .attr('y1', y(22128) - 2)
                .attr('y2', y(22128) - 35)
                .attr('stroke', color(percent(22128)))
                .attr('stroke-width', "1px");

            context.append('text')
                .attr('class', 'textmark-doctor')
                .attr('fill', color(percent(22636)))
                .attr('text-anchor', 'end')
                .attr('x', x(percent(22636)))
                .attr('y', y(22636) - 55)
                .text('Junior Doctor');
            
            context.append('line')
                .attr('x1', x(percent(22636)))
                .attr('x2', x(percent(22636)))
                .attr('y1', y(22636) - 2)
                .attr('y2', y(22636) - 54)
                .attr('stroke', color(percent(22636)))
                .attr('stroke-width', "1px");
            
            context.append('text')
                .attr('class', 'textmark-pm')
                .attr('fill', color(percent(150402)))
                .attr('text-anchor', 'end')
                .attr('x', x(percent(150402)))
                .attr('y', y(114000))
                .text('Prime Minister');

            context.append('line')
                .attr('x1', x(percent(13650)))
                .attr('x2', x(percent(13650)))
                .attr('y1', y(13650) - 2)
                .attr('y2', y(13650) - 98)
                .attr('stroke', color(percent(13650)))
                .attr('stroke-width', "1px");

            context.append('text')
                .attr('class', 'textmark-nlw')
                .attr('fill', color(percent(13650)))
                .attr('text-anchor', 'start')
                .attr('x', x(percent(13650)))
                .attr('y', y(13650) - 100)
                .text('National Living Wage');
            });
    }

    render() {
        return (
            <div ref='incomesVis'></div>
        )
    }
}

export default IncomesVis;