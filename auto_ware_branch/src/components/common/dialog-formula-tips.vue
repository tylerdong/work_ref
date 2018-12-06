<template>
  <el-dialog title="公式提示" :visible.sync="dialogToggle" @close="close" class="template-dialog" size="tiny">
    <el-table :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="expression" label="表达式"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
  export default {
    components: {},
    created () {},
    data () {
      return {
        dialogToggle: false,
        tableData: [
          {name: '正弦函数', expression: '   sin(x)'},
          {name: '余弦函数', expression: '   cos(x)'},
          {name: '正切函数', expression: '   tan(x)'},
          {name: '双曲正弦函数', expression: '  sinh(x)'},
          {name: '双曲余弦函数', expression: '  cosh(x)'},
          {name: '双曲正切函数', expression: '  tanh(x)'},
          {name: '反正弦函数', expression: '   asin(x)'},
          {name: '反余弦函数', expression: '   acos(x)'},
          {name: '反正切函数', expression: '   atan(x)'},
          {name: '方位角函数', expression: '   atan2(x,y)'},
          {name: '弧度换角度函数', expression: '  deg(x)'},
          {name: '角度换弧度函数', expression: '  rad(x)'},
          {name: '绝对值函数', expression: '   abs(x)'},
          {name: '对数函数(底数是e(2.7182818284590452354))', expression: '  ln(x)(ln(2.7182818284590452354)=1.0)'},
          {name: '对数函数(底数为10)', expression: '  log(x)(log(10)=1.0)'},
          {name: '开平方函数', expression: '   sqrt(x)'},
          {name: '冥函数', expression: '    pow(x,y)(x^y即x的y次方)'},
          {name: '取小值函数', expression: '   min(x,y)'},
          {name: '取大值函数', expression: '   max(x,y)'},
          {name: '取随机数函数', expression: '  rnd(x)(rnd(3)取大于等于0小于三的随机数)'}
        ]
      }
    },
    props: {},
    mounted () {},
    computed: {},
    methods: {
      show () {
        this.dialogToggle = true
      },
      close () {
        this.dialogToggle = false
      }
    }
  }
</script>
<style scoped>
</style>
