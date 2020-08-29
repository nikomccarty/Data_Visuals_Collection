// Goal:
// Add button to change data to a different x or y accessor
// make multifaceted scatterplots
// add regression line, to all of them!

async function drawScatter() {

  // 1. Access data

  const dataset = await d3.json("./my_weather_data.json")
  console.log(dataset)

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity
  const colorAccessor = d => d.temperatureMax

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 40,
      left: 50,
    },
  }
  dimensions.height = dimensions.width

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)

  // 4. Create scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight,0])
    .nice()

  const colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset, colorAccessor))
      .range(["#d9d9d9","#636363","#252525"])

  // 5. Draw data

  const dots = bounds.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("fill", d => colorScale(colorAccessor(d)))
      .attr("tabindex", "0")

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .attr("transform", `translate(0, ${dimensions.boundedHeight})`)

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  const xAxisLabel = xAxis.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Dew Point")

  const yAxisLabel = yAxis.append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -dimensions.margin.left + 18)
    .style("transform", "rotate(-90deg)")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Humidity")

  // 7. Set up interactions
  const delaunay = d3.Delaunay.from(
    dataset,
    d => xScale(xAccessor(d)),
    d => yScale(yAccessor(d)),
  )
  const voronoi = delaunay.voronoi()
  voronoi.xmax = dimensions.boundedWidth
  voronoi.ymax = dimensions.boundedHeight

  bounds.selectAll(".voronoi")
    .data(dataset)
    .enter().append("path")
      .attr("class", "voronoi")
      .attr("d", (d,i) => voronoi.renderCell(i))
      .style("opacity", 0)
      .on("mouseenter", onMouseEnter)
      .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip")
  function onMouseEnter(datum) {
    const dayDot = bounds.append("circle")
        .attr("class", "tooltipDot")
        .attr("cx", xScale(xAccessor(datum)))
        .attr("cy", yScale(yAccessor(datum)))
        .attr("r", 7)
        .style("fill", "black")
        .style("pointer-events", "none")

    const formatHumidity = d3.format(".2f")
    tooltip.select("#humidity")
        .text(formatHumidity(yAccessor(datum)))

    const formatDewPoint = d3.format(".2f")
    tooltip.select("#dew-point")
        .text(formatDewPoint(xAccessor(datum)))

    const dateParser = d3.timeParse("%Y-%m-%d")
    const formatDate = d3.timeFormat("%B %A %-d, %Y")
    tooltip.select("#date")
        .text(formatDate(dateParser(datum.date)))

    const x = xScale(xAccessor(datum))
      + dimensions.margin.left
    const y = yScale(yAccessor(datum))
      + dimensions.margin.top

    tooltip.style("transform", `translate(`
      + `calc(-50% + ${x}px),`
      + `calc(-100% + ${y}px)`
      + `)`)

    tooltip.style("opacity", 1)
  }

  function onMouseLeave() {
    d3.selectAll(".tooltipDot")
      .remove()

    tooltip.style("opacity", 0)
  }

}
drawScatter()
