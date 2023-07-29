<template>
  <component :is="layoutComponent">
    <router-view></router-view>

  </component>
</template>

<script>
export default {
    computed: {
        layoutComponent() {
            const layout = this.$route.meta.layout;
            return layout || 'div';// Utilise le default si rien n'est précisé.
        }
    }

}
</script>

<style>

</style>