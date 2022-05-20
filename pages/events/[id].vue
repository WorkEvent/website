<script lang="ts" setup>

definePageMeta({
  middleware: ['auth']
});

const route = useRoute();
const supabase = useSupabaseClient();

type Event = {
    name: string,
    description: string,
}

const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('id', route.params.id);

const event = data[0] as Event;

</script>

<template>
  <NuxtLayout>
    <div v-if="!error" class="flex-col flex gap-5">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ event.name }}
          </h2>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
