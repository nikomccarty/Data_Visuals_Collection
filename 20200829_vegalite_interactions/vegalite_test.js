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
  const cars = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/cars.json")
  const movies = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/movies.json")
  const sp500 = await d3.csv("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/sp500.csv")
  const flights = await d3.json("https://cdn.jsdelivr.net/npm/vega-datasets@1.31.1/data/flights-5k.json")

  console.log(movies[0])

{
  // const selection = v1.selectSingle();
  //
  // function plot(selection) {
  //   return vl.markCircle({tooltip: true, size: 80})
  //     .data(cars)
  //     .select(selection)
  //     .encode(
  //       v1.x().fieldQ("Horsepower"),
  //       vl.y().fieldQ('Miles_per_Gallon'),
  //       vl.color().fieldO('Cylinders'),
  //       v1.opacity().if(selection, v1.value(0.8)).value(0.1)
  //     )
  //     .width(500)
  //     .height(300)
  //   }

  // v1.hconcat(
  //   plot(v1.selectSingle()).title('Single (Click)'),
  //   plot(v1.selectMulti()).title('Multiple (Shift-Click)'),
  //   plot(v1.selectInterval()).title('Interval (Drag)'),
  // ).render()
  // .then(viewElement => {
  //   document.getElementById('view').appendChild(viewElement);
  // });

  // v1.hconcat(
  //   plot(v1.selectSingle().on('mouseover')).title('Single (Click)'),
  //   plot(v1.selectMulti().on('mouseover')).title('Multiple (Shift-Click)'),
  //   // plot(v1.selectInterval()).title('Interval (Drag)'),
  // ).render()
  // .then(viewElement => {
  //   document.getElementById('view').appendChild(viewElement);
  // });

  const genres = ["Action", "Adventure", "Black Comedy", "Comedy", "Concert/Performance", "Documentary",
                "Drama", "Horror", "Musical", "Romantic Comedy", "Thriller/Suspense", "Western"];

  const mpaa = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Not Rated'];

  // const selection = vl.selectSingle('Select') // name the selection 'Select'
  //   .fields('Major_Genre', 'MPAA_Rating')          // limit selection to the Major_Genre field
  //   .init({Major_Genre: 'Drama', MPAA_Rating: "R"}) // use first genre entry as initial value
  //   .bind({Major_Genre: vl.menu(genres), MPAA_Rating: vl.radio(mpaa)});         // bind to a menu of unique genre values
  //
  // // scatter plot, modify opacity based on genre selection
  // return vl.markCircle({size: 60})
  //   .data(movies)
  //   .select(selection)
  //   .encode(
  //     vl.x().fieldQ('Rotten_Tomatoes_Rating'),
  //     vl.y().fieldQ('IMDB_Rating'),
  //     vl.tooltip().fieldN('Title'),
  //     vl.opacity().if(selection, vl.value(0.75)).value(0.1)
  //   )
  //   .width(500)
  //   .height(350)
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  // const brush = v1.selectInterval()
  //   .encodings('x') //  selection limited to x-axis
  //
  // const years = v1.markBar({width: 4})
  //   .data(movies)
  //   .select(brush)
  //   .encode(
  //     v1.x().year('Release_Date').title('Films by Release Year'),
  //     v1.y().count().title(null)
  //   )
  //   .width(600)
  //   .height(50);
  //
  // const ratings = v1.markCircle()
  //   .data(movies)
  //   .select(
  //     v1.selectInterval().bind('scales').encodings('x')
  //   )
  //   .encode(
  //       v1.x().fieldQ('Rotten_Tomatoes_Rating'),
  //       vl.y().fieldQ('IMDB_Rating').axis({minExtent: 30}),
  //       vl.tooltip(['Title', 'Release_Date', 'IMDB_Rating', 'Rotten_Tomatoes_Rating']),
  //       vl.opacity().if(brush, vl.value(0.75)).value(0.05)
  //     )
  //   .width(600);
  //
  // return v1.vconcat(years, ratings).spacing(5)
  //   .render()
  //   .then(viewElement => {
  //       document.getElementById('view').appendChild(viewElement);
  //     });

  // const brush = v1.selectInterval().encodings('x');
  // const x = v1.x().fieldT('date').title(null);
  //
  // const base = v1.markArea()
  //   .encode(x, v1.y().fieldQ('price'))
  //   .width(700);
  //
  // return v1.data(sp500)
  //   .vconcat(
  //     base.encode(x.scale({domain: brush})),
  //     base.select(brush).height(60)
  //   )
  //   .render()
  //   .then(viewElement => {
  //         document.getElementById('view').appendChild(viewElement);
  //       });

  // const hover = vl.selectSingle()
  //   .on('mouseover') // select on mouseover
  //   .nearest(true)   // select nearest point to mouse cursor
  //   .empty('none');  // empty selection should match nothing
  //
  // const click = vl.selectMulti()
  //   .empty('none');  // empty selection matches no points
  //
  // // scatter plot encodings shared by all marks
  // const plot = vl.markCircle().encode(
  //   vl.x().fieldQ('Rotten_Tomatoes_Rating'),
  //   vl.y().fieldQ('IMDB_Rating')
  // );
  //
  // // shared base for new layers
  // const base = plot.transform(
  //   vl.filter(vl.or(hover, click)) // filter to points in either selection
  // );
  //
  // // mark properties for new layers
  // const halo = {size: 100, stroke: 'firebrick', strokeWidth: 1};
  // const label = {dx: 4, dy: -8, align: 'right'};
  // const white = {stroke: 'white', strokeWidth: 2};
  //
  // // layer scatter plot points, halo annotations, and title labels
  // return vl.data(movies)
  //   .layer(
  //     plot.select(hover, click),
  //     base.markPoint(halo),
  //     base.markText(label, white).encode(vl.text().fieldN('Title')),
  //     base.markText(label).encode(vl.text().fieldN('Title'))
  //   )
  //   .width(600)
  //   .height(450)
  //   .render()
  //   .then(viewElement => {
  //           document.getElementById('view').appendChild(viewElement);
  //         });

  // select a point for which to provide details-on-demand
  // const hover = vl.selectSingle()
  //   .encodings('x')  // limit selection to x-axis value
  //   .on('mouseover') // select on mouseover events
  //   .nearest(true)   // select data point nearest the cursor
  //   .empty('none');  // empty selection includes no data points
  //
  // // define our base line chart of stock prices
  // const line = vl.markLine().encode(
  //   vl.x().fieldT('date'),
  //   vl.y().fieldQ('price').scale({type: 'log'}),
  //   vl.color().fieldN('symbol')
  // );
  //
  // // shared base for new layers, filtered to hover selection
  // const base = line.transform(vl.filter(hover));
  //
  // // mark properties for text label layers
  // const label = {align: 'left', dx: 5, dy: -5};
  // const white = {stroke: 'white', strokeWidth: 2};
  //
  // vl.data('data/stocks.csv')
  //   .layer(
  //     line,
  //     // add a rule mark to serve as a guide line
  //     vl.markRule({color: '#aaa'})
  //       .transform(vl.filter(hover))
  //       .encode(vl.x().fieldT('date')),
  //     // add circle marks for selected time points, hide unselected points
  //     line.markCircle()
  //       .select(hover) // use as anchor points for selection
  //       .encode(vl.opacity().if(hover, vl.value(1)).value(0)),
  //     // add white stroked text to provide a legible background for labels
  //     base.markText(label, white).encode(vl.text().fieldQ('price')),
  //     // add text labels for stock prices
  //     base.markText(label).encode(vl.text().fieldQ('price'))
  //   )
  //   .width(700)
  //   .height(400)
  //   .render()
  //   .then(viewElement => {
  //             document.getElementById('view').appendChild(viewElement);
  //           });

  // const brush = vl.selectInterval()
  //   .resolve('union'); // resolve all selections to a single global instance
  //
  // vl.markCircle()
  //   .data(cars)
  //   .select(brush)
  //   .encode(
  //     vl.x().fieldQ(vl.repeat('column')),
  //     vl.y().fieldQ(vl.repeat('row')),
  //     vl.color().if(brush, vl.fieldO('Cylinders')).value('grey'),
  //     vl.opacity().if(brush, vl.value(0.8)).value(0.1)
  //   )
  //   .width(140)
  //   .height(140)
  //   .repeat({
  //     column: ['Acceleration', 'Horsepower', 'Miles_per_Gallon'],
  //     row: ['Miles_per_Gallon', 'Horsepower', 'Acceleration']
  //   })
  //   .render()
  //   .then(viewElement => {
  //     document.getElementById('view').appendChild(viewElement);
  //   });

  const brush = vl.selectInterval().encodings('x').resolve('intersect');

  const hist = vl.markBar().encode(
    vl.x().fieldQ(vl.repeat('row'))
      .bin({maxbins: 200, minstep: 1}) // up to 100 bins, but no smaller than 1 unit
      .axis({format: 'd', titleAnchor: 'start'}), // integer format, left-aligned title
    vl.y().count().title(null) // no y-axis title
  );

  vl.layer(
      hist.select(brush).encode(vl.color().value('lightgrey')),
      hist.transform(vl.filter(brush))
    )
    .width(900).height(100)
    .repeat({row: ['delay', 'distance', 'time']})
    .data(flights)
    .transform(
      vl.calculate('datum.delay < 180 ? datum.delay : 180').as('delay'), // clamp delays > 3 hours
      vl.calculate('hours(datum.date) + minutes(datum.date) / 60').as('time') // fractional hours
    )
    .config({view: {stroke: null}}) // no outline
    .render()
    .then(viewElement => {
        document.getElementById('view').appendChild(viewElement);
      });

  }
}

drawPlot();
