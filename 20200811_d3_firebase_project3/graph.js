const dims = {height: 500, width: 1100};
const margin = {left: 50, right: 50, top: 50, bottom: 50};

const color = d3.scaleOrdinal(d3.schemeAccent);

const svg = d3.select('.canvas')
  .append('svg')
  .attr('height', dims.height + margin.top + margin.bottom)
  .attr('width', dims.width + margin.left + margin.right);

const graph = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// data strat
const stratify = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

const tree = d3.tree()
  .size([dims.width, dims.height])

// Update Function
const update = (data) => {

  // remove current nodes
  graph.selectAll('.node').remove();
  graph.selectAll('.link').remove();

  color.domain(data.map(item => item.department));
  console.log(color);

  const rootNode = stratify(data);
  console.log(rootNode);

  const treeData = tree(rootNode);
  console.log(treeData);

  // get nodes selection and join data
  const nodes = graph.selectAll('.node') // elements with class of node
    .data(treeData.descendants()); // descendants puts it in array format

  // get link selection and join data
  const links = graph.selectAll('.link')
    .data(treeData.links()); // not descendants, but links

  // enter new links
  links.enter()
    .append('path')
    .classed('link', true)
    .attr('fill', 'none')
    .attr('stroke', '#aaa')
    .attr('stroke-width', 2)
    .attr('d', d3.linkVertical() // creates vertical link paths for us
      .x(d => d.x)
      .y(d => d.y)
    );

  // create enter node groups
  const enterNodes = nodes.enter()
    .append('g')
      .classed('node', true)
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

  // append rectangles to enter nodes
  enterNodes.append('rect')
    .attr('fill', d => color(d.data.department))
    .attr('stroke', '#555')
    .attr('stroke-width', 2)
    .attr('height', 50)
    .attr('width', d => d.data.name.length * 20)
    .attr('transform', d => {
      var x = d.data.name.length * 20;
      return `translate(${-x / 2}, -25)`
    });

  //append name text to enterNodes
  enterNodes.append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#aaa')
    .text(d => d.data.name)
    .attr('transform', 'translate(0,8)');

};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// data and firebase hookup
var data = [];

db.collection('employees').onSnapshot(res => {
  res.docChanges().forEach(change => {

    const doc = {...change.doc.data(), id: change.doc.id};

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data);

});
