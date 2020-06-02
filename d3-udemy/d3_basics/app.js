var dataset = [10, 20, 30, 40, 50];

var el = d3.select('body')
    .selectAll('p')
      .data(dataset)
      .enter()
      .append('p')
      .text(function(d) {
        return 'This paragraph is bound to the number ' + d;})
      .style('color', function(d){
        if (d > 25){
          return 'red';
        } else {
          return 'blue';
        }})
      .classed('foo', function(d){
        if (d > 25){
          return false;
        } else {
          return true;
        }
      });

  // .append('p')
  //   .attr('class', 'foo')
  //   .classed('foo', true)
  //   .classed('bar', true)
  //   .text('Hello World!')
  //   .style('color', 'blue');

console.log(el);
