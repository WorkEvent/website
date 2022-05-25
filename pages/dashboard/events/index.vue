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
      <div v-for="event in events" :key="event.id" class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ event.name }}
          </h2>
          <p>{{ event.description }}</p>

          <div class="card-actions justify-end">
            <NuxtLink class="btn btn-primary" :to="`/dashboard/events/${event.id}`">
              Read More
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
