<template>
  <div>
    <div id="buttons" ref="buttons"></div>
    <div id="grid" ref="grid"></div>
  </div>
</template>
<script>
  export default {
    components: {},
    created () {
//      this.cdg = canvasDatagrid({parentNode: this.$refs.grid})
    },
    data () {
      return {
        readType: 'base64',
        useworker: typeof Worker !== 'undefined',
        lastWb: '',
        cdg: {}
      }
    },
    mounted () {
      this.cdg = canvasDatagrid({parentNode: this.$refs.grid})
    },
    props: ['encodedFile'],
    watch: {
      encodedFile: function (fileData) {
        if (fileData) {
          console.log('fileData')
          try {
            if (this.useworker) {
              this.sheetjsw(fileData, this.processWb, this.readType)
              return
            }
            let wb = XLSX.read(fileData, this.readType)
            this.processWb(wb)
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$refs.buttons.innerHTML = ''
          this.$refs.grid.innerHTML = ''
        }
      }
    },
    computed: {},
    methods: {
      show (fileData) {
        if (fileData) {
          console.log('fileData')
          try {
            if (this.useworker) {
              this.sheetjsw(fileData, this.processWb, this.readType)
              return
            }
            let wb = XLSX.read(fileData, this.readType)
            this.processWb(wb)
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$refs.buttons.innerHTML = ''
          this.$refs.grid.innerHTML = ''
        }
      },
      sheetjsw (data, cb, readType) {
        let scripts = document.getElementsByTagName('script')
        let sheetjswPath = ''
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.indexOf('xlsx.full.min') !== -1) {
            sheetjswPath = scripts[i].src.split('xlsx.full.min.js')[0]
          }
        }
        let worker = new Worker(sheetjswPath + 'sheetjsw.js')
        worker.onmessage = function (e) {
          switch (e.data.t) {
            case 'ready':
              break
            case 'e':
              console.error(e.data.d)
              break
            case 'xlsx':
              cb(JSON.parse(e.data.d))
              break
          }
        }
        worker.postMessage({d: data, b: readType, t: 'xlsx'})
      },
      toJson (workbook) {
        if (this.useworker && workbook.SSF) {
          XLSX.SSF.load_table(workbook.SSF)
        }
        let result = {}
        workbook.SheetNames.forEach(sheetName => {
          let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1})
          if (roa.length > 0) {
            result[sheetName] = roa
          }
        })
        return result
      },
      makeButtons (sheetnames, cb) {
        let buttons = this.$refs.buttons
        buttons.innerHTML = ''
        sheetnames.forEach((s, idx) => {
          let btn = document.createElement('button')
          btn.type = 'button'
          btn.name = 'btn' + idx
          btn.innerText = s
          btn.addEventListener('click', () => {
            cb(idx)
          }, false)
          buttons.appendChild(btn)
        })
      },
      resize () {
        this.$refs.grid.style.height = (window.innerHeight - 200) + 'px'
        this.$refs.grid.style.width = (window.innerWidth - 200) + 'px'
      },
      onSheet (json, sheetNames, selectSheetCb) {
        this.makeButtons(sheetNames, selectSheetCb)
        // 显示grid
        this.$refs.grid.display = 'block'
        this.resize()

        // 加载数据
        this.cdg.data = json

        // 显示表头
        let L = 0
        json.forEach(r => { if (L < r.length) { L = r.length } })
        for (let i = 0; i < L; ++i) {
          this.cdg.schema[i].title = XLSX.utils.encode_col(i)
        }
      },
      chooseSheet (sheetidx) {
        this.processWb(this.lastWb, sheetidx)
      },
      processWb (wb, sheetidx) {
        this.lastWb = wb
        let sheet = wb.SheetNames[sheetidx || 0]
        let json = this.toJson(wb)[sheet]
        this.onSheet(json, wb.SheetNames, this.chooseSheet)
      }
    }
  }
</script>
<style scoped>
</style>
