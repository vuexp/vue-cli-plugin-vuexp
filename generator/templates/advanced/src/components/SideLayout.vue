<template>
  <StackLayout>
    <VxpSideDrawer ref="drawer" class="x-side-drawer">
      <FlexboxLayout
        flexDirection="column"
        slot="drawerContent"
        class="x-side-drawer__drawer"
      >
        <FlexboxLayout class="drawer-title">
          <VxpLabel text="Vuexp" class="drawer-title__label"></VxpLabel>
        </FlexboxLayout>
        <StackLayout>
          <VxpLabel
            v-for="(item, key) in menuItems"
            :key="key"
            :text="item.title"
            class="drawer-item"
            @tap="itemTap(item)"
          ></VxpLabel>
        </StackLayout>
      </FlexboxLayout>
      <StackLayout slot="mainContent" class="x-content">
        <slot />
      </StackLayout>
    </VxpSideDrawer>
  </StackLayout>
</template>

<script>
export default {
  name: "SideLayout",
  data() {
    return {
      menuItems: [
        { title: "Home", route: "/" },
        { title: "VxpLabel", route: "/vxplabel" },
        { title: "VxpImage", route: "/vxpimage" },
        { title: "VxpButton", route: "/vxpbutton" },
        { title: "VxpLink", route: "/vxplink" },
        { title: "VxpTextField", route: "/vxptextfield" },
        { title: "VxpDropDown", route: "/vxpdropdown" },
        { title: "VxpCheckbox", route: "/vxpcheckbox" }
      ]
    };
  },
  methods: {
    showDrawerPanel() {
      this.$refs.drawer.showDrawer();
    },
    itemTap(item) {
      this.$router.push(item.route);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~vuexp/src/assets/styles/helpers";

.x-side-drawer {
  height: 100%;

  &__drawer {
    background-color: #282b30;
    color: #ffffff;
    padding: unit(20);
    width: unit(280);
    height: 100%;

    .drawer-title {
      text-align: center;
      font-weight: bold;
      color: #ebebeb;

      &__label {
        font-size: unit(24);
      }
    }

    .drawer-item {
      border-bottom-style: solid;
      border-bottom-width: unit(1);
      border-bottom-color: white;
      padding: unit(10);
      cursor: pointer;
    }
  }

  &__text {
    text-align: center;
    margin-bottom: unit(20);
  }
}
</style>
