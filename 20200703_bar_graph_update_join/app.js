// Bar chart to practice using .update() and .join()
// From Scott Murray's book, page. 178

data = [20, 30, 40, 22, 13, 7, 42, 27];

var w =  800;
var h = 400;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});

var y = d3.scaleLinear()
     .domain([0, d3.max(data)])
     .range([h - margin.bottom, margin.top]);

var x = d3.scaleBand()
     .domain(d3.range(data.length))
     .rangeRound([margin.left, w - margin.right])
     .padding(0.1);

var svg = d3.select('#chart')
     .append('svg')
     .attr('width', w )
     .attr('height', h );


yTitle = g => g.append('text')
     .attr('font-family', 'sans-serif')
     .attr('y', 13)
     .attr('x', 2)
     .text('↑ Value');

yAxis = g => g
     .attr('transform', 'translate(' + margin.left + ')')
     .call(d3.axisLeft(y).tickSizeOuter(0)) //.ticks(null, "%"))
     .call(g => g.select(".domain")) //.remove()); This is how you remove main line

xAxis = g => g
     .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
     .call(d3.axisBottom(x).tickSizeOuter(0));

var bar = svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('x', (d, i) => x(i) )
     .attr('y', d => y(d))
     .attr('width', x.bandwidth())
     .attr('height', d => y(0) - y(d))
     .attr('fill', 'steelblue');

svg.append('g')
     .call(xAxis);

svg.append('g')
     .call(yAxis);

svg.append('g')
     .call(yTitle);


svg.append('g')
   .selectAll('text')
   .text(function(d) {
     return d;
   })
   .attr('x', (d, i) => x(i) + x.bandwidth() / 2)
   .attr('y', (d) => h - y(d));

// barLabels = g => g.append('text')
//     .attr('font-family', 'sans-serif')
//     .text(function(d) {
//       return d;
//     })
//     .attr('x', (d, i) => x(i) + x.bandwidth() / 2)
//     .attr('y', (d) => h - y(d))
//     .style('color', 'white');
//
// svg.append('g')
//      .call(barLabels);

d3.select('p')
  .on('click', function() {
    const maxValue = 50;
    let newNumber = Math.floor(Math.random() * maxValue);
      data.push(newNumber);
        });
