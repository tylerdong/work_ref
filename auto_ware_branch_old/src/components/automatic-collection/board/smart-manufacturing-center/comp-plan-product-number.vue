<template>
  <div id="plan-production">
    <div class="pp-title">计划生产数：<span id="planAmout">24948</span> 吨</div>
    <div class="pp-info">
      <div class="line pp-info-line1">
        <div class="pp-info-item">
          <span class="pp-item-header">落筒</span>
          <span class="pp-item-value" id="fallNum">20200</span>
        </div>
        <div class="arrows"><i class="fa fa-arrow-right"></i></div>
        <div class="pp-info-item">
          <span class="pp-item-header">剥丝</span>
          <span class="pp-item-value" id="stripNum">20845</span>
        </div>
        <div class="arrows"><i class="fa fa-arrow-right"></i></div>
        <div class="pp-info-item">
          <span class="pp-item-header">测纤</span>
          <span class="pp-item-value" id="measureNum">424</span>
        </div>
        <div class="arrows"><i class="fa fa-arrow-right"></i></div>
        <div class="pp-info-item">
          <span class="pp-item-header">织袜</span>
          <span class="pp-item-value" id="hosieryNum">2888</span>
        </div>
      </div>
      <div class="line pp-info-line2">
        <div class="pp-blank"></div>
        <div class="arrows"><i class="fa fa-arrow-down"></i></div>
      </div>
      <div class="line pp-info-line3">
        <div class="border-wrapper">
          <div class="pp-info-item">
            <span class="pp-item-header">自动包装</span>
            <span class="pp-item-value" id="autoPackNum">18405</span>
          </div>
          <div class="pp-info-item">
            <span class="pp-item-header">人工包装</span>
            <span class="pp-item-value" id="handpackNum">623</span>
          </div>
        </div>
        <div class="arrows"><i class="fa fa-arrow-left"></i></div>
        <div class="pp-info-item">
          <span class="pp-item-header">外观检</span>
          <span class="pp-item-value" id="surfaceNum">21303</span>
        </div>
        <div class="arrows"><i class="fa fa-arrow-left"></i></div>
        <div class="pp-info-item">
          <span class="pp-item-header">染判</span>
          <span class="pp-item-value" id="sentenceNum">202</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      setPlanProduction (data) {
        $('#planAmout').text(data.planAmout)
        $('#fallNum').text(data.fallNum + '锭')
        $('#stripNum').text(data.stripNum + '锭')
        $('#measureNum').text(data.measureNum + '锭')
        $('#hosieryNum').text(data.hosieryNum + '锭')
        $('#sentenceNum').text(data.sentenceNum + '锭')
        $('#surfaceNum').text(data.surfaceNum + '锭')
        $('#handpackNum').text(data.handpackNum + '锭')
        $('#autoPackNum').text(data.autoPackNum + '锭')
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
