<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        bgColor="bg-orange-4"
      >Apartments</list-header>

<div class="q-pa-md row items-start q-gutter-md">

        <apartment
          v-for="a in apartments"
          :key="a.name"
          :apartment="a"
          :id="a.name"
        ></apartment>

      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('resources', ['apartments'])
  },
  components: {
    apartment: require('components/Resources/ApartmentCard.vue').default,
    'list-header': require('components/Shared/ListHeader.vue').default
  }
}
</script>
