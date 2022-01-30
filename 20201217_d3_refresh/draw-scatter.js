async function drawScatter() {
  let dataset = await d3.csv("./iris.csv", d3.autoType)

  console.log(dataset[0])

  const colorAccessor = d => d.species;
  const xAccessor = d => d.sepal_width
  const yAccessor = d => d.sepal_length;

  // figure out size of user's screen to set chart dimensions
  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ]);

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 70,
      left: 70,
    },
  }

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right;

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom;


  // Draw the canvas
  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper.append("g")
  .style("transform", `translate(${
      dimensions.margin.left
    }px, ${
      dimensions.margin.top
    }px)`);

  // Create the scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = d3.scaleOrdinal()
    .domain(d3.extent(dataset, colorAccessor))
    .range(d3.schemeAccent);

  // Draw data
  const dots = bounds.selectAll("circle").data(dataset);

  dots
    .join("circle") // replaces enter, append, merge 
    .attr("fill", d => colorScale(colorAccessor(d)))
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 6);

  // Draw axes
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`);

  // Draw labels
  const xAxisLabel = xAxis.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Sepal Width");

  const yAxisLabel = yAxis.append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -dimensions.margin.left + 30)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Sepal Height")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");

}
drawScatter()