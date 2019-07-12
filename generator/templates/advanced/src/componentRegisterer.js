import Page from "vuexp/src/core/components/Page/Page";
import GridLayout from "vuexp/src/layouts/GridLayout";
import FlexboxLayout from "vuexp/src/layouts/FlexboxLayout";
import StackLayout from "vuexp/src/layouts/StackLayout";
import ActionBar from "vuexp/src/core/components/ActionBar/ActionBar";
import ActionItem from "vuexp/src/core/components/ActionItem/ActionItem";
import NavigationButton from "vuexp/src/core/components/NavigationButton/NavigationButton";
import VxpImage from "vuexp/src/components/VxpImage";
import VxpLabel from "vuexp/src/components/VxpLabel";
import VxpButton from "vuexp/src/components/VxpButton";
import VxpLink from "vuexp/src/components/VxpLink";
import VxpTextField from "vuexp/src/components/VxpTextField";
import VxpCheckbox from "vuexp/src/components/VxpCheckbox";
import VxpDropDown from "vuexp/src/components/VxpDropDown";
import VxpSideDrawer from "vuexp/src/components/VxpSideDrawer/VxpSideDrawer";

import CustomActionBar from "./components/CustomActionBar";
import SideLayout from "./components/SideLayout";

export default function registerComponents(Vue) {
  Vue.component("GridLayout", GridLayout);
  Vue.component("StackLayout", StackLayout);
  Vue.component("FlexboxLayout", FlexboxLayout);
  Vue.component("ActionBar", ActionBar);
  Vue.component("ActionItem", ActionItem);
  Vue.component("NavigationButton", NavigationButton);
  Vue.component("VxpButton", VxpButton);
  Vue.component("VxpLink", VxpLink);
  Vue.component("VxpImage", VxpImage);
  Vue.component("VxpLabel", VxpLabel);
  Vue.component("VxpTextField", VxpTextField);
  Vue.component("VxpCheckbox", VxpCheckbox);
  Vue.component("VxpSideDrawer", VxpSideDrawer);
  Vue.component("VxpDropDown", VxpDropDown);
  Vue.component("Page", Page);

  Vue.component("CustomActionBar", CustomActionBar);
  Vue.component("SideLayout", SideLayout);
}
