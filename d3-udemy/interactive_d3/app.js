var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var bar_padding     =   5;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return i * ( chart_width / data.length );
    })
    .attr( 'y', function(d ){
        return chart_height - d * 5;
    })
    .attr( 'width', chart_width / data.length - bar_padding )
    .attr( 'height', function( d ){
        return d * 5;
    })
    .attr( 'fill', '#7ED26D' );

// Create Labels
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return i * ( chart_width / data.length ) +
                   ( chart_width / data.length - bar_padding ) / 2;
    })
    .attr( 'y', function(d ){
        return chart_height - (d * 5) + 15;
    })
    .attr( 'font-size', 14 )
    .attr( 'fill', '#fff' )
    .attr( 'text-anchor', 'middle' );