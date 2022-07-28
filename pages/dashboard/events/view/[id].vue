<script lang="ts" setup>
import { Ref } from 'vue';
import type { RealtimeSubscription } from '@supabase/supabase-js';
import { WorkEvent } from '~~/types/event';

definePageMeta({
  middleware: ['auth']
});

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { data: event }: { data: Ref<WorkEvent> } = await useAsyncData(`event-${route.params.id}`, async () => {
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('id', route.params.id)
    .single();
  return data;
});

const { data: userVote, refresh: refreshUserVote } = await useAsyncData(`user-vote-${route.params.id}`, async () => {
  const { data } = await supabase
    .from('user-votes')
    .select('*')
    .eq('event', route.params.id)
    .eq('user', user.value.id)
    .maybeSingle();
  return data;
});

const { data: count, refresh: refreshVoteCount } = await useAsyncData(`votes-count-${route.params.id}`, async () => {
  const { count } = await supabase
    .from('user-votes')
    .select('*', { count: 'exact' })
    .eq('event', route.params.id);
  return count;
});

const toggleVote = async () => {
  if (userVote.value) {
    await supabase
      .from('user-votes')
      .delete()
      .eq('event', route.params.id)
      .eq('user', user.value.id);
  } else {
    await supabase
      .from('user-votes')
      .insert([
        { event: route.params.id, user: user.value.id }
      ]);
  }
};

let subscription: RealtimeSubscription;

onMounted(() => {
  subscription = supabase.from('user-votes').on('*', () => {
    refreshVoteCount();
    refreshUserVote();
    console.log(userVote.value);
  }).subscribe();
});

onUnmounted(() => {
  supabase.removeSubscription(subscription);
});

</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="card w-full">
      <img
        :src="event.thumbnail ?? 'https://picsum.photos/1080/240'"
        :alt="`${event.name} thumbnail`"
        class="h-60 w-full object-cover"
      >
      <div class="card-body bg-base-300">
        <h2 class="card-title">
          {{ event.name }}
        </h2>
        <p>
          {{ event.description }}
        </p>
        <div class="card-actions items-center justify-end">
          <div class="badge">
            {{ count }} votes
          </div>
          <button class="btn btn-primary" @click="toggleVote">
            {{ userVote ? 'Remove vote' : 'Vote for this event' }}
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
