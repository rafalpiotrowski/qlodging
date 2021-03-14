<template>
  <div class="row justify-center full-width">
    <q-calendar
      v-model="selectedDate"
      view="month-scheduler"
      :resources="resources"
      :resource-height="50"
      sticky
      locale="en-us"
      style="height: 200px; max-width: 800px; width: 100%;"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'SchedulerComponent',
  setup() {
    return {
      selectedDate: '2019-04-01',
      resources: [
        { label: 'Studio' },
        { label: 'Apartament' },
        { label: 'Loft' }
      ]
    };
  },
});
</script>
