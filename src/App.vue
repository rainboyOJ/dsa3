<script setup>
import { Icon } from '@iconify/vue';
import {ref} from 'vue'
const animate_list = ref([
  {
    name: 'bfs',
    link: '/bfs/index.html',
    desc: '图的bfs遍历',
    logo: 'material-symbols:graph-2'
  },
  {
    name: 'dfs',
    link: '/dfs/index.html',
    desc: '图的dfs遍历',
    logo: 'mdi:graph-outline'
  },

])
</script>

<template>
  <div class="container my-5">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="item in animate_list" :key="item.name">
        <div class="card h-100 shadow">
          <a style="" :href="item.link" class="d-block d-flex p-4 justify-content-center border border-bottom text-black" __target="_blank">
            <Icon :icon="item.logo" width="80" height="80" />
          </a>
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
