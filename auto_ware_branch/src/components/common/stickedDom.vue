<template>
  <div>
    <div v-for="(item, index) in domarray"
         :key="item.title"
         :style="{ top: item.offsetY+'px', left: item.offsetX + 'px', width: item.name.length * 15 + 'px' }"
         class="commonDiv"
         draggable="true"
         @dragstart="dragStart">
      <span style="display: none">{{JSON.stringify(Object.assign(item, {index: index}))}}</span>
      <span name="stickedSpan">{{ item.name }}</span>
      <label @click="removeThis(index)" :style="{position: 'absolute', fontSize: '12px', top: '-6px', left: item.name.length * 14 + 'px' }">x</label>
    </div>
  </div>
</template>
<script>
  import { eventHub } from '../../../src/module/eventHub'
  // import { MoveProperty } from './../../module/templateGenerate'
  export default {
    components: {},
    created () {},
    data () {
      return {
        moveProperty: null
      }
    },
    props: [
      'domarray'
    ],
    mounted () {
    },
    computed: {},
    methods: {
      removeThis (index) {
        eventHub.$emit('removeStickedDom', index)
      },
      dragStart (e) {
        if (e.target.children[0]) {
          let bindedData = e.target.children[0].innerText
          e.dataTransfer.setData('text/plain', bindedData)
        }
        console.log('dragstart_here')
      }
    }
  }
</script>
<style scoped>
  .commonDiv {
    position: absolute;
    /*background-color: #1f2e3d;*/
    /*color: white;*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    font-weight: 700;
    text-align: center;
  }

  .commonDiv label {
    position: absolute;
    margin-bottom: 0;
    top: -6px;
    /*right: -6px;*/
    font-size: 12px;
  }
</style>
