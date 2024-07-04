<template>
  <div
    class="flex-container"
    style="border: 1px solid black"
  >
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="flex-column"
    >
      <slot
        v-for="(item, itemIndex) in column"
        :key="itemIndex"
        name="item"
        :item="item"
        :navigate="navigate"
      >
        <div class="flex-item">
          {{ item.title }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullWidthMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
    maxItemsPerColumn: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  computed: {
    columns() {
      const columns = [];
      const numberOfColumns = Math.ceil(this.items.length / this.maxItemsPerColumn);

      for (let i = 0; i < numberOfColumns; i++) {
        const column = this.items.slice(i * this.maxItemsPerColumn, (i + 1) * this.maxItemsPerColumn);
        columns.push(column);
      }

      return columns;
    },
  },
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
.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #f3f2f1;
  padding: 1rem;
  margin-top: 1rem;
}
.flex-column {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
}
.flex-item {
  color: #753880;
  margin-bottom: 10px;
  text-align: left;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
}
</style>
