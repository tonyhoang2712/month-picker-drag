<template>
  <div id="wrap-months-picker">
    <ul id="months-picker" v-directiveDraggable="1" ref="monthPicker">
      <template v-if="months.length > 4">
        <li
          v-for="(month, i) in months"
          :key="i"
          :data-month="month"
          class="item"
          :class="activeClass(month)"
          v-bind:style="{ width: `${itemWidth2}px` }"
        >
          <span>{{ month }}</span>
        </li>
      </template>
      <template v-else>
        <li
          v-for="(month, i) in months"
          :key="i"
          :data-month="month"
          class="item"
          :class="activeClass(month)"
          v-bind:style="{ width: `${itemWidth2}px` }"
        >
          <span>{{ language(month) }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import Picker2 from "./helperPicker";
export default {
  name: "MonthPicker",
  props: {
    propsMonth: Object,
  },
  data() {
    return {
      initialCoordinateX: 0,
      positionMouseX: 0,
      isDrawing: false,
      startFiscal: 1,
      positionStart: 0,
      positionEnd: 11,
      getValueStart: 1,
      getValueEnd: 12,
      totalWidth: 395,
      itemWidth: 33,
      itemWidth2: 32,
      months: [],
    };
  },
  watch: {
    propsMonth: {
      deep: true,
      handler() {
        this.getValueStart = this.propsMonth.startMonth || 1;
        this.getValueEnd = this.propsMonth.endMonth || 12;
        this.startFiscal = this.propsMonth.startFiscalMonth || 1;
        this.months = this.monthsCalc();
        this.initialMouseXCalc();
      }
    }
  },
  mounted() {
    this.months = this.monthsCalc();
    this.initialMouseXCalc();
  },
  methods: {
    language(i) {
      if(this.propsMonth.language === 'en') {
        return `${i}st Quarter`
      }
      return `Quý ${i}`
    },
    activeClass(month) {
      if(this.propsMonth.quarterOfYear) {
        if(Math.ceil(this.propsMonth.startMonth / 3) <= month && month <= Math.ceil(this.propsMonth.endMonth / 3)) {
          return 'active';
        }
      }
      if(this.propsMonth.startMonth <= month && month <= this.propsMonth.endMonth) {
        return 'active';
      }

      return;
    },
    initialMouseXCalc() {
      let initialCoordinate = this.$refs.monthPicker.getBoundingClientRect();
      this.initialCoordinateX = initialCoordinate.x;
      this.totalWidth = this.$refs.monthPicker.offsetWidth;
      this.itemWidth = this.propsMonth.quarterOfYear
        ? Math.ceil(this.$refs.monthPicker.offsetWidth / 4)
        : Math.ceil(this.$refs.monthPicker.offsetWidth / 12);
      this.itemWidth2 = this.propsMonth.quarterOfYear
        ? Math.floor(this.$refs.monthPicker.offsetWidth / 4)
        : Math.floor(this.$refs.monthPicker.offsetWidth / 12);
    },
    monthsCalc() {
      this.startFiscal = !this.propsMonth.quarterOfYear
        ? this.propsMonth.startFiscalMonth
        : Math.ceil(this.propsMonth.startFiscalMonth / 4);
      let length = this.propsMonth.quarterOfYear ? 4 : 12;
      let months = [];
      let j = 0;
      for (let i = 0; i < length; i++) {
        if (this.startFiscal + i > length) {
          j += 1;
          months.push(j);
        } else {
          months.push(this.startFiscal + i);
        }
      }
      return months;
    },
  },
  directives: {
    directiveDraggable: {
      bind: function (el, bind, { context }) {
        const _ = Picker2;
        el.addEventListener(
          "mousedown",
          function (e) {
            context.isDrawing = true;
            let dx = e.clientX - context.initialCoordinateX;
            context.positionStart = Math.floor(dx / context.itemWidth);
            _.setInitMousedown(el, context.positionStart);
            context.positionMouseX =
              Math.floor(dx / context.itemWidth) * context.itemWidth +
              context.initialCoordinateX;
            el.addEventListener("mousemove", handleMousemove, false);
            el.addEventListener("mouseup", handleMouseup, false);
          },
          false
        );
        const handleMousemove = function (e) {
          if (!context.isDrawing) {
            handleMouseup();
            return false;
          }
          let dx = e.clientX - context.positionMouseX;
          var i;
          if (dx < 0) {
            i = Math.floor(Math.ceil(dx) / context.itemWidth);
          } else {
            i = Math.floor(Math.floor(dx) / context.itemWidth);
          }
          context.positionEnd = context.positionStart + i;
          _.setActiveWhenMousemove(
            el,
            context.positionStart,
            context.positionEnd
          );
          el.addEventListener("mouseup", handleMouseup, false);
        };
        const handleMouseup = function () {
          context.isDrawing = false;
          el.removeEventListener("mousedown", handleMouseup, false);
          el.removeEventListener("mousemove", handleMousemove, false);
          el.removeEventListener("mouseup", handleMouseup, false);
          let arrayIndex = Array();
          el.childNodes.forEach(function (element, index) {
            if (element.classList.contains("active")) {
              arrayIndex.push(index);
            }
          });
          let min = Math.min(...arrayIndex);
          let max = Math.max(...arrayIndex);
          context.$emit("fiscal-month", {
            startMonth: !context.propsMonth.quarterOfYear
              ? el.childNodes[min].getAttribute("data-month")
              : _.specifyStartMonthOfQuarter(
                  el.childNodes[min].getAttribute("data-month")
                ),
            endMonth: !context.propsMonth.quarterOfYear
              ? el.childNodes[max].getAttribute("data-month")
              : _.specifyEndMonthOfQuarter(
                  el.childNodes[max].getAttribute("data-month")
                ),
          });
          return false;
        };
      },
    },
  },
};
</script>
<style lang="css">
#wrap-months-picker {
  display: block;
  position: relative;
  margin: 0 !important;
  padding: 0 !important;
  width: 395px !important;
  border: 1px solid #a3b9c1;
}
#wrap-months-picker:after,
#wrap-months-picker ul#months-picker:after {
  content: "";
  clear: both;
  display: table;
}
#wrap-months-picker ul#months-picker {
  list-style-type: none;
  height: auto;
  width: 100%;
  display: block;
  float: left;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#wrap-months-picker ul#months-picker li.item {
  display: block;
  width: 32px;
  height: 32px;
  float: left;
  overflow: hidden;
  background: #ffffff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}
#wrap-months-picker ul#months-picker li.item:not(:first-child) {
  border-left: 1px solid #a3b9c1;
}
#wrap-months-picker ul#months-picker li.item.active {
  background-color: #4b7b6e;
  color: #ffffff;
}
#wrap-months-picker ul#months-picker li.item.active span {
  color: #ffffff;
}
#wrap-months-picker ul#months-picker li.item span {
  display: block;
  height: 100%;
  line-height: 32px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}
</style>