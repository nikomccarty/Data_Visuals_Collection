var data = [];

for (var i = 0; i < 20; i++){
  // alternatively, we could round number to the nearest integer. (Math.round)
  var num = Math.floor(d3.randomUniform(1,50)());
  data.push(num);
}

// console.log(data);

// add element inside div tag with the id "chart". We should generate five bars as well.
d3.select('#chart')
  .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .classed('bar', true)
    .style('height', function(d){
      var height = d * 3;
      return height + 'px';
    })
    .style('x', function(d){
      d + 50 + 'px';
    });
