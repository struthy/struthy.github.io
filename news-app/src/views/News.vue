

<template>
  <div class="news">
    <img alt="Vue logo" src="../assets/logo.png">
    <NewsComponent msg="news component"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewsComponent from "@/components/NewsComponent.vue";
export default {
  name: "News",
  components: {
    NewsComponent
  }
};
</script>