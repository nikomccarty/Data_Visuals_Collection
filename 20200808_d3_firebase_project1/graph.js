const dims = {height: 300, width: 300, radius: 150};
const cent = {x: (dims.width / 2 + 5), y: (dims.height) / 2 + 5}
const margins = {bottom: 150, right: 150};

const svg = d3.select("#canvas").append("svg")
  .attr("height", dims.height + margins.bottom)
  .attr("width", dims.width + margins.right);

const graph = svg.append("g")
  .attr("transform", `translate(${cent.x}, ${cent.y})`);

const pie = d3.pie() // a function that generates angles, in radians
  .sort(null) // do not re sort our data
  .value(d => d.cost); //generate size of slice based on cost

const color = d3.schemeCategory10;

const angles = pie([
  {name: "rent", cost: 500},
  {name: "bills", cost: 300},
  {name: "gaming", cost: 200}
]);

console.log(angles);

// var margin = ({top: 20, right: 20, bottom: 80, left: 100});
// const w = 600;
// const h = 600;
// const gw = 600 - margin.left - margin.right;
// const gh = 600 - margin.top - margin.bottom;
//

//
// const graph = svg.append("g")
//   .attr('width', gw)
//   .attr('height', gh)
//   .attr("transform", `translate(${margin.left},${margin.top})`);
