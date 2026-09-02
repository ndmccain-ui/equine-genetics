import React, { useState, useMemo } from 'react';
import { HorseGenotype, BreedingResult, OffspringProbability, HorsePreset } from '../types/genetics';
import { calculateBreedingPair, resolvePhenotype } from '../utils/geneticsEngine';
import { PRESET_HORSES, DEFAULT_SIRE, DEFAULT_DAM } from '../utils/presetHorses';
import { HorseSvg } from './HorseSvg';
import { PunnettModal } from './PunnettModal';
import {
  AlertTriangle,
  Sparkles,
  Dna,
  RotateCcw,
  Sliders,
  ChevronDown,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const BreedingCalculator: React.FC = () => {
  const [sireGenotype, setSireGenotype] = useState<HorseGenotype>(DEFAULT_SIRE);
  const [damGenotype, setDamGenotype] = useState<HorseGenotype>(DEFAULT_DAM);
  const [selectedOffspringIndex, setSelectedOffspringIndex] = useState<number>(0);
  const [activePunnettLocus, setActivePunnettLocus] = useState<keyof HorseGenotype | null>(null);
  const [showAdvancedSire, setShowAdvancedSire] = useState<boolean>(false);
  const [showAdvancedDam, setShowAdvancedDam] = useState<boolean>(false);

  // Calculate Mendelian results
  const breedingResult: BreedingResult = useMemo(() => {
    return calculateBreedingPair(sireGenotype, damGenotype);
  }, [sireGenotype, damGenotype]);

  const selectedOffspring: OffspringProbability | undefined =
    breedingResult.offspring[selectedOffspringIndex] || breedingResult.offspring[0];

  // Sire/Dam preset loader
  const handleLoadSirePreset = (preset: HorsePreset) => {
    setSireGenotype({ ...preset.genotype });
    setSelectedOffspringIndex(0);
  };

  const handleLoadDamPreset = (preset: HorsePreset) => {
    setDamGenotype({ ...preset.genotype });
    setSelectedOffspringIndex(0);
  };

  // Quick preset pairing buttons
  const handleLoadPairing = (sirePresetId: string, damPresetId: string) => {
    const s = PRESET_HORSES.find(p => p.id === sirePresetId);
    const d = PRESET_HORSES.find(p => p.id === damPresetId);
    if (s && d) {
      setSireGenotype({ ...s.genotype });
      setDamGenotype({ ...d.genotype });
      setSelectedOffspringIndex(0);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Pair Scenarios Ribbon */}
      <div className="bg-white rounded-sm p-5 border border-stone-300 shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479]">
            Curated Heredity Scenarios / One-Click Crosses
          </p>
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
            Mendelian Test Bench
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleLoadPairing('classic-buckskin', 'golden-palomino')}
            className="px-3 py-1.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-300 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 border border-stone-400" />
            Buckskin × Palomino (Cream Segregation)
          </button>
          <button
            type="button"
            onClick={() => handleLoadPairing('classic-bay', 'classic-bay')}
            className="px-3 py-1.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-300 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-800 border border-stone-400" />
            Heterozygous Bay × Bay (Extension / Agouti)
          </button>
          <button
            type="button"
            onClick={() => handleLoadPairing('frame-overo-carrier', 'frame-overo-carrier')}
            className="px-3 py-1.5 rounded-sm bg-red-50 hover:bg-red-100 border border-red-300 text-[11px] uppercase tracking-wider font-semibold text-red-900 transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
            Frame Overo × Frame Overo (Lethal White Risk)
          </button>
          <button
            type="button"
            onClick={() => handleLoadPairing('grullo', 'flaxen-sorrel')}
            className="px-3 py-1.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-300 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-stone-600 border border-stone-400" />
            Grullo × Flaxen Sorrel (Dun + Modifiers)
          </button>
          <button
            type="button"
            onClick={() => handleLoadPairing('tobiano-paint', 'friesian-black')}
            className="px-3 py-1.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-300 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-stone-900 border border-stone-400" />
            Homozygous Tobiano × Black (100% Pinto)
          </button>
        </div>
      </div>

      {/* Section 01: Breeding Pair Selection */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479]">
            Section 01 / Breeding Pair Selection
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            Sire × Dam Cross
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- SIRE (STALLION) CARD --- */}
          <ParentCard
            gender="sire"
            title="Sire (Stallion)"
            genotype={sireGenotype}
            onChangeGenotype={setSireGenotype}
            onSelectPreset={handleLoadSirePreset}
            showAdvanced={showAdvancedSire}
            onToggleAdvanced={() => setShowAdvancedSire(!showAdvancedSire)}
            onOpenPunnett={locus => setActivePunnettLocus(locus)}
          />

          {/* --- DAM (MARE) CARD --- */}
          <ParentCard
            gender="dam"
            title="Dam (Mare)"
            genotype={damGenotype}
            onChangeGenotype={setDamGenotype}
            onSelectPreset={handleLoadDamPreset}
            showAdvanced={showAdvancedDam}
            onToggleAdvanced={() => setShowAdvancedDam(!showAdvancedDam)}
            onOpenPunnett={locus => setActivePunnettLocus(locus)}
          />
        </div>
      </div>

      {/* --- LETHAL RISK WARNING BANNER (IF APPLICABLE) --- */}
      {breedingResult.lethalRisk.hasRisk && (
        <div className="p-5 bg-[#FFFDFD] border-l-4 border-l-red-600 border border-stone-300 rounded-sm flex items-start gap-4 animate-in fade-in">
          <div className="p-2 bg-red-100 text-red-700 rounded-xs shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-serif italic font-bold text-red-950">
                Genetic Interaction Notice: Lethal White Overo Risk Detected ({breedingResult.lethalRisk.lethalProbability}%)
              </h3>
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest rounded-xs">
                Caution
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-sans">
              Both Sire and Dam carry the Frame Overo allele (O/o). Statistically, 25% of offspring will inherit
              the homozygous <strong className="font-mono text-red-900">O/O</strong> genotype, causing fatal <em>Lethal White Overo Syndrome (LWOS)</em> due to intestinal aganglionosis. Responsible breeders test all overo-patterned stock to ensure an O/o horse is strictly mated to solid (o/o) partners.
            </p>
          </div>
        </div>
      )}

      {/* --- SECTION 02: PROBABILISTIC OUTCOMES --- */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#1A1A1A] pb-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479]">
            Section 02 / Probabilistic Outcomes
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            {breedingResult.offspring.length} Phenotypes / {breedingResult.totalCombinations} Genotypes
          </span>
        </div>

        <div className="bg-white rounded-sm border border-stone-300 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic font-light tracking-tight text-[#1A1A1A]">
                Offspring Heredity Distribution
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-serif italic">
                Probabilistic segregation modeled across 11 unlinked gene loci. Select any phenotype below for detailed inspection.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActivePunnettLocus('extension')}
              className="px-4 py-2.5 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-bold rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <Dna className="w-3.5 h-3.5" />
              Punnett Inspector
            </button>
          </div>

          {/* Interactive Foal Showcase: Visual Preview & Selected Card */}
          {selectedOffspring && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAF9F5] p-5 sm:p-6 rounded-sm border border-stone-200">
              {/* SVG Horse Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-white rounded-sm border border-stone-200">
                <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-2 pb-2 border-b border-stone-100">
                  <span className="font-serif italic text-stone-700 font-semibold">
                    Simulated Phenotype Render
                  </span>
                  <span className="font-mono text-[10px] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-xs text-[#1A1A1A]">
                    {selectedOffspring.phenotype.scientificFormula}
                  </span>
                </div>
                <HorseSvg phenotype={selectedOffspring.phenotype} size="md" showLabels={true} />
              </div>

              {/* Foal Details & Genetics Breakdown */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479]">
                      Selected Outcome
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A]">
                        {selectedOffspring.probability}%
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 uppercase">
                        ({selectedOffspring.countRatio})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-2 flex items-center gap-3">
                    {selectedOffspring.phenotype.name}
                    {selectedOffspring.phenotype.isLethalWhite && (
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-sans uppercase font-bold tracking-wider rounded-xs">
                        LETHAL
                      </span>
                    )}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mb-4">
                    {selectedOffspring.phenotype.summary}
                  </p>

                  {/* Genotype Tags */}
                  <div className="p-3 bg-white rounded-sm border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8479] block">
                      Underlying Genotype Possibilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOffspring.genotypes.slice(0, 4).map((g, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-stone-100 font-mono text-[10px] text-[#1A1A1A] rounded-xs border border-stone-200"
                        >
                          {formatGenotypeCompact(g)}
                        </span>
                      ))}
                      {selectedOffspring.genotypes.length > 4 && (
                        <span className="px-2 py-1 bg-stone-50 font-mono text-[10px] text-stone-500 rounded-xs border border-stone-200">
                          +{selectedOffspring.genotypes.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons in Editorial style */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setActivePunnettLocus('extension')}
                    className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-stone-800 text-white text-[10px] uppercase tracking-wider font-bold rounded-sm transition-colors flex items-center gap-1.5"
                  >
                    <Dna className="w-3 h-3" />
                    Extension Cross (E/e)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePunnettLocus('cream')}
                    className="px-3.5 py-2 bg-white hover:bg-stone-100 text-[#1A1A1A] border border-[#1A1A1A] text-[10px] uppercase tracking-wider font-bold rounded-sm transition-colors flex items-center gap-1.5"
                  >
                    <Dna className="w-3 h-3" />
                    Cream Dilution Cross (Cr/N)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Signature Editorial Outcomes Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8479] pb-1 border-b border-stone-200">
              <span>Probabilistic Ledger ({breedingResult.offspring.length} Results)</span>
              <span>Select Card for Visual Analysis</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200">
              {breedingResult.offspring.map((item, idx) => {
                const isSelected = selectedOffspringIndex === idx;
                const isLethal = item.phenotype.isLethalWhite;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedOffspringIndex(idx)}
                    className={`p-5 cursor-pointer transition-colors relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-stone-100 ring-2 ring-inset ring-[#1A1A1A]'
                        : isLethal
                        ? 'bg-[#FFF9F9] hover:bg-red-50/50'
                        : 'bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A]">
                          {item.probability}%
                        </span>
                        <div className="flex items-center gap-1">
                          {isLethal ? (
                            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 tracking-tighter uppercase font-bold rounded-xs">
                              Lethal
                            </span>
                          ) : isSelected ? (
                            <span className="text-[10px] bg-[#1A1A1A] text-white px-2 py-0.5 tracking-tighter uppercase font-bold rounded-xs">
                              Active
                            </span>
                          ) : (
                            <span className="text-[10px] border border-[#1A1A1A] px-2 py-0.5 tracking-tighter uppercase font-bold rounded-xs">
                              {item.probability >= 25 ? 'High' : item.probability >= 10 ? 'Standard' : 'Minor'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-xs shrink-0 border border-stone-300"
                          style={{ backgroundColor: item.phenotype.bodyColor }}
                          title={`Body color: ${item.phenotype.bodyColor}`}
                        />
                        <h3 className="text-sm sm:text-base uppercase tracking-tight font-semibold text-[#1A1A1A]">
                          {item.phenotype.name}
                        </h3>
                      </div>

                      <p className="text-[11px] font-mono opacity-60 text-stone-600 line-clamp-1">
                        {item.genotypes[0] ? formatGenotypeCompact(item.genotypes[0]) : item.phenotype.scientificFormula}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                      <span>Ratio: {item.countRatio}</span>
                      <span className="hover:underline text-[#1A1A1A] font-sans uppercase font-bold">
                        {isSelected ? 'Inspecting →' : 'Inspect'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Punnett Square Modal Inspector */}
      {activePunnettLocus && (
        <PunnettModal
          isOpen={!!activePunnettLocus}
          onClose={() => setActivePunnettLocus(null)}
          sireGenotype={sireGenotype}
          damGenotype={damGenotype}
          initialLocus={activePunnettLocus}
        />
      )}
    </div>
  );
};

// Compact genotype string formatter
function formatGenotypeCompact(g: HorseGenotype): string {
  const parts = [];
  parts.push(g.extension.join('/'));
  parts.push(g.agouti.join('/'));
  if (g.cream.includes('Cr')) parts.push(g.cream.join('/'));
  if (g.dun.includes('D')) parts.push(g.dun.join('/'));
  if (g.silver.includes('Z')) parts.push(g.silver.join('/'));
  if (g.champagne.includes('Ch')) parts.push(g.champagne.join('/'));
  if (g.grey.includes('G')) parts.push(g.grey.join('/'));
  if (g.roan.includes('Rn')) parts.push(g.roan.join('/'));
  if (g.tobiano.includes('TO')) parts.push(g.tobiano.join('/'));
  if (g.frameOvero.includes('O')) parts.push(g.frameOvero.join('/'));
  if (g.flaxen.includes('f')) parts.push(g.flaxen.join('/'));
  return parts.join(' ');
}

// Sub-component for Sire/Dam Parent Card
interface ParentCardProps {
  gender: 'sire' | 'dam';
  title: string;
  genotype: HorseGenotype;
  onChangeGenotype: React.Dispatch<React.SetStateAction<HorseGenotype>>;
  onSelectPreset: (preset: HorsePreset) => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onOpenPunnett: (locus: keyof HorseGenotype) => void;
}

const ParentCard: React.FC<ParentCardProps> = ({
  gender,
  title,
  genotype,
  onChangeGenotype,
  onSelectPreset,
  showAdvanced,
  onToggleAdvanced,
  onOpenPunnett,
}) => {
  const phenotype = resolvePhenotype(genotype);
  const isSire = gender === 'sire';

  // Toggle helper for an allele in a locus
  const toggleAllele = <T extends string>(
    locus: keyof HorseGenotype,
    index: 0 | 1,
    optionA: T,
    optionB: T
  ) => {
    onChangeGenotype(prev => {
      const current = prev[locus] as unknown as [T, T];
      const newPair: [T, T] = [...current];
      newPair[index] = current[index] === optionA ? optionB : optionA;
      return { ...prev, [locus]: newPair };
    });
  };

  return (
    <div className="bg-white rounded-sm p-6 sm:p-7 border border-stone-300 shadow-none flex flex-col justify-between space-y-5">
      <div>
        {/* Header matching Editorial Aesthetic */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#8C8479] font-serif italic">
            {isSire ? 'Sire: Stallion (♂)' : 'Dam: Mare (♀)'}
          </span>

          {/* Presets Dropdown */}
          <div className="relative">
            <select
              value=""
              onChange={e => {
                const p = PRESET_HORSES.find(x => x.id === e.target.value);
                if (p) onSelectPreset(p);
              }}
              className="text-[11px] bg-stone-50 hover:bg-stone-100 text-[#1A1A1A] font-sans font-medium py-1 px-2.5 pr-6 rounded-sm border border-stone-300 cursor-pointer focus:outline-hidden appearance-none"
            >
              <option value="" disabled>
                Load Preset...
              </option>
              {PRESET_HORSES.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.breedContext})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Horse Title & Editorial Genotype Tags */}
        <div className="mb-4">
          <h3 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] border-b border-stone-200 pb-2">
            {phenotype.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-mono text-[#1A1A1A]">
              {formatGenotypeCompact(genotype)}
            </div>
            <div className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-mono text-stone-600">
              {phenotype.scientificFormula}
            </div>
          </div>
        </div>

        {/* Horse Mini SVG Preview & Phenotype Render */}
        <div className="p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 mb-5 flex flex-col items-center">
          <HorseSvg phenotype={phenotype} size="sm" />
        </div>

        {/* Essential Loci allele pickers (Extension, Agouti, Cream, Dun) */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479] flex items-center justify-between">
            <span>Primary Coat Genes</span>
            <span className="font-normal font-mono text-stone-400">Click allele to toggle</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Extension (E / e) */}
            <div className="p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1A1A1A]">Extension</span>
                <button
                  type="button"
                  onClick={() => onOpenPunnett('extension')}
                  title="View Extension Punnett Square"
                  className="text-stone-400 hover:text-stone-800"
                >
                  <Dna className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleAllele('extension', 0, 'E', 'e')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.extension[0] === 'E'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.extension[0]}
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllele('extension', 1, 'E', 'e')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.extension[1] === 'E'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.extension[1]}
                </button>
              </div>
              <span className="text-[10px] text-stone-500 mt-1 font-mono">
                {genotype.extension.includes('E') ? 'Black eumelanin' : 'Red pheomelanin (ee)'}
              </span>
            </div>

            {/* Agouti (A / a) */}
            <div className="p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1A1A1A]">Agouti</span>
                <button
                  type="button"
                  onClick={() => onOpenPunnett('agouti')}
                  title="View Agouti Punnett Square"
                  className="text-stone-400 hover:text-stone-800"
                >
                  <Dna className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleAllele('agouti', 0, 'A', 'a')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.agouti[0] === 'A'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.agouti[0]}
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllele('agouti', 1, 'A', 'a')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.agouti[1] === 'A'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.agouti[1]}
                </button>
              </div>
              <span className="text-[10px] text-stone-500 mt-1 font-mono">
                {genotype.agouti.includes('A') ? 'Restricts to points (Bay)' : 'Solid uniform (Black)'}
              </span>
            </div>

            {/* Cream (Cr / N) */}
            <div className="p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1A1A1A]">Cream Dilution</span>
                <button
                  type="button"
                  onClick={() => onOpenPunnett('cream')}
                  title="View Cream Punnett Square"
                  className="text-stone-400 hover:text-stone-800"
                >
                  <Dna className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleAllele('cream', 0, 'Cr', 'N')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.cream[0] === 'Cr'
                      ? 'bg-amber-400 text-[#1A1A1A] border border-amber-500'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.cream[0]}
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllele('cream', 1, 'Cr', 'N')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.cream[1] === 'Cr'
                      ? 'bg-amber-400 text-[#1A1A1A] border border-amber-500'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.cream[1]}
                </button>
              </div>
              <span className="text-[10px] text-stone-500 mt-1 font-mono">
                {genotype.cream.filter(c => c === 'Cr').length === 2
                  ? 'Double dilute (CrCr)'
                  : genotype.cream.includes('Cr')
                  ? 'Single dilute (CrN)'
                  : 'Non-dilute (NN)'}
              </span>
            </div>

            {/* Dun (D / d) */}
            <div className="p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#1A1A1A]">Dun Locus</span>
                <button
                  type="button"
                  onClick={() => onOpenPunnett('dun')}
                  title="View Dun Punnett Square"
                  className="text-stone-400 hover:text-stone-800"
                >
                  <Dna className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleAllele('dun', 0, 'D', 'd')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.dun[0] === 'D'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.dun[0]}
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllele('dun', 1, 'D', 'd')}
                  className={`flex-1 py-1 rounded-xs text-xs font-mono font-bold transition-colors ${
                    genotype.dun[1] === 'D'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {genotype.dun[1]}
                </button>
              </div>
              <span className="text-[10px] text-stone-500 mt-1 font-mono">
                {genotype.dun.includes('D') ? 'Primitive marks (D_)' : 'Non-dun (dd)'}
              </span>
            </div>
          </div>
        </div>

        {/* Toggle Advanced Modifiers (Silver, Champagne, Grey, Roan, Tobiano, Overo, Flaxen) */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onToggleAdvanced}
            className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200/80 rounded-sm text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-stone-500" />
              {showAdvanced ? 'Collapse Additional Loci' : 'Expand Modifiers (Silver, Overo, Grey, Roan, Tobiano)'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-500 transition-transform ${
                showAdvanced ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showAdvanced && (
            <div className="mt-3 p-3 bg-[#FAF9F5] rounded-sm border border-stone-200 space-y-2.5 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Silver */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Silver (Z/z)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('silver', 0, 'Z', 'z')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.silver[0] === 'Z' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.silver[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('silver', 1, 'Z', 'z')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.silver[1] === 'Z' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.silver[1]}
                    </button>
                  </div>
                </div>

                {/* Champagne */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Champagne (Ch/ch)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('champagne', 0, 'Ch', 'ch')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.champagne[0] === 'Ch' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.champagne[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('champagne', 1, 'Ch', 'ch')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.champagne[1] === 'Ch' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.champagne[1]}
                    </button>
                  </div>
                </div>

                {/* Grey */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Grey (G/g)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('grey', 0, 'G', 'g')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.grey[0] === 'G' ? 'bg-slate-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.grey[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('grey', 1, 'G', 'g')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.grey[1] === 'G' ? 'bg-slate-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.grey[1]}
                    </button>
                  </div>
                </div>

                {/* Roan */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Roan (Rn/rn)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('roan', 0, 'Rn', 'rn')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.roan[0] === 'Rn' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.roan[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('roan', 1, 'Rn', 'rn')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.roan[1] === 'Rn' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.roan[1]}
                    </button>
                  </div>
                </div>

                {/* Tobiano */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Tobiano (TO/to)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('tobiano', 0, 'TO', 'to')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.tobiano[0] === 'TO' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.tobiano[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('tobiano', 1, 'TO', 'to')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.tobiano[1] === 'TO' ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.tobiano[1]}
                    </button>
                  </div>
                </div>

                {/* Frame Overo */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Frame Overo (O/o)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('frameOvero', 0, 'O', 'o')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.frameOvero[0] === 'O' ? 'bg-red-700 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.frameOvero[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('frameOvero', 1, 'O', 'o')}
                      className={`px-1.5 py-0.5 rounded-xs text-xs ${
                        genotype.frameOvero[1] === 'O' ? 'bg-red-700 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.frameOvero[1]}
                    </button>
                  </div>
                </div>

                {/* Flaxen */}
                <div className="p-2 bg-white rounded-xs border border-stone-200 flex items-center justify-between col-span-2">
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Flaxen (f/f mane lightener)</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllele('flaxen', 0, 'F', 'f')}
                      className={`px-2 py-0.5 rounded-xs text-xs ${
                        genotype.flaxen[0] === 'f' ? 'bg-amber-300 text-amber-950 font-bold' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.flaxen[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAllele('flaxen', 1, 'F', 'f')}
                      className={`px-2 py-0.5 rounded-xs text-xs ${
                        genotype.flaxen[1] === 'f' ? 'bg-amber-300 text-amber-950 font-bold' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {genotype.flaxen[1]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editorial Interaction Note */}
        <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 mt-4">
          <p className="text-xs leading-relaxed opacity-70 font-serif italic text-stone-800">
            Genetic interaction note: {phenotype.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
