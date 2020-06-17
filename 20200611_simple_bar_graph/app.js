// var data = Array.from({length: 10}, () => Math.floor(Math.random() * 50));
// d3.csv('alphabet.csv', d3.autoType).then(function(data) {
//   data.forEach(function(d) {
//     d.letter = d.letter;
//     d.frequency = +d.frequency;
//   });
//   console.log(data);
// });

//var data = d3.csv('alphabet.csv', d3.autoType);

var data = [15, 20, 30, 40, 50]

var w =  800;
var h = 400;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});
var padding = 20;

var y = d3.scaleLinear()
     .domain([0, d3.max(data)])
     .range([0, h - padding]);

var x = d3.scaleBand()
     .domain(d3.range(data.length))
     .range([padding, w - padding])
     .round(true)
     .padding(0.1);

var svg = d3.select('#chart')
     .append('svg')
     .attr('width', w - padding)
     .attr('height', h - padding);

var yAxis = d3.scaleLinear()
     .domain([0, d3.max(data)])
     .range([h - padding, padding]);

svg.append('g')
  .attr('transform', 'translate(' + (padding + 10)  + ', 0)')
  .call(d3.axisLeft(yAxis))

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d,i) => x(i) + padding)
  .attr('y', d => h - y(d) - padding)
  .attr('width', x.bandwidth())
  .attr('height', d => y(d))
  .attr('fill', function(d){
    return 'rgb(0, 0, ' + Math.round(d*10) + ')';
  });

svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d,i) => x(i) + x.bandwidth() / 2)
  .attr('y', d => h - y(d) + 15)
  .attr('text-anchor', 'middle');
