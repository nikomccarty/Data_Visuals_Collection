// Scatterplot with TIMES on the x-axis.
// dates in data will need to be parsed / converted into a 'date' object.
var data = [
  {date: '07/01/2017', num: 20},
  {date: '07/02/2017', num: 25},
  {date: '07/03/2017', num: 29},
  {date: '07/04/2017', num: 43},
  {date: '07/05/2017', num: 37},
  {date: '07/06/2017', num: 27},
  {date: '07/07/2017', num: 24},
  {date: '07/08/2017', num: 23},
  {date: '07/09/2017', num: 32},
  {date: '07/20/2017', num: 37}
];

var time_parse = d3.timeParse('%m/%d/%Y');
var time_format = d3.timeFormat('%b %e');

//Loop through each date using time_parse().
data.forEach(function(e, i){
  data[i].date = time_parse(e.date);
});

var chart_width = 600;
var chart_height = 300;
var padding = 20;

//Create SVG element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Create Scales
var x_scale = d3.scaleTime()
                .domain([d3.min(data, function(d){
                  return d.date;
                }), d3.max(data, function(d){
                  return d.date;
                })])
                .range([ padding, chart_width - padding * 2 ]);

var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d.num;
                })])
                .range([chart_height-padding, padding]);

// Log scale for the area of circles on page.
var a_scale = d3.scaleSqrt()
                .domain([0, d3.max(data, function(d){
                    return d.num;
                })])
                .range([0, 10]);

//Create circles that are bound to my data.
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    return x_scale(d.date);
  })
  .attr('cy', function(d){
    return y_scale(d.num);
  })
  .attr('r', function(d){
    return a_scale(d.num);
  })
  .attr('fill', 'lightblue');


  // Create labels
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('font-size', 14)
  .text(function(d){
    return time_format(d.date);
  })
  .attr('x', function(d){
    return x_scale(d.date);
  })
  .attr('y', function(d){
    return y_scale(d.num);
  });
