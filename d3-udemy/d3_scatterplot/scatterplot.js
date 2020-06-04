var data = [
  [50, 200],
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
                .range([ padding, chart_width - padding * 2 ]);

var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d[1];
                })])
                .range([padding, chart_height-padding]);

var r_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d[1];
                })])
                .range([5, 15]);

//Create circles that are bound to my data.
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    return x_scale(d[0]);
  })
  .attr('cy', function(d){
    return chart_height - y_scale(d[1]);
  })
  .attr('r', function(d){
    return r_scale(d[1]);
  })
  .attr('fill', '#A8E637');

  // Now I am watching the video...I will add any alterations here.
  // No changes to note. Except, I need to add labels.

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
    return chart_height - y_scale(d[1]);
  });
