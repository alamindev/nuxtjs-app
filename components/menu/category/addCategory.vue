<template>
  <div>
    <b-modal id="add-category" ref="modal" hide-footer hide-header>
      <form ref="form" @submit.prevent="SubmitCateogory()">
        <div class="row">
          <div class="col-lg-12">
            <div class="prems__modifiers_group">
              <div class="prems__modifiers_input pb-0">
                <input
                  type="text"
                  class="modifiers_input"
                  :placeholder="$t('menu.add_category.placeholder')"
                  v-model="data.value"
                />
                <div class="prems__icon_body">
                  <i class="material-icons">create</i>
                </div>
              </div>
              <span class="invalid-feedback d-block" v-if="data.errors">{{
                data.errors
              }}</span>
              <div class="prems__modal_table">
                <table class="prems__table">
                  <thead>
                    <tr>
                      <th class="prems__modal_title" colspan="3">
                        {{ $t('menu.category_model.available') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="prems__body_tr"
                      v-for="(data, index) in data.availability"
                      :key="index"
                    >
                      <td class="prems__body_td pl-2">
                        <div class="prems__select_box_modal">
                          <model-select
                            :options="days"
                            v-model="data.item"
                            :placeholder="$t('menu.add_category.select_days')"
                          ></model-select>
                        </div>
                      </td>
                      <td class="prems__body_td">
                        <div class="prems__min_max">
                          <vue-timepicker
                            class="prems__modal_form_controls"
                            v-model="data.start_time"
                          ></vue-timepicker>
                          <span class="prems__to">To</span>
                          <vue-timepicker
                            class="prems__modal_form_controls"
                            v-model="data.end_time"
                          ></vue-timepicker>
                        </div>
                      </td>
                      <td class="prems__body_td_icon">
                        <i class="material-icons" @click="deleteTime(index)"
                          >clear</i
                        >
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="pt-3">
                        <button
                          type="button"
                          class="text-uppercase prems__table_btn pl-0"
                          @click.prevent="AddMoretime"
                        >
                          <i class="material-icons">add</i>
                          {{ $t('menu.category_model.add_more') }}
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="prems_border_top pt-1 d-flex justify-content-end">
          <b-button
            class="prems_btn_cancel"
            variant="prems_btn_cancels"
            @click="ModalHide('add-category')"
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
      </form>
    </b-modal>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'
import { ValidationProvider } from 'vee-validate'
import lodash from 'lodash'
import axios from 'axios'
export default {
  props: {
    showModal: { type: String }
  },
  components: {
    ModelSelect,
    VueTimepicker,
    ValidationProvider
  },
  props: ['allCates'],
  data() {
    return {
      days: [
        { value: '1', text: 'Mon-fri' },
        { value: '2', text: 'Sat-Sun' },
        { value: '3', text: 'EveryDay' },
        { value: '4', text: 'Sunday' },
        { value: '5', text: 'Monday' },
        { value: '6', text: 'Webnesday' },
        { value: '7', text: 'Thursday' },
        { value: '8', text: 'Friday' }
      ],
      data: {
        value: '',
        errors: '',
        success: false,
        availability: [
          {
            item: '',
            start_time: '',
            end_time: ''
          }
        ]
      }
    }
  },
  computed: {
    availabilityArr() {
      let availabilitys = JSON.parse(JSON.stringify(this.data.availability))
      return availabilitys.reduce((acc, elem) => {
        if (elem.item != '') {
          acc[elem.item] = [elem.start_time, elem.end_time]
          return acc
        }
        return {}
      }, {})
    }
  },
  // all methods start
  methods: {
    /*
    modal hide method
    return id
    */
    ModalHide: function(id) {
      this.$bvModal.hide(id)
      this.edit_mode = false
    },
    /*
    add more time means When is this menu available
    return void
    */
    AddMoretime: function() {
      let availability = {
        start_time: '',
        end_time: ''
      }
      this.data.availability.push(availability)
    },
    /**
     * Show modal
     * return @void
     */
    showModalCategory(id) {
      let obj = this.data.availability
      Array.prototype.clear = function() {
        this.length = 0
      }
      if (obj) {
        obj.clear()
      }
      this.data.value = ''
      this.data.errors = ''
      this.data.success = false
      let data = {
        item: '',
        start_time: '',
        end_time: ''
      }
      obj.push(data)
      this.$bvModal.show(id)
    },

    /**
     * Remove
     * return @void
     */
    deleteTime: function(id) {
      this.data.availability.splice(id, 1)
    },

    /**
     * submit Category data
     * return @void
     */
    SubmitCateogory() {
      if (this.data.value) {
        let vm = this
        let body = {
          value: this.data.value,
          availability: this.availabilityArr
        }
        vm.data.success = true
        axios
          .post(
            'https://business-dashboard-koa-rest-ap.herokuapp.com/category',
            body
          )
          .then(async res => {
            if (res.status === 201) {
              let obj = this.data.availability
              Array.prototype.clear = function() {
                this.length = 0
              }
              if (obj) {
                obj.clear()
              }
              this.data.value = ''
              this.data.errors = ''
               this.$bvModal.hide('add-category')
               this.data.success = false
              let datas = await this.$axios.$get(
                'https://business-dashboard-koa-rest-ap.herokuapp.com/category'
              )
              const data = _.map(datas, val => {
                return {
                  id: val.id,
                  value: val.value,
                  active: false,
                  manage_active: false,
                  availability: val.availability,
                  highlight: false
                }
              })
              const id = _.differenceBy(data, this.allCates, 'id')[0]
              this.allCates.push(id)  
              this.$toast
                .success(this.$t('menu.category.validation.success'))
                .goAway(5000)
            }
          })
          .catch(function(error) {
            if (error.response) {
              if (error.response.status === 409) {
                vm.data.success = false
                vm.data.errors = vm.$t('menu.category.validation.unique')
              }
            }
          })
      }
      this.data.errors = ''
      if (!this.data.value) {
        this.data.errors = this.$t('menu.category.validation.required')
      }
    }
  }, 
}
</script>
<style lang="scss" scoped>
.prems__min_max {
  display: flex;
  align-items: center;
  .prems__modal_form_controls {
    border: none;
    width: 100%;
  }
}
</style>
