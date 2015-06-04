/**
*
*
*
*
*
*
*
*
*/


var Chart = {};

Chart.line = function() {

	var margin = {'top': 20, 'right': 20, 'bottom': 50, 'left': 80},
		height = 300,
		width = 760,
		xLabel = 'x',
		yLabel = 'y',
		xTicks, yTicks,
		legend = [''],
		xValue = function(d) { return d.x; },
		yValue = function(d) { return d.y; },
		label = function(d) { return d.label; },
		xScale = d3.scale.linear(),
		yScale = d3.scale.linear(),
		xAxis = d3.svg.axis().scale( xScale ).orient( 'bottom' ),
		yAxis = d3.svg.axis().scale( yScale ).orient( 'left' ),
		xDomain, yDomain,
		interpolation = 'basis',
		line = d3.svg.line().x( X ).y( Y ).interpolate( interpolation ),
		canvas, graph, dataset, lines, circles;

	// Stack generator:
	var stack = d3.layout.stack();

	function chart( selection ) {

		selection.each( function( data ) {

			// Standardize the data:
			data = formatData( data );

			// Update the chart parameters:
			updateParams( data );

			// Create the chart base:
			createBase( this );

			// Create the lines:
			createLines( data );

			// Create the circles:
			createCircles( data );

			// Create the axes:
			createAxes();

		});

	}; // end FUNCTION chart()

	function formatData( data ) {

		// Convert data to standard representation; needed for non-deterministic accessors:
		data = data.map( function(d, i) {
			return {
				'x': xValue.call(data, d, i),
				'y': yValue.call(data, d, i),
				'label': label.call(data, d, i)
			};
		});

		return data;

	}; // end FUNCTION formatData()

	function updateParams( data ) {

		if (!xDomain) {
			var xMin = d3.min( data, function(d) {
				return d.x;
			});
			var xMax = d3.max( data, function(d) { 
				return d.x; 
			});
			xDomain = [xMin, xMax];
		};
		if (!yDomain) {
			var yMin = 0,
				yMax = d3.max( data, function(d) { 
					return d.y; 
				});
			yDomain = [yMin, yMax];
		};
		if (yTicks) {
			yAxis.ticks( yTicks );
		};

		// Update the x-scale:
		xScale
			.domain( xDomain ) 
			.range( [0, width - margin.left - margin.right] );

		// Update the y-scale:
		yScale
			.domain( yDomain )
			.range( [height - margin.top - margin.bottom, 0]);

	}; // end FUNCTION updateParams()

	function createBase( selection ) {

		// Create the SVG element:
		canvas = d3.select( selection ).append('svg:svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'canvas');

		// Create the graph element:
		graph = canvas.append('svg:g')
			.attr('class', 'graph')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	}; // end FUNCTION createBase()

	function createLines( data ) {

		// Create the dataset group:
		dataset = graph.append('svg:g')
			.attr('class', 'dataset');
			
		// Add paths:
		lines = dataset.selectAll('.line')
			.data( data )
		  .enter().append('svg:path')
		  	.attr('class', 'line')
		  	.attr('d', line);

		// Add tooltips:
		lines.append('svg:title')
			.text( 'Data' );

	}; // end FUNCTION createLines()


	function createCircles( data ) {

		// Add circles:
		circles = dataset.selectAll('.circle')
			.data( data )
		  .enter().append('svg:circle')
		  	.attr('class', 'circle')
		  	.attr('cx', function(d) { return X(d); })
		  	.attr('cy', function(d) { return Y(d); })
		  	.attr('r', 5);

		// Add tooltips:
		circles.append('svg:title')
			.text( function(d) { return 'x: ' + d.x + ', y: ' + d.y; });

	}; // end FUNCTION createCircles()

	function createAxes() {

		graph.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (yScale.range()[0]) + ')')
			.call( xAxis );

		graph.select('.x.axis')
			.append('svg:text')
				.attr('y', 40)
				.attr('x', (width - margin.left - margin.right)/ 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( xLabel );

		graph.append('svg:g')
			.attr('class', 'y axis')
			.call( yAxis )
				.append('svg:text')
				.attr('transform', 'rotate(-90)')
				.attr('y', -64)
				.attr('x', -yScale.range()[0] / 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( yLabel );

	}; // end FUNCTION createAxes()

	// x-accessor:
	function X(d) {
		return xScale( d.x );
	};

	// y-accessor:
	function Y(d) {
		return yScale( d.y );
	};

	// Set/Get: margin
	chart.margin = function( _ ) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	};

	// Set/Get: width
	chart.width = function( _ ) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	};

	// Set/Get: height
	chart.height = function( _ ) {
		if (!arguments.length) return height;
		height = _;
		return chart;
	};

	// Set/Get: x
	chart.x = function( _ ) {
		if (!arguments.length) return xValue;
		xValue = _;
		return chart;
	};

	// Set/Get: y
	chart.y = function( _ ) {
		if (!arguments.length) return yValue;
		yValue = _;
		return chart;
	};

	// Set/Get: xLabel
	chart.xLabel = function( _ ) {
		if (!arguments.length) return xLabel;
		xLabel = _;
		return chart;
	};

	// Set/Get: yLabel
	chart.yLabel = function( _ ) {
		if (!arguments.length) return yLabel;
		yLabel = _;
		return chart;
	};

	// Set/Get: legend
	chart.legend = function( _ ) {
		if (!arguments.length) return legend;
		legend = _;
		return chart;
	};

	// Set/Get: interpolation
	chart.interpolation = function( _ ) {
		if (!arguments.length) return interpolation;
		interpolation = _;
		line.interpolate( interpolation );
		return chart;
	};

	// Set/Get: xScale
	chart.xScale = function( _ ) {
		if (!arguments.length) return xScale;
		xScale = _;
		xAxis.scale( xScale );
		return chart;
	};

	// Set/Get: xDomain
	chart.xDomain = function( _ ) {
		if (!arguments.length) return xDomain;
		xDomain = _;
		return chart;
	};

	// Set/Get: yDomain
	chart.yDomain = function( _ ) {
		if (!arguments.length) return yDomain;
		yDomain = _;
		return chart;
	};

	// Set/Get: xTicks
	chart.xTicks = function( _ ) {
		if (!arguments.length) return xTicks;
		xTicks = _;
		return chart;
	};

	// Set/Get: yTicks
	chart.yTicks = function( _ ) {
		if (!arguments.length) return yTicks;
		yTicks = _;
		return chart;
	};

	return chart;

}; // end FUNCTION line()





