<script lang="ts" setup>

definePageMeta({
  middleware: ['auth']
});
const supabase = useSupabaseClient();

const profile = await useUserProfile();

const { data: events, error } = await supabase
  .from('events')
  .select('*')
  .eq('company', profile.value.company);

</script>

<template>
  <NuxtLayout name="dashboard">
    <div v-if="!error" class="flex-col flex gap-5">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
