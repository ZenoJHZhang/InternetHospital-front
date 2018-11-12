<template>
<div>
  <menu-bar></menu-bar>
  <router-view></router-view>
</div>
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


