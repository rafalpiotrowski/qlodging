<template>
  <q-card class="my-card" flat bordered>
    <q-img src="http://www.dzikidom.pl/wp-content/uploads/2020/12/08D7C4F0-7537-4B2D-AB34-73DE247828A7-2000x1200.jpeg" />

    <q-card-section>
      <div class="text-overline text-orange-9">Apartment</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{apartment.name}}</div>
      <div class="text-caption text-grey">
        {{apartment.type}}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="dark" label="Share" />
      <q-btn flat color="primary" label="Book" />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ apartment.name }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
<script>
// import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: ['apartment'],
  data () {
    return {
      expanded: false
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 254px
  max-width: 350px
</style>
