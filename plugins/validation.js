import Vue from 'vue'
import { extend, localize } from 'vee-validate'
import {
  required,
  min,
  email,
  min_value,
  max_value,
  numeric
} from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

// Install required rule.
extend('required', required)
extend('min', min)
extend('min_value', min_value)
extend('max_value', max_value)
extend('numeric', numeric)
// extend('max', max)
localize({
  en: {
    messages: en.messages,
    names: {
      value: '',
      ingredient: '',
      item: 'Item Name',
      details: '',
      price: ''
    },
    fields: {
      modifier_price: {
        required: 'Price Is Required',
        min_value: 'Must Greater then 0'
      },
      min_rule: {
        required: 'Min Is Required',
        max_value: 'Must Less then 10'
      },
      max_rule: {
        required: 'Max Is Required',
        min_value: 'Must Less then Min',
        max_value: 'Must Less then 10'
      }
    }
  }
})

let LOCALE = 'en'

Object.defineProperty(Vue.prototype, 'locale', {
  get() {
    return LOCALE
  },
  set(val) {
    LOCALE = val
    localize(val)
  }
})
