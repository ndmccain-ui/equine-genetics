import React, { useState } from 'react';
import {
  HorseGenotype,
  HorsePhenotype,
  FacialMarking,
  LegMarking,
  ManeStyle,
  AppaloosaPattern,
  HorsePreset,
} from '../types/genetics';
import { resolvePhenotype } from '../utils/geneticsEngine';
import { PRESET_HORSES, BREED_REGISTRY_PRESETS, COAT_VARIETY_PRESETS } from '../utils/presetHorses';
import { HorseSvg } from './HorseSvg';
import {
  Sliders,
  Sparkles,
  RefreshCw,
  Palette,
  Layers,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';

export const CoatSandbox: React.FC = () => {
  const [genotype, setGenotype] = useState<HorseGenotype>(PRESET_HORSES[0].genotype);

  // Anatomical & Pattern Customization States
  const [facialMarking, setFacialMarking] = useState<FacialMarking>('none');
  const [frontLegMarking, setFrontLegMarking] = useState<LegMarking>('none');
  const [hindLegMarking, setHindLegMarking] = useState<LegMarking>('none');
  const [maneStyle, setManeStyle] = useState<ManeStyle>('flowing');
  const [appaloosaPattern, setAppaloosaPattern] = useState<AppaloosaPattern>('none');
  const [hasSplashWhite, setHasSplashWhite] = useState<boolean>(false);

  // Active Control Panel Tab: 'genetics' | 'anatomy' | 'breeds'
  const [activeTab, setActiveTab] = useState<'genetics' | 'anatomy' | 'breeds'>('genetics');

  // Currently selected breed profile (if any)
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_HORSES[0].id);

  // Progressive Grey timeline stage (0 = Birth, 1 = Steel, 2 = Dapple, 3 = Flea-bitten White)
  const [greyStage, setGreyStage] = useState<number>(2);

  const phenotype: HorsePhenotype = resolvePhenotype(genotype, {
    facialMarking,
    frontLegMarking,
    hindLegMarking,
    maneStyle,
    appaloosaPattern,
    hasSplashWhite,
  });

  const updateLocus = (locus: keyof HorseGenotype, newPair: [any, any]) => {
    setGenotype(prev => ({
      ...prev,
      [locus]: newPair,
    }));
  };

  const applyPreset = (preset: HorsePreset) => {
    setSelectedPresetId(preset.id);
    setGenotype({ ...preset.genotype });
    setFacialMarking(preset.facialMarking || 'none');
    setFrontLegMarking(preset.frontLegMarking || 'none');
    setHindLegMarking(preset.hindLegMarking || 'none');
    setManeStyle(preset.maneStyle || 'flowing');
    setAppaloosaPattern(preset.appaloosaPattern || 'none');
    setHasSplashWhite(preset.hasSplashWhite || false);
  };

  const resetToDefault = () => {
    applyPreset(PRESET_HORSES[0]);
  };

  const selectedPreset =
    PRESET_HORSES.find(p => p.id === selectedPresetId) || PRESET_HORSES[0];

  return (
    <div className="bg-white rounded-sm p-6 sm:p-8 border border-stone-300 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold font-mono mb-1">
            Studio Specimen / Real-Time Genetic & Anatomical Studio
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#1A1A1A]">
            Interactive Coat Color & Anatomy Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif italic mt-1">
            Explore 11 Mendelian loci, realistic facial and leg markings, mane conformations, and progressive greying stages.
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

      {/* Quick-Select Breed Ribbon */}
      <div className="bg-[#FAF9F5] p-3.5 rounded-xs border border-stone-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8479] font-mono flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-stone-700" />
            Quick-Load Breed Standards & Foundation Registries
          </span>
          <button
            type="button"
            onClick={() => setActiveTab('breeds')}
            className="text-[10px] font-mono font-bold text-stone-700 hover:text-black uppercase tracking-wider flex items-center gap-0.5"
          >
            View All Registries <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {BREED_REGISTRY_PRESETS.slice(0, 7).map(preset => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`shrink-0 px-2.5 py-1.5 rounded-xs text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: preset.iconColor }}
                />
                <span className="font-semibold">{preset.name}</span>
                <span className={`text-[9px] uppercase tracking-wide font-mono ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                  {preset.breedContext.split('/')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dynamic Live Horse Visualizer */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-[#FAF9F5] rounded-xs border border-stone-200">
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
          <div className="w-full my-auto py-3 flex justify-center bg-white border border-stone-200 rounded-xs p-4 relative">
            <HorseSvg
              phenotype={phenotype}
              size="lg"
              showLabels={true}
              interactiveGreyStage={true}
              currentGreyStage={greyStage}
              onGreyStageChange={setGreyStage}
              facialMarking={facialMarking}
              frontLegMarking={frontLegMarking}
              hindLegMarking={hindLegMarking}
              maneStyle={maneStyle}
              appaloosaPattern={appaloosaPattern}
            />
          </div>

          {/* Breed Registry Context or Summary */}
          <div className="w-full mt-4 p-4 bg-white rounded-xs border border-stone-200 text-xs text-stone-700 leading-relaxed font-serif">
            {selectedPreset.registryHistory ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sans font-bold text-[#1A1A1A] uppercase text-[10px] tracking-widest block not-italic">
                    Breed Registry Profile: {selectedPreset.name}
                  </span>
                  {selectedPreset.origin && (
                    <span className="font-mono text-[10px] text-stone-500 font-normal">
                      Origin: {selectedPreset.origin}
                    </span>
                  )}
                </div>
                <p className="italic text-stone-800 mb-2">{selectedPreset.tagline}</p>
                <p className="text-stone-600 text-[11px] font-sans leading-normal">
                  {selectedPreset.registryHistory}
                </p>
              </div>
            ) : (
              <div>
                <span className="font-sans font-bold text-[#1A1A1A] uppercase text-[10px] tracking-widest block not-italic mb-1">
                  Genetic Summary
                </span>
                <p className="italic">{phenotype.summary}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Tabbed Controls (Loci Matrix vs Anatomy & Markings vs Breed Presets) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tabs */}
          <div className="flex border-b border-stone-300">
            <button
              type="button"
              onClick={() => setActiveTab('genetics')}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'genetics'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Loci Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('anatomy')}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'anatomy'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Markings & Mane
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('breeds')}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'breeds'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Breed Presets
            </button>
          </div>

          {/* TAB 1: GENETICS MATRIX */}
          {activeTab === 'genetics' && (
            <div className="space-y-3.5">
              {/* Extension & Agouti (Base) */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Base: Extension (E/e)
                  </span>
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
                    const isActive =
                      genotype.extension[0] === opt.pair[0] && genotype.extension[1] === opt.pair[1];
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
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Agouti (A/a)
                  </span>
                  <span className="text-[10px] font-serif italic text-stone-500">
                    {genotype.extension.join('') === 'ee'
                      ? '(Masked on Chestnut)'
                      : genotype.agouti.includes('A')
                      ? 'Points restricted (Bay)'
                      : 'Solid (Black)'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                  {[
                    { pair: ['A', 'A'], label: 'A/A' },
                    { pair: ['A', 'a'], label: 'A/a' },
                    { pair: ['a', 'a'], label: 'a/a' },
                  ].map(opt => {
                    const isActive =
                      genotype.agouti[0] === opt.pair[0] && genotype.agouti[1] === opt.pair[1];
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

              {/* Cream Dilution */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Cream Dilution (Cr)
                  </span>
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
                    const isActive =
                      genotype.cream[0] === opt.pair[0] && genotype.cream[1] === opt.pair[1];
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

              {/* Dun & Grey */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Dun */}
                <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1">
                    Dun (D/d)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('dun', ['D', 'd'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.dun.includes('D')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      Dun (D_)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('dun', ['d', 'd'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.dun.includes('D')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      dd
                    </button>
                  </div>
                </div>

                {/* Grey */}
                <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[11px] font-bold text-[#1A1A1A] block mb-1">
                    Progressive Grey (G/g)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('grey', ['G', 'g'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.grey.includes('G')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      Grey (G_)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('grey', ['g', 'g'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.grey.includes('G')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      gg
                    </button>
                  </div>
                </div>
              </div>

              {/* Modifiers: Silver, Champagne, Roan, Flaxen */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Silver */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Silver (Z/z)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('silver', ['Z', 'z'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.silver.includes('Z')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      Z_
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('silver', ['z', 'z'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.silver.includes('Z')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      zz
                    </button>
                  </div>
                </div>

                {/* Champagne */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Champagne (Ch/ch)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('champagne', ['Ch', 'ch'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.champagne.includes('Ch')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      Ch_
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('champagne', ['ch', 'ch'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.champagne.includes('Ch')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      chch
                    </button>
                  </div>
                </div>

                {/* Roan */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Roan (Rn/rn)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('roan', ['Rn', 'rn'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.roan.includes('Rn')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      Rn_
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('roan', ['rn', 'rn'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.roan.includes('Rn')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      rnrn
                    </button>
                  </div>
                </div>

                {/* Flaxen */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Flaxen (F/f)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('flaxen', ['f', 'f'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.flaxen[0] === 'f' && genotype.flaxen[1] === 'f'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      ff (Flaxen)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('flaxen', ['F', 'F'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.flaxen.includes('F')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      F_ (Dark)
                    </button>
                  </div>
                </div>
              </div>

              {/* White Patterns: Tobiano, Overo, and Appaloosa Leopard Complex */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Tobiano */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Tobiano (TO/to)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('tobiano', ['TO', 'to'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.tobiano.includes('TO')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      TO_
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('tobiano', ['to', 'to'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.tobiano.includes('TO')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      to/to
                    </button>
                  </div>
                </div>

                {/* Frame Overo */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Frame Overo (O/o)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => updateLocus('frameOvero', ['O', 'o'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.frameOvero[0] === 'O' && genotype.frameOvero[1] === 'o'
                          ? 'bg-amber-800 text-white border-amber-800'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      O/o
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLocus('frameOvero', ['O', 'O'])}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.frameOvero[0] === 'O' && genotype.frameOvero[1] === 'O'
                          ? 'bg-red-800 text-white border-red-800'
                          : 'bg-white text-red-700 border-red-300'
                      }`}
                      title="Lethal White Overo (O/O)"
                    >
                      O/O (Lethal)
                    </button>
                  </div>
                </div>

                {/* Leopard Complex (Appaloosa) */}
                <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200">
                  <span className="font-mono text-[10px] font-bold text-[#1A1A1A] block mb-1">
                    Appaloosa LP (LP/lp)
                  </span>
                  <div className="flex gap-1 font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        updateLocus('leopardComplex', ['LP', 'lp']);
                        if (appaloosaPattern === 'none') setAppaloosaPattern('leopard');
                      }}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.leopardComplex &&
                        genotype.leopardComplex.includes('LP') &&
                        !(genotype.leopardComplex[0] === 'LP' && genotype.leopardComplex[1] === 'LP')
                          ? 'bg-[#8C5238] text-white border-[#8C5238]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      LP/lp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateLocus('leopardComplex', ['LP', 'LP']);
                        setAppaloosaPattern('fewspot');
                      }}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        genotype.leopardComplex &&
                        genotype.leopardComplex[0] === 'LP' &&
                        genotype.leopardComplex[1] === 'LP'
                          ? 'bg-[#8C5238] text-white border-[#8C5238]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                      title="Homozygous LP/LP (Few-spot / CSNB)"
                    >
                      LP/LP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateLocus('leopardComplex', ['lp', 'lp']);
                        setAppaloosaPattern('none');
                      }}
                      className={`flex-1 py-1 rounded-xs text-xs font-bold border ${
                        !genotype.leopardComplex || !genotype.leopardComplex.includes('LP')
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      lp/lp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MARKINGS & ANATOMY CUSTOMIZER */}
          {activeTab === 'anatomy' && (
            <div className="space-y-3.5">
              {/* Facial Markings */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Facial Markings
                  </span>
                  <span className="text-[10px] font-serif italic text-stone-500">
                    White forehead & nasal patterns
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs font-mono">
                  {(
                    [
                      { id: 'none', label: 'None' },
                      { id: 'star', label: 'Star' },
                      { id: 'strip', label: 'Strip' },
                      { id: 'star-strip', label: 'Star & Strip' },
                      { id: 'blaze', label: 'Blaze' },
                      { id: 'snip', label: 'Snip' },
                      { id: 'bald', label: 'Bald Face' },
                    ] as const
                  ).map(opt => {
                    const isActive = facialMarking === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFacialMarking(opt.id)}
                        className={`py-1.5 px-1 rounded-xs text-center font-bold text-[11px] transition-all border ${
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

              {/* Leg Markings: Front & Hind */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Front Leg */}
                <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-1.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A] block">
                    Front Leg Markings
                  </span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                    {(
                      [
                        { id: 'none', label: 'None' },
                        { id: 'coronet', label: 'Coronet' },
                        { id: 'pastern', label: 'Pastern' },
                        { id: 'sock', label: 'Sock' },
                        { id: 'stocking', label: 'Stocking' },
                      ] as const
                    ).map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFrontLegMarking(opt.id)}
                        className={`py-1 px-1 rounded-xs text-center font-bold border ${
                          frontLegMarking === opt.id
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hind Leg */}
                <div className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-1.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A] block">
                    Hind Leg Markings
                  </span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                    {(
                      [
                        { id: 'none', label: 'None' },
                        { id: 'coronet', label: 'Coronet' },
                        { id: 'pastern', label: 'Pastern' },
                        { id: 'sock', label: 'Sock' },
                        { id: 'stocking', label: 'Stocking' },
                      ] as const
                    ).map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHindLegMarking(opt.id)}
                        className={`py-1 px-1 rounded-xs text-center font-bold border ${
                          hindLegMarking === opt.id
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mane & Tail Styling */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Mane & Tail Styling
                  </span>
                  <span className="text-[10px] font-serif italic text-stone-500">
                    Crest cut & conformation
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                  {(
                    [
                      { id: 'flowing', label: 'Flowing / Baroque', desc: 'Long wild mane & tail' },
                      { id: 'sport', label: 'Sport / Hunter', desc: 'Braided & pulled crest' },
                      { id: 'roached', label: 'Roached / Hogged', desc: 'Standing brush crest' },
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setManeStyle(opt.id)}
                      className={`py-2 px-1.5 rounded-xs text-center font-bold transition-all border flex flex-col items-center justify-center gap-0.5 ${
                        maneStyle === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                      }`}
                    >
                      <span className="text-xs">{opt.label}</span>
                      <span className={`text-[9px] font-normal ${maneStyle === opt.id ? 'text-stone-300' : 'text-stone-400'}`}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Appaloosa / Leopard Complex Pattern */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A]">
                    Appaloosa / Leopard Complex (LP)
                  </span>
                  <span className="text-[10px] font-serif italic text-stone-500">
                    Spotted coat variations
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-mono">
                  {(
                    [
                      { id: 'none', label: 'None' },
                      { id: 'blanket', label: 'Croup Blanket' },
                      { id: 'leopard', label: 'Full Leopard' },
                      { id: 'fewspot', label: 'Few-Spot White' },
                      { id: 'snowflake', label: 'Snowflake' },
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setAppaloosaPattern(opt.id);
                        if (opt.id === 'none') {
                          updateLocus('leopardComplex', ['lp', 'lp']);
                        } else if (opt.id === 'fewspot') {
                          updateLocus('leopardComplex', ['LP', 'LP']);
                        } else {
                          updateLocus('leopardComplex', ['LP', 'lp']);
                        }
                      }}
                      className={`py-1.5 px-1 rounded-xs text-center font-bold text-[11px] border ${
                        appaloosaPattern === opt.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Splash White Modifier Toggle */}
              <div className="p-3.5 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A] block">
                    Splash White Modifier (SW)
                  </span>
                  <span className="text-[11px] text-stone-500 font-serif italic">
                    Produces crisp high stockings, white belly splash, bald face, and sky blue eyes.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasSplashWhite(!hasSplashWhite)}
                  className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold border transition-colors ${
                    hasSplashWhite
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {hasSplashWhite ? 'Splash Active' : 'Off'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: BREED PRESETS DIRECTORY */}
          {activeTab === 'breeds' && (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
              <p className="text-xs text-stone-600 font-serif italic mb-2">
                Click any historic breed registry profile to instantly apply its foundation genotype, mane style, and traditional markings.
              </p>

              {BREED_REGISTRY_PRESETS.map(preset => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`p-3.5 rounded-xs border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                        : 'bg-[#FAF9F5] hover:bg-stone-100 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-black/30"
                          style={{ backgroundColor: preset.iconColor }}
                        />
                        <h4 className="font-serif font-bold text-sm">{preset.name}</h4>
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {preset.breedContext}
                      </span>
                    </div>

                    <p className={`text-xs font-serif italic mb-2 ${isSelected ? 'text-stone-200' : 'text-stone-600'}`}>
                      {preset.tagline}
                    </p>

                    {preset.foundationTraits && preset.foundationTraits.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 text-[10px] font-mono">
                        {preset.foundationTraits.map((trait, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded-xs border ${
                              isSelected
                                ? 'bg-stone-800 border-stone-700 text-stone-200'
                                : 'bg-white border-stone-300 text-stone-700'
                            }`}
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
