import React, { useState } from 'react';
import { BookOpen, Dna, AlertTriangle, Sparkles, Check, ChevronRight, HelpCircle } from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  subtitle: string;
  iconColor: string;
  content: React.ReactNode;
}

export const GeneticsGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('base-colors');

  const sections: GuideSection[] = [
    {
      id: 'base-colors',
      title: '1. The Foundation: Base Colors (Extension & Agouti)',
      subtitle: 'All horse coat colors stem from just two base pigments: Red (pheomelanin) and Black (eumelanin).',
      iconColor: 'bg-amber-800 text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Every horse in existence, from a shimmering Cremello to a wild Zebra Dun or spotted Appaloosa,
            has an underlying genetic base of either <strong>Chestnut (Red)</strong>, <strong>Bay</strong>, or{' '}
            <strong>Black</strong>. These are governed by the interaction of two master genes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5 font-serif">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-900" />
                Extension Locus (E / e)
              </h4>
              <p className="text-xs text-stone-600">
                Determines whether black pigment (eumelanin) can be produced.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-stone-700">
                <li>• <strong>E (Dominant):</strong> Enables black pigment production (Black or Bay).</li>
                <li>• <strong>e (Recessive):</strong> Restricts coat to red pigment only (Chestnut / Sorrel).</li>
                <li>• <em>Genotypes:</em> EE or Ee = Black-capable; ee = Chestnut.</li>
              </ul>
            </div>

            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5 font-serif">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                Agouti Locus (A / a)
              </h4>
              <p className="text-xs text-stone-600">
                Controls the distribution of black pigment across the horse's body.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-stone-700">
                <li>• <strong>A (Dominant):</strong> Pushes black pigment out to the points (legs, mane, tail, ear rims), leaving a reddish-brown body (Bay).</li>
                <li>• <strong>a (Recessive):</strong> Allows black pigment uniformly everywhere (Solid Black).</li>
              </ul>
            </div>
          </div>

          {/* Epistasis callout */}
          <div className="p-3.5 bg-amber-50/80 rounded-xs border border-amber-200 text-xs text-amber-950">
            <span className="font-bold text-amber-900">🧬 What is Epistasis?</span>
            <p className="mt-1">
              On an <strong>ee (chestnut)</strong> horse, the Agouti gene has no visible effect because the horse cannot
              produce any black pigment for Agouti to restrict! However, the horse still carries the Agouti alleles and
              can pass them to offspring. If bred to a black horse that contributes an <em>E</em> allele, the foal can turn out Bay!
            </p>
          </div>

          <div className="p-3 bg-stone-100 rounded-xs text-xs text-stone-600">
            <strong>Golden Breeding Rule:</strong> Two pure Chestnut horses (ee × ee) can <em>never</em> produce a Bay or Black foal.
            Neither parent has an <em>E</em> allele to pass on.
          </div>
        </div>
      ),
    },
    {
      id: 'cream-dilution',
      title: '2. The Cream Gene (Cr): Incomplete Dominance',
      subtitle: 'How a single dosage vs double dosage creates Palominos, Buckskins, Cremellos, and Perlinos.',
      iconColor: 'bg-amber-400 text-amber-950',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            The Cream gene (<em>Cr</em>) is an <strong>incomplete dominant</strong> modifier. This means that a horse with
            one copy (heterozygous <em>Cr/N</em>) looks drastically different from a horse with two copies (homozygous <em>Cr/Cr</em>).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 rounded-xs overflow-hidden">
              <thead className="bg-stone-100 text-stone-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Base Color</th>
                  <th className="p-3">Single Dilute (Cr / N)</th>
                  <th className="p-3">Double Dilute (Cr / Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr className="hover:bg-stone-50">
                  <td className="p-3 font-medium text-stone-900">Chestnut (ee)</td>
                  <td className="p-3 font-semibold text-amber-700">Palomino (Gold body, white/flaxen mane & tail)</td>
                  <td className="p-3 font-semibold text-stone-600">Cremello (Cream body, white mane, blue eyes)</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 font-medium text-stone-900">Bay (E_ A_)</td>
                  <td className="p-3 font-semibold text-amber-800">Buckskin (Golden body, black legs & mane)</td>
                  <td className="p-3 font-semibold text-stone-600">Perlino (Cream body, reddish/tan points, blue eyes)</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 font-medium text-stone-900">Black (E_ aa)</td>
                  <td className="p-3 font-semibold text-stone-800">Smoky Black (Often visually black, carries cream)</td>
                  <td className="p-3 font-semibold text-stone-600">Smoky Cream (Pale ivory coat, blue eyes)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-stone-100 rounded-xs border border-stone-200 text-xs text-stone-800">
            <span className="font-bold">Did you know?</span> Double dilute horses (Cremello, Perlino, Smoky Cream) always
            have rosy pink skin and bright icy blue eyes. When bred, they are guaranteed to pass a Cream (Cr) allele to 100% of their foals!
          </div>
        </div>
      ),
    },
    {
      id: 'dun-gene',
      title: '3. The Dun Gene & Primitive Markings (D)',
      subtitle: 'The ancient wild camouflage gene featuring dorsal stripes and leg zebra bars.',
      iconColor: 'bg-amber-700 text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Dun (<em>D</em>) is a simple dominant gene and one of the oldest equine coat patterns in history.
            It dilutes both red and black pigments on the body while leaving the head, lower legs, and primitive
            markings untouched.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-stone-50 rounded-xs border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Classic Dun (Zebra Dun)</span>
              <span className="text-xs text-stone-500">Bay base + Dun</span>
              <p className="text-2xs text-stone-600 mt-2">
                Yellow-tan body with stark black points, sharp dorsal stripe, and shoulder cross.
              </p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xs border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Red Dun</span>
              <span className="text-xs text-stone-500">Chestnut base + Dun</span>
              <p className="text-2xs text-stone-600 mt-2">
                Pale peach/apricot body with reddish-chestnut mane, tail, and dorsal stripe.
              </p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xs border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Grullo (Blue Dun)</span>
              <span className="text-xs text-stone-500">Black base + Dun</span>
              <p className="text-2xs text-stone-600 mt-2">
                Smoky mouse-grey body with jet black points, dorsal stripe, and dark face mask.
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xs border border-stone-200 text-xs text-stone-600">
            <strong>Identifying Feature:</strong> A true Dun always possesses a sharp, distinct dorsal stripe
            running uninterrupted from the withers all the way through the tail.
          </div>
        </div>
      ),
    },
    {
      id: 'silver-champagne',
      title: '4. Silver Dapple & Champagne Modifiers',
      subtitle: 'Specialized dilutes that produce chocolate bodies, silvery manes, and hazel eyes.',
      iconColor: 'bg-stone-700 text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-stone-50 rounded-xs border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 font-serif">Silver Dapple (Z / z)</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Silver is a dominant gene that <strong>only acts on black eumelanin</strong>. It turns black pigment into
              deep chocolate or smoky charcoal and bleaches the mane and tail into silvery white or flaxen.
            </p>
            <p className="text-xs text-stone-600">
              <strong>Crucial Detail:</strong> Because Silver does not affect red pigment, a <em>chestnut (ee)</em> horse
              with the Silver gene shows zero visible change in its coat! It is a "silent carrier" and will pass Silver to its offspring.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xs border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 font-serif">Champagne (Ch / ch)</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Champagne dilutes both red and black pigments. Foals are born with bright blue/green eyes that mature into
              warm hazel or amber, alongside distinctive pinkish mottled skin around the muzzle and eyes.
            </p>
            <ul className="text-xs text-stone-600 space-y-1 mt-1">
              <li>• Chestnut + Champagne = <strong>Gold Champagne</strong> (resembles Palomino with amber eyes).</li>
              <li>• Bay + Champagne = <strong>Amber Champagne</strong> (tan body, warm chocolate points).</li>
              <li>• Black + Champagne = <strong>Classic Champagne</strong> (lilac/slate body).</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'grey-roan',
      title: '5. Progressive Grey (G) & Roan (Rn)',
      subtitle: 'How white hairs are introduced across the horse coat over time or from birth.',
      iconColor: 'bg-slate-600 text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1">Progressive Grey (G)</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Grey is an age-dependent depigmentation gene. A horse with <em>G</em> is born with its full base coat color
                (e.g. solid black, bright bay, or palomino). Over the years, white hairs progressively replace the pigment,
                transitioning through dapple grey to near-white or flea-bitten white.
              </p>
              <div className="mt-2 text-2xs text-stone-500 font-medium">
                Unlike cremellos, grey horses always retain dark skin and dark eyes.
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1">Roan (Rn)</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Roan causes white hairs to intermingle evenly across the barrel and body from birth. The head, mane,
                tail, and lower legs remain solid base color, creating the classic "inverted V" on the knees and hocks.
              </p>
              <div className="mt-2 text-2xs text-stone-500 font-medium">
                Produces Strawberry Roan (Chestnut), Bay Roan, or Blue Roan (Black).
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'lethal-white',
      title: '6. Pinto Patterns & Lethal White Overo Syndrome (LWOS)',
      subtitle: 'Understanding Tobiano, Frame Overo, and the critical importance of genetic testing.',
      iconColor: 'bg-rose-700 text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Equine white spotting patterns fall into distinct genetic categories, each with its own inheritance mode:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1">Tobiano (TO / to)</h4>
              <p className="text-xs text-stone-600">
                Smooth, rounded vertical white patches that cross the spine between the withers and tail. Legs are typically
                white with dark heads and facial markings.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1">Frame Overo (O / o)</h4>
              <p className="text-xs text-stone-600">
                Horizontal, jagged, irregular white markings centered on the sides of the neck, flank, and barrel. The white
                does not cross the topline, and legs are usually dark.
              </p>
            </div>
          </div>

          {/* Critical Warning Box */}
          <div className="p-4 bg-rose-50 border border-red-300 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
              <span className="font-serif italic text-base">Lethal White Overo Syndrome (O/O)</span>
            </div>
            <p className="text-xs text-rose-900 leading-relaxed font-serif italic">
              The Frame Overo allele (<em>O</em>) is caused by a mutation in the <em>EDNRB</em> (endothelin receptor type B) gene.
              While heterozygous horses (<em>O/o</em>) are completely healthy and display striking pinto coats, homozygous foals (<em>O/O</em>)
              are born with <strong>aganglionic megacolon</strong>. The neural crest cells fail to migrate to the digestive tract,
              leaving the intestines unable to contract and pass food.
            </p>
            <div className="p-3 bg-white rounded-xs border border-rose-200 text-xs text-rose-900">
              <strong className="font-mono uppercase text-[10px] tracking-wider block mb-0.5 text-red-800">Breeding Protocol Mandate:</strong>
              A Frame Overo (O/o) horse should <em>never</em> be bred to another Frame Overo (O/o).
              Always test potential mates so that Overo horses are exclusively bred to solid (o/o) partners, guaranteeing 0% risk of LWOS.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'appaloosa-leopard',
      title: '7. The Leopard Complex (LP) & Appaloosa Patterns',
      subtitle: 'Incomplete dominant spotting, mottled skin, striped hooves, and Congenital Stationary Night Blindness (CSNB).',
      iconColor: 'bg-[#8C5238] text-white',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            The <strong>Leopard Complex</strong> gene (<em>LP</em>, located on equine chromosome 1) is an incomplete dominant mutation
            in the <em>TRPM1</em> ion channel gene responsible for the iconic Appaloosa spotting patterns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C5238]" />
                Heterozygous (LP / lp)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Possessing one copy of <em>LP</em> produces the classic spotted coat patterns:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-stone-700">
                <li>• <strong>Full Leopard:</strong> White body covered in colored spots matching the base coat.</li>
                <li>• <strong>Croup Blanket:</strong> Symmetrical white blanket over the hips with spots.</li>
                <li>• <strong>Snowflake:</strong> White specks scattered across dark base coat.</li>
                <li>• <strong>Vision:</strong> Normal scotopic night vision.</li>
              </ul>
            </div>

            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
              <h4 className="font-bold text-stone-900 font-serif mb-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                Homozygous (LP / LP)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Two copies of <em>LP</em> cause suppression of spots, creating white "homozygous" patterns:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-stone-700">
                <li>• <strong>Few-Spot Leopard:</strong> Almost solid white coat with very few spots at flank.</li>
                <li>• <strong>Snowcap Blanket:</strong> Solid white croup blanket with <em>no</em> dark spots.</li>
                <li>• <strong>100% Siring Rate:</strong> Guarantees 100% spotted/LP offspring regardless of mate.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-serif italic text-sm">Clinical Link: Congenital Stationary Night Blindness (CSNB)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-serif italic">
              All homozygous <strong>LP/LP</strong> horses lack functional TRPM1 ion channel activity in retinal bipolar cells,
              rendering them completely night-blind from birth (CSNB). Day vision remains normal.
              In addition, all LP horses typically express the hallmark triad of Appaloosa characteristics: <em>mottled skin</em> around the muzzle and eyes,
              <em>vertically striped hooves</em>, and visible <em>white sclera</em> encircling the iris.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="bg-white rounded-sm p-6 sm:p-8 border border-stone-300 space-y-6">
      <div className="pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold font-mono mb-1">
            Reference Compendium / Mendelian Principles
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#1A1A1A]">
            How Horse Coat Genetics Work
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif italic mt-1">
            Archival reference on pigment production, epistasis, dilution series, and lethal alleles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-1.5">
          {sections.map(sec => {
            const isActive = sec.id === activeSection;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left p-3.5 rounded-xs text-xs transition-all flex items-center justify-between border ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-none'
                    : 'bg-[#FAF9F5] text-stone-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : sec.iconColor}`} />
                  <span className="line-clamp-1 font-serif">{sec.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 p-6 sm:p-7 bg-[#FAF9F5] rounded-xs border border-stone-200">
          <div className="mb-5 pb-3 border-b border-stone-200">
            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mb-1">
              {currentSection.title}
            </h3>
            <p className="text-xs text-stone-500 font-serif italic">{currentSection.subtitle}</p>
          </div>

          <div>{currentSection.content}</div>
        </div>
      </div>
    </div>
  );
};
