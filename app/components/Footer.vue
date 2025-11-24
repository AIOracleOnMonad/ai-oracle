<template>
  <footer id="community" class="bg-monad-bg border-t border-white/5 py-12">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <NuxtImg src="/logo.svg" class="h-8 w-8" />
            <span class="font-bold text-xl">AI-Oracle</span>
          </div>
          <p class="text-gray-400 text-sm max-w-xs">
            Empowering the next generation of intelligent decentralized applications on Monad.
          </p>
        </div>
        
        <div>
          <h4 class="font-bold mb-4">Product</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><NuxtLink to="/#features" class="hover:text-monad-purple">Features</NuxtLink></li>
            <li><NuxtLink to="/docs" class="hover:text-monad-purple">Documentation</NuxtLink></li>
            <li><NuxtLink to="/docs#pricing" class="hover:text-monad-purple">Pricing</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-4">Connect</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="https://twitter.com/AiOracleOnMonad" target="_blank" class="hover:text-monad-purple">Twitter</a></li>
            <li><a href="#" class="hover:text-monad-purple">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">© 2025 AI-Oracle. All rights reserved.</p>
        <div class="flex gap-4">
           <!-- Social Icons -->
           <a href="https://twitter.com/AiOracleOnMonad" target="_blank">
             <Icon name="simple-icons:x" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
           </a>
           <a href="#">
             <Icon name="simple-icons:github" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
           </a>
        </div>
      </div>
    </div>
  </footer>
</template>