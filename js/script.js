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

var FLG_charts = false,
	FLG_animations = false;

Reveal.addEventListener( 'viz-charts', function() {
	if (!FLG_charts) {
		createCharts();
		FLG_charts = true;
	};
});

Reveal.addEventListener( 'hardware-animations', function() {
	if (!FLG_animations) {
		createAnimations();
		FLG_animations = true;
	};
});


function createAnimations() {

	var Icons = {};


	Icons.computer = function() {

		var width = 150,
			height = 320,
			margin = {
				'top': 20,
				'right': 20,
				'bottom': 20,
				'left': 20
			},
			canvas, group;

		function icon( selection ) {

			selection.each( function() {

				// Create the icon base:
				createBase( this );

				// Create the icon:
				createIcon();

			});

		}; // end FUNCTION icon()


		function createBase( selection ){

			// Create the base canvas:
			canvas = d3.select( selection ).append('svg:svg')
				.attr('class', 'canvas')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			// Create a group element to house the drawing components and translate to the canvas center:
			group = canvas.append('svg:g')
				.attr('class', 'icon')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Attach an event listener to resize:
			group.on('click', onClick);


			function onClick() {

				var factor = 20,
					width = parseInt(canvas.style('width'), 10) * factor,
					height = parseInt(canvas.style('height'), 10) * factor;

				// Set the new canvas dimensions:
				canvas.attr('width', width )
					.attr('height', height );

				// Scale the group:
				group.transition()
					.duration(1500)
					.ease('linear')
					.attr('transform', 'scale('+factor+')');

			}; // end FUNCTION onClick()

		}; // end FUNCTION createBase()

		function createIcon() {

			// Create the large rectangle:
			group.append('svg:rect')
				.attr('class', 'shell')
				.attr('width', width)
				.attr('height', height)
				.attr('x', 0)
				.attr('y', 0)
				.attr('ry', width / 5);

			// Create the widgets:
			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 13)
				.attr('ry', 0);

			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 11 * 2.5)
				.attr('ry', 0);

			// Create a separator line:
			group.append('svg:path')
				.attr('class', 'separator')
				.attr('d', "m 0," + (height - height / 5) + ' ' + width + ",0");

			// Create a power button:
			group.append('svg:circle')
				.attr('class', 'button')
				.attr('cx', width / 2)
				.attr('cy', height - height / 10)
				.attr('r', width / 15);

		}; // end FUNCTION createIcon()

		// Set/Get: margin
		icon.margin = function( _ ) {
			if (!arguments.length) return margin;
			margin = _;
			return icon;
		};

		// Set/Get: width
		icon.width = function( _ ) {
			if (!arguments.length) return width;
			width = _;
			return icon;
		};

		// Set/Get: height
		icon.height = function( _ ) {
			if (!arguments.length) return height;
			height = _;
			return icon;
		};

		

		return icon;

	}; // end FUNCTION computer()




	// Create the icon:
	//var icon = Icons.computer();
        var icon = new Image();
        icon.src = '../img/a_computer.jpg'
	icon.height( 320 )
		.width( 150 );

	d3.select('.animation1').append('div')
		.call( icon );





	Icons.distributed = function() {

		var width = 150,
			height = 320,
			margin = {
				'top': 20,
				'right': 20,
				'bottom': 20,
				'left': 20
			},
			canvas, group;

		function icon( selection ) {

			selection.each( function() {

				// Create the icon base:
				createBase( this );

				// Create the icon:
				createIcon();

			});

		}; // end FUNCTION icon()


		function createBase( selection ){

			// Create the base canvas:
			canvas = d3.select( selection ).append('svg:svg')
				.attr('class', 'canvas')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			// Create a group element to house the drawing components and translate to the canvas center:
			group = canvas.append('svg:g')
				.attr('class', 'icon')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Attach an event listener to resize:
			group.on('click', onClick);


			// THIS IS HACKY!!! NOT A GENERAL SOLUTION!!!
			function onClick() {

				var factor = 0.5,
					width = parseInt(canvas.style('width'), 10) * factor,
					height = parseInt(canvas.style('height'), 10) * factor;

				// Scale the group:
				d3.selectAll('.animation2 .icon').transition()
					.duration(1500)
					.ease('linear')
					.attr('transform', 'scale('+factor+')')
					.each('start', function() {
						// Set the new canvas dimensions:
						d3.selectAll('.animation2 .canvas').transition()
							.duration(1500)
							.ease('linear')
							.attr('width', width )
							.attr('height', height )
							.each('end', function() {
								d3.selectAll('.animation2 .node').transition()
									.delay( function(d,i) {
										return 250*i;
									})
									.duration( 300 )
									.ease('linear')
									.style('opacity', 1);
							});
					});



			}; // end FUNCTION onClick()

		}; // end FUNCTION createBase()

		function createIcon() {

			// Create the large rectangle:
			group.append('svg:rect')
				.attr('class', 'shell')
				.attr('width', width)
				.attr('height', height)
				.attr('x', 0)
				.attr('y', 0)
				.attr('ry', width / 5);

			// Create the widgets:
			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 13)
				.attr('ry', 0);

			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 11 * 2.5)
				.attr('ry', 0);

			// Create a separator line:
			group.append('svg:path')
				.attr('class', 'separator')
				.attr('d', "m 0," + (height - height / 5) + ' ' + width + ",0");

			// Create a power button:
			group.append('svg:circle')
				.attr('class', 'button')
				.attr('cx', width / 2)
				.attr('cy', height - height / 10)
				.attr('r', width / 15);

		}; // end FUNCTION createIcon()

		// Set/Get: margin
		icon.margin = function( _ ) {
			if (!arguments.length) return margin;
			margin = _;
			return icon;
		};

		// Set/Get: width
		icon.width = function( _ ) {
			if (!arguments.length) return width;
			width = _;
			return icon;
		};

		// Set/Get: height
		icon.height = function( _ ) {
			if (!arguments.length) return height;
			height = _;
			return icon;
		};

		

		return icon;

	}; // end FUNCTION computer()




	// Create the icon:
	var icon;


	// Visible icon:
        
	icon = Icons.distributed();

	icon.height( 320 )
		.width( 150 );

	d3.select('.animation2').append('div')
		.attr('class', 'node')
		.call( icon );



	for (var i = 0; i < 19; i++) {

		icon = Icons.computer();

		icon.height( 320 )
			.width( 150 );

		d3.select('.animation2').append('div')
			.attr('class', 'node hidden')
			.call( icon );

	}; // end FOR i





	Icons.server = function() {

		var width = 150,
			height = 320,
			margin = {
				'top': 20,
				'right': 20,
				'bottom': 20,
				'left': 20
			},
			canvas, group;

		function icon( selection ) {

			selection.each( function() {

				// Create the icon base:
				createBase( this );

				// Create the icon:
				createIcon();

			});

		}; // end FUNCTION icon()


		function createBase( selection ){

			// Create the base canvas:
			canvas = d3.select( selection ).append('svg:svg')
				.attr('class', 'canvas')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			// Create a group element to house the drawing components and translate to the canvas center:
			group = canvas.append('svg:g')
				.attr('class', 'icon')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Attach an event listener to resize:
			group.on('click', onClick);


			// THIS IS HACKY!!! NOT A GENERAL SOLUTION!!!
			function onClick() {

				var width = parseInt(canvas.style('width'), 10 ),
					height = parseInt(canvas.style('height'), 10 );

				// Expand the canvas horizontally:
				canvas.attr('width', width * 3 + margin.left + margin.right);

				d3.selectAll('.animation3 .widget').transition()
					.duration(1000)
					.ease('linear')
					.attr('opacity', 0)
					.each('end', function() {
						d3.select(this).remove();
					});

				d3.selectAll('.animation3 .separator').transition()
					.duration(1000)
					.ease('linear')
					.attr('opacity', 0)
					.each('end', function() {
						d3.select(this).remove();
					});

				d3.selectAll('.animation3 .button').transition()
					.duration(1000)
					.ease('linear')
					.attr('opacity', 0)
					.each('end', function() {
						d3.select(this).remove();
					});

				d3.selectAll('.animation3 .shell').transition()
					.duration(1000)
					.ease('linear')
					.attr('ry', 5)
					.attr('width', width*3)
					.attr('height', height/3)
					.each('end', function() {
						// Shrink the canvas vertically:
						canvas.attr('height', height/3 + margin.top + margin.bottom);

						// Create new buttons:
						group.append('svg:circle')
							.attr('class', 'button')
							.attr('cx', width*3*.9)
							.attr('cy', height/3*.65)
							.attr('r', 10);

						group.append('svg:circle')
							.attr('class', 'button')
							.attr('cx', width*3*.9)
							.attr('cy', height/3*.35)
							.attr('r', 10);

						// Create new widgets:
						group.selectAll('.animation3 .widget')
							.data( d3.range(4) )
						  .enter().append('svg:rect')
						  	.attr('class', 'widget')
						  	.attr('width', width*3/30)
						  	.attr('height', height/3 - 40)
						  	.attr('x', function(d,i) {
						  		return width*3*.8 - i*(width*3/30 + width*3/90);
						  	})
						  	.attr('y', 20);

						group.append('svg:rect')
							.attr('class', 'widget')
							.attr('width', width*3/3)
							.attr('height', height/3 - 40)
							.attr('y', 20)
							.attr('x', width*3*0.06666)
							.attr('opacity', 0.1);

					});



				
			}; // end FUNCTION onClick()

		}; // end FUNCTION createBase()

		function createIcon() {

			// Create the large rectangle:
			group.append('svg:rect')
				.attr('class', 'shell')
				.attr('width', width)
				.attr('height', height)
				.attr('x', 0)
				.attr('y', 0)
				.attr('ry', width / 5);

			// Create the widgets:
			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 13)
				.attr('ry', 0);

			group.append('svg:rect')
				.attr('class', 'widget')
				.attr('width', width - 40)
				.attr('height', height / 11)
				.attr('x', 20)
				.attr('y', height / 11 * 2.5)
				.attr('ry', 0);

			// Create a separator line:
			group.append('svg:path')
				.attr('class', 'separator')
				.attr('d', "m 0," + (height - height / 5) + ' ' + width + ",0");

			// Create a power button:
			group.append('svg:circle')
				.attr('class', 'button')
				.attr('cx', width / 2)
				.attr('cy', height - height / 10)
				.attr('r', width / 15);

		}; // end FUNCTION createIcon()

		// Set/Get: margin
		icon.margin = function( _ ) {
			if (!arguments.length) return margin;
			margin = _;
			return icon;
		};

		// Set/Get: width
		icon.width = function( _ ) {
			if (!arguments.length) return width;
			width = _;
			return icon;
		};

		// Set/Get: height
		icon.height = function( _ ) {
			if (!arguments.length) return height;
			height = _;
			return icon;
		};

		

		return icon;

	}; // end FUNCTION computer()




	// Visible icon:
	icon = Icons.server();


	icon.height( 320 )
		.width( 150 );

	d3.select('.animation3').append('div')
		.attr('class', 'node')
		.call( icon );






}; // end FUNCTION createAnimations()


