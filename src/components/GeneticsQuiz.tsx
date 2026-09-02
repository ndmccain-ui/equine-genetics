import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Can two pure Chestnut (Sorrel) horses ever produce a Bay or Black foal?',
    options: [
      'Yes, if both carry the dominant Agouti gene.',
      'No, because both are ee and lack the dominant E allele needed for black pigment.',
      'Yes, with a 25% Mendelian probability.',
      'Only if one is a Palomino.',
    ],
    correctIndex: 1,
    explanation:
      'Chestnut is caused by homozygous recessive extension (ee). Because neither parent possesses an "E" allele to synthesize black eumelanin, two chestnuts can strictly produce only chestnut (or chestnut-dilute) foals.',
  },
  {
    id: 2,
    question: 'What coat color results from crossing a 100% homozygous Cremello (ee CrCr) with a Chestnut (ee NN)?',
    options: [
      '50% Palomino, 50% Chestnut',
      '100% Palomino',
      '25% Cremello, 50% Palomino, 25% Chestnut',
      '100% Buckskin',
    ],
    correctIndex: 1,
    explanation:
      'The Cremello parent passes a Cream allele (Cr) 100% of the time, and the Chestnut passes a non-cream allele (N) 100% of the time. Every single foal will be ee Cr/N, which is 100% guaranteed Palomino!',
  },
  {
    id: 3,
    question: 'Why do equine geneticists and breeders caution against breeding two Frame Overo (O/o) horses together?',
    options: [
      'Because all foals will be born deaf.',
      'Because 25% will inherit O/O, causing fatal Lethal White Overo Syndrome (LWOS).',
      'Because it causes dwarfism in draft breeds.',
      'Because they will lose their pinto spots over time.',
    ],
    correctIndex: 1,
    explanation:
      'Homozygous Frame Overo (O/O) results in severe intestinal aganglionosis (failure of nerve development in the intestines), preventing bowel motility. Foals are non-viable within 24-48 hours. Responsible breeders test and exclusively breed Overos to solid horses.',
  },
  {
    id: 4,
    question: 'Which pigment type does the dominant Silver Dapple gene (Z) affect?',
    options: [
      'Only red pheomelanin (lightening chestnuts to strawberry).',
      'Only black eumelanin (diluting black points to chocolate/flaxen).',
      'Both red and black pigments equally.',
      'It only affects skin pigmentation.',
    ],
    correctIndex: 1,
    explanation:
      'Silver Dapple exclusively dilutes black eumelanin. On a chestnut (ee) horse, Silver is completely invisible (a silent carrier), whereas on a black horse it creates a gorgeous chocolate body with a silvery flaxen mane and tail.',
  },
  {
    id: 5,
    question: 'A classic Buckskin horse must have which underlying base color before the Cream dilution is applied?',
    options: [
      'Chestnut (ee)',
      'Bay (E_ A_)',
      'Solid Black (E_ aa)',
      'Dun (D_)',
    ],
    correctIndex: 1,
    explanation:
      'Buckskin is a Bay horse (E_ A_) with one Cream allele (Cr/N). The Cream gene dilutes the reddish-brown body to gold/yellow while leaving the black points on the legs, mane, and tail untouched.',
  },
];

export const GeneticsQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const q = QUIZ_QUESTIONS[currentIdx];
  const hasAnswered = selectedAnswers[currentIdx] !== undefined;
  const isCorrect = selectedAnswers[currentIdx] === q.correctIndex;

  const handleSelect = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowSummary(true);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowSummary(false);
  };

  const score = Object.entries(selectedAnswers).filter(
    ([qIdx, aIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === aIdx
  ).length;

  return (
    <div className="bg-white rounded-sm p-6 sm:p-8 border border-stone-300 space-y-6">
      <div className="pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold font-mono mb-1">
            Examination / Mendelian Competency Assessment
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#1A1A1A]">
            Equine Genetics Challenge
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif italic mt-1">
            Assess your understanding of coat loci, epistasis, incomplete dominance, and breeding risks.
          </p>
        </div>

        {!showSummary && (
          <span className="text-[10px] font-mono font-bold px-3 py-1 bg-stone-100 border border-stone-200 rounded-xs text-[#1A1A1A] uppercase tracking-wider self-start sm:self-auto">
            Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!showSummary ? (
        <div className="space-y-6 max-w-3xl mx-auto py-2">
          {/* Question Box */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
              {q.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIdx] === idx;
              const isAnswerCorrect = idx === q.correctIndex;

              let style = 'bg-[#FAF9F5] border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-400';
              if (hasAnswered) {
                if (isAnswerCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  style = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-xs border transition-all text-xs sm:text-sm flex items-start gap-3.5 ${style}`}
                >
                  <span className="w-6 h-6 rounded-xs border border-current flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 mt-0.5 font-sans leading-relaxed">{option}</span>
                  {hasAnswered && isAnswerCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isAnswerCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {hasAnswered && (
            <div
              className={`p-5 rounded-xs border animate-in fade-in duration-150 ${
                isCorrect ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-amber-50/70 border-amber-300 text-amber-950'
              }`}
            >
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest block mb-1.5">
                {isCorrect ? '✓ Correct Verification' : 'Genetic Interaction Analysis'}
              </span>
              <p className="text-xs sm:text-sm leading-relaxed font-serif italic">{q.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-xs transition-colors"
              >
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'See Comprehensive Results'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-10 space-y-5 max-w-lg mx-auto animate-in fade-in">
          <div className="w-16 h-16 rounded-xs bg-stone-100 border border-stone-300 text-[#1A1A1A] flex items-center justify-center mx-auto shadow-none">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-[#8C8479] block mb-1">
              Assessment Completed
            </span>
            <h3 className="text-3xl font-serif text-[#1A1A1A]">Ledger Evaluation</h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-serif italic">
              You scored <strong className="text-[#1A1A1A] font-sans font-bold">{score}</strong> of{' '}
              <strong className="text-[#1A1A1A] font-sans font-bold">{QUIZ_QUESTIONS.length}</strong> questions correctly.
            </p>
          </div>

          <div className="p-5 bg-[#FAF9F5] rounded-xs border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic text-left">
            {score === QUIZ_QUESTIONS.length
              ? 'Outstanding pedigree mastery: You demonstrate full analytical grasp of Mendelian inheritance, dilution series, epistatic masking, and lethal alleles.'
              : score >= 3
              ? 'Sound genetic competency: You understand base coat color segregation and the key mechanisms of incomplete dominance and modifiers.'
              : 'Further study recommended: Explore the Equine Genetics Compendium and the interactive coat sandbox to inspect gene interactions first-hand.'}
          </div>

          <button
            type="button"
            onClick={resetQuiz}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-stone-800 text-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-xs transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
};
