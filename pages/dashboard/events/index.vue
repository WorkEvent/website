<script lang="ts" setup>
import type { Ref } from 'vue';
import { WorkEvent } from '~~/types/event';

definePageMeta({
  middleware: ['auth'],
  title: 'Events'
});

const supabase = useSupabaseClient();
const profile = await useUserProfile();

const { data: events }: { data: Ref<WorkEvent[]> } = await useAsyncData('events', async () => {
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('company', profile.value.company);
  return data;
});

const d = Date.now();
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
const ho = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
const mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
const formatedDate = `${mo} ${da}, ${ho}:${mi}`;

</script>

<template>
  <NuxtLayout name="dashboard">
    <section>
      <span class="font-bold opacity-50">{{ formatedDate }}</span>
      <h1 class="font-black text-6xl mb-4">
        Discover events
      </h1>
    </section>
    <section>
      <h2 class="font-bold text-2xl mb-4">
        For you
      </h2>
      <div class="grid gap-5 grid-cols-1 xl:grid-cols-3 grid-rows-1">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
        />
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped></style>
