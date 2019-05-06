/*
*    main.js
*    Mastering Data Visualization with D3.js
*    
*/
/*var margin = { left:80, right:20, top:50, bottom:100 };
var width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
		*/
    var margin = { left:100, right:10, top:10, bottom: 100};
    var width = 600 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    
    var flag = true; // switcher
    
    var trans = d3.transition().duration(750); // always keep number smaller than interval in our loop.
    
    var g = d3.select("#chart-area")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom+100)
        .append("g")
          .attr("transfrom","translate(" +margin.left + ", " + margin.top + ")");
    
      //Axis
      var xAxisGroup = g.append("g")
        .attr("class","x-axis")
        .attr("transform", "translate(0, " + height +")")
      //ticks for y axis
      var yAxisGroup = g.append("g")
      .attr("class", "y-axis")
      .attr("transform","translate(" + width + ", 0)");
    
    //X Label
    var xLabel = g.append("text")
      .attr("class","x axis-label")
      .attr("x", width/2)
      .attr("y", height +80)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month");
    
    // Y Label
    var yLabel = g.append("text")
      .attr("class","y axis-label")
      .attr("x",-(height/2) +30)
      .attr("y",width +70)
      .attr("font-size","20px")
      .attr("text-anchor","middle")
      .attr("transform", "rotate(-90)")
      .text("Revenue");
    
    // loading data
    d3.json("data/revenues.json").then(function(data){
      console.log(data);
    
      data.forEach(d => {
        d.revenue = +d.revenue; //data for revenue
        d.profit = +d.profit; // data on profit
      });

        //interval for loops
        d3.interval(function(){
          update(data);
          var newData = flag ? data: data.slice(1);
          update(newData);
          flag = !flag; // switch case of flag
        },1000);
        //running the visualizer for the first time.
        update(data);
    });
    
    function update(data){
      var value = flag ? "revenue" : "profit"; // ternary operator
      var x = d3.scaleBand()
        .domain(data.map(function(d){
          return d.month ;
        }))
        .range([0,width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
      var y = d3.scaleLinear()
        .domain([0, d3.max(data,function(d){
          return d[value];
        })])
        .range([height,0]);
    
        //axis calls
        xAxisCall = d3.axisBottom(x);
        xAxisGroup.transition(trans).call(xAxisCall) // added transition
        .selectAll("text")
          .attr("y","10")
          .attr("x","-5")
          .attr("text-anchor","end")
          .attr("transform","rotate(-40)");
    
        yAxisCall = d3.axisRight(y)
        .tickFormat(function(d){
          return "$"+ d;
        });
        yAxisGroup.transition(trans).call(yAxisCall); // added transition
    
          //Update protocol

        //JOIN new data with old elements
      var rectangles = g.selectAll("rect")
        .data(data);
        .data(data,function(d){
          return d.month;
        });

        //EXIT old elements not present in new data.
        rectangles.exit()
        .attr("fill","red")
        .trans
        .transition(trans) // transition inserted
        .attr("y",y(0))
        .attr("height",0)
        .remove();

        //UPDATE old elements with present in new data.
        rectangles.attr("x", function(d){
        /*//UPDATE old elements with present in new data.
        rectangles.transition(trans) // transition inserted
        .attr("x", function(d){
          return x(d.month);
        })
        .attr("y",function(d){
          return y(d[value]);
        })
        .attr("width",x.bandwidth)
        .attr("height",function(d){
          return height -  y(d[value]);
        });
        });*/

        //ENTER new elements present in new data.
        rectangles.enter()
          .append("rect")
          .attr("width",x.bandwidth)
          .attr("fill",function(d){
            return "green";
          })
          // AND UPDATE old elements present in new data
          .merge(rectangles)
          .transition(trans) //transition inserted
          .attr("x", function(d){
            return x(d.month);
          })
          .attr("y",function(d){
            return y(d[value]);
          })
          .attr("width",x.bandwidth)
          .attr("height",function(d){
            return height -  y(d[value]);
          })
        .attr("fill",function(d){
          console.log("filled");
          return "blue";
        });
          });

        //set value of label to either revenue or profit
        var label = flag ? "Revenue" : "Profit";
        yLabel.text(label);
    }