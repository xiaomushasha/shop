<template>
  <div>
    <el-button type="primary" @click="openFullScreen2">服务方式</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false
    };
  },
  methods: {
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "请稍后",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    }
  }
};
</script>

<style>
</style>