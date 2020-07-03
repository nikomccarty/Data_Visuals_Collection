// OBJECTIVES
// Make a simple scatterplot using the iris.csv dataset. Start with just the petal length and width.
// Color each point based on the species
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

    // yTitle = g => g.append('text')
    //      .attr('font-family', 'sans-serif')
    //      .attr('font-size', 10)
    //      .attr('y', 10)
    //      .text('↑ Petal Length');
    //
    // xTitle = g => g.append('text')
    //      .attr('font-family', 'sans-serif')
    //      .attr('font-size', 10)
    //      .attr('x', w - margin.right)
    //      .text('↑ Petal Width');
    //

    //
    //

    const circle = svg.selectAll('circle')
         .data(data)
         .enter()
         .append('circle')
         .attr('r', 5)
         .attr('cx', d => x(d.petal_width))
         .attr('cy', d => y(d.petal_length))
         .attr('fill', d => color(d.species));

    // svg.append('g')
    //      .call(xAxis);
    //
    // svg.append('g')
    //      .call(yAxis);
    //
    svg.append('g')
         .call(yTitle);
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
