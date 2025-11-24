<template>
  <div class="antialiased min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'AI-Oracle | Intelligence for Monad',
  meta: [
    { name: 'theme-color', content: '#0E0024' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
  ]
})
</script>