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

var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

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
