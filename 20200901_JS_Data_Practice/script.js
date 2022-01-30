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

///////////////////////////////////////////
// Loading a Dataset
///////////////////////////////////////////

// const dataset = d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv")
//   .then(data => {
//     data.forEach(d => {
//       d.population = +d.population;
//       d["land area"] = +d["land area"];
//     });
//     return data;
//   })

// const dataset = d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv")
//   .then(data => {
//     for (let d of data) {
//       d.population = +d.population;
//       d["land area"] = +d["land area"];
//     };
//     return data;
//   })

// const dataset = d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv", d =>
//   ({
//     city: d.city,
//     state: d.state,
//     population: +d.population,
//     land_area: +d["land area"]
//   }))

// const dataset = d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv", d3.autoType);

///////////////////////////////////////////
// Parsing TSV files and other delimited flat files
///////////////////////////////////////////

// const dataset = d3.tsv("https://cdn.rawgit.com/vlandham/js_data/master/data/animals.tsv")

// const psv = d3.dsvFormat("|")
// const dataset = d3.text("https://cdn.rawgit.com/vlandham/js_data/master/data/animals_piped.txt").then(
//   (txt) => psv.parse(txt)
// )

///////////////////////////////////////////
// Reading JSON
///////////////////////////////////////////

// const dataset = d3.json("https://cdn.rawgit.com/vlandham/js_data/master/data/employees.json")

///////////////////////////////////////////
// Loading Multiple Datasets
///////////////////////////////////////////

// const dataset = Promise.all([d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv"),
// d3.tsv("https://cdn.rawgit.com/vlandham/js_data/master/data/animals.tsv")])
//   .then(
//   function success(allData) {
//     const cities = allData[0],
//           animals = allData[1];
//     return [cities[0], animals[0]];
//   },
//   function error(e) {
//     throw e;
// })

///////////////////////////////////////////
// MERGING DATA
///////////////////////////////////////////

// const articles = [
//   {
//     id: 1,
//     name: "vacuum cleaner",
//     weight: 9.9,
//     price: 89.9,
//     brand_id: 2
//   },
//   {
//     id: 2,
//     name: "washing machine",
//     weight: 540,
//     price: 230,
//     brand_id: 1
//   },
//   {
//     id: 3,
//     name: "hair dryer",
//     weight: 1.2,
//     price: 24.99,
//     brand_id: 2
//   },
//   {
//     id: 4,
//     name: "super fast laptop",
//     weight: 400,
//     price: 899.9,
//     brand_id: 3
//   }
// ];
//
// const brands = [
//   {
//     id: 1,
//     name: "SuperKitchen"
//   },
//   {
//     id: 2,
//     name: "HomeSweetHome"
//   }
// ];
//
// console.table(articles)
// let joinedArticles = articles.map(d => ({ ...d })); // clone articles, otherwise observable will reuse the variable
// console.table(joinedArticles)
// const mergefunc = function(joinedArticles) {
//   for (let article of joinedArticles) {
//       const brandFound = brands.filter(brand => brand.id === article.brand_id)[0];
//       //filter returns an array, we take the first element
//
//       delete article.brand_id;
//       article.brand = brandFound !== undefined ? brandFound.name : null;
//     }
//   return joinedArticles;
// }
//
// const dataset = mergefunc(joinedArticles);


///////////////////////////////////////////
// SUMMARIZING DATA
///////////////////////////////////////////

// const dataset = [
//   { city: "seattle", state: "WA", population: 652405, land_area: 83.9 },
//   { city: "new york", state: "NY", population: 8405837, land_area: 302.6 },
//   { city: "boston", state: "MA", population: 645966, land_area: 48.3 },
//   { city: "kansas city", state: "MO", population: 467007, land_area: 315 }
// ];
//
// const minLand = d3.min(dataset, d => d.land_area);
// const meanLand = d3.mean(dataset, d => d.land_area);
// const medianLand = d3.median(dataset, d => d.land_area);
// const deviationLand = d3.deviation(dataset, d => d.land_area);
//
// console.log(minLand, meanLand, medianLand, deviationLand)


///////////////////////////////////////////
// ITERATING OVER / REDUCING DATA
///////////////////////////////////////////

// const dataset = [
//   { city: "seattle", state: "WA", population: 652405, land_area: 83.9 },
//   { city: "new york", state: "NY", population: 8405837, land_area: 302.6 },
//   { city: "boston", state: "MA", population: 645966, land_area: 48.3 },
//   { city: "kansas city", state: "MO", population: 467007, land_area: 315 }
// ];
//
// // let's sort this data by population
//
// let dataCopy = dataset.map(d => ({...d}));
//
// dataCopy.sort((a,b) => b.population - a.population);
//
//
// console.log(dataset)
// console.log(dataCopy)



///////////////////////////////////////////
// GROUPING DATA
///////////////////////////////////////////

// const expenses = [
//   { name: "jim", amount: 34, date: "11/12/2015" },
//   { name: "carl", amount: 120.11, date: "11/12/2015" },
//   { name: "jim", amount: 45, date: "12/01/2015" },
//   { name: "stacy", amount: 12.00, date: "01/04/2016" },
//   { name: "stacy", amount: 34.10, date: "01/04/2016" },
//   { name: "stacy", amount: 44.80, date: "01/05/2016" }
// ];
//
// const expensesByName = d3.group(expenses, d => d.name);
//
// console.log(expensesByName)
// console.log(expensesByName.get("jim"))
//
// // Second argument for d3.rollup is always WHAT you want to GROUP
//
// const expensesCount = d3.rollup(
//   expenses,
//   v => v.length, // count number of items
//   d => d.name // group by name
// )
//
// console.log(expensesCount)
//
// const expensesAvgAmount = d3.rollup(
//   expenses,
//   v => d3.mean(v, d => d.amount), // aggregate by mean of amount
//   d => d.name // group by name
// )
//
// console.log(expensesAvgAmount)
//
// const expenseMetrics = d3.rollup(
//   expenses,
//   v => ({
//     count: v.length,
//     total: d3.sum(v, d => d.amount),
//     avg: d3.mean(v, d => d.amount)
//   }),
//   d => d.name
// )
//
// console.log(expenseMetrics)
//
//
// // Rollups returns an array, which can be used with d3.selections
// const expensesTotal = d3.rollups(
//   expenses,
//   v => ({
//     count: v.length,
//     total: d3.sum(v, d => d.amount),
//     avg: d3.mean(v, d => d.amount)
//   }),
//   d => d.name
// );
//
// console.log(expensesTotal)
//
// const expensesTotalByName = d3.rollup(
//   expenses,
//   v => d3.sum(v, d => d.amount), //Aggregate by the sum of amount
//   d => d.name, // group first by name
//   d => d.date // then by date
// );
//
// console.log(expensesTotalByName)
//
// // How can we determine totals, for all expenses, for each year?
// const expensesByYear = d3.rollup(
//   expenses,
//   v => d3.sum(v, d => d.amount),
//   d => d.date.split("/")[2]
// );
//
// console.log(expensesByYear);


///////////////////////////////////////////
// MANIPULATING STRINGS
///////////////////////////////////////////

const stringBoi = "I'm am a string!"
console.log(stringBoi[7])
console.log(stringBoi.slice(0,5))

// Strip whitespace, see the trim method
console.log("A man, a plan, a canal".indexOf("man") !== -1);
console.log("A man, a plan, a canal".replace("canal", ""));
console.log("A man, a plan, a canal".replace(
  / a /g, // The /g specifies that we want to replace all instances
  " the "
))
