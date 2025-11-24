<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-monad-bg/80 z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-monad-bg/50 to-monad-bg z-10"></div>
      <NuxtImg src="/hero-bg.png" class="w-full h-full object-cover opacity-60" placeholder />
    </div>

    <div class="container mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Content -->
      <div class="text-center lg:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#200052] border border-[#836EF9]/30 text-[#A090FF] text-xs font-bold uppercase tracking-wider mb-8">
          <NuxtImg src="/monad.svg" class="w-4 h-4" />
          Native on Monad
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
          <span class="block">Intelligence for</span>
          <span class="text-gradient">Smart Contracts</span>
        </h1>
        
        <p class="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Unlock the full potential of Monad's high-performance parallel execution. 
          Access AI responses directly from your smart contracts with sub-second latency.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <NuxtLink to="/docs" class="btn-primary px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-[#836EF9]/20 flex items-center justify-center">
            Start Building
          </NuxtLink>
          <button class="btn-secondary px-8 py-3 rounded-xl font-bold text-lg group relative overflow-hidden">
            <span class="group-hover:invisible transition-all">Buy $AI on Uniswap</span>
            <span class="absolute inset-0 flex items-center justify-center bg-monad-dark/90 text-monad-purple font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      <!-- Visual -->
      <div class="relative hidden lg:block">
        <div class="relative animate-float">
          <NuxtImg 
            src="/orb.png" 
            class="w-full max-w-[450px] mx-auto rounded-full animate-slow-spin" 
            style="-webkit-mask-image: radial-gradient(circle at center, black 60%, transparent 100%); mask-image: radial-gradient(circle at center, black 60%, transparent 100%);"
            placeholder 
          />
          
          <!-- Floating Cards -->
          <div class="absolute -left-12 top-1/2 -translate-y-1/2 glass-panel p-5 rounded-2xl w-[280px] animate-float" style="animation-delay: 1s;">
            <div class="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
              <div class="p-2 bg-monad-purple/20 rounded-lg flex-shrink-0 w-9 h-9 flex items-center justify-center">
                <Icon name="lucide:brain" class="text-monad-purple w-5 h-5" />
              </div>
              <span class="text-sm font-bold text-white tracking-wide">Request</span>
            </div>
            <p class="text-xs text-gray-300 font-mono mb-3 italic">"Analyze market sentiment for ETH..."</p>
            <div class="font-mono text-[10px] leading-relaxed text-gray-400 bg-black/20 p-2 rounded-lg border border-white/5">
              <span class="text-gray-500">// Awaiting ABI</span><br>
              (<br>
              &nbsp;&nbsp;<span class="text-[#F471B5]">uint256</span> sentiment,<br>
              &nbsp;&nbsp;<span class="text-[#F471B5]">string[]</span> sources<br>
              )
            </div>
          </div>

          <div class="absolute -right-8 top-1/3 glass-panel p-5 rounded-2xl w-[280px] animate-float-delayed">
             <div class="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
              <div class="p-2 bg-green-500/20 rounded-lg flex-shrink-0 w-9 h-9 flex items-center justify-center">
                <Icon name="lucide:check-circle" class="text-green-400 w-5 h-5" />
              </div>
              <span class="text-sm font-bold text-white tracking-wide">Response</span>
            </div>
            <p class="text-xs text-gray-300 font-mono mb-3 italic">"Sentiment: Bullish (0.85)"</p>
            <div class="font-mono text-[10px] leading-relaxed text-gray-400 bg-black/20 p-2 rounded-lg border border-white/5">
              <span class="text-gray-500">// Result Data</span><br>
              [<br>
              &nbsp;&nbsp;<span class="text-green-400">850000000000000000</span>,<br>
              &nbsp;&nbsp;[<span class="text-orange-300">"coindesk.com"</span>...]<br>
              ]
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add specific keyframes if not in main.css */
</style>