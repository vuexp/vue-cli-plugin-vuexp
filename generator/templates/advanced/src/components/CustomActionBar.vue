<template>
  <ActionBar>
    <NavigationButton visibility="hidden" />
    <GridLayout columns="20, *" rows="auto" orientation="horizontal" width="100%">
      <VxpImage
        @tap="$emit('itemTap')"
        src="~/assets/hamburger.png"
        width="20"
        height="20"
        stretch="aspectFit"
        verticalAlignment="center"
        class="navbar-icon"
        col="0"
        row="0"
      />
      <VxpLabel :text="navbarTitle" fontSize="20" verticalAlignment="center" class="navbar-title" width="100%" col="1" row="0" />
    </GridLayout>
  </ActionBar>
</template>

<script>
export default {
  name: 'CustomActionBar',
  props: {
    navbarTitle: {
      type: String,
      default: 'Vuexp Showcase'
    }
  }
};
</script>

<style scoped></style>
