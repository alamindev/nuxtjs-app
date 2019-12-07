<template>
  <div>
    <div class="prems__main_body">
      <form @submit.prevent="SubmitItem">
        <perfect-scrollbar>
          <ValidationObserver ref="form">
            <div class="prems__heading">
              <div class="prems__modifiers_group">
                <ValidationProvider
                  name="item"
                  rules="required|min:3"
                  v-slot="{ errors }"
                >
                  <div class="prems__modifiers_input">
                    <input
                      type="text"
                      class="modifiers_input"
                      v-bind:placeholder="$t('menu.modifiers.write_item')"
                      v-model="data.value"
                    />
                  </div>
                  <span class="text-danger" v-if="data.errors">{{
                    data.errors
                  }}</span>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  name="details"
                  rules="required|min:5"
                  v-slot="{ errors }"
                >
                  <div class="prems__modifiers_input">
                    <textarea
                      class="prems__form_controls w-100 prems__menu_details"
                      rows="1"
                      v-model="data.description"
                      v-bind:placeholder="
                        $t('menu.modifiers.write_description')
                      "
                    ></textarea>
                  </div>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <ValidationProvider
                name="price"
                rules="required|numeric|min_value:1"
                v-slot="{ errors }"
              >
                <div class="prems__body_price">
                  <label for="price" class="prems__label">{{
                    $t('menu.modifiers.price_title')
                  }}</label>
                  <input
                    type="text"
                    class="prems__form_controls"
                    v-bind:placeholder="$t('menu.modifiers.price')"
                    v-model.number="data.price"
                  />
                </div>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="prems__modifiers prems__border_top">
              <div class="prems__select_box_main">
                <div class="prems__select_title">
                  {{ $t('menu.modifiers.add_modifiers') }}
                </div>
                <div class="prems__select_box">
                  <model-select
                    :options="options"
                    v-model="modifier"
                    v-bind:placeholder="$t('menu.modifiers.select_modifiers')"
                  ></model-select>
                  <button
                    type="button"
                    class="prems__button"
                    @click="AddModifier"
                  >
                    {{ $t('menu.modifiers.add') }}
                  </button>
                </div>
              </div>
              <div class="prems__modifiers_value">
                <ul class="prems__modifiers_ul list-unstyled m-0">
                  <li
                    class="prems__modifiers_li"
                    v-for="(modifier, index) in get_modifier"
                    :key="index"
                  >
                    <div
                      class="prems__modifiers_title d-flex"
                      v-on:click.stop="ToggleModifiers(modifier.id)"
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
                        <div class="d-flex">
                          <span
                            class="prems__modifiers_icon"
                            @click.stop="editModifier(modifier.id)"
                          >
                            <i class="material-icons">create</i>
                          </span> 
                        </div>
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
              <div class="prems__add_modifiers_group">
                <p
                  class="p-0 m-0 text-uppercase prems__add_item"
                  @click="showModalModifiers('add-modifiers-group')"
                >
                  add Modifiers Group
                </p>
              </div>
            </div>
          </ValidationObserver>
        </perfect-scrollbar>
        <div class="prems__body_submit_btn text-center ">
          <button
            type="submit"
            class="w-100 d-block prems__add_item text-white text-uppercase prems__button py-2"
          >
            <span v-if="!success">Submit</span>
            <span v-if="success">Submit...</span>
          </button>
        </div>
      </form>
    </div>
    <addModifierGroup
      ref="addModifierGroupRef"
      :getModifiers="getModifiers"
      :ingredients.sync="ingredients"
      :get_modifier.sync="get_modifier"
      :modifiers="modifiers"
    />
    <editModifierGroup
      ref="editModifierGroupRef"
      :getModifiers="getModifiers"
      :ingredients.sync="ingredients"
      :getGredient="getGredient"
      :get_modifier.sync="get_modifier"
      :modifiers="modifiers"
      :options="options"
    />
   
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'
import lodash from 'lodash'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { ModelSelect } from 'vue-search-select'
import addModifierGroup from '../modifier/addModifierGroup'
import editModifierGroup from '../modifier/editModifierGroup'


