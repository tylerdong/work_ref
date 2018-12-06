<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <!-- search form -->
      <!--<form action="#" method="get" class="sidebar-form">-->
        <!--<div class="input-group">-->
          <!--<input type="text" name="q" class="form-control" placeholder="Search...">-->
          <!--<span class="input-group-btn">-->
                <!--<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>-->
                <!--</button>-->
              <!--</span>-->
        <!--</div>-->
      <!--</form>-->
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="sidebar-toggle" data-toggle="offcanvas" role="button" @click="test">
        <i class="fa fa-bars icon" :class="{'rotate': minIcon}"></i>
      </span>
      <jkMenu></jkMenu>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  export default {
    components: {
      jkMenu: require('./common/menu.vue')
    },
    data () {
      return {
        minIcon: false
      }
    },
    methods: {
      test () {
        this.minIcon = !this.minIcon
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main-sidebar{
    width: 170px;
    background-color: #fff;
    box-shadow: 1px 0px 3px rgba(203,210,217,0.5);
    .sidebar-toggle{
      display: inline-block;
      height: 44px;
      line-height: 44px;
      color: #444;
      cursor: pointer;
      text-indent: 10px;
      width:100%;
      &:hover{
         background: #f3f6f9;
         color:#3b9dd8
       }
      .icon {
        width: 30px;
        height: 44px;
        line-height: 44px;
      &.rotate{
         transform:rotate(90deg);
         transform-origin: 15px 22px;
         animation:all 1s infinite;
       }
      }
    }
  }
</style>
