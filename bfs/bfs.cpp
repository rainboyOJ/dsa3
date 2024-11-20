//Author by [Rainboy](https://github.com/rainboylvx) 
//date: 2024-11-20 13:24:17
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6+5;
const int maxe = 1e6+5;

int n,m;
bool visited[maxn];

//普通队列模板
template<typename T = int,int siz = maxn>
struct myqueue{
    T a[siz+5];
    //tail 指向最后一个元素后面一个位置
    //head 指向第一个元素
    int head = 0,tail=0; 

    void clear() { head =tail = 0;}

    void push(T b) { a[tail++] = b;}

    void pop(){head++;}
    void pop_back(){tail--;}

    T front() { return a[head];}
    T back() { return a[tail-1];}

    bool empty() { return head == tail;}

    int size() { return tail-head;}
}; 

myqueue que; //定义了队列的数据结构



//图的存储结构,linkList
struct linkList {
    typedef struct {int u,v,w,next;} edge;
    edge e[maxe];
    int h[maxn],edge_cnt=0;
    linkList(){
        edge_cnt=0;
        memset(h,-1,sizeof(h));
    }

    //遍历点u 周围点
    template<typename U>
    void for_each(int u,U func){
        for(int i = h[u] ; i !=-1;i = e[i].next)
            func(e[i].u,e[i].v,e[i].w); //u v w
    }

    void add(int u,int v,int w=0){
        e[edge_cnt] = {u,v,w,h[u]};
        h[u] = edge_cnt++;
    }
    void add2(int u,int v,int w=0){
        add(u,v,w);
        add(v,u,w);
    }
    //下标访问
    edge& operator[](int i){ return e[i]; }
    //返回head[u]
    int operator()(int u){ return h[u]; }
} e;

//读取数据
void init() {
    cin >>n >> m; //读取n个结点, m条边
    for(int i =1;i<=m;i++) {
        int u,v;
        cin >> u >> v;
        e.add2(u,v);
    }
}

//从u开始进行bfs
void bfs(int u) {
    que.push(u);
    visited[u] = true;

    while( que.empty()) {
        int u = que.front();
        que.pop();
        for(int i = e(u);i != -1;i = e[i].next) {
            int v = e[i].v;
            if( visited[v]) continue; 
            que.push(v);
        }
    }
}


int main () {
    std::ios::sync_with_stdio(false); cin.tie(0); cout.tie(0); // 关闭io同步
    init();
    bfs(1);
    return 0;
}
