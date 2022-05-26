<script lang="ts" setup>
import type { WorkEvent } from '~/types/event';

const supabase = useSupabaseClient();

const props = defineProps<{
  event: WorkEvent;
}>();

const { data: count } = await useAsyncData('votes-count', async () => {
  const { count } = await supabase
    .from('user-votes')
    .select('*', { count: 'exact' })
    .eq('event', props.event.id);
  return count;
});

supabase
  .from('user-votes')
  .on('*', () => {
    refreshNuxtData('votes-count');
  })
  .subscribe();

</script>

<template>
  <NuxtLink
    :to="`/dashboard/events/${props.event.id}`"
    class="relative overflow-hidden h-80 w-60 bg-primary p-2 rounded-3xl flex flex-col justify-end"
  >
    <img
      src="https://picsum.photos/240/320"
      :alt="`${props.event.name} thumbnail`"
      class="absolute top-0 left-0 h-full w-full"
    >
    <div class="card card-compact w-full bg-base-100">
      <div class="card-body">
        <h2 class="card-title line-clamp-1">
          {{ props.event.name }}
        </h2>
        <p class="line-clamp-3">
          {{ props.event.description }}
        </p>
        <div class="card-actions">
          <div class="badge">
            {{ count }} votes
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
