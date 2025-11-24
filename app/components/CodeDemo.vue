<template>
  <section class="py-24 bg-monad-dark relative overflow-hidden">
    <!-- Decorator -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-monad-purple/5 blur-[120px]"></div>

    <div class="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Integrate in <span class="text-accent-pink">Minutes</span></h2>
        <p class="text-gray-400 mb-8">
          Stop worrying about API keys, backend servers, and signing transactions. 
          Call AI models directly from your smart contract with a simple function call.
        </p>
        
        <ul class="space-y-4 mb-8">
          <li v-for="item in steps" :key="item" class="flex items-start gap-3">
            <Icon name="lucide:check-circle-2" class="w-5 h-5 text-green-400 mt-0.5" />
            <span class="text-gray-300">{{ item }}</span>
          </li>
        </ul>

        <NuxtLink to="/docs" class="text-monad-purple font-bold flex items-center gap-2 hover:gap-3 transition-all">
          View Full Documentation <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Code Window -->
      <div class="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl">
        <div class="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span class="text-xs text-gray-500 ml-4 font-mono">MyContract.sol</span>
        </div>
        
        <div class="p-6 overflow-x-auto">
          <pre class="font-mono text-sm leading-relaxed text-gray-300">
<span class="text-pink-400">import</span> <span class="text-green-400">"monad-ai-oracle-sdk/contracts/AiOracleConsumer.sol"</span>;

<span class="text-blue-400">contract</span> <span class="text-yellow-300">MyDeFiApp</span> <span class="text-blue-400">is</span> <span class="text-yellow-300">AiOracleConsumer</span> {
    
    <span class="text-blue-400">constructor</span>(<span class="text-blue-400">address</span> _oracle) <span class="text-yellow-300">AiOracleConsumer</span>(_oracle) {}

    <span class="text-blue-400">function</span> <span class="text-yellow-300">analyzeMarket</span>(<span class="text-blue-400">string</span> <span class="text-blue-400">memory</span> token) <span class="text-blue-400">external</span> {
        <span class="text-gray-500">// Request AI analysis: "string" response type</span>
        <span class="text-yellow-300">_askAi</span>(
            <span class="text-green-400">"google/gemini-3-pro-preview"</span>,
            <span class="text-green-400">"Analyze price action for "</span> + token, 
            <span class="text-green-400">"string"</span>
        );
    }

    <span class="text-blue-400">function</span> <span class="text-yellow-300">fulfillAiResponse</span>(<span class="text-cyan-400">uint256</span> id, <span class="text-cyan-400">bytes</span> <span class="text-blue-400">calldata</span> data) <span class="text-blue-400">external</span> <span class="text-blue-400">override</span> <span class="text-blue-400">onlyOracle</span> {
        <span class="text-blue-400">string</span> <span class="text-blue-400">memory</span> result = <span class="text-yellow-300">abi.decode</span>(data, (<span class="text-blue-400">string</span>));
        
        <span class="text-blue-400">if</span> (contains(result, <span class="text-green-400">"BULLISH"</span>)) {
             <span class="text-gray-500">// Execute buy logic...</span>
        }
    }
}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  "Install the Solidity SDK via npm or Foundry",
  "Inherit from AIConsumer in your contract",
  "Fund your contract with $AI tokens",
  "Start making on-chain inference requests"
]
</script>