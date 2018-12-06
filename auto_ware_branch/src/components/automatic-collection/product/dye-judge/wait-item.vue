<template>
  <div class="dye-box">
      <div class="dye-item" v-for="(silk, j) in sentenceSilkInfoBos" :key="j">
        <!--选中图标-->
        <div style="cursor: pointer;" @click="silk.dyeCheck = !silk.dyeCheck" class="daye-itme-index">
          <i style="color: #8492a6" v-show="silk.dyeCheck" class="el-icon-check"></i>
          <span>{{silk.silkcarPosition}}</span>
        </div>
        <!--异常提示弹出框-->
        <div class="daye-itme-info">
          <div @click="dyeClick(silk)" class="daye-itme-info-btn"
            :class="{red: silk.silkGradId, hand: true, silkCodeColor: silk.silkCode}">
            <el-tooltip placement="top">
              <div slot="content">
                <span v-if="silk.sentenceStatus">是否异常：{{silk.sentenceStatus | sentenceStatus}}<br/></span>
                染判类型：{{silk.sentenceType}}
                <br/>
                <span v-if="silk.silkGradeName">丝锭等级：{{silk.silkGradeName}}<br/></span>
                <span v-if="silk.silkDownGradeName">降等原因：{{silk.silkDownGradeName}}<br/></span>
                备注：{{silk.silkRemark}}
              </div>
              <div v-show="silk.level !== ''">
                <!--<span v-show="silk.sentenceLevelId">{{silk.sentenceLevelId}}/</span>-->
                <span :class="showColor(silk.level)">{{silk.level}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  export default {
    components: {},
    props: ['sentenceSilkInfoBos', 'hosieryType'],
    data () {
      return {}
    },
    filters: {
      abnormalFlag: (val) => {
        if (val) {
          if (val === '1') {
            return '异常'
          }
          return '正常'
        }
        return ''
      }
    },
    methods: {
      showColor (value) {
        if (value === 'F') {
          return 'color-f'
        }
        if (value === 'D') {
          return 'color-d'
        }
        if (value === 'L') {
          return 'color-l'
        }
        return 'color-of'
      },
      dyeClick (nowItem) {
        if (['HOSIERY_PINCHE_2', 'HOSIERY_PINCHE_3'].includes(this.hosieryType) || !nowItem.silkCode) {
          return
        }
        this.$emit('openDialog', nowItem, undefined, undefined, undefined)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .color-f {
    color: #4dc1f1;
  }

  .color-d {
    color: #5ccd00;
  }

  .color-l {
    color: #faa107;
  }

  .color-of {
    color: #ff0000;
  }

  .green {
    color: green;
  }

  .silkCodeColor {
    border: 1px solid #d2d6de;
    background-color: #d9dfe5;
  }

  .font-bold {
    font-weight: bold;
  }

  .dye-box {
    flex: 80;
    overflow: hidden;
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
  }

  .dye-item {
    width: 8.3333%;
    float: left;
  }

  .daye-itme-index {
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }

  .daye-itme-info {
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    padding: 6px;
  }

  .daye-itme-info-btn {
    border-radius: 3px;
    border: 1px solid #d2d6de;
    height: 24px;
    line-height: 24px;
    &.hand {
      cursor: pointer;
    }
    &.red {
      border-color: #FF4949;
    }
  }
</style>
