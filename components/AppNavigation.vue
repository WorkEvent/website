<script lang="ts" setup>
import { PhSignOut, PhHouseSimple, PhUser, PhShoppingBagOpen, PhGift } from 'phosphor-vue';

const links = [
  { icon: PhHouseSimple, name: 'Home', route: '/dashboard' },
  { icon: PhShoppingBagOpen, name: 'Shop', route: '/dashboard' },
  { icon: PhGift, name: 'Home', route: '/dashboard' }
];

</script>

<template>
  <div :class="$style.navigation">
    <div class="flex flex-row md:flex-col gap-4">
      <NuxtLink class="btn btn-square" to="/">
        <img src="~/assets/images/logo.png" class="h-6 w-6">
      </NuxtLink>
      <NuxtLink
        v-for="(link, index) in links"
        :key="index"
        class="btn btn-ghost btn-square"
        :to="link.route"
      >
        <component :is="link.icon" :size="18" />
      </NuxtLink>
    </div>
    <div class="ml-auto md:ml-0 md:mt-auto flex flex-row md:flex-col gap-4">
      <button class="btn btn-ghost btn-square" @click="$emit('logout')">
        <PhUser :size="18" />
      </button>
      <button class="btn btn-ghost btn-square" @click="$emit('logout')">
        <PhSignOut :size="18" />
      </button>
    </div>
  </div>
</template>

<style module>
.navigation {
  @apply
    sticky bottom-0 left-0
    flex flex-row w-full p-4 items-center
    bg-base-100 border-t border-base-300
    md:fixed
    md:flex-col md:w-auto md:h-full md:justify-start md:items-center
    md:border-t-0 md:border-r;
}
</style>
