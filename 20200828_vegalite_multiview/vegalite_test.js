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

  // Playing with the movies dataset
  const weather = await d3.csv("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/weather.csv")

  console.table(weather[0])

  // const tempMinMax = vl.markArea({opacity: 0.3})
  // .data(dataset)
  // .encode(
  //   vl.x().month('date'),
  //   vl.y().average('temp_max'),
  //   vl.y2().average('temp_min'),
  //   vl.color().fieldN('location')
  // );
  //
  // const tempMid = vl.markLine()
  //   .data(dataset)
  //   .transform(
  //     vl.calculate('(datum.temp_min + datum.temp_max) / 2').as('temp_mid')
  //   )
  //   .encode(
  //     vl.x().month('date'),
  //     vl.y().average('temp_mid'),
  //     vl.color().fieldN('location')
  //   );
  //
  //   return vl.layer(tempMinMax, tempMid).render()
  //     .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });


// {
//   const tempMinMax = vl.markArea({opacity: 0.3}).encode(
//     vl.x().month('date').title(null).axis({format: '%b'}),
//     vl.y().average('temp_max').title('Avg. Temperature °C'),
//     vl.y2().average('temp_min')
//   );
//
//   const precip = vl.markLine({interpolate: 'monotone', stroke: 'grey'}).encode(
//     vl.x().month('date').title(null),
//     vl.y().average('precipitation').title('Precipitation')
//   );
//
//   return vl.layer(tempMinMax, precip)
//     .data(weather)
//     .transform(vl.filter('datum.location == "Seattle"'))
//     .resolve({scale: {y: 'independent'}})
//     .width(400)
//     .render()
//     .then(viewElement => {
//       document.getElementById('view').appendChild(viewElement);
//     });
// }

// {
//   const colors = {
//     domain: ['drizzle', 'fog', 'rain', 'snow', 'sun'],
//     range: ['#aec7e8', '#c7c7c7', '#1f77b4', '#9467bd', '#e7ba52']
//   };
//
//   return v1.markBar()
//     .data(weather)
//     .transform(v1.filter('datum.location == "Seattle"'))
//     .encode(
//       v1.x().fieldQ('temp_max').bin(true).title('Temperature C'),
//       v1.y().count(),
//       v1.color().fieldN('weather').scale(colors),
//       v1.column().fieldN('weather')
//     )
//     .width(150)
//     .height(150)
//     .render()
//     .then(viewElement => {
//       document.getElementById('view').appendChild(viewElement);
//     });
// }

// {
//   const colors = {
//     domain: ['drizzle', 'fog', 'rain', 'snow', 'sun'],
//     range: ['#aec7e8', '#c7c7c7', '#1f77b4', '#9467bd', '#e7ba52']
//   };
//
//   return v1.markBar()
//     .encode(
//       v1.x().fieldQ('temp_max').bin(true).title('Temperature C'),
//       v1.y().count(),
//       v1.color().fieldN('weather').scale(colors),
//     )
//     .width(150)
//     .height(150)
//     .facet({column: v1.field('weather')})
//     .data(weather)
//     .transform(v1.filter('datum.location == "Seattle"'))
//     .render()
//     .then(viewElement => {
//       document.getElementById('view').appendChild(viewElement);
//     });
// }
//
// {
//   const tempMinMax = vl.markArea({opacity: 0.3}).encode(
//     vl.x().month('date').title(null).axis({format: '%b'}),
//     vl.y().average('temp_max').title('Avg. Temperature (°C)'),
//     vl.y2().average('temp_min'),
//     vl.color().fieldN('location')
//   );
//
//   // const tempMid = vl.markLine().encode(
//   //   vl.x().month('date'),
//   //   vl.y().average('temp_mid'),
//   //   vl.color().fieldN('location')
//   // );
//
//   return vl.layer(tempMinMax, tempMid)
//     .facet({column: vl.field('location')})
//     .data(weather)
//     .transform(vl.calculate('(datum.temp_min + datum.temp_max) / 2').as('temp_mid'))
//     .render();
//     .then(viewElement => {
//       document.getElementById('view').appendChild(viewElement);
//     });
// }

