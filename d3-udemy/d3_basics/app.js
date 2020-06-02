d3.csv("./data.csv").then(function(data){
  console.log(data);
  generate(data.columns);
})

function generate(dataset){}
  var el = d3.select('body')
      .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(function(d) {
          return 'This paragraph is bound to the number ' + d;})
        .style('color', function(d){
          if (d > 25){
            return 'red';
          } else {
            return 'blue';
          }})
        .classed('foo', function(d){
          if (d > 25){
            return false;
          } else {
            return true;
          }
        });

    console.log(el);
