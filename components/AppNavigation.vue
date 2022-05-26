<script lang="ts" setup>
import { PhSignOut, PhHouseSimple, PhUser, PhShoppingBagOpen, PhGift, PhDotsThree } from 'phosphor-vue';

const emits = defineEmits(['signOut']);

const links = [
  { icon: PhHouseSimple, name: 'Home', route: '/dashboard' },
  { icon: PhShoppingBagOpen, name: 'Shop', route: '/dashboard' },
  { icon: PhGift, name: 'Home', route: '/dashboard' }
];

const actions = [
  { icon: PhUser, name: 'Profile', type: 'link', route: '/dashboard' },
  { icon: PhSignOut, name: 'Sign out', type: 'button', click: () => emits('signOut') }
];

</script>

<template>
  <div :class="$style.navigation">
    <ul class="flex flex-row md:flex-col gap-4">
      <li>
        <NuxtLink class="btn btn-square" to="/">
          <img src="~/assets/images/logo.png" class="h-6 w-6">
        </NuxtLink>
      </li>
      <li
        v-for="(link, index) in links"
        :key="index"
        class="tooltip md:tooltip-right"
        :data-tip="link.name"
      >
        <NuxtLink
          class="btn btn-ghost btn-square"
          :to="link.route"
        >
          <component :is="link.icon" :size="18" />
        </NuxtLink>
      </li>
    </ul>
    <ul class="hidden md:flex md:ml-0 md:mt-auto md:flex-col gap-4">
      <li
        v-for="(action, index) in actions"
        :key="index"
        class="tooltip tooltip-right"
        :data-tip="action.name"
      >
        <button
          v-if="action.type === 'button'"
          class="btn btn-ghost btn-square"
          @click="action.click"
        >
          <component :is="action.icon" :size="18" />
        </button>
        <button
          v-if="action.type === 'link'"
          class="btn btn-ghost btn-square"
          :to="action.route"
        >
          <component :is="action.icon" :size="18" />
        </button>
      </li>
    </ul>
    <div class="md:hidden ml-auto dropdown dropdown-top dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-square">
        <PhDotsThree :size="18" />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 mb-8 border border-base-300 bg-base-100 rounded-box w-56">
        <li
          v-for="(action, index) in actions"
          :key="index"
        >
          <button
            v-if="action.type === 'button'"
            @click="action.click"
          >
            <component :is="action.icon" :size="18" />
            {{ action.name }}
          </button>
          <NuxtLink
            v-if="action.type === 'link'"
            :to="action.route"
          >
            <component :is="action.icon" :size="18" />
            {{ action.name }}
          </NuxtLink>
        </li>
      </ul>
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
