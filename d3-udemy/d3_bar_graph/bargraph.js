var data = [];

for (var i = 0; i < 20; i++){
  // alternatively, we could round number to the nearest integer. (Math.round)
  var num = Math.floor(d3.randomUniform(1,50)());
  data.push(num);
}

// console.log(data);

// Create svg element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', 800)
    .attr('height', 400);

//Bind data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 25)
    .attr('height', 100);