Chart.multiline = function() {

	var margin = {'top': 20, 'right': 20, 'bottom': 50, 'left': 80},
		height = 300,
		width = 760,
		xLabel = 'x',
		yLabel = 'y',
		xTicks, yTicks,
		legend = [''],
		xValue = function(d) { return d.x; },
		yValue = function(d) { return d.y; },
		label = function(d) { return d.label; },
		xScale = d3.scale.linear(),
		yScale = d3.scale.linear(),
		xAxis = d3.svg.axis().scale( xScale ).orient( 'bottom' ),
		yAxis = d3.svg.axis().scale( yScale ).orient( 'left' ),
		xDomain, yDomain,
		interpolation = 'basis',
		line = d3.svg.line().x( X ).y( Y ).interpolate( interpolation ),
		canvas, graph, dataset, lines, circles, series;

	// Stack generator:
	var stack = d3.layout.stack();

	function chart( selection ) {

		selection.each( function( data ) {

			// Standardize the data:
			data = formatData( data );

			// Update the chart parameters:
			updateParams( data );

			// Create the chart base:
			createBase( this );

			// Create the lines:
			createLines( data );

			// Create the circles:
			createCircles( data );

			// Create the axes:
			createAxes();

		});

	}; // end FUNCTION chart()

	function formatData( data ) {

		// Convert data to standard representation; needed for non-deterministic accessors:
		data = d3.range(data.length).map(function(id) {
			return data[id].map( function(d, i) {
				return {
					'x': xValue.call(data[id], d, i),
					'y': yValue.call(data[id], d, i),
					'label': label.call(data[id], d, i)
				};
			});
		});

		return data;

	}; // end FUNCTION formatData()

	function updateParams( data ) {

		if (!xDomain) {
			var xMin = d3.min(data, function(dataset) {
				return d3.min( dataset, function(d) {
					return d.x;
				});
			});
			var xMax = d3.max(data, function(dataset) { 
				return d3.max( dataset, function(d) { 
					return d.x; 
				});
			});
			xDomain = [xMin, xMax];
		};
		if (!yDomain) {
			var yMin = 0,
				yMax = d3.max(data, function(dataset) { 
				return d3.max( dataset, function(d) { 
					return d.y; 
				});
			});
			yDomain = [yMin, yMax];
		};
		if (yTicks) {
			yAxis.ticks( yTicks );
		};

		// Update the x-scale:
		xScale
			.domain( xDomain ) 
			.range( [0, width - margin.left - margin.right] );

		// Update the y-scale:
		yScale
			.domain( yDomain )
			.range( [height - margin.top - margin.bottom, 0]);

	}; // end FUNCTION updateParams()

	function createBase( selection ) {

		// Create the SVG element:
		canvas = d3.select( selection ).append('svg:svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'canvas');

		// Create the graph element:
		graph = canvas.append('svg:g')
			.attr('class', 'graph')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	}; // end FUNCTION createBase()

	function createLines( data ) {

		// Create the dataset group:
		dataset = graph.append('svg:g')
			.attr('class', 'dataset');
			
		// Add paths:
		lines = dataset.selectAll('.line')
			.data( data )
		  .enter().append('svg:path')
		  	.attr('class', 'line')
		  	.attr('d', line);

		// Add tooltips:
		lines.append('svg:title')
			.text( 'Data' );

	}; // end FUNCTION createLines()


	function createCircles( data ) {

		// Create a series group:
		series = dataset.selectAll('.series')
			.data( data )
		  .enter().append('svg:g')
		  	.attr('class', 'series');

		// Add circles:
		circles = series.selectAll('.circle')
			.data( function(d) { return d; } )
		  .enter().append('svg:circle')
		  	.attr('class', 'circle')
		  	.attr('cx', function(d) { return X(d); })
		  	.attr('cy', function(d) { return Y(d); })
		  	.attr('r', 5);

		// Add tooltips:
		circles.append('svg:title')
			.text( function(d) { return 'x: ' + d.x + ', y: ' + d.y; });

	}; // end FUNCTION createCircles()

	function createAxes() {

		graph.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (yScale.range()[0]) + ')')
			.call( xAxis );

		graph.select('.x.axis')
			.append('svg:text')
				.attr('y', 40)
				.attr('x', (width - margin.left - margin.right)/ 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( xLabel );

		graph.append('svg:g')
			.attr('class', 'y axis')
			.call( yAxis )
				.append('svg:text')
				.attr('transform', 'rotate(-90)')
				.attr('y', -64)
				.attr('x', -yScale.range()[0] / 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( yLabel );

	}; // end FUNCTION createAxes()

	// x-accessor:
	function X(d) {
		return xScale( d.x );
	};

	// y-accessor:
	function Y(d) {
		return yScale( d.y );
	};

	// Set/Get: margin
	chart.margin = function( _ ) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	};

	// Set/Get: width
	chart.width = function( _ ) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	};

	// Set/Get: height
	chart.height = function( _ ) {
		if (!arguments.length) return height;
		height = _;
		return chart;
	};

	// Set/Get: x
	chart.x = function( _ ) {
		if (!arguments.length) return xValue;
		xValue = _;
		return chart;
	};

	// Set/Get: y
	chart.y = function( _ ) {
		if (!arguments.length) return yValue;
		yValue = _;
		return chart;
	};

	// Set/Get: xLabel
	chart.xLabel = function( _ ) {
		if (!arguments.length) return xLabel;
		xLabel = _;
		return chart;
	};

	// Set/Get: yLabel
	chart.yLabel = function( _ ) {
		if (!arguments.length) return yLabel;
		yLabel = _;
		return chart;
	};

	// Set/Get: legend
	chart.legend = function( _ ) {
		if (!arguments.length) return legend;
		legend = _;
		return chart;
	};

	// Set/Get: interpolation
	chart.interpolation = function( _ ) {
		if (!arguments.length) return interpolation;
		interpolation = _;
		line.interpolate( interpolation );
		return chart;
	};

	// Set/Get: xScale
	chart.xScale = function( _ ) {
		if (!arguments.length) return xScale;
		xScale = _;
		xAxis.scale( xScale );
		return chart;
	};

	// Set/Get: xDomain
	chart.xDomain = function( _ ) {
		if (!arguments.length) return xDomain;
		xDomain = _;
		return chart;
	};

	// Set/Get: yDomain
	chart.yDomain = function( _ ) {
		if (!arguments.length) return yDomain;
		yDomain = _;
		return chart;
	};

	// Set/Get: xTicks
	chart.xTicks = function( _ ) {
		if (!arguments.length) return xTicks;
		xTicks = _;
		return chart;
	};

	// Set/Get: yTicks
	chart.yTicks = function( _ ) {
		if (!arguments.length) return yTicks;
		yTicks = _;
		return chart;
	};

	return chart;

}; // end FUNCTION multiline()



