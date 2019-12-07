<template>
  <div>
    <perfect-scrollbar>
      <div class="prems__main_body">
        <div v-for="(dataItem, index) in allItems" :key="index">
          <div v-if="dataItem.id == item_id || dataItem.item_active">
            <div class="prems__heading">
              <div class="prems__modifiers_group">
                <div class="prems__modifiers_input">
                  <p class="prems__value">{{ dataItem.value }}</p>
                </div>
                <div class="prems__modifiers_input">
                  <p class="prems__description">{{ dataItem.description }}</p>
                </div>
              </div>
              <div class="prems__body_price">
                <p class="prems__price">{{ dataItem.price }}</p>
              </div>
            </div>
            <div class="prems__modifiers prems__border_top">
              <div class="prems__modifiers_value">
                <ul class="prems__modifiers_ul list-unstyled m-0">
                  <li
                    class="prems__modifiers_li"
                    v-for="(modifier, index) in get_modifier"
                    :key="index"
                  >
                    <div
                      class="prems__modifiers_title d-flex"
                      v-on:click.stop="ToggleModifiers(modifier)"
                    >
                      <span class="prems__modifiers_icon p-0">
                        <i class="material-icons" v-if="modifier.isActive"
                          >keyboard_arrow_down</i
                        >
                        <i class="material-icons" v-if="!modifier.isActive"
                          >keyboard_arrow_up</i
                        >
                      </span>
                      <div class="w-100 d-flex justify-content-between">
                        <span class="prems__title">{{ modifier.value }}</span> 
                      </div>
                    </div>
                    <div
                      class="prems__table_modifiers"
                      v-bind:class="{ prems__active: modifier.isActive }"
                    > 
                      <table class="prems__table">
                        <thead>
                          <tr>
                            <th>
                              {{ $t('menu.modifiers.gredient_table.title') }}
                            </th>
                            <th>
                              {{ $t('menu.modifiers.gredient_table.price') }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(gredient, index) in ingredients"
                            :key="index"
                          >
                            <td v-if="gredient.modifier_id == modifier.id">
                              {{ gredient.value }}
                            </td>
                            <td v-if="gredient.modifier_id == modifier.id">
                              {{ gredient.price }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    PerfectScrollbar
  },
  props: ['allItems'],
  data() {
    return {
      item_id: '',
      success: false,
      get_modifier: [],
      ingredients: []
    }
  },
  methods: {
    getItemId(id) {
      if (id) {
        this.getModifier(id)
      } 
    },
    ToggleModifiers(modifier) {
      modifier.isActive = !modifier.isActive
    },
 
    async getModifier(item_id) {
      this.get_modifier = []
      this.ingredients = []
      let modifier = await this.$axios.$get(
        'https://business-dashboard-koa-rest-ap.herokuapp.com/modifier?id=' +
          `${item_id}`
      ) 
      const data = modifier.map((val, index) => {
        return {
          id: val.id,
          value: val.value,
          isActive: false,
          item_id: item_id
        }
      })
      this.get_modifier = data 
      let vm = this  
      _.find(this.get_modifier, function(o) {
        if (o.item_id === item_id) {
          vm.getGredient(o.id) 
        }
      })
    },
    async getGredient(id) {
      let ingredients = await this.$axios.$get(
        'https://business-dashboard-koa-rest-ap.herokuapp.com/ingredient?id=' +
          `${id}`
      )
      if (ingredients.length > 0) {
        let vm = this 
         _.forEach(ingredients, gradient => {
          if (!this.ingredients.find(({ id }) => id === gradient.id)) {
            vm.ingredients.push(gradient)
          }
        })
      }
    }
  },
  mounted() {
  
  }
}
</script>

<style lang="scss">
.ps {
  height: 78vh;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
