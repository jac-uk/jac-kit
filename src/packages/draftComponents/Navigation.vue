<template>
  <nav
    class="moj-side-navigation govuk-!-padding-top-0"
    :aria-label="title || 'side-navigation'"
  >
    <ul class="moj-side-navigation__list">
      <h4
        v-if="title"
        class="moj-side-navigation__title"
      >
        {{ title }}
      </h4>
      <ul
        v-if="pages"
        class="moj-side-navigation__list"
      >
        <li
          v-for="(page, pageIndex) in pages"
          :key="pageIndex"
          :class=" isActive(page) ? 'moj-side-navigation__item moj-side-navigation__item--active' : 'moj-side-navigation__item'"
        >
          <router-link
            class="moj-side-navigation__item"
            :to="{name: page.name, params: page.params}"
            :aria-current="page.on ? 'page' : false"
          >
            {{ page.title }}
          </router-link>
        </li>
      </ul>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      required: true,
      type: Array,
    },
    title: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      currentPage: '',
    };
  },
  methods: {
    isActive(page){
      let result = false;
      // if an application
      if (page.params){
        if (page.params.nav) {
          const routePath = this.$route.path;
          result = routePath.includes(page.params.nav);
        }
        if (page.params.status == this.$route.path.split('/')[this.$route.path.split('/').length - 3]){
          // check if the status param matches route path 3rd from last item (draft/applied/withdrawn)
          result = page.params.status == this.$route.path.split('/')[this.$route.path.split('/').length - 3];
        } else if (page.title) {
          // else check the last word in the route path matches the page title (to lowercase)
          result = this.$route.path.split('/')[this.$route.path.split('/').length - 1] == page.title.toLowerCase();
        }
      }
      // if the route is an edit, list or back page
      else if (this.$route.name.split('-').some(i=>['edit','list','back'].indexOf(i) !== -1)) {
        // check the names match
        result = page.name.split('-')[2] == this.$route.name.split('-')[2];
      } else {
        // ensure child links are highlighted
        const name = this.$route.meta.pageName ? this.$route.meta.pageName : this.$route.name;
        result = name == page.name;
      }
      return result;
    },
  },

};
</script>
