<template>
  <div>
    <b-modal id="delete-item" ref="modal" hide-footer hide-header>
      <form ref="form" @submit.prevent="SubmitDeleteItem('delete-item')">
        <div class="row">
          <div class="col-lg-12">
            <div class="prems__delete">
              <h3>{{ $t('menu.item.title') }}</h3>
              <p>
                {{ $t('menu.item.heading_one') }}
                <b v-if="edit_delete_data">{{ edit_delete_data }}</b>
                {{ $t('menu.item.heading_two') }}
              </p>
            </div>
          </div>
        </div>
        <div class="prems_border_top pt-1 d-flex justify-content-end">
          <b-button
            class="prems_btn_cancel"
            variant="prems_btn_cancels"
            @click="ModalHide('delete-item')"
            >{{ $t('menu.modal.cancel') }}</b-button
          >
          <b-button
            type="submit"
            class="prems_btn_success prems_btn_denger"
            variant=" prems_btn_success prems_btn_denger"
          >
            <span v-if="!success">{{ $t('menu.modal.delete') }}</span>
            <span v-if="success">{{ $t('menu.modal.delete') }}...</span>
          </b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select'
import lodash from 'lodash'
import axios from 'axios'
export default {
  components: {
    ModelSelect
  },
  props: ['getItem', 'items'],
  data() {
    return {
      success: '',
      edit_delete_data: '',
      delete_id: '',
      cate_id: ''
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
    },
    /**
     * Delete Item data
     * return @void
     */
    ItemDeleteModal(id, modal_id, cate_id) {
      this.delete_id = id
      this.$bvModal.show(modal_id)
      this.cate_id = cate_id
      this.showItemNameModalBox(id)
    },
    /**
     * Fetch and show data in deleteItem Modal box
     * return @void
     * func: showItemNameModalBox
     */
    showItemNameModalBox(id) {
      this.edit_delete_data = {}
      const item = this.items.filter(i => i.id === id)
      if (item && item.length > 0) {
        this.edit_delete_data = item[0].value
      }
    },

    /**
     * Submit Delete item
     * return Id
     */
    SubmitDeleteItem(id) {
      this.success = true
      axios
        .delete(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/item?id=' +
            `${this.delete_id}`
        )
        .then(res => {
          if (res.status === 200) {
            this.success = false
            this.$bvModal.hide(id)
            this.$toast.success(this.$t('menu.item.delete_msg')).goAway(5000)
            _.remove(this.items, n => n.id === this.delete_id)
            let items = _.filter(this.items, o => o.id !== this.delete_id)
            const newitem = _.filter(
              items,
              item => item.category_id === this.cate_id
            )
            const itemNotCategoryId = _.filter(
              items,
              item => item.category_id !== this.cate_id
            )
            _.forEach(newitem, item => {
              item.manage_item_active = false
              item.item_active = false
            })
            if (newitem && newitem.length) {
              newitem[0].item_active = true
            }
            let newItem = [...itemNotCategoryId, ...newitem]
            this.$emit('update:items', newItem)
          }
        })
    }
  }
}
</script>
