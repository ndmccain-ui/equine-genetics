import React, { useState } from 'react';
import { HorseGenotype } from '../types/genetics';
import { buildSingleLocusPunnett } from '../utils/geneticsEngine';
import { X, Dna, Info } from 'lucide-react';

interface PunnettModalProps {
  isOpen: boolean;
  onClose: () => void;
  sireGenotype: HorseGenotype;
  damGenotype: HorseGenotype;
  initialLocus?: keyof HorseGenotype;
}

const AVAILABLE_LOCI: { id: keyof HorseGenotype; label: string; desc: string }[] = [
  { id: 'extension', label: 'Extension (E/e)', desc: 'Controls black (E) vs red (e) pigment.' },
  { id: 'agouti', label: 'Agouti (A/a)', desc: 'Restricts black to points (Bay) or allows uniform black.' },
  { id: 'cream', label: 'Cream (Cr/N)', desc: 'Incomplete dominant dilution: Palomino, Buckskin, Cremello.' },
  { id: 'dun', label: 'Dun (D/d)', desc: 'Primitive body dilution with dorsal stripe and zebra leg bars.' },
  { id: 'silver', label: 'Silver (Z/z)', desc: 'Dilutes black eumelanin to flaxen/chocolate.' },
  { id: 'champagne', label: 'Champagne (Ch/ch)', desc: 'Dilutes red and black, producing amber eyes.' },
  { id: 'grey', label: 'Grey (G/g)', desc: 'Dominant progressive depigmentation with age.' },
  { id: 'roan', label: 'Roan (Rn/rn)', desc: 'Interspersed white hairs over body barrel.' },
  { id: 'tobiano', label: 'Tobiano (TO/to)', desc: 'Vertical white pinto patches crossing the spine.' },
  { id: 'frameOvero', label: 'Frame Overo (O/o)', desc: 'Horizontal jagged patches; O/O is lethal white.' },
  { id: 'flaxen', label: 'Flaxen (F/f)', desc: 'Recessive modifier lightens mane/tail on chestnut base.' },
];

export const PunnettModal: React.FC<PunnettModalProps> = ({
  isOpen,
  onClose,
  sireGenotype,
  damGenotype,
  initialLocus = 'extension',
}) => {
  const [selectedLocus, setSelectedLocus] = useState<keyof HorseGenotype>(initialLocus);

  if (!isOpen) return null;

  const sireAlleles = sireGenotype[selectedLocus];
  const damAlleles = damGenotype[selectedLocus];
  const punnett = buildSingleLocusPunnett(selectedLocus, sireAlleles, damAlleles);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479] block">
              Mendelian Matrix
            </span>
            <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A]">
              Punnett Square Inspector
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-[#1A1A1A] hover:bg-stone-100 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Locus Tabs */}
        <div className="px-6 py-2.5 bg-stone-100/80 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {AVAILABLE_LOCI.map(loc => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedLocus(loc.id)}
              className={`px-2.5 py-1 text-[11px] font-mono whitespace-nowrap transition-colors rounded-sm ${
                selectedLocus === loc.id
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Locus Summary Banner */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-sm text-xs text-stone-800">
            <span className="font-bold text-[#1A1A1A] uppercase tracking-wider block mb-0.5">
              {AVAILABLE_LOCI.find(l => l.id === selectedLocus)?.label}
            </span>
            <p className="font-serif italic text-stone-600 text-sm">
              {AVAILABLE_LOCI.find(l => l.id === selectedLocus)?.desc}
            </p>
          </div>

          {/* 2x2 Punnett Grid */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8479] mb-3">
              Dam Gametes (Top) × Sire Gametes (Left)
            </div>

            <div className="inline-grid grid-cols-[80px_1fr_1fr] gap-2 p-4 bg-[#FAF9F5] rounded-sm border border-stone-200">
              {/* Corner */}
              <div className="flex flex-col items-center justify-center p-2 text-[10px] font-mono text-stone-400">
                <span>Sire ↓</span>
                <span>Dam →</span>
              </div>

              {/* Dam Allele 1 */}
              <div className="flex flex-col items-center justify-center p-3 bg-white border border-stone-200 rounded-sm">
                <span className="text-[10px] uppercase font-bold text-[#8C8479]">Dam (Egg)</span>
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{damAlleles[0]}</span>
              </div>

              {/* Dam Allele 2 */}
              <div className="flex flex-col items-center justify-center p-3 bg-white border border-stone-200 rounded-sm">
                <span className="text-[10px] uppercase font-bold text-[#8C8479]">Dam (Egg)</span>
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{damAlleles[1]}</span>
              </div>

              {/* Row 1: Sire Allele 1 */}
              <div className="flex flex-col items-center justify-center p-3 bg-white border border-stone-200 rounded-sm">
                <span className="text-[10px] uppercase font-bold text-[#8C8479]">Sire (Sperm)</span>
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{sireAlleles[0]}</span>
              </div>

              {/* Cell (0,0) */}
              <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-300 rounded-sm hover:border-[#1A1A1A] transition-colors">
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{punnett.grid[0][0].offspringGenotype}</span>
                <span className="text-[11px] text-stone-500 text-center mt-1 font-serif italic">{punnett.grid[0][0].phenotypeNote}</span>
              </div>

              {/* Cell (0,1) */}
              <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-300 rounded-sm hover:border-[#1A1A1A] transition-colors">
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{punnett.grid[0][1].offspringGenotype}</span>
                <span className="text-[11px] text-stone-500 text-center mt-1 font-serif italic">{punnett.grid[0][1].phenotypeNote}</span>
              </div>

              {/* Row 2: Sire Allele 2 */}
              <div className="flex flex-col items-center justify-center p-3 bg-white border border-stone-200 rounded-sm">
                <span className="text-[10px] uppercase font-bold text-[#8C8479]">Sire (Sperm)</span>
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{sireAlleles[1]}</span>
              </div>

              {/* Cell (1,0) */}
              <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-300 rounded-sm hover:border-[#1A1A1A] transition-colors">
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{punnett.grid[1][0].offspringGenotype}</span>
                <span className="text-[11px] text-stone-500 text-center mt-1 font-serif italic">{punnett.grid[1][0].phenotypeNote}</span>
              </div>

              {/* Cell (1,1) */}
              <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-300 rounded-sm hover:border-[#1A1A1A] transition-colors">
                <span className="text-xl font-mono font-bold text-[#1A1A1A]">{punnett.grid[1][1].offspringGenotype}</span>
                <span className="text-[11px] text-stone-500 text-center mt-1 font-serif italic">{punnett.grid[1][1].phenotypeNote}</span>
              </div>
            </div>
          </div>

          {/* Offspring Ratios Breakdown */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8479] mb-2.5 pb-1 border-b border-stone-200">
              Genotypic Ratios & Probability
            </div>
            <div className="space-y-2">
              {punnett.ratios.map(r => (
                <div
                  key={r.genotype}
                  className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-stone-200 rounded-sm text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-white border border-stone-300 font-mono font-bold text-[#1A1A1A] rounded-xs">
                      {r.genotype}
                    </span>
                    <span className="text-stone-800 font-serif italic">{r.phenotypeImpact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-500 font-mono text-[11px]">{r.ratio}</span>
                    <span className="px-2 py-0.5 bg-[#1A1A1A] text-white font-mono font-bold text-[11px] rounded-xs">
                      {r.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF9F5] border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-stone-800 text-white text-[11px] uppercase tracking-wider font-bold rounded-sm transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