// {
// const base = vl.markLine()
//   .data(weather)
//   .encode(
//     vl.x().month('date').title(null),
//     vl.color().fieldN('location')
//   )
//   .width(240)
//   .height(180);
//
// const temp = base.encode(v1.y().average('temp_max'));
// const precip = base.encode(v1.y().average('precipitation'));
// const wind = base.encode(v1.y().average('wind'));
//
// return vl.vconcat(vl.hconcat(temp, precip), wind)
//   .render()
//   .then(viewElement => {
//     document.getElementById('view').appendChild(viewElement);
//   });
// }

// {
//
// vl.markLine()
//   .data(weather)
//   .encode(
//     vl.x().month('date').title(null),
//     v1.y().average(v1.repeat('column')),
//     vl.color().fieldN('location')
//   )
//   .width(240)
//   .height(180)
//   .repeat({row: ['temp_max', 'precipitation', 'wind']})
//   .render()
//   .then(viewElement => {
//     document.getElementById('view').appendChild(viewElement);
//   });
// }

// {
// vl.markCircle({size: 15, opacity: 0.5})
//   .encode(
//     vl.x().fieldQ(v1.repeat('column')),
//     v1.y().fieldQ(v1.repeat('row')),
//   )
//   .width(150)
//   .height(150)
//   .repeat({row: ['temp_max', 'precipitation', 'wind', 'temp_min'],
//           column: ['temp_min', 'wind', 'precipitation', 'temp_max']})
//   .data(weather)
//   .transform(v1.filter('datum.location == "Seattle"'))
//   .render()
//   .then(viewElement => {
//     document.getElementById('view').appendChild(viewElement);
//   });
// }

// {
//   vl.data(weather)
//   .transform(vl.filter('datum.location == "Seattle"'))
//   .layer(
//     vl.markBar().encode(
//       vl.x().month('date').type('ordinal').title('Month'),
//       vl.y().average(vl.repeat('column'))
//     ),
//     vl.markRule({stroke: 'firebrick'}).encode(
//       vl.y().average(vl.repeat('column'))
//     )
//   )
//   .width(200)
//   .height(150)
//   .repeat({column: ['temp_max', 'precipitation', 'wind']})
//   .render()
//     .then(viewElement => {
//       document.getElementById('view').appendChild(viewElement);
//     });;
// }

{
  const splom = vl.markCircle({size: 15, opacity: 0.5})
    .encode(
      vl.x().fieldQ(vl.repeat('column')),
      vl.y().fieldQ(vl.repeat('row')),
    )
    .width(width / 5)
    .height(height / 5)
    .repeat({
      row: ['temp_max', 'precipitation', 'wind'],
      column: ['wind', 'precipitation', 'temp_max']
    });

  const dateHist = vl.layer(
      vl.markBar().encode(
        vl.x().month('date').type('ordinal').title('Month'),
        vl.y().average(vl.repeat('row'))
      ),
      vl.markRule({stroke: 'firebrick'}).encode(
        vl.y().average(vl.repeat('row'))
      )
    )
    .width(width / 5)
    .height(height / 5)
    .repeat({row: ['temp_max', 'precipitation', 'wind']});

  const tempHist = vl.markBar()
    .encode(
      vl.x().fieldQ('temp_max').bin(true).title('Temperature (°C)'),
      vl.y().count(),
      vl.color().fieldN('weather').scale({
        domain: ['drizzle', 'fog', 'rain', 'snow', 'sun'],
        range: ['#aec7e8', '#c7c7c7', '#1f77b4', '#9467bd', '#e7ba52']
      })
    )
    .width(width / 7)
    .height(height / 8)
    .facet({column: vl.field('weather')});

  return vl.data(weather)
    .transform(vl.filter('datum.location == "New York"'))
    .title('New York City Weather Dashboard')
    .vconcat(
      vl.hconcat(splom, dateHist),
      tempHist
    )
    .resolve({legend: {color: 'independent'}})
    .config({axis: {labelAngle: 0}})
    .render()
    .then(viewElement => {
          document.getElementById('view').appendChild(viewElement);
        });
}

}
drawPlot();
