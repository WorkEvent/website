<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const supabase = useSupabaseClient();
const profile = await useUserProfile();

const { data: rewards } = await useAsyncData('rewards', async () => {
  const { data } = await supabase
    .from('rewards')
    .select('*')
    .eq('company', profile.value.company);
  return data;
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="grid gap-5 grid-cols-1 xl:grid-cols-3 grid-rows-1">
      <div
        v-for="(reward, index) in rewards"
        :key="index"
        class="card w-full bg-base-100 shadow-xl"
      >
        <figure><img :src="reward.thumbnail" :alt="reward.name"></figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ reward.name }}
          </h2>
          <p>{{ reward.description }}</p>
          <p>{{ reward.cost }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              Add reward to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
