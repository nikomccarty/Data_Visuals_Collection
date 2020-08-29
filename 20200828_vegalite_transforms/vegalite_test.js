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
  const dataset = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/burtin.json")

  console.table(dataset[0])

  // vl.markBar()
  //   .data(dataset)
  //   .encode(
  //     vl.x().fieldQ('IMDB_Rating').bin({maxbins: 50}),
  //     // vl.y().fieldQ('IMDB_Rating')
  //     v1.y().count()
  //   )
  //   .width(500)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // vl.markCircle()
  //   .data(dataset)
  //   .encode(
  //     vl.x().fieldQ('Rotten_Tomatoes_Rating').bin({maxbins: 20}),
  //     vl.y().fieldQ('IMDB_Rating').bin({maxbins: 20}),
  //     v1.size().count()
  //   )
  //   .width(500)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // Aggregation

  // vl.markBar()
  //   .data(dataset)
  //   .encode(
  //     vl.x().q1('Rotten_Tomatoes_Rating'),
  //     v1.x2().q3('Rotten_Tomatoes_Rating'),
  //     vl.y().fieldN('Major_Genre').sort(vl.median('Rotten_Tomatoes_Rating').order('descending'))
  //   )
  //   .width(500)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });
  //
  // vl.markArea()
  //   .data(dataset)
  //   .transform(
  //     v1.calculate('datum.Worldwide_Gross - datum.US_Gross').as('NonUS_Gross')
  //   )
  //   .encode(
  //     vl.x().month('Release_Date'),
  //     vl.y().median('NonUS_Gross')
  //   )
  //   .width(500)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });


  // vl.markArea()
  //   .data(dataset)
  //   .transform(
  //     v1.calculate('datum.Worldwide_Gross - datum.US_Gross').as('NonUS_Gross')
  //   )
  //   .encode(
  //     vl.x().month('Release_Date'),
  //     vl.y().median('NonUS_Gross')
  //   )
  //   .width(500)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });


  // vl.markBar()
  //   .data(dataset)
  //   .transform(
  //     v1.groupby('Major_Genre')
  //       .aggregate(v1.average('Rotten_Tomatoes_Rating').as('Average_Rating'))
  //   )
  //   .encode(
  //     vl.x().fieldQ('Average_Rating'),
  //     vl.y().fieldN('Major_Genre').sort(v1.field('Average_Rating').order('descending'))
  //   )
  //   .width(300)
  //   .render()
  //   .then(viewElement => {
  //     // render returns a promise to a DOM element containing the chart
  //     // viewElement.value contains the Vega View object instance
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // vl.markBar()
  //   .data(dataset)
  //   .transform(
  //     v1.filter('datum.Director != null'),
  //     v1.aggregate(v1.average('Worldwide_Gross').as('Gross')).groupby('Director'),
  //     v1.window(v1.rank().as('Rank')).sort(v1.field('Gross').order('descending')
  //   ),
  //     v1.filter('datum.Rank < 20')
  //   )
  //   .encode(
  //     vl.x().fieldQ('Gross'),
  //     vl.y().fieldN('Director').sort(v1.field('Gross').order('descending'))
  //   )
  //   .width(300)
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // vl.markLine({interpolate: 'step-before'})
  //   .data(dataset)
  //   .transform(
  //     v1.filter('datum.Running_Time_min != null'),
  //     v1.groupby('Running_Time_min').aggregate(v1.count().as('Count')),
  //
  //     v1.window(v1.sum('Count').as('Cumulative_Sum')).sort(v1.field('Running_Time_min'))
  //   )
  //   .encode(
  //     vl.x().fieldQ('Running_Time_min').title('Duration (min)'),
  //     vl.y().fieldQ('Cumulative_Sum').title('Cumulative Count of Films')
  //   )
  //   .width(300)
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // vl.markCircle({tooltip: true, size: 80})
  //   .data(dataset)
  //   .transform(
  //     vl.calculate('split(datum.Bacteria, " ")[0]').as('Split'),
  //     vl.calculate('indexof(["Salmonella", "Staphylococcus", "Streptococcus"], datum.Split) >= 0 ? datum.Split : "Other"').as('Genus')
  //   )
  //   .encode(
  //     // vl.x().fieldQ('Neomycin').scale({type: 'sqrt'})
  //     vl.x().fieldQ('Neomycin')
  //       .scale({type: 'log', base: 10, domain: [0.001, 1000]})
  //       .sort('descending')
  //       .axis({tickCount: 5})
  //       .title('Neomycin MIC (μg/ml, reverse log scale)'),
  //
  //     v1.y().fieldQ('Penicillin')
  //       .scale({type: 'log', base: 10, domain: [0.001, 1000]})
  //       .sort('descending')
  //       .axis({tickCount: 5})
  //       .title('Penicilin MIC (μg/ml, reverse log scale)'),
  //
  //     v1.color()
  //       .fieldO('Genus')
  //       .scale({
  //         domain: ['Salmonella', 'Staphylococcus', 'Streptococcus', 'Other'],
  //         range: ['rgb(76,120,168)', 'rgb(84,162,75)', 'rgb(228,87,86)', 'rgb(121,112,110)']
  //       })
  //   )
  //   .width(300)
  //   .height(300)
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  vl.markRect({tooltip: true, size: 80})
    .data(dataset)
    .encode(
      vl.y().fieldN('Bacteria')
        .sort(vl.max('Penicillin').order('descending'))
        .axis({
          orient: 'left',
          title: null,
          titleX: -30,
          titleY: -10,
          titleAlign: 'left',
          titleAngle: 0
        }),
      vl.color().fieldQ('Penicillin')
          .scale({type: 'log', scheme: 'viridis', nice: true})
          .legend({titleOrient: 'right', tickCount: 5})
          .title('Penicillin MIC (μg/ml)')
    )
    .title({
      text: 'Penicillin Resistance',
      anchor: 'middle',
      offset: 5,
    })
    .width(30)
    .height(300)
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });


}
drawPlot();
