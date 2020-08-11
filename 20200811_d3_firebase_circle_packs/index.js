const data = [
  { name: 'news', parent: '' },
  { name: 'tech', parent: 'news' },
  { name: 'sport', parent: 'news' },
  { name: 'music', parent: 'news' },
  { name: 'ai', parent: 'tech', amount: 7 },
  { name: 'coding', parent: 'tech', amount: 5 },
  { name: 'tablets', parent: 'tech', amount: 4 },
  { name: 'laptops', parent: 'tech', amount: 6 },
  { name: 'd3', parent: 'tech', amount: 3 },
  { name: 'gaming', parent: 'tech', amount: 3 },
  { name: 'football', parent: 'sport', amount: 6 },
  { name: 'hockey', parent: 'sport', amount: 3 },
  { name: 'baseball', parent: 'sport', amount: 5 },
  { name: 'tennis', parent: 'sport', amount: 6 },
  { name: 'f1', parent: 'sport', amount: 1 },
  { name: 'house', parent: 'music', amount: 3 },
  { name: 'rock', parent: 'music', amount: 2 },
  { name: 'punk', parent: 'music', amount: 5 },
  { name: 'jazz', parent: 'music', amount: 2 },
  { name: 'pop', parent: 'music', amount: 3 },
  { name: 'classical', parent: 'music', amount: 5 },
];

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 1060)
  .attr('height', 800);

const graph = svg.append('g')
  .attr('transform', 'translate(50, 50)');

const stratify = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

// console.log(stratify(data));
const rootNode = stratify(data)
  .sum(d => d.amount); // sum of each branch

// console.log(rootNode);

const pack = d3.pack()
  .size([960, 700])
  .padding(5);

// now call pack, and pass in the rootNode
console.log(pack(rootNode)); // now has radius and x, y values

// we want to convert this back to array format ....
// console.log(pack(rootNode).descendants());

const bubbleData = pack(rootNode).descendants();

//create ordinal scale
const color = d3.scaleOrdinal(['#d1c4e9', '#b39ddb', '#9575cd']);

console.log(bubbleData);

// join bubbleData to groups for each node
const nodes = graph.selectAll('g')
  .data(bubbleData)
  .enter()
  .append('g') // append groups, not circles
  .attr('transform', d => `translate(${d.x}, ${d.y})`);

nodes.append('circle')
  .attr('r', d => d.r)
  .attr('stroke', 'white')
  .attr('stroke-width', 2)
  .attr('fill', d => color(d.depth));

// append text to nodes WITHOUT any children ...
nodes.filter(d => !d.children) // filter based on children truth-y or false-y
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '0.3em') // dy is offset in y direction
  .attr('fill', 'white')
  .style('font-size', d => d.value * 5)
  .text(d => d.data.name)
