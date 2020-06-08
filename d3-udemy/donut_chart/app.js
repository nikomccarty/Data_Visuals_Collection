// Data
var data            =   [ 25, 25, 25, 25, 19, 6];
var chart_width     =   600;
var chart_height    =   600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Pie variable using d3.pie
var pie = d3.pie();

// Arc variable
var outer_radius = chart_width / 2;
var inner_radius = 180;

var arc = d3.arc()
            .innerRadius(inner_radius)
            .outerRadius(outer_radius);

var svg = d3.select('#chart')
            .append('svg')
            .attr('height', chart_height)
            .attr('width', chart_width);

// Groups
var arcs = svg.selectAll('g.arc')
              .data(pie(data))
              .enter()
              .append('g')
              .classed('arc', true)
              .attr('transform',
                "translate(" + outer_radius + "," + chart_height / 2 + ")"
              );

arcs.append('path')
    .attr('fill', function(d, i){
      return color(i);
    })
    .attr('d', arc);

// Labels
arcs.append('text')
    .attr('transform', function(d,i){
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr('text-anchor', 'text-middle')
    .text(function(d){
      return d.value;
    });
