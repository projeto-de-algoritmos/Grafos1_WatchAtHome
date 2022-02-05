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


}
