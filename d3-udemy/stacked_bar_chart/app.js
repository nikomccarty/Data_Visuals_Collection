// Data
var data            =   [
    { pigeons: 6, doves: 8, eagles: 15 },
    { pigeons: 9, doves: 15, eagles: 5 },
    { pigeons: 11, doves: 13, eagles: 14 },
    { pigeons: 15, doves: 4, eagles: 20 },
    { pigeons: 22, doves: 25, eagles: 23 }
];

var chart_width     =   800;
var chart_height    =   400;
var color           =   d3.scaleOrdinal( d3.schemeCategory10 );

// Create SVG Element
var svg             =   d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);