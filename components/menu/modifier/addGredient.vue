<template>
  <div>
    <b-modal id="add-gredient" size="lg" ref="modal" hide-footer hide-header>
      <form @submit.prevent="SubmitIngredientData()">
        <ValidationObserver ref="form">
          <div class="row">
            <div class="col-lg-12">
              <div class="prems__add_gredient">
                <div class="prems__body_gredient">
                  <ValidationProvider
                    name="value"
                    rules="required|min:3"
                    v-slot="{ errors }"
                  >
                    <label for="ingredient" class="prems__label">{{
                      $t('menu.add_ingredient.value')
                    }}</label>
                    <input
                      type="text"
                      class="prems__form_controls w-100"
                      v-model="data.value"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="prems__body_gredient">
                  <ValidationProvider
                    name="price"
                    rules="required|min_value:0.1"
                    v-slot="{ errors }"
                  >
                    <label for="price" class="prems__label">{{
                      $t('menu.add_ingredient.price')
                    }}</label>
                    <input
                      type="text"
                      v-model.number="data.price"
                      class="prems__form_controls  w-100"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="prems_border_top pt-1 d-flex justify-content-end">
                <b-button
                  class="prems_btn_cancel"
                  variant="prems_btn_cancels"
                  @click="$bvModal.hide('add-gredient')"
                  >{{ $t('menu.modal.cancel') }}</b-button
                >
                <b-button
                  type="submit"
                  class="prems_btn_success"
                  variant="prems_btn_successs"
                >
                  <span v-if="success">{{ $t('menu.modal.save') }}....</span>
                  <span v-if="!success">{{ $t('menu.modal.save') }}</span>
                </b-button>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'
import { ModelSelect } from 'vue-search-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    ModelSelect,
    ValidationProvider,
    ValidationObserver
  },
  props: ['ingredients','getGredient'],
  data() {
    return {
      success: false,
      data: {
        modifier_id: '',
        value: '',
        price: ''
      }
    }
  },
  methods: {
    /**
     * Remove
     * return @void
     */
    showingredientModal: function(modal_id, id) { 
      this.$bvModal.show(modal_id)
      this.data.modifier_id = id
      this.data.value = ''
      this.data.price = ''
    },
    SubmitIngredientData() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.success = true
          let data = {
            modifier_id: this.data.modifier_id,
            value: this.data.value,
            price: this.data.price
          }
          axios
            .post(
              'https://business-dashboard-koa-rest-ap.herokuapp.com/ingredient',
              data
            )
            .then(async res => { 
              await this.getIngredient(this.data.modifier_id) 
              this.getGredient(this.data.modifier_id)
               this.success = false
              this.$bvModal.hide('add-gredient')
              this.$toast
                .success(this.$t('menu.add_ingredient.add_gredient_msg'))
                .goAway(5000)
            })
            .catch(errors => {
              console.log(errors)
            })
          return
        }
      })
    },
    async getIngredient(id){
        let vm = this;
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
  }
}
</script>
