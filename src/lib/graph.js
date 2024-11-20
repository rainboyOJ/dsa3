//有关图的一些算法

import {random_range} from './utils'

export function generateRandomGraph() {

}


  /**
   * 根据点的数量和边的数量生成图
   * @description 生成的图保证是连通的简单图,前n-1条边使用树的方式生成
   * @param {number} numNodes - 图的点的数量
   * @param {number} numEdges - 图的边的数量
   * @returns {Object} 该对象有nodes和edges两个属性，nodes是一个数组，edges是一个数组
   */
export function generateGraphByNodeAndEdgeCount(numNodes, numEdges) {  
  const nodes = [];  
  const edges = [];  

  // 生成节点  
  for (let i = 1; i <= numNodes; i++) {  
    nodes.push({  
      data: { id: i }  
    });  
  }  

  let maxEdgeCount = numNodes * (numNodes - 1) / 2;  
  if (numEdges > maxEdgeCount) {  
    let error = `Cannot generate a graph with ${numNodes} nodes and ${numEdges} edges.`
    alert(error)
    throw new Error(error)
  }
  //生成一个树
  let edgeCount = numNodes-1;  
  for(let i =2;i<=numNodes;i++) {
    edges.push({
      data: { source: i, target: random_range(1,i-1) }
    });  
  }

  // 生成边  
    //   console.log('numEdges',numEdges)
  while (edgeCount < numEdges) {  
    // 随机选择两个节点  
    const source = random_range(1, numNodes)
    const target = random_range(1, numNodes)

    // 确保source和target不同  
    if (source !== target) {  
      // 检查是否已经存在该边  
      const existingEdge = edges.find(edge => (  
        (edge.data.source === source && edge.data.target === target) ||  
        (edge.data.source === target && edge.data.target === source)  
      ));  

      // 如果不存在该边,则添加新的边  
      if (!existingEdge) {  
        edges.push({  
          data: { source: source, target: target }  
        });  
        edgeCount++;  
        // console.log('edgeCount',edgeCount)
      }  
    }  
  }  

  // console.log(nodes)
  // console.log(edges)

  return { nodes, edges };  
}
