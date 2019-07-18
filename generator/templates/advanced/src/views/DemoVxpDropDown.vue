<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout class="theme--vuexp">
        <VxpDropDown
          :items="countries"
          @changeIndex="onChangeIndex"
          placeholder="Select Item"
        />

        <VxpLabel text="DropDown with Error(s)" class="title-1" />
        <VxpDropDown
          :items="countries"
          @changeIndex="onChangeIndex"
          placeholder="Select Item"
          :errors="errors"
        />
      </StackLayout>
    </SideLayout>
  </Page>
</template>

<script>
export default {
  name: "DemoVxpDropDown",
  data() {
    return {
      countries: [
        { id: 1, value: "Albania" },
        { id: 2, value: "Algeria" },
        { id: 3, value: "American Samoa" },
        { id: 4, value: "Andorra" },
        { id: 5, value: "Angola" },
        { id: 6, value: "Anguilla" },
        { id: 7, value: "United States" },
        { id: 8, value: "Germany" },
        { id: 9, value: "Turkey" }
      ],
      errors: ["Should select one"]
    };
  },
  methods: {
    onChangeIndex() {
      console.log("onChangeIndex");
    },
    showDrawerPanel() {
      this.$refs.sideLayout.showDrawerPanel();
    }
  }
};
</script>

<style lang="scss">
@import "~vuexp/src/assets/styles/helpers";

.title-1 {
  margin-top: unit(30);
}

.vxp-drop-down__container {
  border-style: solid;
  border-color: #999999;
  border-width: unit(1);
}
</style>
