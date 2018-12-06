<!--第三列第一行生产线位-->
<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>批号</th>
        <th>生产线位</th>
        <th>产量(锭)</th>
      </tr>
      </thead>
      <tbody id="batchBoardBoList">
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flag: true
      }
    },
    methods: {
      setBatchBoard (data) {
        if (data) {
          this.flag = !this.flag
          for (let i = (this.flag ? 0 : 9); i < (this.flag ? 9 : 18); i++) {
            let k = i % 9
            let tr = $('#batchBoardBoList tr')[k]
            if (i < data.length) {
              $($(tr).find('td')[0]).html(data[i].batchNo)
              $($(tr).find('td')[1]).html(this.getBatchLine(data[i].list))
              $($(tr).find('td')[2]).html(data[i].amout)
            } else {
              $($(tr).find('td')[0]).html('&nbsp;')
              $($(tr).find('td')[1]).html('&nbsp;')
              $($(tr).find('td')[2]).html('&nbsp;')
            }
          }
        }
      },
      getBatchLine (list) {
        return list.length > 4
          ? '<span style="word-break: keep-all;white-space:nowrap;font-size: 1rem;">' + list.join(',') + '</span>'
          : '<span>' + list.join(',') + '</span>'
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
