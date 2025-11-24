<template>
  <div class="pt-24 min-h-screen bg-[#030014] relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-20 right-0 w-[800px] h-[800px] bg-[#836EF9]/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-[#200052]/20 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Sidebar Navigation -->
        <aside class="lg:col-span-3 hidden lg:block sticky top-28 h-[calc(100vh-140px)] overflow-y-auto">
          <div class="space-y-8">
            <div v-for="(section, index) in docSections" :key="index">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">{{ section.title }}</h3>
              <ul class="space-y-2 border-l border-white/10 ml-1">
                <li v-for="item in section.items" :key="item.id">
                  <a 
                    :href="`#${item.id}`" 
                    class="block pl-4 py-1 text-sm text-gray-400 hover:text-[#836EF9] hover:border-l border-transparent hover:border-[#836EF9] transition-all -ml-[1px]"
                    :class="{ 'text-[#836EF9] border-[#836EF9] font-medium': activeSection === item.id }"
                    @click.prevent="scrollToSection(item.id)"
                  >
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-9 pb-20">
          <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-6">Documentation</h1>
          <p class="text-xl text-gray-400 mb-12 max-w-3xl">
            Integrate decentralized AI intelligence directly into your Monad smart contracts.
            Learn how to request data, verify proofs, and build the next generation of intelligent dApps.
          </p>

          <div class="space-y-16">
            <!-- Introduction -->
            <section id="introduction" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:sparkles" class="text-[#836EF9]" />
                Introduction
              </h2>
              <div class="glass-panel p-8 rounded-2xl">
                <p class="text-gray-300 leading-relaxed mb-6">
                  AI-Oracle bridges the gap between on-chain smart contracts and off-chain artificial intelligence models. 
                  Native to the high-performance Monad blockchain, it allows developers to query LLMs (Large Language Models) 
                  and receive responses via a push-based callback mechanism.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div class="bg-white/5 p-6 rounded-xl border border-white/5">
                    <h4 class="font-bold text-white mb-2">⚡ Sub-Second Latency</h4>
                    <p class="text-sm text-gray-400">Optimized for Monad's 10,000 TPS, delivering responses in the same block whenever possible.</p>
                  </div>
                  <div class="bg-white/5 p-6 rounded-xl border border-white/5">
                    <h4 class="font-bold text-white mb-2">🛡️ Trusted High-Performance Oracle</h4>
                    <p class="text-sm text-gray-400">A secure, authorized node network handles off-chain computation and callbacks, ensuring reliable delivery.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Architecture -->
            <section id="architecture" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:layers" class="text-[#836EF9]" />
                Architecture
              </h2>
              <div class="glass-panel p-8 rounded-2xl mb-8">
                <img src="/oracle-flow.png" alt="AI Oracle Flow Diagram" class="w-full rounded-lg border border-white/10 mb-6" />
                <ol class="list-decimal list-inside space-y-3 text-gray-300">
                  <li><strong class="text-white">Request:</strong> Consumer contract calls <code>ask()</code> and pays $AI fee.</li>
                  <li><strong class="text-white">Event:</strong> AiOracle emits <code>RequestAiResponse</code>.</li>
                  <li><strong class="text-white">Process:</strong> Off-chain nodes listen, query the LLM (e.g., Gemini), and sign the result.</li>
                  <li><strong class="text-white">Callback:</strong> Oracle calls <code>fulfillAiResponse()</code> on your contract with the data.</li>
                </ol>
              </div>
            </section>

            <!-- Quick Start -->
            <section id="quick-start" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:zap" class="text-[#836EF9]" />
                Quick Start
              </h2>
              <div class="space-y-6">
                <p class="text-gray-300">Install the AI-Oracle SDK to get started with your project.</p>
                
                <div class="bg-[#0E0E12] border border-white/10 rounded-xl overflow-hidden">
                  <div class="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <span class="text-xs text-gray-400 font-mono">Terminal</span>
                    <button class="text-gray-400 hover:text-white"><Icon name="lucide:copy" class="w-4 h-4" /></button>
                  </div>
                  <div class="p-4 font-mono text-sm">
                    <span class="text-[#836EF9]">$</span> npm install @ai-oracle/sdk
                  </div>
                </div>

                <p class="text-gray-300 mt-6">Inherit from <code>AiOracleConsumer</code> in your Solidity contract:</p>
                
                <div class="bg-[#0E0E12] border border-white/10 rounded-xl overflow-hidden">
                   <div class="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <span class="text-xs text-gray-400 font-mono">MyDapp.sol</span>
                    <button class="text-gray-400 hover:text-white"><Icon name="lucide:copy" class="w-4 h-4" /></button>
                  </div>
                  <div class="p-4 overflow-x-auto">
                    <pre class="font-mono text-sm text-gray-300"><code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "<span class="text-[#F471B5]">@ai-oracle/sdk/contracts/AiOracleConsumer.sol</span>";

contract MyDapp is AiOracleConsumer {
    
    constructor(address _oracle) AiOracleConsumer(_oracle) {}

    function <span class="text-[#22d3ee]">requestAnalysis</span>(string memory prompt) external {
        // Request response decoding into: (string, uint256)
        _askAi("google/gemini-3-pro-preview", prompt, "string, uint256");
    }

    // Callback function
    function <span class="text-[#22d3ee]">fulfillAiResponse</span>(uint256 requestId, bytes calldata data) external override onlyOracle {
        (string memory summary, uint256 score) = abi.decode(data, (string, uint256));
        // Handle your logic here...
    }
}</code></pre>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- API Reference -->
            <section id="api" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:code" class="text-[#836EF9]" />
                API Reference
              </h2>
              <div class="space-y-8">
                <div>
                  <h3 class="text-lg font-bold text-white mb-2">ask()</h3>
                  <code class="block bg-white/5 p-3 rounded-lg text-sm font-mono text-[#A090FF] mb-2">
                    function ask(string calldata model, string calldata prompt, string calldata responseAbi) external returns (uint256)
                  </code>
                  <p class="text-gray-400 text-sm">Initiates a request. <code>responseAbi</code> defines the expected return types (e.g., "uint256, string") for easier decoding.</p>
                </div>

                 <div>
                  <h3 class="text-lg font-bold text-white mb-2">fulfillAiResponse()</h3>
                  <code class="block bg-white/5 p-3 rounded-lg text-sm font-mono text-[#A090FF] mb-2">
                    function fulfillAiResponse(uint256 requestId, bytes calldata data) external virtual
                  </code>
                  <p class="text-gray-400 text-sm">Callback function you must implement. Use <code>abi.decode(data, (...))</code> to retrieve values.</p>
                </div>
              </div>
            </section>

             <!-- Contract Addresses -->
            <section id="contracts" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:map-pin" class="text-[#836EF9]" />
                Contract Addresses
              </h2>
              <div class="glass-panel rounded-xl overflow-hidden">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                      <th class="p-4 font-medium">Network</th>
                      <th class="p-4 font-medium">Contract Name</th>
                      <th class="p-4 font-medium">Address</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5 text-sm">
                    <tr>
                      <td class="p-4 text-white">Monad Mainnet</td>
                      <td class="p-4 text-gray-300">AI Oracle V1</td>
                      <td class="p-4 font-mono text-[#836EF9]">0x5718680B413F1BdB27A3c4Fb520FE6c73D3617B3</td>
                    </tr>
                    <tr>
                      <td class="p-4 text-white">Monad Mainnet</td>
                      <td class="p-4 text-gray-300">$AI Token</td>
                      <td class="p-4 font-mono text-[#836EF9]">0x95e6a9c620083cf17adb3205cc0a2ce996597777</td>
                    </tr>
                  
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Pricing -->
            <section id="pricing" class="scroll-mt-32">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon name="lucide:coins" class="text-[#836EF9]" />
                Pricing
              </h2>
              <div class="glass-panel rounded-xl overflow-hidden mb-8">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                      <th class="p-4 font-medium">Model</th>
                      <th class="p-4 font-medium">Cost per Request ($AI)</th>
                      <th class="p-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5 text-sm">
                    <tr>
                      <td class="p-4 text-white font-mono">google/gemini-3-pro-preview</td>
                      <td class="p-4 text-[#836EF9] font-bold">1.0 AI</td>
                      <td class="p-4 text-gray-400">High-performance reasoning and code generation.</td>
                    </tr>
                    <tr>
                      <td class="p-4 text-white font-mono">openai/gpt-4o</td>
                      <td class="p-4 text-[#836EF9] font-bold">2.5 AI</td>
                      <td class="p-4 text-gray-400">Flagship model for complex multi-step tasks.</td>
                    </tr>
                    <tr>
                      <td class="p-4 text-white font-mono">meta/llama-3-70b-instruct</td>
                      <td class="p-4 text-[#836EF9] font-bold">0.5 AI</td>
                      <td class="p-4 text-gray-400">Efficient open-source model for general tasks.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="bg-[#200052]/30 border border-[#836EF9]/20 p-6 rounded-xl">
                <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Icon name="lucide:flame" class="text-orange-500" />
                  Deflationary Tokenomics
                </h3>
                <p class="text-gray-300 text-sm leading-relaxed">
                  The <span class="text-[#836EF9] font-bold">$AI</span> token is the fuel for the AI Oracle network. 
                  Every time a smart contract requests an AI response, the fee paid in $AI is 
                  <span class="text-white font-bold">100% burned</span> (removed from circulation) during the initial beta phase.
                  This creates a direct link between network usage and token scarcity.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeSection = ref('introduction')

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'quick-start', label: 'Quick Start' }
    ]
  },
  {
    title: 'Reference',
    items: [
      { id: 'contracts', label: 'Contract Addresses' },
      { id: 'api', label: 'API Reference' },
      { id: 'pricing', label: 'Gas & Pricing' } // Placeholder
    ]
  }
]

const scrollToSection = (id: string) => {
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>