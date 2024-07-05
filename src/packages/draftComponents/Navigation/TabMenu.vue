<template>
  <nav class="tab-menu">
    <ul class="tabs govuk-header__navigation user-menu">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab govuk-header__navigation-item"
        :class="{ 'active': selectedTabIndex === index }"
        @click.stop="onTabClick(tab, index)"
      >
        <template v-if="'content' in tab">
          <span
            class="icon-expand"
            :class="arrowOpenIndex === index ? 'close' : 'open'"
          >
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.41 7.70508L6 3.12508L10.59 7.70508L12 6.29508L6 0.295078L0 6.29508L1.41 7.70508Z"
                fill="#1D70B8"
              />
            </svg>
          </span>
          <a class="govuk-!-margin-left-1">{{ tab.title }}</a>
          <ArrowMenu
            v-if="!fullWidthMenu"
            v-show="selectedTabIndex === index && showSubmenu"
            :items="submenu"
            @close="onClickSubMenuItem"
          />
        </template>
        <template v-else>
          <RouterLink
            :to="tab.link"
          >
            {{ tab.title }}
          </RouterLink>
        </template>
      </li>
    </ul>
    <!-- SubMenu -->
    <FullWidthMenu
      v-if="fullWidthMenu"
      v-show="selectedTabIndex && showSubmenu"
      :items="submenu"
      :max-items-per-column="3"
      :full-width-menu="true"
      aria-label="Sub navigation"
      @close="onClickSubMenuItem"
    >
      <template #item="{ item, navigate }">
        <a
          class="flex-item"
          @click.stop="navigate(item.link)"
        >
          {{ item.title }}
        </a>
      </template>
    </FullWidthMenu>
  </nav>
</template>

<script>
import FullWidthMenu from './FullWidthMenu.vue';
import ArrowMenu from './ArrowMenu.vue';
export default {
  name: 'TabMenu',
  components: {
    FullWidthMenu,
    ArrowMenu,
  },
  props: {
    tabs: {
      type: Object,
      required: true,
    },
    fullWidthMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submenu: [],
      selectedTabIndex: null,
      showSubmenu: false,
      arrowOpenIndex: null,
    };
  },
  mounted() {
    this.submenu = [];
    this.selectedTabIndex = null;
    this.arrowOpenIndex = null;
    this.showSubmenu = false;
    document.body.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  },

  methods: {
    onTabClick(tab, index) {
      // Set submenu content
      if ('content' in tab) {
        this.submenu = tab.content;
      }
      else {
        this.submenu = [];
      }
      // Selecting the same item again
      if (this.arrowOpenIndex === index) {
        // Deselct the tab and hide the menu
        this.selectTabIndex(null);
        this.arrowOpenIndex = null;
        this.showSubmenu = false;
      }
      else {  // Selecting a new item
        this.selectTabIndex(index);
        this.arrowOpenIndex = index;
      }
      if (this.submenu.length > 0) {
        this.showSubmenu = true;
      }
    },
    selectTabIndex(index) {
      this.selectedTabIndex = index;
    },
    handleOutsideClick(event) {
      const clickedOutside =
        !this.$el.contains(event.target) &&
        !event.target.closest('.tab-content');

      if (clickedOutside) {
        this.showSubmenu = false;
        this.selectTabIndex(null);
        this.arrowOpenIndex = null;
        this.submenu = [];
      }
    },
    onClickSubMenuItem() {
      // Close submenu
      console.log('close submenu');

      this.showSubmenu = false;
      this.arrowOpenIndex = null;
      this.submenu = [];
    },
  },
};
</script>

<style scoped>
.tab-menu {
  position: relative; /* Create a new stacking context */
  z-index: 1000; /* Ensure it has a high z-index */
}

.tabs {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.tab {
  cursor: pointer;
  position: relative;
  padding-left: 5px;  /** Make underline fit better */
  padding-right: 5px;  /** Make underline fit better */
}

.tab a {
  color: #753880 !important;
  text-decoration: none;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ccc; /* Active tab underline color */
}
.icon-expand {
  display: inline-block;
  transition: transform 0.5s;
  margin: 0;
}
.icon-expand.open {
  transform: rotate(0deg);
}
.icon-expand.close {
  transform: rotate(180deg);
}

.govuk-header__navigation li a:hover {
  text-decoration: none !important;
}
.flex-item {
  color: #753880;
  text-align: left;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
  cursor: pointer;
}
.flex-column .flex-item:not(:last-child) {
  margin-bottom: 10px;
}
.flex-item:hover {
  text-decoration: underline;
}
</style>
