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

  const width = window.innerWidth * 0.9;
  const height = width;

  const dateParser = d3.timeParse("%Y-%m-%d")

  // 1. Access data
  const dataset = await d3.csv("./stock_data.csv", function(d) {
    return {
      close: +d.close,
      company: d.company,
      date: dateParser(d.date),
      volume: +d.volume
    }
  });

  console.log(dataset[0])

{
  const hover = v1.selectSingle()
    .encodings('x')
    .on('mouseover')
    .nearest(true)
    .empty('none');

  const line = vl.markLine()
    // .data(dataset)
    .encode(
      vl.x().fieldT('date'),
      vl.y().fieldQ('close'),
      v1.color().fieldN("company")
    );

  const base = line.transform(v1.filter(hover));

  const label = {align: 'left', dx: 5, dy: -5};
  const white = {stroke: 'white', strokeWidth: 2}

  return v1.data(dataset)
    .layer(
      line,
      v1.markRule({color: '#aaa'})
        .transform(v1.filter(hover))
        .encode(v1.x().fieldT('date')),
      line.markCircle()
        .select(hover)
        .encode(v1.opacity().if(hover, v1.value(1)).value(0)),

      base.markText(label, white).encode(v1.text().fieldQ('close')),
      base.markText(label).encode(v1.text().fieldQ('close'))
    )
    .width(600)
    .height(400)
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });
}

}
drawPlot()
