import React, { useState } from 'react';
import { BreedingCalculator } from './components/BreedingCalculator';
import { CoatSandbox } from './components/CoatSandbox';
import { GeneticsGuide } from './components/GeneticsGuide';
import { GeneticsQuiz } from './components/GeneticsQuiz';
import { Calculator, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

type ActiveTab = 'calculator' | 'sandbox' | 'guide' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calculator');

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF9] text-[#1A1A1A] font-sans antialiased">
      {/* Top Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#FDFCF9]/95 backdrop-blur-xs border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-4 sm:py-6 gap-4">
            {/* Main Title & Editorial Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight font-light text-[#1A1A1A]">
                Equus Heredity
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold opacity-60 text-[#1A1A1A]">
                <span>v2.4 Genetics Engine</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden lg:inline">Mendelian Segregation</span>
              </div>
            </div>

            {/* Editorial Navigation Tabs */}
            <nav className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-1 border border-[#1A1A1A] p-1 sm:p-0.5 rounded-sm bg-[#FDFCF9] text-[11px] uppercase tracking-wider font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-xs transition-colors flex items-center justify-center sm:justify-start gap-2 ${
                  activeTab === 'calculator'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Breeding Pair</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sandbox')}
                className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-xs transition-colors flex items-center justify-center sm:justify-start gap-2 ${
                  activeTab === 'sandbox'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-xs transition-colors flex items-center justify-center sm:justify-start gap-2 ${
                  activeTab === 'guide'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Compendium</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-xs transition-colors flex items-center justify-center sm:justify-start gap-2 ${
                  activeTab === 'quiz'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Challenge</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main App Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && <BreedingCalculator />}
        {activeTab === 'sandbox' && <CoatSandbox />}
        {activeTab === 'guide' && <GeneticsGuide />}
        {activeTab === 'quiz' && <GeneticsQuiz />}
      </main>

      {/* Editorial Monograph Footer */}
      <footer className="border-t border-[#1A1A1A] bg-[#FDFCF9] py-5 px-4 sm:px-8 text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 opacity-60">
          <span>Equus Heredity • 11-Loci Mendelian Probability Engine</span>
          <span>Reference: UC Davis Veterinary Genetics Laboratory (VGL)</span>
          <span className="hidden md:inline">E/e • A/a • Cr/N • D/d • Z/z • Ch/ch • G/g • Rn/rn • TO/to • O/o • F/f</span>
        </div>
      </footer>
    </div>
  );
}
