<script lang="ts" setup>
import type { WorkEvent } from '~/types/event';

const supabase = useSupabaseClient();

const props = defineProps<{
  event: WorkEvent;
  displayVotes?: boolean;
}>();

const { data: count } = await useAsyncData(`votes-count-${props.event.id}`, async () => {
  const { count } = await supabase
    .from('user-votes')
    .select('*', { count: 'exact' })
    .eq('event', props.event.id);
  return count;
});

let subscription;

onMounted(() => {
  subscription = supabase.from('user-votes').on('*', () => {
    refreshNuxtData(`votes-count-${props.event.id}`);
  }).subscribe();
});

onUnmounted(() => {
  supabase.removeSubscription(subscription);
});

</script>

<template>
  <NuxtLink
    :to="`/dashboard/events/${props.event.id}`"
    :class="$style['event-card']"
  >
    <img
      :src="props.event.thumbnail ?? 'https://picsum.photos/240/320'"
      :alt="`${props.event.name} thumbnail`"
      class="absolute top-0 left-0 h-full w-full object-cover"
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
          <div v-if="props.displayVotes" class="badge">
            {{ count }} votes
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style module>

.event-card {
  @apply
    relative
    overflow-hidden
    h-80 w-full
    bg-primary
    p-2
    rounded-3xl
    flex flex-col justify-end
    hover:scale-105
    will-change-transform transition-transform;

  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}

</style>
