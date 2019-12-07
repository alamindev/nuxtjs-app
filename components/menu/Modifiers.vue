<template>
  <div>
    <Item v-if="!add_new" ref="itemRef" :allItems.sync="allItems" />
    <AddItem
      v-if="add_new"
      ref="additemRef"
      :allItems.sync="allItems"
      @ItemAddComplete="ItemAddComplete"
      @ItemCategories="ItemCategories"
    />
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'
import Item from './item/item'
import AddItem from './item/addItem'

export default {
  components: {
    Item,
    AddItem
  },
  props: ['allItems', 'getCategory', 'categories'],
  data() {
    return {
      success: false,
      add_new: false,
      item_id: ''
    }
  },
  methods: {
    getItemId(id) {
      this.add_new = false
      setTimeout(() => {
        this.$refs.itemRef.getItemId(id)
      }, 200)
    },
    ToggleModifiers(modifier) {
      modifier.isActive = !modifier.isActive
    },
    addNewItem(cate_id) {
      if (cate_id) {
        this.add_new = true
        setTimeout(() => {
          this.$refs.additemRef.addNewItem(cate_id)
        }, 200)
      }
    },
    ItemAddComplete(value) {
      this.add_new = value
      setTimeout(() => {
        let filter = _.find(this.allItems, ['item_active', true])
        let check = _.isEmpty(filter)
        if (!check) {
          this.getItemId(filter.id)
        }
      }, 100)
    },
    ItemCategories(id) {
      const cates = _.filter(this.categories, val => val.id === id)
      cates[0].highlight = false 
    }
  }
}
</script>
