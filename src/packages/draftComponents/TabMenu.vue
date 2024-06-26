<template>
  <nav class="tab-menu">
    <ul class="tabs govuk-header__navigation user-menu">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab govuk-header__navigation-item"
        :class="{ 'active': activeTab === index }"
        @click.stop="activateTab(tab, index)"
      >
        <template v-if="'content' in tab">
          <span
            class="icon-expand"
            :class="showTab === index ? 'close' : 'open'"
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
          <div
            v-show="showTab === index"
            class="tab-content"
          >
            <a
              v-for="(item, i) in tab.content"
              :key="i"
              class="submenuItem"
              @click.stop="navigate(item.link, item, index)"
            >
              {{ item.title }}
            </a>
          </div>
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
  </nav>
</template>

<script>
export default {
  name: 'TabMenu',
  props: {
    tabs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: null,
      showTab: null,
    };
  },
  mounted() {
    document.body.addEventListener('click', this.handleOutsideClick);
    this.activeTab = null;
    this.showTab = null;
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    activateTab(tab, index) {
      if ('content' in tab) {
        this.activeTab = null;
      }
      else {
        this.activeTab = index;
      }
      if (this.showTab === index) {
        this.showTab = null;
      }
      else {
        this.showTab = index;
      }
    },
    navigate(arg, tab, index) { // Either router object or a function
      if (typeof arg === 'function') {
        arg();
      }
      else {
        this.$router.push(arg);
      }
      this.activateTab(tab, index);

    },
    handleOutsideClick(event) {
      const clickedOutside =
        !this.$el.contains(event.target) &&
        !event.target.closest('.tab-content');

      if (clickedOutside) {
        this.showTab = null;
      }
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

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ccc; /* Active tab underline color */
}

.tab-content {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  /*border: 1px solid #ccc;*/
  border: 1px solid #000;
  padding: 10px 0;
  z-index: 1000; /* Ensure the content box appears above main content */
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-content::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
  z-index: 1000; /* Ensure the arrow is above other elements */
}

.tab-content::after {
  content: '';
  position: absolute;
  top: -11px; /* Adjust to position it slightly higher than the ::before element */
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 11px 11px 11px;
  border-style: solid;
  border-color: transparent transparent #000 transparent;
  z-index: 999; /* Ensure the border arrow is below the white arrow */
}

.tab:hover .tab-content {
  display: block;
}

.submenuItem {
  padding: 0 10px;
  display: block;
}

.submenuItem:not(:last-child) {
  margin-bottom: 4px;
}

.submenuItem:hover {
  background-color: #f3f2f1;
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
</style>
