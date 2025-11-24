<template>
  <section id="token" class="py-24 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-pink/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Content -->
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Icon name="lucide:flame" class="w-4 h-4" />
            Deflationary Tokenomics
          </div>
          
          <h2 class="text-3xl md:text-5xl font-bold mb-6">Fueling Intelligence with <span class="text-gradient-pink">$AI</span></h2>
          <p class="text-gray-400 text-lg mb-8 leading-relaxed">
            The $AI token is not just a payment method; it's designed to become scarcer with every request. 
            <strong class="text-white">100% of fees</strong> collected by the oracle are automatically sent to the burn address, 
            permanently reducing the total supply.
          </p>

          <div class="space-y-6">
            <!-- CA Box -->
            <div class="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-lg bg-monad-dark flex items-center justify-center border border-white/10">
                   <Icon name="lucide:file-code" class="text-monad-purple" />
                 </div>
                 <div>
                   <div class="text-xs text-gray-400 uppercase tracking-wider font-bold">Contract Address (Monad Testnet)</div>
                   <div class="font-mono text-white text-sm sm:text-base break-all">0x95e6a9c620083cf17adb3205cc0a2ce996597777</div>
                 </div>
              </div>
              <button 
                @click="copyAddress" 
                class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white relative group" 
                title="Copy Address"
              >
                <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-5 h-5" :class="copied ? 'text-green-400' : ''" />
                <span v-if="copied" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">Copied!</span>
              </button>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
               <div class="glass-panel p-4 rounded-xl text-center">
                 <div class="text-3xl font-bold text-white mb-1">100%</div>
                 <div class="text-xs text-gray-400 uppercase tracking-wide">Fee Burn Rate</div>
               </div>
               <div class="glass-panel p-4 rounded-xl text-center">
                 <div class="text-3xl font-bold text-white mb-1">1B</div>
                 <div class="text-xs text-gray-400 uppercase tracking-wide">Initial Supply</div>
               </div>
            </div>

            <!-- Buy Button -->
            <button class="w-full btn-secondary py-4 rounded-xl font-bold text-lg group relative overflow-hidden border-pink-500/30 hover:border-pink-500/50">
               <a href="https://nad.fun/tokens/0x95e6a9C620083cF17ADb3205cC0A2cE996597777" target="_blank" class="flex items-center justify-center gap-2 group-hover:invisible transition-all text-pink-400">
                 <Icon name="lucide:external-link" class="w-6 h-6" />
                 Buy $AI on nad.fun
               </a>
               <span class="absolute inset-0 flex items-center justify-center bg-pink-600 text-white font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                 Coming Soon
               </span>
            </button>
          </div>
        </div>

        <!-- Diagram -->
        <div class="relative">
           <div class="glass-panel p-2 rounded-2xl border border-white/10 shadow-2xl shadow-pink-900/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <img src="/token-flow.png" alt="Tokenomics Flow" class="w-full rounded-xl" />
           </div>
           
           <!-- Floating Badge -->
           <div class="absolute -bottom-6 -left-6 bg-monad-dark border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float-delayed">
              <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Icon name="lucide:trending-down" class="text-red-400 w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-gray-400">Total Supply</div>
                <div class="font-bold text-white">Decreasing</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const copied = ref(false)

const copyAddress = () => {
  navigator.clipboard.writeText('0x95e6a9c620083cf17adb3205cc0a2ce996597777')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.text-gradient-pink {
  background: linear-gradient(135deg, #F471B5 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>