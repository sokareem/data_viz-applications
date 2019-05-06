/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/
var margin = { left:80, right:20, top:50, bottom: 100};
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    
    
    var g = d3.select("#chart-area")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom+100)
        .append("g")
          .attr("transfrom","translate(" +margin.left + ", " + margin.top + ")");
		
			var time = 0;
			// Scales
			var x = d3.scaleLog() // x-scale
				.base(10)
				.range([0,width])
				.domain([142, 150000]);
			var y = d3.scaleLinear() // y-scale
				.range([height, 0])
				.domain([0,90]);
			var area = d3.scaleLinear() // area represents population?
				.range([25*Math.PI,1500*Math.PI])
				.domain([2000,1400000000]);
			var continentColor = d3.scaleOrdinal(d3.schemePastel1);
      //Axis
      var xAxisGroup = g.append("g")
        .attr("class","x-axis")
        .attr("transform", "translate(0, " + height +")")
      //ticks for y axis
      var yAxisGroup = g.append("g")
      .attr("class", "y-axis")
      .attr("transform","translate(" + width + ", 0)");
		
			//Labels
    //X Label
    var xLabel = g.append("text")
      .attr("x", width/2)
      .attr("y", height + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("GDP Per Capita ($)");
    
    // Y Label
		var yLabel = g.append("text")
			.attr("y",-40)
			.attr("x",-170)
      .attr("font-size","20px")
      .attr("text-anchor","middle")
			.text("Life Expectancy (Years)");
			
		// Time label
		var timeLabel = g.append("text")
		.attr("y",height -10)
		.attr("x",width - 40)
		.attr("font-size", "40px")
		.attr("opacity", "0.4")
		.attr("text-anchor","middle")
		.text("1800");

d3.json("data/data.json").then(function(data){
	console.log("original data = " + data);

	//filter data to remove null countries
	var result = data.filter(data.country != null);

	console.log("filtered results = " + data);
})

