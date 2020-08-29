async function drawMap() {

  // 1. Access data

  const countyShapes = await d3.json("./NY-36-new-york-counties.json")
  const dataset = await d3.csv("./ny_covid_tests.csv")
  console.log(countyShapes)

  const countyNameAccessor = d => d.properties["COUNTY"]
  // const countyIdAccessor = d => d.properties["COUNTYFP"]
  const metric = "Cumulative Number of Tests Performed"
  const currentDate = new Date('08/21/2020')
  const parseDate  = d3.timeParse("%b/%d/%Y")

  let metricDataByCounty = {}
  dataset.forEach(d => {
    if (parseDate(d["Test Date"]) == currentDate) return
      metricDataByCounty[d["County"]] = +d["Cumulative Number of Tests Performed"] || 0
    }
  )
  console.log(metricDataByCounty)

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  }
  dimensions.height = dimensions.width

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  const projection = d3.geoAlbers();

  // const pathGenerator = d3.geoPath(projection)
  // console.log(projection)

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

  const metricValues = Object.values(metricDataByCounty)
  const metricValueMax = d3.max(metricValues)
  const colorScale = d3.scaleLinear()
      .domain([0, metricValueMax])
      .range(["white", "darkgreen"])

  // 5. Draw data

  // const newyork = bounds.append("path")
  //     .attr("class", "newyork")
  //     .attr("d", pathGenerator)

  console.log(dataset)

  const counties = bounds.selectAll(".county")
    .data(countyShapes.arcs)
    .enter().append("path")
      .attr("class", "county")
      .attr("d", d3.geoPath().projection(projection))
      .attr("fill", d => {
        const metricValue = metricDataByCounty[countyNameAccessor(d)]
        if (typeof metricValue == "undefined") return "#e2e6e9"
        return colorScale(metricValue)
      })

  // 6. Draw peripherals

  // const legendGroup = wrapper.append("g")
  //     .attr("transform", `translate(${
  //       120
  //     },${
  //       dimensions.width < 800
  //       ? dimensions.boundedHeight - 30
  //       : dimensions.boundedHeight * 0.5
  //     })`)
  //
  // const legendTitle = legendGroup.append("text")
  //     .attr("y", -23)
  //     .attr("class", "legend-title")
  //     .text("Population growth")
  //
  // const legendByline = legendGroup.append("text")
  //     .attr("y", -9)
  //     .attr("class", "legend-byline")
  //     .text("Percent change in 2017")
  //
  // const defs = wrapper.append("defs")
  // const legendGradientId = "legend-gradient"
  // const gradient = defs.append("linearGradient")
  //     .attr("id", legendGradientId)
  //   .selectAll("stop")
  //   .data(colorScale.range())
  //   .enter().append("stop")
  //     .attr("stop-color", d => d)
  //     .attr("offset", (d, i) => `${
  //       i * 100 / 2 // 2 is one less than our array's length
  //     }%`)
  //
  // const legendWidth = 120
  // const legendHeight = 16
  // const legendGradient = legendGroup.append("rect")
  //     .attr("x", -legendWidth / 2)
  //     .attr("height", legendHeight)
  //     .attr("width", legendWidth)
  //     .style("fill", `url(#${legendGradientId})`)
  //
  // const legendValueRight = legendGroup.append("text")
  //     .attr("class", "legend-value")
  //     .attr("x", legendWidth / 2 + 10)
  //     .attr("y", legendHeight / 2)
  //     .text(`${d3.format(".1f")(maxChange)}%`)
  //
  // const legendValueLeft = legendGroup.append("text")
  //     .attr("class", "legend-value")
  //     .attr("x", -legendWidth / 2 - 10)
  //     .attr("y", legendHeight / 2)
  //     .text(`${d3.format(".1f")(-maxChange)}%`)
  //     .style("text-anchor", "end")
  //
  // navigator.geolocation.getCurrentPosition(myPosition => {
  //   const [x, y] = projection([
  //     myPosition.coords.longitude,
  //     myPosition.coords.latitude
  //   ])
  //   const myLocation = bounds.append("circle")
  //       .attr("class", "my-location")
  //       .attr("cx", x)
  //       .attr("cy", y)
  //       .attr("r", 0)
  //       .transition().duration(500)
  //       .attr("r", 10)
  // })
  //
  // // 7. Set up interactions
  //
  // countries.on("mouseenter", onMouseEnter)
  //     .on("mouseleave", onMouseLeave)
  //
  // const tooltip = d3.select("#tooltip")
  // function onMouseEnter(datum) {
  //   tooltip.style("opacity", 1)
  //
  //   const metricValue = metricDataByCountry[countryIdAccessor(datum)]
  //
  //   tooltip.select("#country")
  //       .text(countryNameAccessor(datum))
  //
  //   tooltip.select("#value")
  //       .text(`${d3.format(",.2f")(metricValue || 0)}%`)
  //
  //   const [centerX, centerY] = pathGenerator.centroid(datum)
  //
  //   const x = centerX + dimensions.margin.left
  //   const y = centerY + dimensions.margin.top
  //
  //   tooltip.style("transform", `translate(`
  //     + `calc( -50% + ${x}px),`
  //     + `calc(-100% + ${y}px)`
  //     + `)`)
  //
  // }
  //
  // function onMouseLeave() {
  //   tooltip.style("opacity", 0)
  // }
}
drawMap()