function createCharts() {

	var line = Chart.line(),
		height = 400,
		format = d3.time.format('%H'),
		xLabel = 'Time (hour of day)',
		yLabel = '#Tweets (millions)',
		xTicks = 6,
		yTicks = 5;

	// Load the CSV data:
	d3.csv( 'data/1.csv', function( data ) {
		
		/*data.forEach( function(d) { 
			d.time = format.parse(d.time);
		} );*/

		data = data.map( function(d) {
			return {
				'x': +d.time,
				'y': +d.tweets, // force type conversion
				'label': 'Tweets'
			};
		});


		// LINE CHART //

		// Append a new figure to the DOM:
		figure = d3.select( '.chart1' )
			.append( 'figure' )
				.attr('class', 'chart');

		// Get the figure width:
		width = parseInt( figure.style( 'width' ), 10 );

		// Update the chart generator settings:
		line.width( width )
			.height( height )
			//.xScale( d3.time.scale() )
			.xLabel( xLabel )
			.xTicks( xTicks )
			.yTicks( yTicks )
			.yLabel( yLabel );		

		// Bind the data and generate a new chart:
		figure.datum( data )
			.call( line );	

	});	





	var multiline = Chart.multiline(),
		height = 400,
		format = d3.time.format('%H'),
		xLabel = 'Time (hour of day)',
		yLabel = '#Tweets (millions)',
		xTicks = 6,
		yTicks = 5,
		datasets,
		headings = ['sf', 'nyc', 'london', 'moscow', 'delhi', 'manilla'],
		legend = ['SF', 'NYC', 'LDN', 'Moscow', 'Delhi', 'Manilla'];

	// Load the CSV data:
	d3.csv( 'data/2.csv', function( data ) {
		
		datasets = headings.map( function(heading) {
			return data.map( function(d) {
				return {
					'x': +d['x_'+heading],
					'y': +d['y_'+heading], // force type conversion
					'label': 'Tweets: ' + heading
				};
			});
		});


		// LINE CHART //

		// Append a new figure to the DOM:
		figure = d3.select( '.chart2' )
			.append( 'figure' )
				.attr('class', 'chart');

		// Get the figure width:
		width = parseInt( figure.style( 'width' ), 10 );

		// Update the chart generator settings:
		multiline.width( width )
			.height( height )
			.xLabel( xLabel )
			.xTicks( xTicks )
			.yTicks( yTicks )
			.yLabel( yLabel );		

		// Bind the data and generate a new chart:
		figure.datum( datasets )
			.call( multiline );	

	});	







	var interactive = Chart.interactive(),
		height = 400,
		format = d3.time.format('%H'),
		xLabel = 'Time (hour of day)',
		yLabel = '#Tweets (millions)',
		xTicks = 6,
		yTicks = 5,
		datasets,
		headings = ['sf', 'nyc', 'london', 'moscow', 'delhi', 'manilla'],
		legend = ['SF', 'NYC', 'London', 'Moscow', 'Delhi', 'Manilla'];

	// Load the CSV data:
	d3.csv( 'data/2.csv', function( data ) {
		
		datasets = headings.map( function(heading) {
			return data.map( function(d) {
				return {
					'x': +d['x_'+heading],
					'y': +d['y_'+heading], // force type conversion
					'label': heading
				};
			});
		});


		// LINE CHART //

		// Append a new figure to the DOM:
		figure = d3.select( '.chart3' )
			.append( 'figure' )
				.attr('class', 'chart');

		// Get the figure width:
		width = parseInt( figure.style( 'width' ), 10 );

		// Update the chart generator settings:
		interactive.legend( legend )
			.width( width )
			.height( height )
			.xLabel( xLabel )
			.xTicks( xTicks )
			.yTicks( yTicks )
			.yLabel( yLabel );		

		// Bind the data and generate a new chart:
		figure.datum( datasets )
			.call( interactive );	

	});	

}; // end FUNCTION createCharts()


