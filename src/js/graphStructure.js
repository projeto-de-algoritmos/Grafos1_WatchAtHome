import Queue from "./queue";


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
        this.AdjList.get(w).push(v);
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

///////////////////////// 
// bipartido
//class Graph {
//    constructor(numNodes){
//        this.numNodes = numNodes;
//        this.AdjListMovie =  new Map();
//        this.AdjListUser =  new Map();
//    }
//
//    addNodeMovie(v){
//        this.AdjListMovie.set(v, []);
//    }
//
//    addNodeUser(v){
//        this.AdjListUser.set(v, []);
//    }
//
//    addEdge(movie, user){
//        this.AdjListUser.get(user).push(movie);
//        this.AdjListMovie.get(movie).push(user);
//    }
//
//    BFS(initialNode){
//
//        var visited =  {};
//        var q = new Queue();
//        visited[initialNode] = true;
//        q.enqueue(initialNode);
//
//        while(!q.isEmpty()){
//            var getQueueElement = q.dequeue();
//            console.log(getQueueElement);
//            var getList = this.AdjList.get(getQueueElement);
//    
//            for (var i in getList) {
//                var n = getList[i];
//    
//                if (!visited[n]) {
//                    visited[n] = true;
//                    q.enqueue(n);
//                }
//            }
//        }
//    }
//
//}