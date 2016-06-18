const Graph = require('node-dijkstra')

var queries = require('../queries');

exports.calculateRoute(from, to, transport){
	var graph = constructRouteGraph();
	return pathCost = graph.path(from, to, { cost: true });
}

function constructRouteGraph(){
	const graph = new Graph();
	queries.getAllLocations(function(){
		for each (location in result.rows){
			queries.getNeighbouringLocations(location.name, function(){
				for each (location in result.rows){
					graph.addNode(location.name, 1);
				}
			});
		}
	});
}