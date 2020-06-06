var data = [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// console.log(data);

var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;

// Create svg element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

var x_scale = d3.scaleBand()
                .domain(d3.range(data.length))
                .rangeRound([0, chart_width])
                .paddingInner(0.05);

var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, chart_height]);

//Bind data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i){
      return x_scale(i); // the first value has index, i, of 0, then 30, etc.
    })
    .attr('y', function(d){
      return chart_height - y_scale(d);
    })
    .attr('width', x_scale.bandwidth())
    .attr('height', function(d){
      return y_scale(d);
    })
    .attr('fill', '#000000')
    // .append('title')
    // .text(function(d){
    //   return d;
    // });
    .on('mouseover', function(d){
      var x = parseFloat(d3.select(this).attr('x')) +
              x_scale.bandwidth() / 2;
      var y = parseFloat(d3.select(this).attr('y')) /
              2 + chart_height / 2;
      d3.select('#tooltip')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('display', 'block')
        .text(d);
    })
    .on('mouseout', function(){
      d3.select('#tooltip')
        .style('display', 'none');
    })
