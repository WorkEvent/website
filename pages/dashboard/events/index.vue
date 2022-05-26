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

</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="flex-col flex gap-5">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
