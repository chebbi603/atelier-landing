import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Data Ingestion & Mapping',
    desc: 'Connecting unstructured enterprise telemetry, docs, and databases into a structured knowledge layer.',
  },
  {
    step: '02',
    title: 'Model Orchestration',
    desc: 'Routing tasks to specialized neural models and deterministic logic engines for max precision.',
  },
  {
    step: '03',
    title: 'Action & Verification',
    desc: 'Executing automated API actions with human-in-the-loop fallback and instant audit logging.',
  },
];

export default function WorkflowSection() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#07090c] px-6 md:px-14 py-28 flex flex-col justify-center border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F3FF0B] mb-2 block">
            [ 02 // WORKFLOW ARCHITECTURE ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase tracking-tight text-white font-['Clash_Grotesk_Variable',sans-serif]">
            How Atelier Operates
          </h2>
        </div>

        {/* Step List */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:px-4 transition-all duration-300"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-2xl font-mono font-medium text-[#F3FF0B]">
                  {item.step}
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-[#F3FF0B] transition-colors font-['Clash_Grotesk_Variable',sans-serif]">
                  {item.title}
                </h3>
              </div>
              <p className="text-white/60 max-w-md text-sm md:text-base font-['Nimbus_Sans',sans-serif]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
