<template>
  <ActionBar>
    <NavigationButton visibility="hidden" />
    <StackLayout orientation="horizontal" width="100%">
      <Img
        @tap="$emit('itemTap')"
        src="~/assets/hamburger.png"
        width="20"
        height="20"
        verticalAlignment="center"
        class="navbar-icon"
      />
      <VxpLabel
        :text="navbarTitle"
        fontSize="20"
        verticalAlignment="center"
        class="navbar-title"
        width="100%"
      />
    </StackLayout>
  </ActionBar>
</template>

<script>
export default {
  name: "CustomActionBar",
  props: {
    navbarTitle: {
      type: String,
      default: "Vuexp Showcase"
    }
  },
  methods: {
    showDrawerPanel() {
      this.sideLayout.methods.showDrawerPanel();
    }
  }
};
</script>

<style scoped></style>
