<template>
  <section id="features" class="py-24 relative bg-monad-bg">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">Built for the <span class="text-monad-purple">Speed of Monad</span></h2>
        <p class="text-gray-400">Why choose AI-Oracle for your next dApp? We combine the power of LLMs with the security of blockchain.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" 
             class="group p-8 rounded-2xl glass-panel hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-monad-purple/30 relative overflow-hidden">
          
          <div class="absolute inset-0 bg-gradient-to-br from-monad-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="w-12 h-12 rounded-lg bg-monad-dark border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
            <Icon :name="feature.icon" class="w-6 h-6 text-monad-purple" />
          </div>

          <h3 class="text-xl font-bold mb-3 relative z-10">{{ feature.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed relative z-10">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'lucide:zap',
    title: 'Sub-Second Latency',
    description: 'Optimized for Monad\'s 10,000 TPS. Get AI responses in the same block time frame as your transactions.'
  },
  {
    icon: 'lucide:layers',
    title: 'Wide Range of Models',
    description: 'Access top-tier models like Gemini 3 Pro, GPT-4, and Llama 3 directly on-chain. Choose the right intelligence for your use case.'
  },
  {
    icon: 'lucide:code-2',
    title: 'Developer Native',
    description: 'Drop-in Solidity interfaces. Works just like Chainlink, but for Intelligence. No complex off-chain infrastructure needed.'
  }
]
</script>