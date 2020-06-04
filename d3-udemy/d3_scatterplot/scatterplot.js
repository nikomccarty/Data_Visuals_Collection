var data = [];

for (var i = 0; i < 30; i++){
  // alternatively, we could round number to the nearest integer. (Math.round)
  var num = Math.floor(d3.randomUniform(1,50)());
  data.push(num);
}

// console.log(data);

var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;

// Create svg element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

//Bind data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i){
      return i * (chart_width/data.length); // the first value has index, i, of 0, then 30, etc.
    })
    .attr('y', function(d){
      return chart_height - d;
    })
    .attr('width', chart_width/data.length - bar_padding)
    .attr('height', function(d){
      return d;
    })
    .attr('fill', '#7ED26D');

// Create labels for chart
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d){
      return d;
    })
    .attr('x', function(d, i){
      return i * (chart_width/data.length) +
                 (chart_width/data.length - bar_padding) / 2
    })
    .attr('y', function(d){
      return chart_height + 15 - d;
    })
    .attr("font-size", 14)
    .attr("fill", '#fff')
    .attr('text-anchor', 'middle');
