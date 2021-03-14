<template>
  <q-page class="row items-center justify-evenly">
    <scheduler-component
      title="Booking component"
      active
      :todos="todos"
      :meta="meta"
    ></scheduler-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import SchedulerComponent from 'components/SchedulerComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { SchedulerComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 3
    });
    return { todos, meta };
  }
});
</script>
