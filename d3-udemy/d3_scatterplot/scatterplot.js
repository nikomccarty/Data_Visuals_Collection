var data = [
  [10, 200],
  [210, 140],
  [222, 300],
  [70, 160],
  [250, 60],
  [90, 220],
  [110, 310]
];

var chart_width = 800;
var chart_height = 400;

//First, I will try to make a scatterplot on my own (no help)

//Create SVG element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//Create circles that are bound to my data.
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    return d[0];
  })
  .attr('cy', function(d){
    return chart_height - d[1];
  })
  .attr('r', 10);

  // Now I am watching the video...I will add any alterations here.
  // No changes to note. Except, I need to add labels.

  // Create labels
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('font-size', 14)
  .text(function(d){
    return d.join( ',');
  })
  .attr('x', function(d){
    return d[0] + 13;
  })
  .attr('y', function(d){
    return chart_height - d[1];
  });
