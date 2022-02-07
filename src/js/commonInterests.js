import RenderGraph from "./renderGraph";

async function init() {
    const graphObj = new RenderGraph();
    let movieNodes = [];
    let userNodes = new Set();
    let jsonGraphConfig = {
        "comment": "Movies and Users",
        "nodes": [],
        "edges": []
    }

    graphObj.readGraph().then(async graph => {
        for (let movie in await graph) {
            movieNodes.push(movie);
            graphObj.addNode(movie);

            let lastIndex = (jsonGraphConfig.nodes.length-1 == -1) ? 0 : (jsonGraphConfig.nodes.length);
            let movieNode = {"id": lastIndex, "caption": movie, "node_type": "movie"};

            jsonGraphConfig.nodes.push(movieNode);
            for (let user of graph[movie]) {
                graphObj.addEdge(movie, user);
                let userNode = {"id": (jsonGraphConfig.nodes.length), "caption": user, "node_type": "user"};

                let edge = {"source": userNode.id, "target": movieNode.id, "caption": ""};
                if (!userNodes.has(user)) {
                    jsonGraphConfig.nodes.push(userNode);
                } else {
                    edge.source = findNode(jsonGraphConfig.nodes, user);
                }

                jsonGraphConfig.edges.push(edge);
                userNodes.add(user);
            }

        }
        graphObj.printGraph();
        console.log(jsonGraphConfig);
        localStorage.setItem('graphConfig', JSON.stringify(jsonGraphConfig));
    }).catch(onrejected => onrejected);
}

function findNode(nodesList, caption) {
    for (let item of nodesList) {
        if (item.caption == caption)
            return item.id;
    }
}

init();