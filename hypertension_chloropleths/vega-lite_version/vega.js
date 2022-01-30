// setup API options
const options = {
  config: [{
    // Vega-Lite default configuration
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

  const usa = await d3.json('counties-10m.json');
  console.log(usa)
  const hypertension14 = await d3.csv('hypertension_all_races_2016_2018.csv')

{
  vl.markGeoshape({stroke: '#aaa', strokeWidth: 0.6})
  .data(vl.topojson(usa).feature('counties'))
  .transform(
    vl.lookup('id').from(vl.data(hypertension14).key('id').fields('rate'))
  )
  .encode(
    vl.color().fieldQ('rate').scale({domain: [0, 1500], clamp: true}),
    vl.tooltip().fieldQ('rate')
  )
  .project(vl.projection('albersUsa'))
  .width(890).height(500)
  .config({view: {stroke: null}})
  .render()
  .then(viewElement => {
      document.getElementById('view1').appendChild(viewElement);
    });
}

  // vl.markGeoshape({stroke: '#aaa', strokeWidth: 0.25})
  //   .data(vl.topojson(usa).feature('counties'))
  //   .transform(
  //     vl.lookup('id').from(vl.data(hypertension14).key('id').fields('rate'))
  //   )
  //   .encode(
  //     vl.color().fieldQ('rate').scale({domain: [0, 0.3], clamp: true}).legend({format: '%'}),
  //     vl.tooltip().fieldQ('rate').format('.0%')
  //   )
  //   .project(vl.projection('albersUsa'))
  //   .width(890)
  //   .height(500)
  //   // .config({view: {stroke: null}})
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view-1').appendChild(viewElement);
  //   });

}
drawMap()
