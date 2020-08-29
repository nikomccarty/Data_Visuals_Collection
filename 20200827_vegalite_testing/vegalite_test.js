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

  const data_full = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/gapminder.json")
  const data = data_full.filter(d => d.year === 2000);

  // vl.markBar()
  //   .data(data)
  //   .encode(
  //     vl.x().fieldN('cluster'),
  //     vl.y().fieldQ('pop'),
  //     vl.color().fieldN('country').legend(null),
  //     vl.tooltip().fieldN('country')
  //   )
  //   .width(300)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // const selectYear = vl.selectSingle('select').fields('year')
  //   .init({year: 1955})
  //   .bind(vl.slider().min(1955).max(2005).step(5));
  //
  // return vl.markPoint({filled: true})
  //   .data({values: data})
  //   .select(selectYear)
  //   .transform(vl.filter(selectYear))
  //   .encode(
  //     vl.x().fieldQ('fertility').scale({domain: [0, 9]}),
  //     vl.y().fieldQ('life_expect').scale({domain: [0, 90]}),
  //     vl.size().fieldQ('pop').scale({domain: [0, 1200000000], range: [0, 1000]}),
  //     vl.color().fieldN('cluster').legend(null),
  //     vl.opacity().value(0.5),
  //     vl.tooltip().fieldN('country'),
  //     vl.order().fieldQ('pop').sort('descending')
  //   )
  //   .render()
  //   .then(viewElement => {
  //       // render returns a promise to a DOM element containing the chart
  //       // viewElement.value contains the Vega View object instance
  //       document.getElementById('view').appendChild(viewElement);
  //     });

  // vl.markLine({strokeWidth: 3, opacity: 0.5, interpolate: 'monotone'})
  //   .data(data_full)
  //   .encode(
  //     vl.x().fieldO('year'),
  //     vl.y().fieldQ('fertility'),
  //     vl.color().fieldN('country').legend(null),
  //     vl.tooltip().fieldN('country')
  //   )
  //   .width(300)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  const dataNA = data_full.filter(d => {
    return d.country === 'United States'
    || d.country === 'Canada'
    || d.country == 'Mexico';
  })

  console.log(dataNA)

  vl.markArea({opacity: 0.5})
    .data(dataNA)
    .encode(
      vl.x().fieldO('year'),
      vl.y().fieldQ('pop').stack(null),
      vl.color().fieldN('country')
    )
    .width(200)
    .render()
    .then(viewElement => {
      // render returns a promise to a DOM element containing the chart
      // viewElement.value contains the Vega View object instance
      document.getElementById('view').appendChild(viewElement);
    });
}
drawPlot();
