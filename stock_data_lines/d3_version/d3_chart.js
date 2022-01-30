////////////////////////////
//SAME CHART WITH D3.JS
////////////////////////////

async function drawPlot() {

  const dateParser = d3.timeParse("%m/%e/%Y")

  // 1. Access data
  const dataset = await d3.csv("./stock_data_tidy.csv", d3.autoType);

  const yAccessor = d => d.value
  const xAccessor = d => dateParser(d.date)
  const colorAccessor = d => d.variable

  // D3 v6 d3.group method
  const dataGroup = d3.groups(dataset, colorAccessor)

  console.log(xAccessor(dataGroup))

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.8,
    height: 400,
    margin: {
      top: 40,
      right: 100,
      bottom: 30,
      left: 50,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#chart")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .attr("transform", `translate(${
        dimensions.margin.left
      }, ${
        dimensions.margin.top
      })`)

  bounds.append("defs").append("clipPath")
      .attr("id", "bounds-clip-path")
    .append("rect")
      .attr("width", dimensions.boundedWidth)
      .attr("height", dimensions.boundedHeight)

  const clip = bounds.append("g")
    .attr("clip-path", "url(#bounds-clip-path)")

  // 4. Create scales

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

  // 5. Draw data

  // D3 v5 nest version
  // const dataNest = d3.nest()
  //   .key(d => d.variable)
  //   .entries(dataset); // original data array
  // console.log(dataNest)

  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  const line = clip.selectAll('.line')
    .data(dataGroup)
    .enter()
    .append('path')
    .attr("class", "line")
    .attr("d", d => lineGenerator(d[1]))
    .attr("stroke", d => colorScale(d[0]))

  // 6. Draw peripherals

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
      .attr("class", "y-axis")
    .call(yAxisGenerator)

  const yAxisLabel = yAxis.append("text")
      .attr("class", "y-axis-label")
      .attr("x", -8)
      .attr("y", dimensions.margin.left - 58)
      .text("Close Price")

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .call(xAxisGenerator)

  const xAxisLabel = xAxis.append("text")
    .attr("class", "x-axis-label")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", 25)
    .text("Date (Weekly Data)");

  const title = bounds.append("text")
    .attr("class", "title")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", 0)
    .text("Technology Stock Prices (09/2014 - 09/2020)")

  // Legend, for right side of chart
  const keys = ["AMZN", "GOOG", "FB", "BABA", "JD"];

  const legendCircles = bounds.selectAll("circle")
    .data(keys)
    .enter()
    .append("circle")
      .attr("class", "legend_circles")
      .attr("cx", dimensions.boundedWidth + 20)
      .attr("cy", (d,i) => i * 30)
      .attr("r", 7)
      .style("fill", d => colorScale(d))

  const amzn = bounds
    .append("text")
      .attr("x", dimensions.boundedWidth + 30)
      .attr("y", 5)
      .text("Amazon")
      .attr("text-anchor", "left")

  const goog = bounds
    .append("text")
      .attr("x", dimensions.boundedWidth + 30)
      .attr("y", 1 * 30 + 5)
      .text("Google")
      .attr("text-anchor", "left")

  const fb = bounds
    .append("text")
      .attr("x", dimensions.boundedWidth + 30)
      .attr("y", 2 * 30 + 5)
      .text("Facebook")
      .attr("text-anchor", "left")

  const baba = bounds
    .append("text")
      .attr("x", dimensions.boundedWidth + 30)
      .attr("y", 3 * 30 + 5)
      .text("Alibaba")
      .attr("text-anchor", "left")

  const jd = bounds
    .append("text")
      .attr("x", dimensions.boundedWidth + 30)
      .attr("y", 4 * 30 + 5)
      .text("JD")
      .attr("text-anchor", "left")

  }
drawPlot()
