// setup API options
const options = {
  config: [{
    // Vega-Lite default configuration
    axis: {
      labelColor: "#aaa"
    },
    axisBottom: {
      labelAngle: -90
    }
  }],
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    loader: vega.loader({
      baseURL: "https://cdn.jsdelivr.net/npm/vega-datasets@1/",
    }),
    renderer: "canvas",
  },
};

const v1 = vl.register(vega, vegaLite, options);

async function drawPlot() {

  // Playing with the movies dataset
  const world = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/world-110m.json")

  console.log(world)

  const dataset = v1.topojson(world).feature('countries');
  const zipcodes = await d3.csv("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/zipcodes.csv");
  console.log(zipcodes[0])

  // const map = v1.layer(
  //   // use the sphere of the Earth as the base layer
  //   vl.markGeoshape({fill: '#e6f3ff'})
  //     .data(vl.sphere()),
  //   // add a graticule for geographic reference lines
  //   vl.markGeoshape({stroke: '#ffffff', strokeWidth: 1})
  //     .data(vl.graticule()),
  //   // and then the countries of the world
  //   vl.markGeoshape({fill: '#2a1d0c', stroke: '#706545', strokeWidth: 0.5})
  //     .data(vl.topojson(world).feature('countries'))
  // )
  // .width(600).height(400)
  // .config({view: {stroke: null}});
  //
  // map.project(
  //   v1.projection('naturalEarth1').scale(110).translate(300, 200)
  //   )
  //   .render()
  //   .then(viewElement => {
  //       document.getElementById('view').appendChild(viewElement);
  //     });

  //
  // v1.markGeoshape({fill: '#2a1d0c', stroke: '#706545'})
  //   .data(dataset)
  //   .project(v1.projection('mercator').scale(400).translate(900, 450))
  //   .width(480)
  //   .height(350)
  //   .render()
  //   .then(viewElement => {
  //       document.getElementById('view').appendChild(viewElement);
  //     });

  vl.markLine({size: 1, opacity: 1})
  .data(zipcodes)
  .transform(
    vl.filter('-150 < datum.longitude && 22 < datum.latitude && datum.latitude < 55'),
    v1.calculate('datum.zip_code[0]').as('digit')
  )
  .encode(
    vl.longitude().fieldQ('longitude'), // apply the field named 'longitude' to the longitude channel
    vl.latitude().fieldQ('latitude'),    // apply the field named 'latitude' to the latitude channel
    v1.color().fieldN('digit')
  )
  .project(vl.projection('albersUsa'))
  .width(600)
  .height(500)
  .config({view: {stroke: null}})
  .render()
  .then(viewElement => {
        document.getElementById('view').appendChild(viewElement);
      });



}

drawPlot();
