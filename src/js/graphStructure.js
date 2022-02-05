import Queue from "./queue.js";


class Graph {
    constructor(numNodes){
        this.numNodes = numNodes;
        this.AdjList =  new Map();
    }

    addNode(v){
        this.AdjList.set(v, []);
    }


    addEdge(v, u){
        this.AdjList.get(v).push(w);
    }

    BFS(initialNode){

        var visited =  {};
        var q = new Queue();
        visited[initialNode] = true;
        q.enqueue(initialNode);

        while(!q.isEmpty()){
            var getQueueElement = q.dequeue();
            console.log(getQueueElement);
            var getList = this.AdjList.get(getQueueElement);
    
            for (var i in getList) {
                var n = getList[i];
    
                if (!visited[n]) {
                    visited[n] = true;
                    q.enqueue(n);
                }
            }
        }
    }

    printGraph() {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys){
            var get_values = this.AdjList.get(i);
            var conc = "";     

            for (var j in get_values){
                conc += j + " ";
            }
            console.log(i + " -> " + conc);
        }

    }

}

//// exemplos teste

var g = new Graph(12);

var nodes = [ 'silicon valley', 'jogos vorazes', 'gravidade', 'apollo 14', 'duro de matar', 'o regresso', 'user1', 'user2', 'user3', 'user4', 'user5', 'user6' ];

for (var i = 0; i < nodes.length; i++) {
    g.addNode(nodes[i]);
}

g.addEdge('silicon valley', 'user4');
g.addEdge('silicon valley', 'user1');
g.addEdge('jogos vorazes', 'user2');
g.addEdge('gravidade', 'user6');
g.addEdge('gravidade', 'user5');
g.addEdge('apollo 14', 'user6');
g.addEdge('duro de matar', 'user5');
g.addEdge('duro de matar', 'user3');
g.addEdge('o regresso', 'user5');
g.addEdge('o regresso', 'user3');


g.printGraph();

