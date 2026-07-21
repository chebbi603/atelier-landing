import React from 'react';

const stats = [
  { value: '99.98%', label: 'System Uptime SLA' },
  { value: '4.2x', label: 'Workflow Throughput' },
  { value: '<250ms', label: 'Latency Guarantee' },
  { value: '$14M+', label: 'Value Generated' },
];

export default function MetricsSection() {
  return (
    <section className="relative z-10 w-full bg-black px-6 md:px-14 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight mb-2 font-['Clash_Grotesk_Variable',sans-serif]">
              {item.value}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
