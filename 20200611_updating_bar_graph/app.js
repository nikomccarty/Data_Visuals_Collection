// Goal: Make a bar chart from scratch. Then, I will figure out how to add transitions and animations to update / sort the data.

// Also add a nice title and legend and buttons for the sorting.
var w =  800;
var h = 400;
var padding = 10;

// Add svg element to #chart hold bar Chart
var svg = d3.select('#chart')
            .append('svg')
            .attr('viewBox', [0, 0, w, h]);

d3.csv('data.csv', function(d) {
  // set up scales
  var y_scale = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .rangeRound([0, h]);

  var x_scale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .rangeRound([0, w])
                  .paddingInner(0.05);

  // Set up x AND y axes
  var x_axis = d3.axisBottom()
                 .scale(x_scale);

  // Add rectangles to the page
  svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('width', x_scale.bandwidth())
     .attr('height', function(d){
       return y_scale(d);
     })
     .attr('x', function(d, i){
       return x_scale(i);
     })
     .attr('y', function(d){
       return h - y_scale(d);
     });

  svg.append('g')
     .attr('class', 'x-axis')
     .call(x_axis)
     .attr('transform', 'translate(0, 100)');
});
// Set up scales
