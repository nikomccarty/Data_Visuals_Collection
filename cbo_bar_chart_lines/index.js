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

async function drawPlot() {

// It's important that I plot bars of a certain value, with a line overlaid (percent of GDP)
  const width = window.innerWidth * 0.9;
  const height = width;

  // 1. Access data

  // Data is from https://www.cbo.gov/data/budget-economic-data#2
  const dataset = await d3.csv("./cbo_revenues_debt.csv", d3.autoType)

  // const dateParser = d3.timeParse("%Y / %m")
  // const xAccessor = d => dateParser(d.MONTH)
  // console.log(xAccessor(dataset[102]))
  //
  // const dataset_dates = dateParser(dataset);
  // console.log(dataset_dates)

  const df = new dfd.DataFrame(dataset)
  df.print()

{
  const chart = vl.markBar()
    .data(dataset)
    .encode(
      vl.x().month('MONTH'),
      vl.y().fieldQ('REFUSETONSCOLLECTED'),
    )
    .width(800)
    .height(500)
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });
}

}
drawPlot()