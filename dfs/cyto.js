
export function initCytoscape(domId,nodes,edges) {
    // console.log(nodes)
    // console.log(edges)
    return cytoscape({
        container: document.getElementById(domId),
        // elements: randomGraph.nodes.concat(randomGraph.edges),
        elements: nodes.concat(edges),
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': 'black', // 结点标签颜色设为黑色  
                    'background-color': 'white', // 结点背景色设为白色  
                    'border-color': 'black', // 结点边框颜色设为黑色  
                    'border-width': 3, // 结点边框宽度设为 2  
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#ccc'
                    // 'line-color':'#210115'
                }
            },
            {
                selector: 'edge.highlight',
                style: {
                    'width': 3,
                    'line-color': 'green'
                    // 'line-color':'#210115'
                }
            },
            {
                selector: 'node.highlight',
                style: {
                    'color': 'white',
                    'background-color': 'blue', // 结点背景色设为白色  
                }
            }
        ],

        layout: {
            // name: 'dagre',
            // animate: true,
            // rankDir:'BT',
            // acyclicer: 'greedy', // If set to 'greedy'
            name:'cose',
            // gravity: 0.1,
            // name:'grid',
            animate: true,
            idealEdgeLength: 100, // 理想边长，增大这个值会让节点间距更大  
            nodeOverlap: 20, // 节点重叠程度  
            refresh: 20, // 布局刷新率  
            fit: true, // 是否自适应视图  
            padding: 30, // 图形周围的内边距  
            randomize: false, // 是否随机初始位置  
            componentSpacing: 100, // 不同连通分量之间的间距，增大这个值可以让不同组的节点分得更开  
            nodeRepulsion: 400000, // 节点之间的斥力，增大这个值会让节点相互远离  
            edgeElasticity: 100, // 边的弹性  
            nestingFactor: 5, // 嵌套因子  
            // gravity: 80, // 重力，控制节点向中心聚集的程度 
        }
    });
}

//再生成一个图
export function re_graph_cyto(cy,graph){
  cy.elements().remove();
  cy.add(graph.nodes.concat(graph.edges));
  cy.layout({
      name: 'cose',
      // gravity: 0.1,
      // name:'grid',
      animate: true,
      idealEdgeLength: 100, // 理想边长，增大这个值会让节点间距更大  
      nodeOverlap: 20, // 节点重叠程度  
      refresh: 20, // 布局刷新率  
      fit: true, // 是否自适应视图  
      padding: 30, // 图形周围的内边距  
      randomize: false, // 是否随机初始位置  
      componentSpacing: 100, // 不同连通分量之间的间距，增大这个值可以让不同组的节点分得更开  
      nodeRepulsion: 400000, // 节点之间的斥力，增大这个值会让节点相互远离  
      edgeElasticity: 100, // 边的弹性  
      nestingFactor: 5, // 嵌套因子  
      // gravity: 80, // 重力，控制节点向中心聚集的程度 
  }).run();
}
const bfs_init = [82,83];
const que_pop = [86,87];
const check_adj_edge = [88,89];
const que_push = [90,91];

//生成bfs运行的动画的序列
// 返回的array 的每个元素表示第i步,应该设置添加highlight的元素
export function bfs_seq(graph,start){
    let return_seq = []
    let nodes = graph.nodes
    let edges = graph.edges

    let visited = Array.from({length:nodes.length+10},() => 0)
    let que = [] //队列
    que.push(start) //加入起始点
    visited[start]=1;
    return_seq.push({ type:'node', id:start ,
        //存que的
        que: [...que],
        code: bfs_init,
        log:`将结点 ${start} 加入队列,并设置为已访问`
    })

    function __bfs(){

        while( que.length>0){
            let u = que.shift()
            //取出头
            return_seq.push({head: u ,que:[...que],code:que_pop,
                log:`取出的队列头部元素为 ${u}`
            })

            edges.forEach(edge => {
                let next = -1;
                if( edge.data.source == u ) {
                    next = edge.data.target;
                }
                else if (edge.data.target == u )
                {
                    next = edge.data.source
                }
                next = parseInt(next)
                if( next == -1) return; //没有找到
                if( visited[next] == 0) { //没有访问过
                    visited[next] = 1;
                    que.push(next)
                    return_seq.push({ type:'edge',...edge.data, que:[...que], code:check_adj_edge
                        , log:`通过边 <${u},${next}>, 访问点 ${next}`
                    })
                    return_seq.push({ type:'node', id:next ,que:[...que],code:que_push,
                        log:`将结点 ${next} 加入队列,并设置为已访问`
                    })
                }
            });
            return_seq.push({que:[...que],log:`结点 ${u} 周围点的已经全部访问完`})
        }
    }
    __bfs();
    return return_seq
}