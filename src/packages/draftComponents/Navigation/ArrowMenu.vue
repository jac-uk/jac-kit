<template>
  <div class="tab-content">
    <a
      v-for="(item, i) in items"
      :key="i"
      class="submenuItem"
      @click.stop="navigate(item.link)"
    >
      {{ item.title }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'ArrowMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['close'],
  methods: {
    navigate(arg) { // Either router object or a function
      if (typeof arg === 'function') {
        arg();
      }
      else {
        this.$router.push(arg);
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.tab-content {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #000;
  padding: 10px 0;
  z-index: 1000; /* Ensure the content box appears above main content */
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2px;
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
</style>
