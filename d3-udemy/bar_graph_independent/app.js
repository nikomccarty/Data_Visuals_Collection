data = [17, 34, 21, 41, 49, 32, 17, 24, 7, 3, 17, 32];

var chart_height = 400;
var chart_width = 600;
var padding = 0.05;

// Make a y-scale that is linear to make data reactive.
var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .rangeRound([0, chart_height]);

var y_axis = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .rangeRound([chart_height, 0]);

// For bar chart, I need to make a x_scale band.
var x_scale = d3.scaleBand()
                .domain(d3.range(data.length))
                .rangeRound([0, chart_width])
                .paddingInner(0.05);

// Make svg for the chart and append to my div.
var svg = d3.select('#chart')
            .append('svg')
            .attr('width', chart_width)
            .attr('height', chart_height);

// Add rectangles to the svg.
svg.selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
   .attr('x', function(d, i){
     return x_scale(i);
   })
   .attr('y', function(d){
     return chart_height - y_scale(d);
   })
   .attr('width', function(d){
     return x_scale.bandwidth();
   })
   .attr('height', function(d){
     return y_scale(d);
   });

// Add a y-axis to my plot.
svg.append('g')
   .attr('classed', 'y-axis')
   .attr('transform', 'translate(20, 0)')
   .call(d3.axisLeft(y_axis));

// Let's add labels to our bars.
svg.selectAll('text')
   .data(data)
   .enter()
   .append('text')
   .text(function(d){
     return d;
   })
   .style('fill', 'white')
   .style('font-size', '24px')
   .attr('x', function(d, i){
     return x_scale(i) + x_scale.bandwidth() / 2;
   })
   .attr('y', function(d){
     return chart_height - y_scale(d) + 22;
   })
   .attr('text-anchor', 'middle');
