<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">

      <template v-if="apartmentsDownloaded">
        <div class="row q-mb-lg">
          <span>search bar goes here</span>
        </div>

        <q-scroll-area class="q-scroll-area-apartments">
          <no-resources
            v-if="!Object.keys(apartments).length"
          >
          </no-resources>

          <apartments
            v-if="Object.keys(apartments).length"
            class="q-mb-xl"
          />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            to="/resources/add"
            class="all-pointer-events"
            round
            color="primary"
            size="24px"
            icon="add"
          />
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('resources', ['apartments']),
    ...mapState('resources', ['apartmentsDownloaded'])
  },
  components: {
    'no-resources': require('src/components/Resources/NoResources.vue').default,
    apartments: require('src/components/Resources/Apartments.vue').default
  }
}
</script>
<style lang="scss">
  .q-scroll-area-apartments {
    display: flex;
    flex-grow: 1;
    .scroll {
      height: auto !important
    }
    .mobile & {
      flex-basis: 100px;
    }
  }
</style>
