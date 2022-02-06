import Graph from './graphStructure';
const binId = '61ffcb5b4ce71361b8d05562';
const secretKey = '$2b$10$jxow4GADDMrolpxvMGbFcOqDcqkAYAykopUHA6Obtp9i8z0si6n3u';
const url = `https://api.jsonbin.io/b/${binId}/latest`;

//This class handle graph data in cloud
export default class RenderGraph extends Graph {
    constructor() {
        super();
    }

    renderGraph() {
        console.log("Not implemented yet!");
    }

    readGraph() {
        const graph = () => {
            return new Promise((resolve, reject) => {
                const xml = new XMLHttpRequest();

                xml.responseType = 'json';
                xml.onload = () => {
                    if (xml.status === 200)
                        resolve(xml.response);
                    else
                        reject(toastr.error('Erro interno, tente novamente mais tarde!'));
                }
                xml.open('GET', url);
                xml.setRequestHeader('secret-key', secretKey);
                xml.send();
            })
        }
        return graph();
    }

    async updateGraph(newGraph) {
        try {
            const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
                method: 'PUT', headers: {
                    'secret-key': secretKey,
                    'Content-Type': 'application/json'
                }, body: newGraph
            });
        } catch(errorObj) {
            toastr.error(errorObj);
        }
    }
}