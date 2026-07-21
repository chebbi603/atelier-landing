import React from 'react';
import { Cpu, Lightning, ShieldCheck, TreeStructure } from '@phosphor-icons/react';

const features = [
  {
    icon: Cpu,
    title: 'Autonomous Reasoning',
    desc: 'Deep multi-step cognitive architecture built for complex enterprise domain workflows.',
  },
  {
    icon: Lightning,
    title: 'Real-Time Speed',
    desc: 'Sub-second response times across distributed vector indexes and model routing.',
  },
  {
    icon: ShieldCheck,
    title: 'Deterministic Safety',
    desc: 'Rigorous guardrails and verification layers preventing hallucinations and edge failures.',
  },
  {
    icon: TreeStructure,
    title: 'System Integration',
    desc: 'Native connectors into your existing infrastructure, data stores, and APIs.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-black px-6 md:px-14 py-28 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F3FF0B] mb-2 block">
              [ 01 // CAPABILITIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase tracking-tight text-white font-['Clash_Grotesk_Variable',sans-serif]">
              Built for Critical Operations
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base font-['Nimbus_Sans',sans-serif]">
            We build production AI systems designed to take full ownership of heavy operational workloads with total reliability.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#F3FF0B]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center mb-6 text-[#F3FF0B] group-hover:scale-110 transition-transform duration-300">
                    <IconComp size={24} weight="light" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 tracking-tight font-['Clash_Grotesk_Variable',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-['Nimbus_Sans',sans-serif]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-8 text-xs font-mono text-white/30 group-hover:text-[#F3FF0B] transition-colors">
                  0{idx + 1} / CAPABILITY
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
