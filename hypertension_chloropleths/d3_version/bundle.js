async function drawMap() {

  // 1. Access data
  const countyShapes = await d3.json("counties-10m.json")
  const dataset = await d3.csv("./hypertension_all_races_2012_2014.csv", d3.autoType)
  console.log(dataset[0])
  console.log(countyShapes)

  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  // create a geo path - https://github.com/mbostock/d3/wiki/Geo-Paths
  var projection = d3.geoAlbersUsa()
    .translate([dimensions.boundedWidth / 2, dimensions.boundedHeight / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

  const pathGenerator = d3.geoPath(projection);

  // create an svg element
  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margin.left
    }px, ${dimensions.margin.top}px)`)

  // create a container for counties
  var counties = bounds.append("g")
      .data(countyShapes.)
      .enter()
      .append("path")
      .attr("id", "counties")
      .attr("d", pathGenerator)



}
drawMap()
