export type ExtensionAllele = 'E' | 'e';
export type AgoutiAllele = 'A' | 'a';
export type CreamAllele = 'N' | 'Cr';
export type DunAllele = 'D' | 'd';
export type SilverAllele = 'Z' | 'z';
export type ChampagneAllele = 'Ch' | 'ch';
export type GreyAllele = 'G' | 'g';
export type RoanAllele = 'Rn' | 'rn';
export type TobianoAllele = 'TO' | 'to';
export type FrameOveroAllele = 'O' | 'o';
export type FlaxenAllele = 'F' | 'f';

export interface HorseGenotype {
  extension: [ExtensionAllele, ExtensionAllele]; // E/E, E/e, e/e
  agouti: [AgoutiAllele, AgoutiAllele];          // A/A, A/a, a/a
  cream: [CreamAllele, CreamAllele];            // N/N, Cr/N, Cr/Cr
  dun: [DunAllele, DunAllele];                  // D/D, D/d, d/d
  silver: [SilverAllele, SilverAllele];          // Z/Z, Z/z, z/z
  champagne: [ChampagneAllele, ChampagneAllele];// Ch/Ch, Ch/ch, ch/ch
  grey: [GreyAllele, GreyAllele];                // G/G, G/g, g/g
  roan: [RoanAllele, RoanAllele];                // Rn/Rn, Rn/rn, rn/rn
  tobiano: [TobianoAllele, TobianoAllele];       // TO/TO, TO/to, to/to
  frameOvero: [FrameOveroAllele, FrameOveroAllele]; // O/O (Lethal), O/o, o/o
  flaxen: [FlaxenAllele, FlaxenAllele];          // F/F, F/f, f/f
}

export type BaseColorCategory = 'chestnut' | 'bay' | 'black';

export interface HorsePhenotype {
  name: string;
  category: BaseColorCategory;
  summary: string;
  bodyColor: string;          // Primary body hex color
  bodySecondaryColor?: string; // Highlights or shading
  pointsColor: string;        // Muzzle, lower legs, ear tips
  maneTailColor: string;      // Mane and tail
  eyeColor: string;           // Eye color
  hasPrimitiveMarkings: boolean; // Dun dorsal stripe & zebra leg bars
  hasRoanBody: boolean;       // Roan frosted body
  isGreyProgressive: boolean; // Progressive grey
  hasTobiano: boolean;        // White pinto patches
  hasFrameOvero: boolean;     // Jagged white patches
  isLethalWhite: boolean;     // O/O homozygous lethal white overo syndrome
  rarity?: 'common' | 'uncommon' | 'rare' | 'very_rare' | 'lethal';
  scientificFormula: string;  // e.g. "ee A_ Cr/N dd zz chch gg rnrn to/to"
}

export interface OffspringProbability {
  phenotype: HorsePhenotype;
  genotypes: HorseGenotype[];
  probability: number;        // Percentage, e.g. 50.0
  countRatio: string;         // e.g. "1/4" or "3/8"
  explanation: string;
}

export interface BreedingResult {
  sireGenotype: HorseGenotype;
  damGenotype: HorseGenotype;
  sirePhenotype: HorsePhenotype;
  damPhenotype: HorsePhenotype;
  offspring: OffspringProbability[];
  lethalRisk: {
    hasRisk: boolean;
    lethalProbability: number;
    description: string;
  };
  totalCombinations: number;
}

export interface HorsePreset {
  id: string;
  name: string;
  breedContext: string;
  tagline: string;
  genotype: HorseGenotype;
  iconColor: string;
}

export interface PunnettCell {
  sireAllele: string;
  damAllele: string;
  offspringGenotype: string;
  phenotypeNote: string;
}

export interface PunnettGrid {
  locusName: string;
  symbol: string;
  sireGametes: string[];
  damGametes: string[];
  grid: PunnettCell[][];
  ratios: { genotype: string; ratio: string; percent: number; phenotypeImpact: string }[];
}