export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PerfectScrollbar,
    ModelSelect,
    addModifierGroup,
    editModifierGroup, 
  },
  props: ['allItems','allcates'],
  data() {
    return {
      success: false,
      data: {
        modifier_ids: [],
        category_id: '',
        value: '',
        price: null,
        description: '',
        errors: ''
      },
      modifiers: [],
      options: [],
      modifier: '',
      get_modifier: [],
      ingredients: []
    }
  },
  methods: {
    showModalModifiers(id) {
      this.$refs.addModifierGroupRef.showModalModifilers(id)
    },
  
    // get Item Id
    getItemId(id) {
      if (id) {
        this.getModifier(id)
      }
    },
    //  toggle modifier
    ToggleModifiers(modifier_id) {
      _.forEach(this.get_modifier, modifier => {
        if (modifier.id === modifier_id) {
          modifier.isActive = !modifier.isActive
        } else {
          modifier.isActive = false
        }
      })
    },
    /**
     * edit Modifier
     * return @void
     */
    editModifier: function(id) {
      this.$refs.editModifierGroupRef.editModifier(id, this.modifiers)
    },
    /**
     * Add New Item show
     * when click sidebar add new button
     * return @void
     */
    addNewItem(cate_id) {
      if (cate_id) {
        let newItems = []
        _.forEach(this.allItems, val => {
          val.item_active = false
          newItems.push(val)
        })
        this.get_modifier = []
        this.ingredients = []
        this.data.modifier_ids = []
        ;(this.data.category_id = cate_id), (this.data.value = '')
        this.data.description = ''
        this.data.price = ''
        this.data.errors = ''
      }
    },
    /**
     * Get All Modifiers
     * and show in the search box
     * return @void
     */
    async getModifiers() {
      let modifiers = await this.$axios.$get(
        'https://business-dashboard-koa-rest-ap.herokuapp.com/modifiers'
      )
      this.modifiers = modifiers
      const data = modifiers.map((val, index) => {
        return {
          value: val.id,
          text: val.value
        }
      })
      this.options = data
    },
    /**
     *  check modifer already add or not
     * if add then not duplicate
     * return @void
     */
    existModifier: function(id) {
      for (var i = 0; i < this.get_modifier.length; i++) {
        if (this.get_modifier[i].id == id) {
          return true
        }
      }
      return false
    },
    /**
     * Add Modifier
     * return @void
     */
    async AddModifier() {
      if (this.modifier) {
        let modifiers = await this.$axios.$get(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/modifiers'
        )
        this.data.modifier_ids.push(this.modifier)
        const check = this.existModifier(this.modifier)
        if (!check) {
          let vm = this
          _.find(modifiers, function(o) {
            if (o.id === vm.modifier) {
              const data = {
                id: o.id,
                isActive: false,
                value: o.value
              }
              vm.get_modifier.push(data)
              vm.getGredient(o.id)
            }
          })
        }
      }
      this.modifier = ''
    },
    /**
     * get Modifier
     * return @void
     */
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
          vm.data.modifier_ids.push(o.id)
        }
      })
    },
    /**
     * get Gredient Modifier
     * return @void
     */
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
    },
    /**
     * Submit Item
     * return @void
     */
    SubmitItem() {
      this.$refs.form.validate().then(result => {
        if (result) {
          let vm = this
          this.success = true
          let body = {
            category_id: this.data.category_id,
            price: this.data.price,
            value: this.data.value,
            description: this.data.description,
            modifier_ids: this.data.modifier_ids
          } 
          axios
            .post(
              'https://business-dashboard-koa-rest-ap.herokuapp.com/item',
              body
            )
            .then(async res => {
              this.data.errors = ''
              let items = await this.$axios.$get(
                'https://business-dashboard-koa-rest-ap.herokuapp.com/item?id=' +
                  `${this.data.category_id}`
              ) 
              const subItem = _.map(items, (value, key) => {
                return {
                  ...value,
                  item_active: true,
                  manage_item_active: false, 
                }
              })
              const id = _.differenceBy(subItem, this.allItems, 'id')[0]
              this.allItems.push(id) 
              this.$emit('ItemAddComplete', false)
              this.$emit('ItemCategories', this.data.category_id)
              
              vm.success = false
              this.$toast
                .success(this.$t('menu.modifiers.item_create_msg'))
                .goAway(5000)
            })
            .catch(error => {
              if (error.response) {
                if (error.response.status === 409) {
                  vm.success = false
                  vm.data.errors = vm.$t('menu.modifiers.exits_msg')
                }
              }
            })

          return
        }
      })
    }
  },
  mounted() {
    this.getModifiers(); 
  }
}
</script>

<style lang="scss">
.ps {
  height: 70vh;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
