<template>
  <div class="govuk-!-margin-bottom-2">
    <form
      autocomplete="off"
      @submit.prevent=""
    >
      <div class="field-with-help">
        <label>
          <span
            v-if="hasTitle"
            class="field-with-help__labeltext"
          >{{ searchMap.title }}</span>
          <input
            id="search"
            v-model="search"
            class="govuk-input"
            name="search"
            type="search"
          >
        </label>

        <div
          class="field-with-help__help"
        >
          <div
            class="tooltip js-tooltip"
            :class="{ active: isActive }"
          >
            <button
              type="button"
              class="tooltip__button js-tooltip-btn"
              @click="toggleTooltip"
            >
              <span class="tooltip__button__icon">
                <svg
                  viewBox="0 0 100 100"
                  class="tooltip__button__icon__svg"
                >
                  <path
                    d="M55.139,65.558H38.28v-4.726c0-4.045,0.872-7.57,2.611-10.581c1.739-3.011,4.878-6.16,9.418-9.452
                              c4.535-3.292,7.513-5.926,8.923-7.903s2.115-4.254,2.115-6.841s-1.01-4.612-3.03-6.069c-2.025-1.458-4.869-2.187-8.537-2.187
                              c-6.398,0-13.639,2.072-21.729,6.207L21.139,10.11c9.499-5.312,19.518-7.97,30.051-7.97c8.651,0,15.564,2.106,20.738,6.312
                              c5.174,4.211,7.761,9.795,7.761,16.755c0,4.654-1.058,8.675-3.173,12.062s-6.136,7.198-12.062,11.429
                              c-4.188,3.149-6.784,5.493-7.794,7.017c-1.015,1.529-1.52,3.54-1.52,6.031V65.558z M58.526,87.177c0,3.411-0.977,6.069-2.93,7.975
                              c-1.948,1.901-4.688,2.854-8.218,2.854c-3.525,0-6.255-0.939-8.18-2.82c-1.929-1.882-2.892-4.559-2.892-8.042
                              c0-3.478,0.948-6.136,2.854-7.97c1.906-1.834,4.645-2.754,8.218-2.754s6.327,0.943,8.256,2.825
                              C57.559,81.127,58.526,83.771,58.526,87.177z"
                  />
                </svg>
              </span>
              Help
            </button>
            <div class="tooltip__box js-tooltip-box">
              <p>{{ placeholder }}</p>
              <ul
                v-if="hasVisibleFields"
                class="search-item-list"
                title="Search for any of the following:"
              >
                <li
                  v-for="field in searchMap.tooltip.visible"
                  :key="field"
                >
                  {{ field }}
                </li>
              </ul>
              <p v-if="hasHiddenFields">
                {{ hiddenFieldsStr }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div
      id="background"
      class="background"
      :class="{ active: isActive }"
      aria-hidden="true"
      @click="closeOpenToolTip"
    />
  </div>
</template>

<script>
import searchMixin from '../../mixins/searchMixin';
import _has from 'lodash/has.js';
export default {
  mixins: [searchMixin],
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    searchMap: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ['search'],
  data() {
    return {
      search: '',
      isActive: false,
    };
  },
  computed: {
    hasTitle() {
      return this.hasSearchMap && _has(this.searchMap, 'title');
    },
    hasHiddenFields() {
      return this.hasSearchMap && _has(this.searchMap, 'tooltip.hidden') && this.searchMap.tooltip.hidden.length;
    },
    hiddenFieldsStr() {
      if (this.hasHiddenFields) {
        if (this.searchMap.tooltip.hidden.length === 1) {
          return `${this.searchMap.tooltip.hidden[0]} is not displayed in the table.`;
        }
        else if (this.searchMap.tooltip.hidden.length === 2) {
          return `${this.searchMap.tooltip.hidden.join(' and ')} are not displayed in the table.`;
        }
        else {
          const arrCopy = [...this.searchMap.tooltip.hidden];
          const last = arrCopy.pop();
          return `${arrCopy.join(', ')} and ${last} are not displayed in the table.`;
        }
      }
      return '';
    },
  },
  watch: {
    search() {
      this.startSearch();
    },
  },
  methods: {
    startSearch() {
      this.$emit('search', this.search);
    },

    toggleTooltip() {
      this.isActive = !this.isActive;
    },
    closeOpenToolTip() {
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
ul.search-item-list {
  padding: 0 0 0 1em;
}

ul.search-item-list[title]::before {
    content: attr(title);
    /* then add some nice styling as needed, eg: */
    display: block;
    font-weight: bold;
    padding: 4px;
    margin-left: -1.2em;
}

.govuk-input {
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    height: 2.5rem;
    margin-top: 0;
    padding: 5px;
    border: 2px solid #0b0c0c;
    border-radius: 0;
    -webkit-appearance: none;
    appearance: none;
  }
  button {
      border: none;
      background: none;
      transition: all 0.3s ease;
      padding: 0;
      line-height: 1.125em;
      display: inline-flex;
      align-items: center;
      font-family: Arial;
      font-size: 1.125em !important;
      -webkit-appearance: none;
      -moz-appearance: none;
      text-align: center;
  }

  /* field with help button ************ */

  .field-with-help {
      position: relative;
  }
  .field-with-help__labeltext {
      display: block;
      margin-bottom: 0.1em;
      margin-left: 0.2em;
      font-size: 1.125em !important;
  }
  .field-with-help__help {
      position: absolute;
      right: 0;
      bottom: 2.75em;
  }

  /* /field with help button */

  /* background for tooltips (and potentially other things) ************ */

  .background {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: rgba(255,255,255,0.93);
      z-index: -1;
  }
  .background.active {
      z-index: 1000;
  }
  /* /background for tooltips */

  /* tooltips ************ */

  .tooltip {
      position: relative;
      width: auto;
      display: inline-block;
  }
  .tooltip.active {
      z-index: 1003;
  }
  button.tooltip__button {
      display: inline-flex;
      align-items: center;
      padding: 0.2em;
      position: relative;
  }
  button.tooltip__button:after {
      content: '';
      position: absolute;
      bottom: -0.1em;
      left: 0.1em;
      right: 0.2em;

      border-bottom: 2px dotted #969696;
  }
  button.tooltip__button:hover:after,
  button.tooltip__button:focus:after,
  button.tooltip__button:active:after {
      border-color: #383838;
      border-bottom-style: solid;
      left: 0;
      right: 0;
  }
  button.tooltip__button:hover .tooltip__button__icon,
  button.tooltip__button:focus .tooltip__button__icon,
  button.tooltip__button:active .tooltip__button__icon {
      background-color: #383838;
  }
  button.tooltip__button:focus {
      background-color: #ffdd00;
      outline: 0;
  }
  .tooltip__button__icon {
      width: 1.15em;
      height: 1.15em;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5em;
      background-color: #969696;
  }
  .tooltip__button__icon__svg {
      width: 60%;
      height: 60%;
      fill: #fff;
  }
  .tooltip__box {
    top: calc(100% + 0em);
    left: calc(50% - 0px);
  }
  .tooltip__box {
      background: #fff;
      border: 2px solid #484848;
      padding: 1em;
      position: absolute;
      top: calc(100% + 0.65em);
      /*
      left: 50%;
      width: 15em;
      */
      left: 17%;
      width: 18em;
      margin: 0 0 0 -7.5em;
      line-height: 1.3;
      display: none;
  }
  .js-tooltip.active .tooltip__button {
      z-index: 1001;
  }
  .js-tooltip.active .tooltip__box {
      display: block;
      z-index: 1001;
  }
  .tooltip__box p,
  .tooltip__box ul {
      margin-bottom: 0.5em;
  }
  .tooltip__box p:last-of-type {
      margin-bottom: 0;
  }

  .tooltip__box:after, .tooltip__box:before {
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
  }
  .tooltip__box:after {
      border-color: rgba(136, 183, 213, 0);
      border-bottom-color: #fff;
      border-width: 7px;
      margin-left: -7px;
  }
  .tooltip__box:before {
      border-color: rgba(194, 225, 245, 0);
      border-bottom-color: #484848;
      border-width: 10px;
      margin-left: -10px;
  }
  .tooltip__box__close {
      position: absolute;
      top: -1em;
      right: 0;
      opacity: 0;
  }
  .tooltip__box__close:focus {
      opacity: 1;
  }
  .tooltip-target-active {
      position: relative;
      z-index: 1001;
  }
  /* tooltip arrow variations */
  .tooltip__box--underright {
      left: -0.5em;
      width: 15em;
      margin: 0;
  }
  .tooltip__box--underright:after, .tooltip__box--underright:before {
      left: 1.1em;
  }
  .tooltip__box--underleft {
      left: auto;
      right: -0.5em;
      width: 15em;
      margin: 0;
  }
  .tooltip__box--underleft:after, .tooltip__box--underleft:before {
      left: calc(100% - 1.1em);
  }
  .tooltip__box--sideright {
      margin: 0;
      left: calc(100% + 0.8em);
      top: -0.8em;
  }
  .tooltip__box--sideright:after, .tooltip__box--sideright:before {
      transform: rotate(-90deg);
      left: -10px;
      top: 1em;
  }
  .tooltip__box--sideright:after {
      border-width: 10px;
  }

  .tooltip__box--sideleft {
      margin: 0;
      right: auto;
      left: calc(0% - 15.8em);
      top: -0.8em;
  }
  .tooltip__box--sideleft:after, .tooltip__box--sideleft:before {
      transform: rotate(90deg);
      left: calc(100% + 10px);
      top: 1em;
  }
  .tooltip__box--sideleft:after {
      border-width: 10px;
      margin-left: -13.25px;
  }
  /* /tooltips ************ */
</style>
