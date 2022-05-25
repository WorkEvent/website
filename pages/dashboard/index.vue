<script lang="ts" setup>
definePageMeta({
  middleware: [() => {
    return navigateTo('/dashboard/events');
  }]
});
</script>

<template>
  <div />
</template>
