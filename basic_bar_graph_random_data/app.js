
var data = [10, 20, 30, 21, 40, 22, 42, 49, 7];

var w =  800;
var h = 400;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});
var padding = 20;

var y = d3.scaleLinear()
     .domain([0, d3.max(data)])
     .range([h - margin.bottom, margin.top]);

var x = d3.scaleBand()
     .domain(d3.range(data.length))
     .rangeRound([margin.left, w - margin.right])
     .paddingInner(0.05);

var svg = d3.select('#chart')
     .append('svg')
     .attr('width', w )
     .attr('height', h );

var yTitle = g => g.append('text')
     .attr('font-family', 'sans-serif')
     .attr('font-size', 10)
     .attr('y', 10)
     .text('↑ Value');

var yAxis = g => g
     .attr('transform', 'translate(' + margin.left + ')')
     .call(d3.axisLeft(y))
     .call(g => g.select(".domain").remove());

var bar = svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('x', (d, i) => x(i))
     .attr('y', d => y(d))
     .attr('width', x.bandwidth())
     .attr('height', d => y(0) - y(d))
     .attr('fill', 'steelblue');

svg.append('g')
     .call(yAxis);

svg.append('g')
     .call(yTitle);

// DONE WITH BASIC BAR GRAPH (CODE ABOVE)

// ADDED FUNCTIONALITY BELOW

d3.select('.ascending')
  .on('click', function() {

    var dataset = data.sort(d3.ascending);

    svg.selectAll('rect')
       .data(dataset)
       .transition()
       .delay(function(d, i) {
         return i * 50;
       })
       .attr('x', (d, i) => x(i))
       .attr('y', d => y(d))
       .attr('width', x.bandwidth())
       .attr('height', d => y(0) - y(d));
  });

d3.select('.descending')
  .on('click', function() {

    var dataset = data.sort(d3.descending);

    svg.selectAll('rect')
       .data(dataset)
       .transition()
       .delay(function(d, i) {
         return i * 50;
       })
       .attr('x', (d, i) => x(i))
       .attr('y', d => y(d))
       .attr('width', x.bandwidth())
       .attr('height', d => y(0) - y(d));
  });

d3.select('.randomize')
  .on('click', function() {

    var randData = d3.range(10).map(function() {
		    return Math.floor(Math.random() * 50) + 1;
    });

    svg.selectAll('rect')
       .data(randData)
       .transition()
       .delay(function(d, i) {
         return i * 50;
       })
       .attr('x', (d, i) => x(i))
       .attr('y', d => y(d))
       .attr('width', x.bandwidth())
       .attr('height', d => y(0) - y(d))
       .attr('fill', function(d) {
         return '#'+Math.floor(Math.random() * 16777215).toString(16);
       });
  });
