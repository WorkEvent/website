<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const user = useSupabaseUser();
const profile = await useUserProfile();

</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="flex flex-col mt-10">
      <p>Your are connected as {{ profile?.first_name }} {{ profile?.last_name }} ({{ user?.email }})</p>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
