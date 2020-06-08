// Data
var data            =   [ 25, 25, 25, 25, 19, 6];
var chart_width     =   600;
var chart_height    =   600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Pie variable using d3.pie
var pie = d3.pie();

// Arc variables
var outer_radius = chart_width / 2;
var inner_radius = 180;

// Set up arc, with an inner and outer radius.
var arc = d3.arc()
            .innerRadius(inner_radius)
            .outerRadius(outer_radius);

// Append the svg to our div tag, as usual.
var svg = d3.select('#chart')
            .append('svg')
            .attr('height', chart_height)
            .attr('width', chart_width);

// Prepare to draw arcs, by using the select / data / enter / append stream.
var arcs = svg.selectAll('g.arc')
              .data(pie(data))
              .enter()
              .append('g')
              .classed('arc', true)
              .attr('transform',
                "translate(" + outer_radius + "," + chart_height / 2 + ")"
              );

// Draw the actual arcs.
arcs.append('path')
    .attr('fill', function(d, i){
      return color(i);
    })
    .attr('d', arc);

// Add labels
arcs.append('text')
    .attr('transform', function(d,i){
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr('text-anchor', 'text-middle')
    .text(function(d){
      return d.value;
    });
