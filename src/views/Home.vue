<template>
<el-container direction='vertical'>
  <menu-bar></menu-bar>
  <router-view></router-view>
</el-container>


</template>

<script>
import menuBar from '../components/bar/meunBar'
export default {
  name: 'home',
  components: {
    menuBar
  }
}
</script>


