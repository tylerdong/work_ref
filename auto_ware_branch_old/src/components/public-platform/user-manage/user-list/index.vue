<!--<template>-->
  <!--<el-tabs style="margin-top: 10px;margin-left: 10px" v-model="which">-->
    <!--<el-tab-pane name="first">-->
      <!--<span slot="label">用户列表</span>-->
      <!--<user-list></user-list>-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane name="second" >-->
      <!--<span slot="label">人员信息</span>-->
      <!--<person-info></person-info>-->
    <!--</el-tab-pane>-->
  <!--</el-tabs>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
      <!--components: {-->
        <!--'user-list': require('./user-list'),-->
        <!--'person-info': require('../person-information/index')-->
      <!--},-->
      <!--data () {-->
        <!--return {-->
          <!--which: 'first'-->
        <!--}-->
      <!--},-->
      <!--mounted () {},-->
      <!--methods: {-->
      <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
<!--&lt;!&ndash;出入库记录&ndash;&gt;-->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <keep-alive>
        <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
      </keep-alive>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      'jkNav': require('src/components/common/nav.vue'),
      'user-list': require('./user-list'),
      'person-info': require('../person-information/index')
    },
    data () {
      return {
        component: 'user-list',
        activeName: '用户列表',
        tabs: [
          {id: 1, name: '用户列表', component: 'user-list'},
          {id: 2, name: '人员信息', component: 'person-info'}
        ],
        labelInfo: {
          id: 1,
          name: '用户列表',
          component: 'user-list'
        }
      }
    },
    mounted () {
    },
    methods: {
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
