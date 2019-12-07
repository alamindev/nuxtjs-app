<template>
  <div>
    <b-modal
      id="add-modifiers-group"
      size="lg"
      ref="modal"
      hide-footer
      hide-header
    >
      <form @submit.prevent="SubmitModifiersGroup()">
        <ValidationObserver ref="form">
          <div class="prems__modifiers_group">
            <ValidationProvider
              name="value"
              rules="required|min:3"
              v-slot="{ errors }"
            >
              <div class="prems__modifiers_input">
                <input
                  type="text"
                  class="modifiers_input"
                  v-model="data.value"
                  placeholder="Write Modifiers Group"
                />
                <div class="prems__icon_body">
                  <i class="material-icons">create</i>
                </div>
              </div>
              <span class="text-danger" v-if="data.errors">{{
                data.errors
              }}</span>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="prems__modifiers_customer_choose">
              <p class="p-0 mb-2">
                {{ $t('menu.modifiers_modal.customer_choose') }}
              </p>
              <div class="d-flex">
                <div class="prems__select_a_range">
                  {{ $t('menu.modifiers_modal.select_rage') }}
                </div>
                <div class="prems__min_max">
                  <ValidationProvider
                    name="min_rule"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="number"
                      min="1"
                      max="10"
                      class="prems__modal_form_controls"
                      v-model.number="data.min"
                      placeholder="min"
                    />
                    <span
                      class="text-danger prems_custom_error d-block message_min_max_alert"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                  <span class="prems__to ">{{
                    $t('menu.modifiers_modal.to')
                  }}</span>
                  <ValidationProvider 
                    name="max_rule"
                    :rules="{ required: !data.max, min_value: data.min }"
                    v-slot="{ errors }"
                  >
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="max"
                      class="prems__modal_form_controls"
                      v-model.number="data.max"
                    />
                    <span
                      class="text-danger prems_custom_error d-block message_min_max_alert"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
              </div>
            </div> 
            <div class="prems__modal_table">
              <table class="prems__table">
                <thead>
                  <tr>
                    <th class="prems__modal_title" style="width: 60%">
                      {{ $t('menu.modifiers_modal.ingredient') }}
                    </th>
                    <th class="prems__modal_title" style="width: 30%">
                      {{ $t('menu.modifiers_modal.option_fee') }}
                    </th>
                    <th class="prems__modal_title" style="width: 10%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="prems__body_tr"
                    v-for="(data, index) in data.ingredients"
                    :key="index"
                  >
                    <td class="prems__body_td pl-2">
                      <ValidationProvider
                        v-slot="{ errors }"
                         :vid="'ingredient'+ index"
                        name="ingredient"
                        rules="required|min:3"
                      >
                        <input 
                          type="text"
                          class="prems__table_input"
                          v-model="data.value"
                        />
                        <span class="text-danger prems_custom_error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </td>
                    <td class="prems__body_td">
                      <ValidationProvider
                        name="modifier_price"
                         :vid="'price'+ index"
                        rules="required|min_value:0.1"
                        v-slot="{ errors }"
                      >
                        <input
                          type="number" 
                          class="prems__table_input"
                          v-model.number="data.price"
                          step="0.1"
                        />
                        <span class="text-danger prems_custom_error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </td>

                    <td class="prems__body_td_icon">
                      <i class="material-icons" @click="deleteIngredient(index)"
                        >restore_from_trash</i
                      >
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="pt-3">
                      <button type="button"
                        class="text-uppercase prems__table_btn pl-0"
                        @click.prevent="MoreIngredient"
                      >
                        <i class="material-icons">add</i>
                        {{ $t('menu.modifiers_modal.ingredient') }}
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="prems_border_top pt-1 d-flex justify-content-end">
            <b-button
              class="prems_btn_cancel"
              variant="prems_btn_cancels"
              @click="ModalHide('add-modifiers-group')"
              >{{ $t('menu.modal.cancel') }}</b-button
            >
            <b-button
              type="submit"
              class="prems_btn_success"
              variant="prems_btn_successs"
            >
              <span v-if="data.success">{{ $t('menu.modal.save') }}....</span>
              <span v-if="!data.success">{{ $t('menu.modal.save') }}</span>
            </b-button>
          </div>
        </ValidationObserver>
      </form>
    </b-modal>
  </div>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'
import lodash from 'lodash'

export default {
  props: ['get_modifier', 'ingredients', 'modifiers', 'getModifiers'],
  components: {
    ModelSelect,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      data: {
        id: '',
        value: '',
        errors: '',
        success: false, 
        min: '',
        max: '', 
        ingredients: [
          {
            value: '',
            price: ''
          }
        ]
      },
      edit_id: '',
      edit_mode: false, 
    }
  },
  methods: {
    /**
     *  Modal Hide
     * return @void
     */
    ModalHide: function(id) {
      this.$bvModal.hide(id)
    },
    /**
     * Show modal modifier with all empty
     * return @void
     */
    showModalModifilers(id) {
      let obj = this.data.ingredients
      Array.prototype.clear = function() {
        this.length = 0
      }
      obj.clear()
      this.data.value = ''
      this.data.errors = ''
      ;(this.data.success = false), (this.data.min = '')
      this.data.max = ''
      let data = {
        value: '',
        price: ''
      }
      obj.push(data)
      this.$bvModal.show(id)
    },
    /**
     * Add more Ingredient
     * return @void
     */
    MoreIngredient: function() {
      let ingredients = {
        value: '',
        price: ''
      }
      this.data.ingredients.push(ingredients)
    },

    /**
     * Remove
     * return @void
     */
    deleteIngredient: function(id) {
      this.data.ingredients.splice(id, 1)
    },
    /**
     * Submit modifier group
     * return @void
     */
    SubmitModifiersGroup() {
      this.$refs.form.validate().then(result => {
        if (result) {
          let vm = this
          this.data.errors = ''
          this.data.success = true
          let datas = {
            value: this.data.value,
            min: parseInt(this.data.min),
            max: parseInt(this.data.max),
            ingredients: this.data.ingredients
          }

          axios
            .post(
              'https://business-dashboard-koa-rest-ap.herokuapp.com/modifier',
              datas
            )
            .then(async res => {
              this.$toast
                .success(this.$t('menu.modifiers_modal.success_msg'))
                .goAway(5000)
              await this.getModifiers()
              this.$bvModal.hide('add-modifiers-group')
              this.submitIngredients()
              this.data.success = false
            })
            .catch(error => {
              if (error.response) {
                if (error.response.status === 409) {
                  vm.data.success = false
                  vm.data.errors = vm.$t('menu.modifiers_modal.exits_msg')
                }
              }
            })
          return
        }
      })
    },
    /**
     * Also Submit Ingredients
     * return @void
     */
    submitIngredients() {
      const modifier = this.modifiers.find(
        modifier => modifier.value === this.data.value
      ).id
      const ingredient = this.data.ingredients
      for (let i = 0; i < ingredient.length; i++) {
        axios.post(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/ingredient',
          {
            modifier_id: modifier_id,
            value: ingredient[i].value,
            price: ingredient[i].price
          }
        )
      }
    }
  }
}
</script>
