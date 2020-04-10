
<template>
  <article class="newsEvents__article flex">
    <div class="newsEvents__iconContainer flex">
      <div class="newsEvents__Img" :class="type"></div>
    </div>
    <div class="newsEvents__snippet">
      <span class="newsEvents__date">{{ date }}</span>
      <h3 class="newsEvents__header">{{ title }}</h3>
      <p>{{ header }}</p>
      <p>
        <a v-bind:href="link" class="arrow-link">Read More</a>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: "ArticleCardComponent",
  props: {
    type: String,
    date: String,
    title: String,
    header: String,
    link: String
  }
};
</script>

<style>
</style>

