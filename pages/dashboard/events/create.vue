<script lang="ts" setup>

definePageMeta({
  middleware: ['auth']
});

// const supabase = useSupabaseClient();
// const profile = await useUserProfile();

const createEvent = () => {
  console.log('test');
};

</script>

<template>
  <NuxtLayout name="dashboard">
    <form class="w-full flex flex-col gap-5">
      <input
        type="text"
        placeholder="Name..."
        class="input input-bordered w-full"
        name="name"
      >
      <textarea
        name="description"
        class="textarea textarea-bordered w-full h-60"
        placeholder="Description..."
      />
      <input
        type="text"
        placeholder="Address..."
        class="input input-bordered w-full"
        name="location"
      >
      <input
        type="datetime-local"
        placeholder="Start at..."
        class="input input-bordered w-full"
        name="start-date"
      >
      <input
        type="datetime-local"
        placeholder="End at..."
        class="input input-bordered w-full"
        name="end-date"
      >
      <input
        type="number"
        placeholder="Price..."
        class="input input-bordered w-full"
        name="price"
        :value="0"
      >
      <input
        type="file"
        class="input input-bordered p-2 w-full h-auto"
        :class="$style['file-input']"
        name="thumbnail"
      >
      <button class="btn btn-primary" @click.prevent="createEvent">
        Propose event
      </button>
    </form>
  </NuxtLayout>
</template>

<style module>
.file-input::file-selector-button{
  border: none;
  @apply btn;
}
</style>
