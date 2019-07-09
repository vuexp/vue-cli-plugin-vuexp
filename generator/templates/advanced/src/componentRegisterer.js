import Page from "vuexp/src/core/components/Page/Page";
import GridLayout from "vuexp/src/layouts/GridLayout";
import FlexboxLayout from "vuexp/src/layouts/FlexboxLayout";
import StackLayout from "vuexp/src/layouts/StackLayout";
import ActionBar from "vuexp/src/core/components/ActionBar/ActionBar";
import VxpImage from "vuexp/src/components/VxpImage";
import VxpLabel from "vuexp/src/components/VxpLabel";
import VxpButton from "vuexp/src/components/VxpButton";
import VxpSideDrawer from "vuexp/src/components/VxpSideDrawer/VxpSideDrawer";
import VxpPlugin from "vuexp/src/core/plugins/index.js";

export default function registerComponents(Vue) {
  Vue.component("GridLayout", GridLayout);
  Vue.component("StackLayout", StackLayout);
  Vue.component("FlexboxLayout", FlexboxLayout);
  Vue.component("ActionBar", ActionBar);
  Vue.component("VxpButton", VxpButton);
  Vue.component("VxpImage", VxpImage);
  Vue.component("VxpLabel", VxpLabel);
  Vue.component("VxpSideDrawer", VxpSideDrawer);
  Vue.component("Page", Page);
  
  Vue.use(VxpPlugin);
}