<template>
  <div>
    <b-modal
      id="edit-modifiers-group"
      size="lg"
      ref="modal"
      hide-footer
      hide-header
    >
      <form @submit.prevent="SubmitEditModifier()">
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
                    <th class="prems__modal_title" style="width: 65%">
                      {{ $t('menu.modifiers_modal.ingredient') }}
                    </th>
                    <th class="prems__modal_title" style="width: 20%">
                      {{ $t('menu.modifiers_modal.option_fee') }}
                    </th>
                    <th class="prems__modal_title" style="width: 15%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="prems__body_tr"
                    v-for="(data, index) in data.newingredients"
                    :key="index"
                  >
                    <td class="prems__body_td p-2">
                      {{ data.value }}
                    </td>
                    <td class="prems__body_td p-2">
                      {{ data.price }}
                    </td>

                    <td class="prems__body_td_icon">
                      <i
                        class="material-icons"
                        @click="deleteIngredientData(data.id)"
                        >restore_from_trash</i
                      >
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><button  @click.prevent="showingredientModal(edit_id)" type="button" class="pt-2 text-uppercase prems__table_btn pl-0"><i class="material-icons">add</i>
                      Add   InGredient
                    </button></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="prems_border_top d-flex justify-content-between align-items-center" >
            <div class="prems__delete_btn" @click.stop="deleteModifier(edit_id)"> 
              {{ $t('menu.modifiers_modal.delete_modifier') }} 
            </div>

            <div class=" pt-1 d-flex justify-content-end">
              <b-button
                class="prems_btn_cancel"
                variant="prems_btn_cancels"
                @click="ModalHide('edit-modifiers-group')"
                >{{ $t('menu.modal.cancel') }}</b-button
              >
              <b-button
                type="submit"
                class="prems_btn_success"
                variant="prems_btn_successs"
              >
                <span v-if="data.success"
                  >{{ $t('menu.modal.update') }}....</span
                >
                <span v-if="!data.success">{{ $t('menu.modal.update') }}</span>
              </b-button>
            </div>
          </div>
        </ValidationObserver>
      </form>
    </b-modal>
    <deleteIngredient
      ref="deleteIngredientRef"
      :ingredients.sync="data.newingredients"
      :parentingredients.sync="ingredients"
    />
    <deleteModifier
      ref="deleteModifierRef"
      :getModifiers="getModifiers"
      :get_modifier.sync="get_modifier"
      :options.sync="options"
    />
    <AddIngredient 
      ref="addIngredientRef"
      :ingredients.sync="data.newingredients" 
      :getGredient="getGredient"
    />
  </div>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'
import lodash from 'lodash'
import deleteIngredient from '../modifier/deleteGredient'
import deleteModifier from '../modifier/deleteModifier'
import AddIngredient from '../modifier/addGredient'

export default {
  props: [
    'get_modifier',
    'ingredients',
    'modifiers',
    'getModifiers',
    'options',
    'getGredient'
  ],
  components: {
    ModelSelect,
    ValidationProvider,
    ValidationObserver,
    deleteIngredient,
    deleteModifier,
    AddIngredient
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
        selected: '',
        newingredients: [
          {
            value: '',
            price: ''
          }
        ]
      },
      edit_id: ''
    }
  },
  methods: {
    showingredientModal(id) { 
      this.$refs.addIngredientRef.showingredientModal('add-gredient', id) 
    },
    deleteModifier(id) {
      this.$refs.deleteModifierRef.deleteModifier(id)
    },
    ModalHide: function(id) {
      this.$bvModal.hide(id)
    },
    editModifier(id, modifiers) {
      this.data.newingredients = []
      const datas = _.filter(modifiers, function(o) {
        return o.id === id
      })
      const ingredient = _.filter(this.ingredients, function(o) {
        return o.modifier_id === id
      })
      this.data.errors = ''
      this.data.newingredients = ingredient
      this.data.id = datas[0].id
      this.data.max = datas[0].max
      this.data.value = datas[0].value
      this.data.min = datas[0].min
      this.data.max = datas[0].max
      this.data.select = 'range'
      this.edit_id = id
      this.$bvModal.show('edit-modifiers-group')
    },
    SubmitEditModifier() {
      this.$refs.form.validate().then(result => {
        if (result) {
          let vm = this
          this.data.success = true
          let id = this.edit_id
          _.remove(this.get_modifier, function(obj) {
            return obj.id == id
          })
          let datas = {
            id: this.data.id,
            value: this.data.value,
            min: this.data.min,
            max: this.data.max
          }
          axios
            .patch(
              'https://business-dashboard-koa-rest-ap.herokuapp.com/modifier',
              datas
            )
            .then(res => {
              this.getModifiers()
              let datas = {
                id: this.data.id,
                value: this.data.value,
                isActive: false
              }
              this.get_modifier.push(datas)
              this.$bvModal.hide('edit-modifiers-group')
              this.data.success = false
              this.$toast
                .success(this.$t('menu.modifiers_modal.update_msg'))
                .goAway(5000)
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
    deleteIngredientData(id) {
      this.$refs.deleteIngredientRef.deleteIngredent(id, this.ingredients)
    }
  }
}
</script>
