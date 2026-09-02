import React, { useState } from 'react';
import { HorseGenotype, HorsePhenotype } from '../types/genetics';
import { resolvePhenotype } from '../utils/geneticsEngine';
import { PRESET_HORSES } from '../utils/presetHorses';
import { HorseSvg } from './HorseSvg';
import { Sliders, Sparkles, RefreshCw, Dna, CheckCircle2, HelpCircle } from 'lucide-react';

export const CoatSandbox: React.FC = () => {
  const [genotype, setGenotype] = useState<HorseGenotype>(PRESET_HORSES[0].genotype);

  const phenotype: HorsePhenotype = resolvePhenotype(genotype);

  const updateLocus = (locus: keyof HorseGenotype, newPair: [any, any]) => {
    setGenotype(prev => ({
      ...prev,
      [locus]: newPair,
    }));
  };

  const resetToDefault = () => {
    setGenotype(PRESET_HORSES[0].genotype);
  };

  return (
    <div className="bg-white rounded-sm p-6 sm:p-8 border border-stone-300 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold font-mono mb-1">
            Archive Specimen Studio / Real-Time Genetic Sandbox
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#1A1A1A]">
            Interactive Coat Color Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif italic mt-1">
            Toggle unlinked loci in real-time to observe pigment restriction, dilutions, and white pattern interactions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-3.5 py-1.5 rounded-xs border border-stone-300 text-[#1A1A1A] hover:bg-stone-100 text-[10px] uppercase font-mono font-bold tracking-wider transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Specimen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dynamic Live Horse Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-between p-6 bg-[#FAF9F5] rounded-xs border border-stone-200">
          <div className="w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479] font-mono block">
                Phenotype Expression
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] flex items-center gap-2 mt-0.5">
                {phenotype.name}
                {phenotype.isLethalWhite && (
                  <span className="px-2 py-0.5 bg-red-600 text-white font-sans text-[10px] uppercase font-bold tracking-widest rounded-xs">
                    LETHAL O/O
                  </span>
                )}
              </h3>
            </div>

            <div className="self-start sm:self-auto">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-white border border-stone-300 rounded-xs text-[#1A1A1A]">
                {phenotype.scientificFormula}
              </span>
            </div>
          </div>

          {/* Majestic Horse SVG */}
          <div className="w-full my-auto py-4 flex justify-center bg-white border border-stone-200 rounded-xs p-4">
            <HorseSvg phenotype={phenotype} size="lg" showLabels={true} interactiveGreyStage={true} />
          </div>

          <div className="w-full mt-4 p-4 bg-white rounded-xs border border-stone-200 text-xs text-stone-700 leading-relaxed font-serif italic">
            <span className="font-sans font-bold text-[#1A1A1A] uppercase text-[10px] tracking-widest block not-italic mb-1">
              Genetic Summary
            </span>
            {phenotype.summary}
          </div>
        </div>

        {/* Right: Allele Control Sliders & Radios */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479] font-mono flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#1A1A1A]" />
              Loci Control Matrix
            </span>
          </div>

          {/* Extension & Agouti (Base) */}
          <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">Base: Extension (E/e)</span>
              <span className="text-[10px] font-serif italic text-stone-500">
                {genotype.extension.includes('E') ? 'Black eumelanin' : 'Homozygous red (Chestnut)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              {[
                { pair: ['E', 'E'], label: 'E/E' },
                { pair: ['E', 'e'], label: 'E/e' },
                { pair: ['e', 'e'], label: 'e/e' },
              ].map(opt => {
                const isActive = genotype.extension[0] === opt.pair[0] && genotype.extension[1] === opt.pair[1];
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => updateLocus('extension', opt.pair as any)}
                    className={`py-1.5 px-2 rounded-xs text-center font-bold transition-all border ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    {opt.pair.join('/')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Agouti */}
          <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">Agouti (A/a)</span>
              <span className="text-[10px] font-serif italic text-stone-500">
                {genotype.extension.join('') === 'ee' ? '(Masked on Chestnut)' : genotype.agouti.includes('A') ? 'Points restricted (Bay)' : 'Solid (Black)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              {[
                { pair: ['A', 'A'], label: 'A/A' },
                { pair: ['A', 'a'], label: 'A/a' },
                { pair: ['a', 'a'], label: 'a/a' },
              ].map(opt => {
                const isActive = genotype.agouti[0] === opt.pair[0] && genotype.agouti[1] === opt.pair[1];
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => updateLocus('agouti', opt.pair as any)}
                    className={`py-1.5 px-2 rounded-xs text-center font-bold transition-all border ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    {opt.pair.join('/')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cream Dilution (Incomplete Dominance) */}
          <div className="p-4 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">Cream Dilution (Cr)</span>
              <span className="text-[10px] font-serif italic text-stone-500">
                {genotype.cream.filter(c => c === 'Cr').length === 2
                  ? 'Double dilute (Blue eyes)'
                  : genotype.cream.includes('Cr')
                  ? 'Single dilute'
                  : 'Non-dilute'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              {[
                { pair: ['N', 'N'], label: 'N/N' },
                { pair: ['Cr', 'N'], label: 'Cr/N' },
                { pair: ['Cr', 'Cr'], label: 'Cr/Cr' },
              ].map(opt => {
                const isActive = genotype.cream[0] === opt.pair[0] && genotype.cream[1] === opt.pair[1];
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => updateLocus('cream', opt.pair as any)}
                    className={`py-1.5 px-2 rounded-xs text-center font-bold transition-all border ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Other Dilutions & Modifiers grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Dun */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Dun (D/d)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('dun', ['D', 'd'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.dun.includes('D') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Dun (D_)
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('dun', ['d', 'd'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    !genotype.dun.includes('D') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  dd
                </button>
              </div>
            </div>

            {/* Silver */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Silver (Z/z)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('silver', ['Z', 'z'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.silver.includes('Z') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Silver (Z_)
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('silver', ['z', 'z'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    !genotype.silver.includes('Z') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  zz
                </button>
              </div>
            </div>

            {/* Champagne */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Champagne (Ch/ch)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('champagne', ['Ch', 'ch'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.champagne.includes('Ch') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Ch_
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('champagne', ['ch', 'ch'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    !genotype.champagne.includes('Ch') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  chch
                </button>
              </div>
            </div>

            {/* Roan */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Roan (Rn/rn)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('roan', ['Rn', 'rn'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.roan.includes('Rn') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  Roan (Rn_)
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('roan', ['rn', 'rn'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    !genotype.roan.includes('Rn') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  rnrn
                </button>
              </div>
            </div>

            {/* Tobiano Pinto */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Tobiano (TO/to)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('tobiano', ['TO', 'to'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.tobiano.includes('TO') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  TO_
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('tobiano', ['to', 'to'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    !genotype.tobiano.includes('TO') ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  to/to
                </button>
              </div>
            </div>

            {/* Frame Overo */}
            <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
              <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1.5">Frame Overo (O/o)</span>
              <div className="flex gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => updateLocus('frameOvero', ['O', 'o'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.frameOvero[0] === 'O' && genotype.frameOvero[1] === 'o'
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  O/o Overo
                </button>
                <button
                  type="button"
                  onClick={() => updateLocus('frameOvero', ['O', 'O'])}
                  className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                    genotype.frameOvero[0] === 'O' && genotype.frameOvero[1] === 'O'
                      ? 'bg-red-900 text-white border-red-900'
                      : 'bg-white text-red-700 border-red-300'
                  }`}
                  title="Homozygous Lethal White"
                >
                  O/O (Lethal)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
