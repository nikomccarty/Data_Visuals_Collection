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

async function drawMap() {
  // Playing with the movies dataset
  const newyork = await d3.json("./NY-36-new-york-counties.json")
  console.log(newyork)

  const dataset = await d3.csv('./ny_covid_tests.csv');
  console.log(dataset[0])

{

  vl.markGeoshape()
    .data(v1.topojson(newyork).feature('cb_2015_new_york_county_20m'))
    .transform(
      v1.filter('datum.')
      vl.lookup('County').from(v1.data(dataset).key('NAME').fields('Cumulative Number of Positives')
    ))
    .encode(
      v1.color().fieldQ('Cumulative Number of Positives').scale({domain: [0, 10000], clamp: true})
        .legend(),
      v1.tooltip().fieldQ('Cumulative Number of Positives')
    )
    .project(vl.projection('albersUsa'))
    .width(900)
    .height(700)
    .config({view: {stroke: null}})
    .render()
    .then(viewElement => {
        document.getElementById('view').appendChild(viewElement);
      });

}

}
drawMap()
