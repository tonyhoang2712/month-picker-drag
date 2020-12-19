# month-picker-drag

- Author: Tony Hoang
- Email: chienhd@sudobo.com, hoangchien2712tv@gmail.com
- Contributors: khaitm@sudobo.com

A Vue.js search select component with NO dependencies.

## Version 0.2.2

+ Support Vue.js from version 2.x and later

### Release Notes

<https://github.com/tonyhoang2712/month-picker-drag>

# Usage

## Install

npm
```bash
npm install month-picker-drag
```

yarn
```bash
yarn add month-picker-drag
```

# Sample code

```html
<template>
  <div>
    <month-picker-drag
      @fiscal-month="getFiscalMonth"
      :propsMonth="propsMonth"
    ></month-picker-drag>
  </div>
</template>

<script>
import MonthPickerDrag from 'month-picker-drag'

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
```

## Props
```Component: MonthPickerDrag```

| Name             | Type     | Default        | Description                         |
|------------------|----------|----------------|-------------------------------------|
| startFiscalMonth | Number   |  1             |the starting month of the fiscal year|
| startMonth       | Number   |  1             |the starting month of the fiscal year that is currently viewed or active|
| endMonth         | Number   |  12            |the ending month of the fiscal year that is currently viewed or active|
| quarterOfYear    | Boolean  | false          |determines that it is either the quarters of the year or the months of the year|
| language         | String   | vi or en       |determines that it is either Vietnamese or English|
| :fiscal-month    | Function | return Object  |it returns an object|

#

See [Configuration Reference](https://cli.vuejs.org/config/).
