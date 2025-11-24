<template>
  <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-monad-bg/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img src="/logo.svg" alt="AI-Oracle" class="h-10 w-10 transition-transform group-hover:scale-110" />
        <span class="font-display font-bold text-xl tracking-tight">AI-Oracle</span>
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink to="/#features" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</NuxtLink>
        <NuxtLink to="/docs" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Developers</NuxtLink>
        <NuxtLink to="/#community" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Community</NuxtLink>
      </div>

      <!-- CTA -->
      <div class="flex items-center gap-3">
        <!-- CA Display -->
        <div class="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 cursor-pointer hover:bg-white/10 hover:text-white transition-all" title="Copy CA">
           <span class="text-monad-purple font-bold">$AI:</span>
           <span>0x7f...3a9</span>
           <Icon name="lucide:copy" class="w-3 h-3 ml-1" />
        </div>

        <a href="https://twitter.com/AiOracleOnMonad" target="_blank" class="p-2 text-gray-400 hover:text-white transition-colors">
          <Icon name="simple-icons:x" class="w-5 h-5" />
        </a>

        <NuxtLink to="/docs" class="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all text-white">
          <Icon name="lucide:book" class="w-4 h-4" />
          Docs
        </NuxtLink>
        <button class="bg-monad-purple hover:bg-monad-light text-white px-5 py-2 rounded-lg text-sm font-bold transition-all">
          Launch App
        </button>
        
        <!-- Mobile Menu Toggle -->
        <button class="md:hidden p-2 text-gray-300" @click="isOpen = !isOpen">
          <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-monad-bg border-b border-white/5 absolute w-full left-0 top-20 p-6 flex flex-col gap-4">
      <NuxtLink to="/#features" class="text-gray-300 hover:text-white" @click="isOpen = false">Features</NuxtLink>
      <NuxtLink to="/docs" class="text-gray-300 hover:text-white" @click="isOpen = false">Developers</NuxtLink>
      <NuxtLink to="/#community" class="text-gray-300 hover:text-white" @click="isOpen = false">Community</NuxtLink>
      <div class="h-px bg-white/10 my-2"></div>
      <NuxtLink to="/docs" class="flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm font-medium text-white" @click="isOpen = false">
        Read Documentation
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>