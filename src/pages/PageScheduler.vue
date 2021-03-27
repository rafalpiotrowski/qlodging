<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <q-scroll-area class="q-scroll-area-calendar">
        <div class="row q-mb-lg">
          <data-range-selection />
        </div>

        <!-- the calendar -->
        <calendar />
      </q-scroll-area>
    </div>
  </q-page>
</template>

<style></style>

<script>

export default {
  components: {
    'data-range-selection': require('components/Scheduler/DateRangeSelection.vue')
      .default,
    calendar: require('components/Scheduler/Calendar.vue').default
  }
}
</script>

<style lang="scss">
.q-scroll-area-calendar {
  display: flex;
  flex-grow: 1;
  .scroll {
    height: auto !important;
  }
  .mobile & {
    flex-basis: 100px;
  }
}
</style>
