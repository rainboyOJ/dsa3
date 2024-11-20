import splitLayout from '../src/components/split_layout.vue';
import codeEditor from '../src/components/code-editor.vue';
import bfs_code from './bfs.cpp?raw'
import { generateGraphByNodeAndEdgeCount } from '../src/lib/graph'

import {debounce} from 'lodash'

import {initCytoscape,bfs_seq,re_graph_cyto} from './cyto'
export default {
  data() {
    return {
      node_cnt : 5, //图的节点数
      edge_cnt: 6,  // 图的边数
      code:bfs_code,
      hline_start:-1,
      hline_end: -1,
      raw_graph_data:{}, // 原始的随机生成的图的数据
      cy:null,
      animate_seq : [],
      current_seq_idx: 0
    }
  },
  mounted() {
    this.raw_graph_data = generateGraphByNodeAndEdgeCount(this.node_cnt, this.edge_cnt)
    this.cy = initCytoscape('cy',this.raw_graph_data.nodes,this.raw_graph_data.edges)
    this.animate_seq = this.bfs()
    console.log(this.animate_seq)
    // this.cy = initCytoscape('cy',this.raw_graph_data.nodes,this.tree_edges)
    // for(let edge of this.not_tree_edges) {
    //   this.cy.add({
    //     group: 'edges',
    //     data: edge.data
    //   })
    // }
  },
  computed: {
    node_cnt() {
      return this.raw_graph_data.nodes.length
    },
    edge_cnt() {
      return this.raw_graph_data.edges.length
    },
    tree_edges() {
      return this.raw_graph_data.edges.slice(0, this.node_cnt - 1)
    },
    not_tree_edges() {
      return this.raw_graph_data.edges.slice(this.node_cnt - 1)
    },
    maxLine() {
      return Math.max(this.code.split('\n').length, 1)
    },
    animate_seq_len() {
      return this.animate_seq.length
    },
    //得到当前动画序列中的队列
    que_in_animate(){
        if( this.current_seq_idx == 0) return [];
        // 得到当前的所有的元素
        let now_que = [ ... this.animate_seq[this.current_seq_idx-1].que]
        return now_que;
        // console.log(now_que)
        let del_que = [] //已经删除的元素
        for(let i = this.current_seq_idx-2;i>=0;i--) {
            if( this.animate_seq[i].que.length > 0 ) {
                let head = this.animate_seq[i].que[0]
                if( now_que.indexOf(head) == -1 && del_que.indexOf(head) == -1) { //没有这个元素
                    del_que.unshift(head)
                }
            }
        }
        return del_que.map(val => {return {val: val, del: true}})
                .concat( now_que.map(val => {return {val: val, del: false}}) )
        // return this.animate_seq[this.current_seq_idx-1].que;
    },
      //取出的头部元素是哪个,从这index是后找到的最一个有head的元素的值
    poped_header() {
        for (let i = this.current_seq_idx - 1; i >= 0; i--) {
        if( this.animate_seq[i].head)
            return this.animate_seq[i].head
        }
        return " ";
    },
    //需要高亮 代码的行
    hline() {
        for(let i = this.current_seq_idx-1;i>=0;i--) {
            if( this.animate_seq[i].code) {
                return this.animate_seq[i].code.map( val => {return val-1} )
            }
        }
        return [-1,-1] //不需要高亮
    },
    //计算动画的log
    log() {
        for(let i = this.current_seq_idx-1;i>=0;i--) {
            if( this.animate_seq[i].log) {
                return this.animate_seq[i].log
            }
        }
        return "" //不需要高亮
    }
  },
  components: {
    splitLayout,
    codeEditor
  },
  methods: {
    generateGraphButton(){
        this.raw_graph_data = generateGraphByNodeAndEdgeCount(this.node_cnt, this.edge_cnt)
        this.current_seq_idx = 0
        // this.cy = initCytoscape('cy',this.raw_graph_data.nodes,this.raw_graph_data.edges)
        re_graph_cyto(this.cy,this.raw_graph_data)
        this.animate_seq = this.bfs()
    },
    clickNext(){
      this.hline_end +=1;
      this.hline_start +=1;
    },
    animate_next() {
      if( this.current_seq_idx < this.animate_seq_len) {
        this.current_seq_idx++;
      }
    },
    animate_pre() {
      if( this.current_seq_idx > 0) {
        this.current_seq_idx--;
      }
    },
    clickPre(){
      this.hline_end -=1;
      this.hline_start -=1;
    },
    //进行bfs,返回动画序列
    bfs(){
      return bfs_seq(this.raw_graph_data,1)
    },
      copyGraph() {
          alert("TODO:复制图的input数据")
      }
  },
  watch: {
    current_seq_idx: debounce( function(newVal, oldVal){
      this.cy.elements('.highlight').removeClass('highlight');
      for(let i = 0 ;i< newVal;i++) {
        // console.log(this.animate_seq[i])
        // 如果这里有id
        if( this.animate_seq[i].id) {
            this.cy.elements('#'+this.animate_seq[i].id).addClass('highlight')
        }
      }
    })
  }
}
