<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Overview</h3>
      </d-col>
    </d-row>

    <!-- Small Stats Blocks -->
    <d-row>
      <d-col v-for="(stats, idx) in smallStats" :key="idx" class="mb-4">
        <small-stats
          :id="`small-stats-${idx}`"
          variation="1"
          :chart-data="stats.datasets"
          :label="stats.label"
          :value="stats.value"
          :percentage="stats.percentage"
          :increase="stats.increase"
          :decrease="stats.decrease"
        />
      </d-col>
    </d-row>

    <d-row>
      <!-- Business Revenus -->
      <d-col lg="8" md="12" sm="12" class="mb-4">
        <SalesOverview title="Revenus" />
      </d-col>

      <!-- Business Order Type -->
      <d-col lg="4" md="6" sm="12" class="mb-4">
        <order-type />
      </d-col>

      <!-- Business Top selling items -->
      <!-- <d-col lg="4" md="6" sm="12" class="mb-4">
        <TopReferrals title="Top Selling Menu items" />
      </d-col>-->
    </d-row>
  </d-container>
</template>

<script>
import SmallStats from '@/components/overview/SmallStats.vue'
import TopReferrals from '@/components/overview/TopReferrals.vue'
import SalesOverview from '@/components/overview/SalesOverview.vue'
import OrderType from '@/components/overview/OrderType.vue'

export default {
  components: {
    SmallStats,
    SalesOverview,
    TopReferrals,
    OrderType
  },
  data() {
    return {
      dateRange: {
        from: null,
        to: null
      },
      info: ''
    }
  },
  async mounted() {},
  methods: {},
  computed: {
    smallStats() {
      return [
        {
          label: 'Net Revenue',
          value: '2,390' + ' €',
          percentage: '-2.7%',
          increase: true,
          labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
          datasets: [
            {
              label: 'Today',
              fill: 'start',
              borderWidth: 1.5,
              backgroundColor: 'rgba(0, 184, 216, 0.1)',
              borderColor: 'rgb(0, 184, 216)',
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        },
        {
          label: 'Orders',
          value: '182',
          percentage: '12.4',
          increase: true,
          labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
          datasets: [
            {
              label: 'Today',
              fill: 'start',
              borderWidth: 1.5,
              backgroundColor: 'rgba(23,198,113,0.1)',
              borderColor: 'rgb(23,198,113)',
              data: [1, 2, 3, 3, 3, 4, 4]
            }
          ]
        },
        {
          label: 'Cancellation',
          value: '17',
          percentage: '3.8%',
          increase: false,
          decrease: true,
          labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
          datasets: [
            {
              label: 'Today',
              fill: 'start',
              borderWidth: 1.5,
              backgroundColor: 'rgba(255,180,0,0.1)',
              borderColor: 'rgb(255,180,0)',
              data: []
            }
          ]
        },
        {
          label: 'Customer Satisfaction',
          value: '98%',
          percentage: '0',
          increase: false,
          decrease: false,
          labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
          datasets: [
            {
              label: 'Today',
              fill: 'start',
              borderWidth: 1.5,
              backgroundColor: 'rgb(0,123,255,0.1)',
              borderColor: 'rgb(0,123,255)',
              data: []
            }
          ]
        },
        {
          label: 'Employee',
          value: '4',
          percentage: '2.71%',
          increase: false,
          decrease: true,
          labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
          datasets: [
            {
              label: 'Today',
              fill: 'start',
              borderWidth: 1.5,
              backgroundColor: 'rgba(255,65,105,0.1)',
              borderColor: 'rgb(255,65,105)',
              data: []
            }
          ]
        }
      ]
    }
  }
}
</script>

