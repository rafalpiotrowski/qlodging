<template>
  <q-page class="row items-center justify-evenly">
    <scheduler-component
      active
    ></scheduler-component>
  </q-page>
</template>

<script lang="ts">
import SchedulerComponent from 'components/SchedulerComponent.vue';
import { defineComponent} from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { SchedulerComponent }
});
</script>