Chart.interactive = function() {

	var margin = {'top': 30, 'right': 20, 'bottom': 50, 'left': 80},
		height = 300,
		width = 760,
		xLabel = 'x',
		yLabel = 'y',
		xTicks, yTicks,
		legend = [''],
		xValue = function(d) { return d.x; },
		yValue = function(d) { return d.y; },
		label = function(d) { return d.label; },
		xScale = d3.scale.linear(),
		yScale = d3.scale.linear(),
		colors = d3.scale.category10(),
		xAxis = d3.svg.axis().scale( xScale ).orient( 'bottom' ),
		yAxis = d3.svg.axis().scale( yScale ).orient( 'left' ),
		xDomain, yDomain,
		interpolation = 'basis',
		line = d3.svg.line().x( X ).y( Y ).interpolate( interpolation ),
		canvas, graph, dataset, lines, circles, series, controls, control;

	// Stack generator:
	var stack = d3.layout.stack();

	function chart( selection ) {

		selection.each( function( data ) {

			// Standardize the data:
			data = formatData( data );

			// Update the chart parameters:
			updateParams( data );

			// Create the chart base:
			createBase( this );

			// Create the lines:
			createLines( data );

			// Create the circles:
			createCircles( data );

			// Create the axes:
			createAxes();

			// Create the legend controls:
			createLegend();

		});

	}; // end FUNCTION chart()

	function formatData( data ) {

		// Convert data to standard representation; needed for non-deterministic accessors:
		data = d3.range(data.length).map(function(id) {
			return data[id].map( function(d, i) {
				return {
					'x': xValue.call(data[id], d, i),
					'y': yValue.call(data[id], d, i),
					'label': label.call(data[id], d, i)
				};
			});
		});

		return data;

	}; // end FUNCTION formatData()

	function updateParams( data ) {

		if (!xDomain) {
			var xMin = d3.min(data, function(dataset) {
				return d3.min( dataset, function(d) {
					return d.x;
				});
			});
			var xMax = d3.max(data, function(dataset) { 
				return d3.max( dataset, function(d) { 
					return d.x; 
				});
			});
			xDomain = [xMin, xMax];
		};
		if (!yDomain) {
			var yMin = 0,
				yMax = d3.max(data, function(dataset) { 
				return d3.max( dataset, function(d) { 
					return d.y; 
				});
			});
			yDomain = [yMin, yMax];
		};
		if (yTicks) {
			yAxis.ticks( yTicks );
		};

		// Update the x-scale:
		xScale
			.domain( xDomain ) 
			.range( [0, width - margin.left - margin.right] );

		// Update the y-scale:
		yScale
			.domain( yDomain )
			.range( [height - margin.top - margin.bottom, 0]);

	}; // end FUNCTION updateParams()

	function createBase( selection ) {

		// Create the SVG element:
		canvas = d3.select( selection ).append('svg:svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'interactive canvas');

		// Create the graph element:
		graph = canvas.append('svg:g')
			.attr('class', 'graph')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// Create the controls element:
		controls = graph.append('svg:g')
			.attr('class', 'controls');

	}; // end FUNCTION createBase()

	function createLines( data ) {

		// Create the dataset group:
		dataset = graph.append('svg:g')
			.attr('class', 'dataset');
			
		// Add paths:
		lines = dataset.selectAll('.line')
			.data( data )
		  .enter().append('svg:path')
		  	.attr('class', 'line')
		  	.attr('d', line)
		  	.attr('fill', function(d,i) { return colors(i); });

		// Add tooltips:
		lines.append('svg:title')
			.text( 'Data' );

	}; // end FUNCTION createLines()


	function createCircles( data ) {

		// Create a series group:
		series = dataset.selectAll('.series')
			.data( data )
		  .enter().append('svg:g')
		  	.attr('class', 'series')
		  	.attr('fill', function(d,i) { 
		  		return colors(i); 
		  	})
		  	.on('mouseover', mouseover)
		  	.on('mouseout', mouseout);

		// Add circles:
		circles = series.selectAll('.circle')
			.data( function(d) { return d; } )
		  .enter().append('svg:circle')
		  	.attr('class', 'circle')
		  	.attr('cx', function(d) { return X(d); })
		  	.attr('cy', function(d) { return Y(d); })
		  	.attr('r', 5);

		// Add tooltips:
		circles.append('svg:title')
			.text( function(d) { return 'x: ' + d.x + ', y: ' + d.y; });

		function mouseover() {

			var that = this;

			d3.selectAll('.interactive .series').filter(function(d) {
				return this != that;
			}).call( filter, fadeOut );

		};

		function mouseout() {

			d3.selectAll('.interactive .series').call( filter, fadeIn );

		};

	}; // end FUNCTION createCircles()

	function createAxes() {

		graph.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (yScale.range()[0]) + ')')
			.call( xAxis );

		graph.select('.x.axis')
			.append('svg:text')
				.attr('y', 40)
				.attr('x', (width - margin.left - margin.right)/ 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( xLabel );

		graph.append('svg:g')
			.attr('class', 'y axis')
			.call( yAxis )
				.append('svg:text')
				.attr('transform', 'rotate(-90)')
				.attr('y', -64)
				.attr('x', -yScale.range()[0] / 2)
				.attr('text-anchor', 'middle')
				.attr('class', 'label')
				.text( yLabel );

	}; // end FUNCTION createAxes()

	function createLegend() {

		var layers = legend.map( function(d,i) {
			return {
				legend: d,
				el: function() {
					return d3.selectAll('.interactive .series')[0][i];
				}
			}
		});

		controls.attr('transform', 'translate(' + (width-margin.right-560) + ',-20)');

		control = controls.selectAll('.control')
			.data( layers )
		  .enter().append('svg:g')
		  	.attr('class', 'control')
		  	.style('cursor', 'pointer');

		control.append('svg:circle')
			.attr('class', 'control-symbol')
			.attr('r', 5)
			.attr('cx', function(d,i) {
				return i * 80;
			})
			.attr('cy', 0)
			.attr('fill', function(d,i) { return colors(i); });

		control.append('svg:text')
			.attr('class', 'control-text')
			.attr('dy', '.35em')
			.attr('transform', function(d,i) {
				return 'translate(' + (i*80 + 10) + ',0)';
			})
			.text( function(d) {
				return d.legend;
			});

		control.on('click', onClick);

		function onClick() {

			var selection = d3.select( this );
			
			// Toggle the class:
			selection.classed('hidden', function(d) {
					return ( d3.select( this ).classed('hidden') ) ? 0 : 1;
				});

			if ( selection.classed('hidden') ) {
				selection.select( function(d) {
					var el = d.el();

					d3.select(el).classed('hidden', 1)
						.transition()
						.duration( 500 )
						.attr('opacity', 0);					

				});
			} else {
				selection.select( function(d) {
					var el = d.el();

					d3.select(el).classed('hidden', 0)
						.call( fadeIn );
				});
			}


		};

		return chart;
	}

	function fadeOut() {
		this.transition()
			.duration( 500 )
			.attr('opacity', 0.1);
	};

	function fadeIn() {
		this.transition()
			.duration( 500 )
			.attr('opacity', 1);
	};

	function filter( selection, clbk ) {
		selection = selection.filter( function(d) {
			return !d3.select( this ).classed('hidden');
		})
		.call( clbk );		
	};

	// x-accessor:
	function X(d) {
		return xScale( d.x );
	};

	// y-accessor:
	function Y(d) {
		return yScale( d.y );
	};

	// Set/Get: margin
	chart.margin = function( _ ) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	};

	// Set/Get: width
	chart.width = function( _ ) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	};

	// Set/Get: height
	chart.height = function( _ ) {
		if (!arguments.length) return height;
		height = _;
		return chart;
	};

	// Set/Get: x
	chart.x = function( _ ) {
		if (!arguments.length) return xValue;
		xValue = _;
		return chart;
	};

	// Set/Get: y
	chart.y = function( _ ) {
		if (!arguments.length) return yValue;
		yValue = _;
		return chart;
	};

	// Set/Get: xLabel
	chart.xLabel = function( _ ) {
		if (!arguments.length) return xLabel;
		xLabel = _;
		return chart;
	};

	// Set/Get: yLabel
	chart.yLabel = function( _ ) {
		if (!arguments.length) return yLabel;
		yLabel = _;
		return chart;
	};

	// Set/Get: legend
	chart.legend = function( _ ) {
		if (!arguments.length) return legend;
		legend = _;
		return chart;
	};

	// Set/Get: interpolation
	chart.interpolation = function( _ ) {
		if (!arguments.length) return interpolation;
		interpolation = _;
		line.interpolate( interpolation );
		return chart;
	};

	// Set/Get: xScale
	chart.xScale = function( _ ) {
		if (!arguments.length) return xScale;
		xScale = _;
		xAxis.scale( xScale );
		return chart;
	};

	// Set/Get: xDomain
	chart.xDomain = function( _ ) {
		if (!arguments.length) return xDomain;
		xDomain = _;
		return chart;
	};

	// Set/Get: yDomain
	chart.yDomain = function( _ ) {
		if (!arguments.length) return yDomain;
		yDomain = _;
		return chart;
	};

	// Set/Get: xTicks
	chart.xTicks = function( _ ) {
		if (!arguments.length) return xTicks;
		xTicks = _;
		return chart;
	};

	// Set/Get: yTicks
	chart.yTicks = function( _ ) {
		if (!arguments.length) return yTicks;
		yTicks = _;
		return chart;
	};

	return chart;

}; // end FUNCTION interactive()













