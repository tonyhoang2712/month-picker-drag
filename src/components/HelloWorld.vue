<template>
  <div>
    <month-picker-drag
      @fiscal-month="getFiscalMonth"
      :propsMonth="propsMonth"
    ></month-picker-drag>
  </div>
</template>

<script>
import MonthPickerDrag from './MonthPicker.vue'
export default {
  name: 'HelloWorld',
  components: {
    MonthPickerDrag
  },
  computed: {
    propsMonth() {
      return {
        startFiscalMonth: 1,
        startMonth: 1,
        endMonth: 12,
        quarterOfYear: false,
        language: 'en'
      }
    }
  },
  methods: {
    getFiscalMonth(payload) {
      console.log(payload)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
