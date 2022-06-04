<script lang="ts" setup>
import { PhSignOut, PhCalendarBlank, PhUser, PhGift, PhDotsThree } from 'phosphor-vue';

const emits = defineEmits(['signOut']);
const route = useRoute();

const profile = await useUserProfile();

const links = [
  { icon: PhCalendarBlank, name: 'Events', route: '/dashboard/events', indicator: undefined },
  { icon: PhGift, name: 'Rewards', route: '/dashboard' }
];

const actions = [
  {
    icon: PhUser,
    name: 'Profile',
    type: 'link',
    route: '/dashboard',
    indicator: profile.value.reward_points
  },
  {
    icon: PhSignOut,
    name: 'Sign out',
    type: 'button',
    click: () => emits('signOut')
  }
];

</script>

<template>
  <div :class="$style.navigation">
    <ul class="flex flex-row md:flex-col gap-4">
      <li>
        <NuxtLink class="btn btn-ghost btn-square" to="/">
          <img src="~/assets/images/logo.png" class="h-6 w-6">
        </NuxtLink>
      </li>
      <li
        v-for="(link, index) in links"
        :key="index"
        class="tooltip md:tooltip-right"
        :data-tip="link.name"
      >
        <div class="indicator">
          <span
            v-if="link.indicator !== undefined"
            class="indicator-item badge badge-accent"
          >
            {{ link.indicator }}
          </span>
          <NuxtLink
            class="btn btn-ghost btn-square"
            :class="{ 'btn-active': link.route === route.path }"
            :to="link.route"
          >
            <component :is="link.icon" :size="20" />
          </NuxtLink>
        </div>
      </li>
    </ul>
    <ul class="hidden md:flex md:ml-0 md:mt-auto md:flex-col gap-4">
      <li
        v-for="(action, index) in actions"
        :key="index"
        class="tooltip tooltip-right"
        :data-tip="action.name"
      >
        <div class="indicator">
          <span
            v-if="action.indicator !== undefined"
            class="indicator-item indicator-center indicator-bottom badge badge-accent"
          >
            {{ action.indicator }}
          </span>
          <button
            v-if="action.type === 'button'"
            class="btn btn-ghost btn-square"
            @click="action.click"
          >
            <component :is="action.icon" :size="20" />
          </button>
          <NuxtLink
            v-if="action.type === 'link'"
            class="btn btn-ghost btn-square"
            :to="action.route"
          >
            <component :is="action.icon" :size="20" />
          </NuxtLink>
        </div>
      </li>
    </ul>
    <div class="md:hidden ml-auto dropdown dropdown-top dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-square">
        <PhDotsThree :size="20" />
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
            <component :is="action.icon" :size="20" />
            {{ action.name }}
          </button>
          <NuxtLink
            v-if="action.type === 'link'"
            :to="action.route"
          >
            <component :is="action.icon" :size="20" />
            {{ action.name }}
            <span
              v-if="action.indicator !== undefined"
              class="badge badge-accent"
            >
              {{ action.indicator }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style module>
.navigation {
  top: 100vh;

  @apply
    sticky left-0
    flex flex-row w-full p-4 items-center
    bg-base-100 border-t border-base-300
    md:top-0
    md:fixed
    md:flex-col md:w-auto md:h-full md:justify-start md:items-center
    md:border-t-0 md:border-r;
}
</style>
