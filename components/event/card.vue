<script lang="ts" setup>
import type { WorkEvent } from '~/types/event';

const props = defineProps<{
  event: WorkEvent;
}>();
</script>

<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        {{ props.event.name }}
      </h2>
      <p>{{ props.event.description }}</p>

      <div class="card-actions justify-end">
        <NuxtLink class="btn btn-primary" :to="`/dashboard/events/${props.event.id}`">
          Read More
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
