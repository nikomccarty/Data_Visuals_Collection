// Letter frequency bar chart in d3, with ordinal x-axis
// From Mike Bostock's Observable tutorial, but written in normal JS
// https://observablehq.com/@d3/lets-make-a-bar-chart/4?collection=@d3/lets-make-a-bar-chart

d3.csv('alphabet.csv', d3.autoType)
  .then(function(data) {
    var w =  800;
    var h = 400;
    var margin = ({top: 20, right: 30, bottom: 30, left: 40});
    var padding = 20;

    var y = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.frequency)])
         .range([h - margin.bottom, margin.top]);

    var x = d3.scaleBand()
         .domain(data.map(d => d.letter))
         .rangeRound([margin.left, w - margin.right])
         .padding(0.1);

    var svg = d3.select('#chart')
         .append('svg')
         .attr('width', w )
         .attr('height', h );

    // svg.append("g")
    //      .attr("transform", 'translate(0,' + (h - margin.bottom) + ')')
    //      .call(d3.axisBottom(x));

    // svg.append("g")
    //      .attr("transform", 'translate(' + margin.left + ',0)' )
    //      .call(d3.axisLeft(y));

    yTitle = g => g.append('text')
         .attr('font-family', 'sans-serif')
         .attr('font-size', 10)
         .attr('y', 10)
         .text('↑ Frequency');

    yAxis = g => g
         .attr('transform', 'translate(' + margin.left + ')')
         .call(d3.axisLeft(y).ticks(null, "%"))
         .call(g => g.select(".domain").remove());

    xAxis = g => g
         .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
         .call(d3.axisBottom(x).tickSizeOuter(0));

    var bar = svg.selectAll('rect')
         .data(data)
         .enter()
         .append('rect')
         .attr('x', d => x(d.letter))
         .attr('y', d => y(d.frequency))
         .attr('width', x.bandwidth())
         .attr('height', d => y(0) - y(d.frequency))
         .attr('fill', 'steelblue');

    svg.append('g')
         .call(xAxis);

    svg.append('g')
         .call(yAxis);

    svg.append('g')
         .call(yTitle);

    d3.select('p')
      .on('click', function() {
        groups.selectAll('rect')
              .sort((a, b) => d3.ascending(a.frequency, b.frequency))
              .attr('x', d => x(d.letter))
              .attr('y', d => y(d.frequency))
              .attr('width', x.bandwidth())
              .attr('height', d => y(0) - y(d.frequency))
            });

  })
  .catch(function(error){
     console.log('There is an error with the data.')
  })




// svg.selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(d => d)
//   .attr('x', (d,i) => x(i) + x.bandwidth() / 2)
//   .attr('y', d => h - y(d) + 15)
//   .attr('text-anchor', 'middle');
