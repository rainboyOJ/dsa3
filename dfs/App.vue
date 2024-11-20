<template>
  <div class="container-xxl">
    <split-layout>
      <template v-slot:top>
        <div class="my-2 row">
          <div class="col-md-2 align-self-end">
            <div class="btn-group flex-grow-0 d-flex justify-content-center" role="group"
              aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary flex-grow-0" @click="animate_pre">◀️</button>
                <button type="button" class="btn btn-outline-primary flex-grow-0" @click="animate_next">▶️</button>
            </div>
          </div>
          <div class="col-md-8">
            <label for="customRange1" class="form-label">animate
              <span>{{current_seq_idx}}/{{animate_seq_len}}</span>
            </label>
            <input type="range" class="form-range" id="customRange1" min="0" :max="animate_seq_len"
              v-model.number="current_seq_idx" step="1">
          </div>
        </div>
      </template>

      <!-- left board -->
      <template v-slot:left>
        <div class="row h-100 w-100">
          <div class="col-12 card mb-2">
            <div class="card-body">
              <div class="card-title">
                调整图的参数
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">节点数</span>
                    <input class="input-group-text" type="number" v-model.number="node_cnt" style="width: 60px;">
                  </div>
                </div>
                <div class="col">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">边数</span>
                    <input class="input-group-text" type="number" v-model.number="edge_cnt" style="width: 60px;">
                  </div>
                </div>
                <div class="col">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-sm btn-primary" @click="generateGraphButton"> 生成图</button>
                    <button class="btn btn-sm btn-primary" @click="copyGraph"> 复制</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12  border border-1 p-2 shadow">
            <!-- {{ que_in_animate }} -->
            <div class="d-flex">
              <span class=" border border-0 me-2">取出的队列头:</span>
              <span class="animate__animated animate__bounce que-cell border border-1 me-4">{{ poped_header }}</span>
              <span class="animate__animated animate__lightSpeedInRight que-cell" v-for="item in que_in_animate"
                :key="item">{{ item}}</span>
            </div>
            <div class="col-12 mt-2">
              <span>{{ log }}</span>
            </div>
          </div>
          <div class="col-12">
            <div id="cy" style="width: 100%;height: 100%;"></div>
          </div>
        </div>
      </template>

      <!-- right board -->
      <template v-slot:right>
        <code-editor :code="code" :hline_end="hline[1]" :hline_start="hline[0]"></code-editor>
      </template>
    </split-layout>
  </div>
</template>

<style scoped>
.que-cell {
  width: 30px;
  height: 30px;
  /* border: 1px solid rgba(0, 0, 0, 0.322); */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0000003e;
  border-right: none;
}

.que-cell:last-child {
  border-right: 1px solid #0000003e;
}

.que-cell.del {
  /* width: 0px; */
  display: none;
}
</style>


<script >
import app from './app.js'
export default app
</script>