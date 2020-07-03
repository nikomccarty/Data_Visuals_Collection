// Attempt to re-create MBostock's bl.ock on stock prices
// https://bl.ocks.org/mbostock/1166403

var margin = ({top: 20, right: 30, bottom: 30, left: 40});
var width =  960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// Make a string into a date --
var parse = d3.timeParse("%b %Y");

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .tickSize(-height);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(4);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// var area = svg.append('path')
//     .x(function(d) { return x(d.date); })
//     .y0(height)
//     .y1(function(d) { return y(d.price); });

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.price); });


svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);


d3.csv('stock_prices.csv', type)
  .then(function(data) {
    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain([0, d3.max(data, function(d) { return d.price; })]).nice();

    svg.datum(data)
      .on("click", click);

    svg.append("path")
      .attr("class", "area")
      .attr("clip-path", "url(#clip)")
      .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis);

    svg.append("path")
        .attr("class", "line")
        .attr("clip-path", "url(#clip)")
        .attr("d", line);

    svg.append("text")
        .attr("x", width - 6)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(data[0].symbol);

    // On click, update the x-axis.
    function click() {
      var n = data.length - 1,
          i = Math.floor(Math.random() * n / 2),
          j = i + Math.floor(Math.random() * n / 2) + 1;
      x.domain([data[i].date, data[j].date]);
      var t = svg.transition().duration(750);
      t.select(".x.axis").call(xAxis);
      t.select(".area").attr("d", area);
      t.select(".line").attr("d", line);
    }


  })
  .catch(function(error){
     console.log('There is an error with the data.')
  });

function type(d) {
  d.date = parse(d.date);
  d.price = +d.price;
  if (d.symbol === "S&P 500") return d;
};


// svg.selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(d => d)
//   .attr('x', (d,i) => x(i) + x.bandwidth() / 2)
//   .attr('y', d => h - y(d) + 15)
//   .attr('text-anchor', 'middle');
