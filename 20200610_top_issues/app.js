// Code adapted from bl.ocks.org, https://bl.ocks.org/Thanaporn-sk/210d359e6e0c10898ff1329a88ed20c6

// Data is taken from https://news.gallup.com/poll/312575/satisfaction-direction-lowest-four-years.aspx

var margin = {top: 100, right: 100, bottom: 50, left: 250};

var width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

var data = [
  {issue: "Government", rep: 18, ind: 20, dem: 25},
  {issue: "Coronavirus", rep: 17, ind: 18, dem: 25},
  {issue: "Race Relations", rep: 10, ind: 20, dem: 27},
  {issue: "Economy", rep: 12, ind: 9, dem: 4},
  {issue: "Media", rep: 6, ind: 1, dem: 0.5},
  {issue: "Crime", rep: 6, ind: 3, dem: 1},
  {issue: "Decaying Morals", rep: 6, ind: 2, dem: 1},
  {issue: "Unemployment", rep: 5, ind: 3, dem: 7},
  {issue: "Unification of Country", rep: 5, ind: 4, dem: 3},
  {issue: "Lack of Respect", rep: 2, ind: 5, dem: 4},
  {issue: "Police Brutality", rep: 2, ind: 4, dem: 1},
  {issue: "Healthcare", rep: 2, ind: 3, dem: 4},
  {issue: "Wealth Gap", rep: 1, ind: 3, dem: 4}
];

var classToPos = {
  "lollipop-rep": "rep",
  "lollipop-ind": "ind",
  "lollipop-dem": "dem"
}

var legendLabels = [
  {label: "Republicans", class: "lollipop-rep"},
  {label: "Independents", class: "lollipop-ind"},
  {label: "Democrats", class: "lollipop-dem"}
];

var padding = 0;

var y = d3.scaleBand()
    	     .domain(data.map(function(d){
             return d.issue;
           }))
    	     .range([0, height])
    	     .padding(0.05);

var x = d3.scaleLinear()
    	    .domain([
            0, d3.max(data, function(d) { return d.dem })
          ])
    	    .range([0, width])
    	    .nice();

// code for positioning legend
var legend = svg.append("g");

var legendX = width / 2 - 120;
var legendY = -50;
var spaceBetween = 160;

var legendPosition = {
    x: legendX + 90,
    y: legendY - 4
};

// add circles
legend.selectAll("circle")
    	.data(legendLabels)
      .enter()
      .append("circle")
    	.attr("cx", function(d, i) {
      	return legendPosition.x + spaceBetween * i;
    	})
    	.attr("cy", legendPosition.y)
    	.attr("r", 8)
    	.attr("class", function(d) { return d.class });

// add labels
legend.selectAll("text")
    	.data(legendLabels)
      .enter()
      .append("text")
      .attr("x", function(d, i) {
      	return legendPosition.x + spaceBetween * i + 10;
    	})
    	.attr("y", legendPosition.y + 4)
    	.text(function(d) { return d.label });

var yAxis = d3.axisLeft().scale(y)
    .tickSize(0);

var xAxis = d3.axisTop().scale(x)
    	.tickFormat(function(d,i) {
        if (i == 0) {
          return "0"
        } else {
        	return d3.format(".2s")(d);
        }
      });

var yAxisGroup = svg.append("g")
    	.attr("transform", "translate(-12, 0)")
    	.call(yAxis)
    	.select(".domain").remove();

var xAxisGroup = svg.append("g")
    	.call(xAxis);

xAxisGroup.append("text")
    	.attr("class", "x-title")
    	.attr("x", legendX)
    	.attr("y", legendY)
    	.text("Political Party")
    	.attr("fill", "black");

var lineGenerator = d3.line();
var axisLinePath = function(d) {
    return lineGenerator([[x(d) + 0.5, 0], [x(d) + 0.5, height]]);
};

var axisLines = xAxisGroup.selectAll("path")
    	.data(x.ticks(10))
      .enter()
      .append("path")
    	.attr("class", "grid-line")
    	.attr("d", axisLinePath);

var lollipopLinePath = function(d) {
    return lineGenerator([
      [x(d.min), y(d.name) + (y.bandwidth() / 2) ], [x(d.max), y(d.name) + (y.bandwidth() / 2)]
    ]);
};

var lollipopsGroup = svg.append("g").attr("class", "lollipops");

var lollipops = lollipopsGroup.selectAll("g")
    	.data(data)
      .enter()
      .append("g")
    	.attr("class", "lollipop")

lollipops.append("path")
    	.attr("class", "lollipop-line")
    	.attr("d", lollipopLinePath);

var repCircles = lollipops.append("circle")
    	.attr("class", "lollipop-rep")
    	.attr("r", 8)
      .attr("cx", function(d) {
      	return x(d.rep);
    	})
    	.attr("cy", function(d) {
        return y(d.issue) + y.bandwidth() / 2;
			})
    	.on("mouseover", showLabel)
      .on("mouseout", hideLabel);

   var indCircles = lollipops.append("circle")
    	.attr("class", "lollipop-ind")
    	.attr("r", 8)
    	.attr("cx", function(d) {
      	return x(d.ind);
    	})
    	.attr("cy", function(d) {
        return y(d.issue) + y.bandwidth() / 2;
			})
      .on("mouseover", showLabel)
      .on("mouseout", hideLabel);

    var demCircles = lollipops.append("circle")
    	.attr("class", "lollipop-dem")
    	.attr("r", 8)
    	.attr("cx", function(d) {
      	return x(d.dem);
    	})
    	.attr("cy", function(d) {
        return y(d.issue) + y.bandwidth() / 2;
			})
      .on("mouseover", showLabel)
      .on("mouseout", hideLabel);

function showLabel() {
  var selection = d3.select(this);
  var pos = classToPos[selection.attr("class")];

  d3.select(this.parentNode).append("text")
    .attr("x", function(d) { return x(d[pos]); })
    .attr("y", function(d) { return y(d.issue) + y.bandwidth() / 2; })
    .attr("dy", "-1em")
    .attr("text-anchor", "middle")
    .text(function(d) {
    	return d3.format(".2s")(d[pos]);
  	});
  }

function hideLabel(d) {
  d3.select(this.parentNode).select("text").remove();
}
