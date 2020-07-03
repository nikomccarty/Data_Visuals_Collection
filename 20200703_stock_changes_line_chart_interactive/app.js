// OBJECTIVES
// DONE Make a simple scatterplot using the iris.csv dataset. Start with just the petal length and width.
// DONE Color each point based on the species
// DONE Add clip path so that dots do not lie outside of chart view.
// Add x and y-axis labels that look nice
// Add an interactive option for the user to plot, instead, sepal length and width for each species.
// Add buttons or a dropdown to display only one species, or two species, or all three, at a time.

var w =  800;
var h = 400;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});
var padding = 20;
const color = d3.scaleOrdinal(d3.schemeCategory10);

d3.csv('iris.csv', d3.autoType)
  .then(function(data) {

    var y = d3.scaleLinear()
         .domain(d3.extent(data, d => d.petal_length))
         .range([h - margin.bottom, margin.top]);

    var x = d3.scaleLinear()
         .domain(d3.extent(data, d => d.petal_width))
         .range([margin.left, w - margin.right]);

    var svg = d3.select('#chart')
         .append('svg')
         .attr('width', w )
         .attr('height', h );

    const g = d3.select('svg').append('g');

    var xAxis = d3.axisBottom()
         .scale(x)
         .ticks(5);

    var yAxis = d3.axisLeft()
         .scale(y)
         .ticks(5);

    svg.append('g')
         .attr('class', 'axis')
         .attr('transform', 'translate(' + margin.left + ',0)')
         .call(yAxis);

    svg.append('g')
         .attr('class', 'axis')
         .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
         .call(xAxis);

     var clip = svg.append("clipPath")
          .attr("id", "chart-area")
          .append("rect")
          .attr("id", "clip-rect")
          .attr("x", margin.left)
          .attr("y", margin.top)
          .attr('width', w - margin.left - margin.right)
          .attr('height', h - margin.top - margin.bottom);

    const circle = svg.append('g')
         .attr('id', 'circles')
         .attr('clip-path', 'url(#chart-area)')
         .selectAll('circle')
         .data(data)
         .enter()
         .append('circle')
         .attr('r', 5)
         .attr('cx', d => x(d.petal_width))
         .attr('cy', d => y(d.petal_length))
         .attr('fill', d => color(d.species));

    svg.append('text')
         .attr('text-anchor', 'middle')
         .attr('transform', 'translate(' + (w / 2) + ',' + (h - 5) + ')')
         .text('Petal Length (in)')
         .style('font-size', 16);

    svg.append('text')
         .attr('text-anchor', 'middle')
         .attr('transform', 'translate(18,' +  (h / 2) + ')rotate(-90)')
         .text('Petal Width (in)')
         .style('font-size', 16);


  })
  .catch(function(error){
     console.log('There is an error with the data.')
  });




// svg.selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(d => d)
//   .attr('x', (d,i) => x(i) + x.bandwidth() / 2)
//   .attr('y', d => h - y(d) + 15)
//   .attr('text-anchor', 'middle');
