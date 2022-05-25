<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const { signOut } = useAuth();

const logout = async () => {
  await signOut('login');
};
</script>

<template>
  <div class="md:pb-0 md:pl-20 h-full w-full">
    <main role="main" class="w-full h-full p-4 md:max-w-xl xl:max-w-4xl mx-auto">
      <slot />
    </main>
    <AppFooter />
    <AppNavigation @logout="logout" />
  </div>
</template>

<style scoped></style>
