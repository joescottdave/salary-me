import React, { Component } from 'react'
import * as d3 from 'd3'

class PieVis extends Component {
  componentDidMount() {
    const context = this.setContext()
    this.drawPie(context)
  }

  setContext() {
    var detectWidth = document.querySelector('.Card').clientWidth
    var width = detectWidth * (9 / 10),
      // detectWidth > 375 ? d3.min([650, detectWidth]) : 338,
      height = width * (3 / 4)

    return d3
      .select(this.refs.PieVis)
      .append('svg')
      .attr('class', 'pie-vis')
      .attr('height', height)
      .attr('width', width)
  }

  drawPie(context) {
    const main = this
    var svg = d3.select('.pie-vis')

    var height = +svg.attr('height') * (9 / 10),
      width = +svg.attr('width') * (9 / 10),
      radius = Math.min(width, height) / 2

    var g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    var color = d3.scaleOrdinal(['#ffad64', '#0081d9', '#f14f80'])

    var pie = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.value
      })

    var path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - radius / 2)

    var label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40)

    var data = [
      { name: 'Income Tax', value: main.props.tax / 12 },
      { name: 'National Insurance', value: main.props.contribution / 12 },
      { name: 'Take Home', value: main.props.takehome }
    ]

    var arc = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    arc
      .append('path')
      .attr('d', path)
      .attr('stroke', 'snow')
      .attr('stroke-width', '3px')
      .attr('fill', function(d, i) {
        return color(i)
      })
      .on('mouseover', hoverPie)
      .on('mouseout', offHoverPie)

    var pieText = arc
      .append('text')
      .attr('class', 'pie-text')
      .text('Paycheque')

    var pietextrect = document
      .querySelector('.pie-text')
      .getBoundingClientRect()

    pieText.attr('transform', 'translate(' + -pietextrect.width / 2 + ',0)')

    function hoverPie(d) {
      var text = d.data.name
      var textcolor = color(d.index)
      d3.select(this).attr('stroke', textcolor)
      pieText.remove()
      pieText = g
        .append('text')
        .attr('class', 'pie-text')
        .attr('fill', textcolor)
        .text(text)
      var pietextrect = document
        .querySelector('.pie-text')
        .getBoundingClientRect()
      pieText.attr('transform', 'translate(' + -pietextrect.width / 2 + ',0)')
    }

    function offHoverPie(d) {
      d3.select(this).attr('stroke', 'snow')
      pieText.remove()
      pieText = g
        .append('text')
        .attr('class', 'pie-text')
        .attr('fill', 'black')
        .text('Paycheque')
      var pietextrect = document
        .querySelector('.pie-text')
        .getBoundingClientRect()
      pieText.attr('transform', 'translate(' + -pietextrect.width / 2 + ',0)')
    }
  }

  render() {
    return <div ref="PieVis"></div>
  }
}

export default PieVis
