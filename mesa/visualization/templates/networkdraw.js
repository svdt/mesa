// TD: This is being pulled in.
// How to visualize?

var NetworkModule = function(width, height) {

  // Create svg tag
  var nw_tag = "<svg id='network' width='" + width + "' height='" + height + "' ></svg>";
  // var nw_tag = "<svg></svg>";

  // Append it to body:
  var network = $(nw_tag)[0];

  $("body").append(network);

  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
      svg_id = +svg.attr("id", "network");

  var color = d3.scaleOrdinal(d3.schemeCategory20);


  var draw_graph = function (){

      // ToDo: forceSimulation is what determines the layout
      // Switch out, so it doesn't execute movement
      var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

      graph = JSON.parse(data);

      link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

      node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) {
          return d.agent.color;
        })

      node.append("title")
          .text(function(d) { return d.id; });

      simulation
        .nodes(graph.nodes)
        .on("tick", ticked);
      simulation.force("link")
        .links(graph.links);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
  };

  var refreshNetwork = function() {
    svg.selectAll("g").data(data).enter()

  };

  function update() {
    console.log("update called.")
    // call enter? exit? -- need to read more.
  };



  this.render = function(data) {
    draw_graph();
    data.labels = [];
  };


  this.reset = function() {
    // Destroy network and recreate
    // svg.selectAll("*").remove();
    // svg.selectAll("g").selectAll(".nodes").remove();
    svg.selectAll("g").remove();
  };

}


