<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const supabase = useSupabaseClient();
const profile = await useUserProfile();
const user = useSupabaseUser();

const { data: rewards } = await useAsyncData('rewards', async () => {
  const { data } = await supabase
    .from('rewards')
    .select('*')
    .eq('company', profile.value.company);
  return data;
});

const getReward = async (reward) => {
  const newBalance = profile.value.reward_points - reward.cost;

  if (newBalance >= 0) {
    await supabase
      .from('profiles')
      .update({ 'reward_points': newBalance })
      .eq('id', user.value.id);
  }
};

</script>

<template>
  <NuxtLayout name="dashboard">
    <h1 class="font-black text-6xl mb-8">
      Get your rewards
    </h1>
    <div class="grid gap-5 grid-cols-1 xl:grid-cols-3 grid-rows-1">
      <div
        v-for="(reward, index) in rewards"
        :key="index"
        class="card w-full bg-base-100 border border-base-300"
      >
        <figure><img class="object-cover h-60 w-full" :src="reward.thumbnail" :alt="reward.name"></figure>
        <div class="card-body">
          <div class="badge">
            {{ reward.cost }}
          </div>
          <h2 class="card-title">
            {{ reward.name }}
          </h2>
          <p>{{ reward.description }}</p>
          <div class="card-actions">
            <button class="btn btn-primary w-full mt-4" @click="getReward(reward)">
              Get reward
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
