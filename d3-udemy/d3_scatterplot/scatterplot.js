var data = [
  [10, 100],
  [210, 140],
  [222, 300],
  [70, 160],
  [250, 60],
  [90, 220],
  [110, 310]
];

var chart_width = 600;
var chart_height = 300;
var padding = 20;

//First, I will try to make a scatterplot on my own (no help)

//Create SVG element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Create Scales
var x_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d[0];
                })])
                .range([ padding, chart_width - padding * 2 ])
                .nice();

var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d[1];
                })])
                .range([chart_height-padding, padding]);

                //rangeRound() rounds to nearest number.

var r_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d[1];
                })])
                .range([5, 15]);

// Log scale for the area of circles on page.
var a_scale = d3.scaleSqrt()
                .domain([0, d3.max(data, function(d){
                    return d[1];
                })])
                .range([0, 15]);

//Create circles that are bound to my data.
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    return x_scale(d[0]);
  })
  .attr('cy', function(d){
    return y_scale(d[1]);
  })
  .attr('r', function(d){
    return a_scale(d[1]);
  })
  .attr('fill', 'lightblue');


  // Create labels
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('font-size', 14)
  .text(function(d){
    return d.join(',');
  })
  .attr('x', function(d){
    return x_scale(d[0]) - 20;
  })
  .attr('y', function(d){
    return y_scale(d[1]);
  });
