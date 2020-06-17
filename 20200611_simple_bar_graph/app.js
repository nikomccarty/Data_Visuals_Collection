// var data = Array.from({length: 10}, () => Math.floor(Math.random() * 50));
var rowConverter = function() {
  return {
    name: d.name,
    value: +d.value
  };
};

var data = d3.csvParse('data.csv').text(),

.then(function(d) {
  return {
    name: d.name,
    value: parseFloat(d.value)
  }
});

var w =  800;
var h = 400;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});

var yScale = d3.scaleLinear()
     .domain([0, d3.max(data)])
     .range([0, h-margin.top]);

var xScale = d3.scaleBand()
     .domain(d3.range(data.length))
     .range([0, w])
     .round(true)
     .padding(0.1);

var yAxis = d3.axisLeft()

var svg = d3.select('#chart')
     .append('svg')
     .attr('width', w)
     .attr('height', h);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function(d,i){
    return xScale(i);
  })
  .attr('y', function(d){
    return h - yScale(d);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function(d){
    return yScale(d);
  })
  .attr('fill', function(d){
    return 'rgb(0, 0, ' + Math.round(d*10) + ')';
  });

svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(function(d){
    return d;
  })
  .attr('x', function(d,i){
    return xScale(i) + 32;
  })
  .attr('y', function(d){
    return h - yScale(d) + 20;
  })
  .attr('text-anchor', 'middle');
