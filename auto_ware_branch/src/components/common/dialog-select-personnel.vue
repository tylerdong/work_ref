<!-- 人员选择树 -->
<template>
  <el-dialog
    title="提示"
    width="90%"
    :modal-append-to-body="false"
    :visible.sync="dialog.visible">
    <div class="tree-box">
      <!-- 人员选择 -->
      <div class="left-box">
        <!-- 搜索盒子 -->
        <div class="search-box">
          <el-input
            class="search-input margin-right-10"
            v-model.trim="searchInfo.input"
            @focus="searchFocus"
            icon="el-icon-circle-cross"
            :on-icon-click="handleInputClear"
            @keyup.enter.native="btnSearch"
            placeholder="请输入内容">
          </el-input>
          <el-button
            class="search-btn"
            type="primary"
            icon="el-icon-search"
            :loading="loading.searchBtn"
            @click="btnSearch"></el-button>
        </div>

        <div class="left-content-box" v-show="searchInfo.searchVue" v-loading="loading.searchVue">
          <ul
            class="personnel-ul margin-top-10">
            <li
              class="padding-left-right-10"
              v-for="(item,index) in searchInfo.list"
              @click="searchSelectPersonnel(item, $event)" :key="index">
              <div class="img-box">
                <img class="img" :src="item.img" alt="" v-if="item.img">
                <div class="img-name font-size-13 font-color-fff" v-else>{{item.name | nameSize}}</div>
                <div class="shade" v-if="item.visible">
                  <img src="../../assets/images/right.png" alt="">
                </div>
              </div>
              <span class="font-color-1f2d3d font-size-14 margin-left-5">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="left-content-box" v-show="!searchInfo.searchVue" v-loading="loading.selectVue">
          <!-- 路径 -->
          <div class="path-box">
          <span v-for="(item, index) in list.path">
            <span class="font-size-15 path-state"
                  :class="[(index + 1) === list.path.length ? 'font-color-1f2d3d' : 'font-color-3b9dd8']"
                  @click="selectPath(item)">{{item.name}}</span>
              <span
                class="font-size-15 font-color-1f2d3d margin-left-right-10"
                v-if="(index + 1) !== list.path.length">&gt;</span>
            </span>
          </div>
          <div class="select-box">
            <!-- 组织选择 -->
            <ul class="organization-ul">

              <!-- 全选 -->
              <li class="padding-left-right-10" v-show="visibleSelectAll">
                <el-checkbox
                  class="margin-top-6"
                  v-model="selectAll"
                  @change="changeSelectAll">
                </el-checkbox>
                <span class="font-color-1f2d3d font-size-14 margin-left-5">全选</span>
              </li>

              <li class="padding-left-right-10" v-for="(item,index) in list.organizationList" :key="index">
                <el-checkbox
                  class="margin-top-6"
                  v-model="item.checked"
                  @change="changeChecked(item, $event)">
                </el-checkbox>
                <span
                  class="font-color-1f2d3d font-size-14 margin-left-5"
                  :class="item.checked?'font-color-99a9bf cursor-not-allowed':'cursor-pointer'"
                  @click="btnSelectOrganization(item)">
                  {{item.name}}
                </span>
              </li>
            </ul>
            <!-- 人员选择 -->
            <ul class="personnel-ul">
              <li
                class="padding-left-right-10"
                v-for="(item,index) in list.personnelList"
                @click="selectPersonnel(item, $event)" :key="index">
                <div class="img-box">
                  <img class="img" :src="item.img" alt="" v-if="item.img">
                  <div class="img-name font-size-13 font-color-fff" v-else>{{item.name | nameSize}}</div>
                  <div class="shade" v-if="item.visible">
                    <img src="../../assets/images/right.png" alt="">
                  </div>
                </div>
                <span class="font-color-1f2d3d font-size-14 margin-left-5">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 已选人员 -->
      <div class="right-box">
        <!--<p class=" font-color-99a9bf font-size-14">已选2人</p>-->
        <!-- 已选择组织 -->
        <ul class="select-organization-ul">

          <li class="padding-left-right-10" v-for="(item,index) in list.selectOrganizationList" :key="index">
            <el-checkbox
              class="margin-top-6"
              v-model="item.checked"
              @change="delSelectOrganization(item, $event)">
            </el-checkbox>
            <span class="select-all font-color-1f2d3d font-size-14 margin-left-5">{{item.name}}</span>
          </li>
        </ul>

        <!-- 已选择人员 -->
        <ul class="select-personnel-ul">
          <li
            class="padding-left-right-10"
            v-for="(item,index) in list.selectPersonnelList" :key="index">
            <div class="left-box">
              <div class="img-box">
                <img class="img" :src="item.img" alt="" v-if="item.img">
                <div class="img-name font-size-13 font-color-fff" v-else>{{item.name | nameSize}}</div>
              </div>
              <span class="font-color-1f2d3d font-size-14 margin-left-5">{{item.name}}</span>
            </div>
            <img class="img-remove"
                 src="../../assets/images/form_clear.png"
                 @click="delSelectPersonnel(item, $event)">
          </li>
        </ul>
      </div>
    </div>
    <el-button class="btn-save margin-top-10" type="primary" @click="btnSave">保存</el-button>
    <!--</dialog-side>-->
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  import storage from '../../module/storage'
  export default {
    components: {
      'dialog-side': require('./dialog-side.vue')
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        dialog: {
          visible: false
        },
        userInfo: '',
        loading: {
          searchVue: false,
          searchBtn: false,
          selectVue: false
        },
        searchInfo: {
          input: '',
          list: [],
          searchVue: ''
        },
        selectAll: false,
        organizationId: '',
        list: {
          path: [],
          organizationList: [],
          personnelList: [],
          selectOrganizationList: [],
          selectPersonnelList: []
        }
      }
    },
    props: {
      width: {
        type: String,
        default: '500px'
      }
    },
    methods: {
      open (data) {
        this.dialog.visible = true
        this.organizationId = ''
        this.list.selectOrganizationList = []
        for (let item of JSON.parse(JSON.stringify(data.selectOrganizationList))) {
          this.list.selectOrganizationList.push({
            id: item.id,
            name: item.name,
            checked: true
          })
        }
        this.list.selectPersonnelList = []
        for (let item of JSON.parse(JSON.stringify(data.selectPersonnelList))) {
          this.list.selectPersonnelList.push({
            id: item.id,
            name: item.name,
            visible: true
          })
        }
        this.getData()
      },

      getData () {
        this.loading.selectVue = true
        this.selectAll = false

        api.laboratory.personnelManagement.getPersonList({
          userId: this.userInfo.userId,
          organizationId: this.organizationId
        }).then(response => {
          this.list.path = []
          this.list.organizationList = []
          this.list.personnelList = []
          const data = response.data

          /* 路径处理 */
          this.list.path = []
          for (let item of data.data.superiorOrg.reverse()) {
            this.list.path.push({
              id: item.id,
              name: item.name
            })
          }

          /* 组织处理 */
          for (let item of data.data.levelOrg) {
            let checked = this.list.selectOrganizationList.some(someItem => {
              return someItem.id === item.id
            })
            this.list.organizationList.push({
              id: item.id,
              name: item.name,
              checked: checked
            })
          }

          /* 人员处理 */
          for (let item of data.data.person) {
            let visible = this.list.selectPersonnelList.some(someItem => {
              return someItem.id === item.id
            })
            this.list.personnelList.push({
              id: item.id,
              img: item.img,
              name: item.name,
              visible: visible
            })
          }
        }).finally(() => {
          this.loading.selectVue = false
          this.autoSelectAll()
        })
      },

      /* 搜索框 获取焦点 */
      searchFocus () {
        this.searchInfo.searchVue = true
      },
      /* 搜索框 搜索功能 */
      btnSearch () {
        if (this.searchInfo.input) {
          this.loading.searchVue = true
          this.loading.searchBtn = true
          api.laboratory.personnelManagement.getPersonFuzzy({
            personName: this.searchInfo.input
          }).then(response => {
            this.searchInfo.list = []
            const data = response.data
            if (data.messageType === 1) {
              if (data.data.length !== 0) {
                /* 人员处理 */
                for (let item of data.data) {
                  let visible = this.list.selectPersonnelList.some(someItem => {
                    return someItem.id === item.id
                  })
                  this.searchInfo.list.push({
                    id: item.id,
                    img: item.img,
                    name: item.name,
                    visible: visible
                  })
                }
              } else {
                this.$message('暂无数据')
              }
            }
          }).finally(() => {
            this.loading.searchVue = false
            this.loading.searchBtn = false
          })
        }
      },
      /* 搜索清除 */
      handleInputClear () {
        this.searchInfo.input = ''
        this.searchInfo.list = []
        this.searchInfo.searchVue = false
      },
      /* 搜索人员选择 */
      searchSelectPersonnel (data, event) {
        /* 搜索列表是否选中状态 */
        this.searchInfo.list = this.searchInfo.list.map(item => {
          if (item.id === data.id) {
            item.visible = !item.visible
          }
          return item
        })
        /* 人员列表是否选中状态 */
        this.list.personnelList = this.list.personnelList.map(item => {
          if (item.id === data.id) {
            item.visible = !item.visible
          }
          return item
        })

        /* 去重 */
        if (data.visible) {
          this.list.selectPersonnelList.push(data)
        } else {
          this.list.selectPersonnelList = this.list.selectPersonnelList.filter(item => {
            return item.id !== data.id
          })
        }
      },

      /* 选择路径 */
      selectPath (data) {
        this.organizationId = data.id
        this.getData()
      },

      /* 全选 */
      changeSelectAll () {
        if (this.selectAll) {
          /* 全选 */
          /* 组织全选 */
          this.list.organizationList = this.list.organizationList.map(item => {
            if (item.checked === false) {
              item.checked = true
              this.list.selectOrganizationList.push(item)
            }
            return item
          })

          /* 人员全选 */
          this.list.personnelList = this.list.personnelList.map(item => {
            if (item.visible === false) {
              item.visible = true
              this.list.selectPersonnelList.push(item)
            }
            return item
          })
        } else {
          /* 取消全选 */
          /* 组织管理取消全选 */
          this.list.organizationList = this.list.organizationList.map(item => {
            if (item.checked === true) {
              item.checked = false
              this.list.selectOrganizationList = this.list.selectOrganizationList.filter(item2 => {
                return item2.id !== item.id
              })
            }
            return item
          })
          /* 人员取消全选 */
          this.list.personnelList = this.list.personnelList.map(item => {
            if (item.visible === true) {
              item.visible = false
              this.list.selectPersonnelList = this.list.selectPersonnelList.filter(item2 => {
                return item2.id !== item.id
              })
            }
            return item
          })
        }
      },

      /* 自动全选或不选 */
      autoSelectAll (event) {
        let org = this.list.personnelList.every(item => {
          return item.visible === true
        })
        let per = this.list.organizationList.every(item => {
          return item.checked === true
        })
        console.log(org, per)
        if (org === true && per === true) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
      },

      /* 组织选择 */
      changeChecked (data, event) {
        if (data.checked) {
          this.list.selectOrganizationList.push(data)
        } else {
          this.list.selectOrganizationList = this.list.selectOrganizationList.filter(item => {
            return item.id !== data.id
          })
        }
        this.autoSelectAll(event)
      },
      /* 点击组织 */
      btnSelectOrganization (data) {
        if (!data.checked) {
          this.organizationId = data.id
          this.getData()
        }
      },

      /* 人员选择 */
      selectPersonnel (data, event) {
        /* 改变组件状态 */
        this.list.personnelList = this.list.personnelList.map(item => {
          if (item.id === data.id) {
            item.visible = !item.visible
          }
          return item
        })

        /* 去重 */
        if (data.visible) {
          this.list.selectPersonnelList.push(data)
        } else {
          this.list.selectPersonnelList = this.list.selectPersonnelList.filter(item => {
            return item.id !== data.id
          })
        }
        this.autoSelectAll(event)
      },

      /* 右侧人员 删除 */
      delSelectPersonnel (data, event) {
        /* 人员列表状态改变 */
        this.list.personnelList = this.list.personnelList.map(item => {
          if (item.id === data.id) {
            item.visible = false
          }
          return item
        })
        /* 搜索列表状态改变 */
        this.searchInfo.list = this.searchInfo.list.map(item => {
          if (item.id === data.id) {
            item.visible = false
          }
          return item
        })

        /* select列表中删除 */
        this.list.selectPersonnelList = this.list.selectPersonnelList.filter(item => {
          return item.id !== data.id
        })
        this.autoSelectAll(event)
      },

      /* 右侧组织 删除 */
      delSelectOrganization (data, event) {
        /* 原始列表中删除 */
        this.list.organizationList = this.list.organizationList.map(item => {
          if (item.id === data.id) {
            item.checked = false
          }
          return item
        })
        /* select列表中删除 */
        this.list.selectOrganizationList = this.list.selectOrganizationList.filter(item => {
          return item.id !== data.id
        })
        this.autoSelectAll(event)
      },

      btnSave () {
        this.$emit('callback-select-data', {
          selectOrganizationList: this.list.selectOrganizationList,
          selectPersonnelList: this.list.selectPersonnelList
        })
        this.dialog.visible = false
      }
    },
    computed: {
      visibleSelectAll: function () {
        let length = this.list.organizationList.length + this.list.personnelList.length
        return length > 0
      }
    },
    filters: {
      nameSize: function (value) {
        return value.substr(-2, 2)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tree-box {
    height: 500px;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }

  /* 左边容器 */
  .left-box {
    width: 280px;

    /* 搜索容器 */
    .search-box {
      display: flex;
      justify-content: center;
      align-items: center;
      .search-input {
        width: 225px;
      }
      .search-btn {
        width: 40px;
        padding: 10px 10px;
      }
    }

    .left-content-box {
      height: 450px;
      margin-top: 14px;
      overflow-y: auto;
      /* 路径 */
      .path-box {
        padding: 10px 8px;
        .path-state {
          cursor: pointer;
        }
      }

      /* 选择容器 */
      .select-box {
        border-top: 1px dashed #dee4ec;
        border-bottom: 1px dashed #dee4ec;
      }
      /* 组织列表 */
      ul.organization-ul {
        li {
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #bfcbd9;
          &:hover {
            background-color: #eff2f7;
          }
        }
      }
      /* 人员列表 */
      ul.personnel-ul {
        li {
          height: 50px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: #eff2f7;
          }
          .img-box {
            position: relative;
            width: 32px;
            height: 32px;
            border-radius: 100%;
            background-color: #3b9dd8;
            overflow: hidden;
            object-fit: cover;
            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .img-name {
              width: 30px;
              white-space: nowrap;
              text-align: center;
              margin-top: 6px;
            }
            .shade {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              & > img {
                width: 20px;
              }
            }
          }
        }
      }
    }
  }

  /* 右边容器 */
  .right-box {
    width: 170px;
    margin-left: 10px;
    border: 1px solid #cccccc;
    padding: 10px 10px;
    /*height: 100%;*/
    overflow-y: auto;
    /* 已选人员 */
    ul.select-personnel-ul {
      li {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover {
          background-color: #eff2f7;
        }
        .left-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        div.img-box {
          width: 32px;
          height: 32px;
          border-radius: 100%;
          background-color: #3b9dd8;
          overflow: hidden;
          position: relative;
          .img-name {
            width: 30px;
            white-space: nowrap;
            text-align: center;
            margin-top: 6px;
          }
          .img {
            width: 32px;
            height: 32px;
            border-radius: 100%;
            object-fit: cover;
          }
        }
        .img-remove {
          transition: all .2s;
          &:hover {
            transform: scale(1.5)
          }
        }
      }
    }
  }

  .btn-save {
    display: block;
    margin: auto;
    width: 120px;
    height: 40px;
  }

  .margin-top-10 {
    margin-top: 10px;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .margin-left-5 {
    margin-left: 5px;
  }

  .margin-top-6 {
    margin-top: 6px;
  }

  .margin-left-right-10 {
    margin: 0 10px;
  }

  .padding-left-right-10 {
    padding: 0 10px;
  }

  .padding-top-bottom-10 {
    padding: 10px 0;
  }

  /* 鼠标手势 */
  .cursor-not-allowed {
    cursor: not-allowed;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  /* 颜色 */
  .font-color-1f2d3d {
    color: #1f2d3d;
  }

  .font-color-3b9dd8 {
    color: #3b9dd8;
  }

  .font-color-99a9bf {
    color: #99a9bf;
  }

  .font-color-fff {
    color: #fff;
  }

  /* 字体大小 */
  .font-size-13 {
    font-size: 13px;
  }

  .font-size-14 {
    font-size: 14px;
  }

  .font-size-15 {
    font-size: 15px;
  }
</style>
