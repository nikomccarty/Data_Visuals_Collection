var dataset = [10, 20, 30, 40, 50];

var el = d3.select('body')
    .selectAll('p')
      .data(dataset)
      .enter()
      .append('p')
      .text('Hahahahaha world')

  // .append('p')
  //   .attr('class', 'foo')
  //   .classed('foo', true)
  //   .classed('bar', true)
  //   .text('Hello World!')
  //   .style('color', 'blue');

console.log(el);
