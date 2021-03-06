import React from 'react';
import * as d3 from 'd3';
import './BasketVis.css';

class BasketVis extends React.Component {
    componentDidMount() {
        const context = this.setContext();
        this.drawBasket();
    }

    setContext() {
        var detectWidth = document.querySelector('.Card').clientWidth;
        var width = detectWidth * (9/10),
        // detectWidth > 375 ? d3.min([650, detectWidth]) : 350,
        height = width * (3/4);

        d3.select(this.refs.basketVis).append('svg')
            .attr('class', 'basket-vis')
            .attr('height', height)
            .attr('width', width)
            .append('g')
            .attr('class','basket-vis-g');
    }

    drawBasket(context) {
        const main = this;
        var width = document.querySelector('.basket-vis').clientWidth,
        height = width * (3/4);

        var colorMixer = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
            color = d3.scaleOrdinal(d3.schemeCategory20.map(colorMixer)),
            format = d3.format(",d");

        var treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(1);

        function updateBasket(e) {
            var filepath = "./data/cpih/" + e.data.name + '.json'
            d3.json(filepath, function(error, data) {
                if (error) throw error;

                var root = d3.hierarchy(data)
                .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
                .sum(function(d){ return d.value; })
                .sort(function(a, b) { return b.height - a.height || b.value - a.value; });             

                treemap(root);

                d3.select('.basket-vis-g').selectAll('*').remove();

                var cell = d3.select('.basket-vis-g').selectAll(".box")
                    .data(root.leaves())
                    .enter().append("g")
                    .attr('class', 'box')
                    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

                cell.append("rect")
                    .attr("id", function(d) { return d.data.id; })
                    .attr("width", function(d) { return d.x1 - d.x0; })
                    .attr("height", function(d) { return d.y1 - d.y0; })
                    .attr("fill", color(e.data.id) )
                    .on('click', resetBasket) 
                    .on('mouseover', hoverBasket)
                    .on('mouseout', offHoverBasket);
    
                cell.append("clipPath")
                    .attr("id", function(d) { return "clip-" + d.data.id; })
                    .append("use")
                    .attr("xlink:href", function(d) { return "#" + d.data.id; });
    
                cell.append("text")
                    .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
                    .selectAll("tspan")
                    .data(function(d) { return d.data.name.substr(d.data.name.indexOf(' ')+1).split(/(?=[A-Z][^A-Z])/g); })
                    .enter().append("tspan")
                    .attr("x", 4)
                    .attr("y", function(d, i) { return 13 + i * 10; })
                    .text(function(d) { return d; });
    
                cell.append("title")
                    .text(function(d) { return d.data.name.substr(d.data.name.indexOf(' ')+1); });
            });
        }

        function resetBasket() {
            var filepath = "./data/cpih-copy.json";
            d3.json(filepath, function(error, data) {
                if (error) throw error;

                var root = d3.hierarchy(data)
                .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
                .sum(function(d){ return d.value; })
                .sort(function(a, b) { return b.height - a.height || b.value - a.value; });             

                treemap(root);

                d3.select('.basket-vis-g').selectAll('*').remove();

                var cell = d3.select('.basket-vis-g').selectAll(".box")
                    .data(root.leaves())
                    .enter().append("g")
                    .attr('class', 'box')
                    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

                cell.append("rect")
                    .attr("id", function(d) { return d.data.id; })
                    .attr("width", function(d) { return d.x1 - d.x0; })
                    .attr("height", function(d) { return d.y1 - d.y0; })
                    .attr("fill", function(d) { return color(d.data.id); })
                    .on('click', updateBasket) 
                    .on('mouseover', hoverBasket)
                    .on('mouseout', offHoverBasket);
    
                cell.append("clipPath")
                    .attr("id", function(d) { return "clip-" + d.data.id; })
                    .append("use")
                    .attr("xlink:href", function(d) { return "#" + d.data.id; });
    
                cell.append("text")
                    .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
                    .selectAll("tspan")
                    .data(function(d) { return d.data.name.substr(d.data.name.indexOf(' ')+1).split(/(?=[A-Z][^A-Z])/g); })
                    .enter().append("tspan")
                    .attr("x", 4)
                    .attr("y", function(d, i) { return 13 + i * 10; })
                    .text(function(d) { return d; });
    
                cell.append("title")
                    .text(function(d) { return d.data.name.substr(d.data.name.indexOf(' ')+1); });
            });
        }

        function hoverBasket(e) {
            d3.select(this).attr('stroke', 'black').attr('stroke-width', '1px');
        }

        function offHoverBasket(e) {
            d3.select(this).attr('stroke', 'snow').attr('stroke-width', '1px');
        }

        resetBasket();
    }

    render() {
        return (
            <div ref="basketVis"></div>
        )
    }
}

export default BasketVis;