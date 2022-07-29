<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const { signOut } = useAuth();

</script>

<template>
  <div class="md:pb-0 md:pl-20 w-full h-full">
    <main role="main" class="w-full p-4 md:max-w-xl xl:max-w-4xl mx-auto">
      <slot />
    </main>
    <AppFooter />
    <AppNavigation @sign-out="async () => await signOut('login')" />
  </div>
</template>

<style scoped></style>
