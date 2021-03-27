<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No resource!
      <template v-slot:action>
        <q-btn
          to="/resources/addApartment"
          color="primary"
          label="Add Apartment"
          flat
        />
        <q-btn
          to="/resources/addCar"
          color="primary"
          label="Add Car"
          flat
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {
}
</script>
