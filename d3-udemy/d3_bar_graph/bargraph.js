var data = [1,5,2,3,2,1,23,42,23,1,23,42,23,53,64,43];

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
