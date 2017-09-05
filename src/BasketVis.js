import React from 'react';
import * as d3 from 'd3';

class BasketVis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { monthly: props.monthly }
    }

    componentDidMount() {
        const context = this.setContext();
        this.drawBasket();
    }

    setContext() {
        d3.select(this.refs.basketVis).append('svg')
            .attr('class', 'basket-vis')
            .attr('height', '300px')
            .attr('width', '480px')
            .append('g')
            .attr('class','basket-vis-g');
    }

    drawBasket(context) {
        const main = this;
        var width = 480,
        height = 300;

        var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
            color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
            format = d3.format(",d");

        var treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(1);
        

        d3.json("./data/cpih.json", function(error, data){
            if (error) throw error;

            var root = d3.hierarchy(data)
                .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
                .sum(function(d){ return d.size; })
                .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

            treemap(root);

            var cell = d3.select('.basket-vis-g').selectAll("g")
                .data(root.leaves())
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

            cell.append("rect")
                .attr("id", function(d) { return d.data.id; })
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { return color(d.parent.data.id); });

            cell.append("clipPath")
                .attr("id", function(d) { return "clip-" + d.data.id; })
                .append("use")
                .attr("xlink:href", function(d) { return "#" + d.data.id; });

            cell.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
                .selectAll("tspan")
                .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
                .enter().append("tspan")
                .attr("x", 4)
                .attr("y", function(d, i) { return 13 + i * 10; })
                .text(function(d) { return d; });

            cell.append("title")
                .text(function(d) { return d.data.id + "\n" + format(d.value); });

            })
    }

    render() {
        return (
            <div ref="basketVis"></div>
        )
    }
}

export default BasketVis;