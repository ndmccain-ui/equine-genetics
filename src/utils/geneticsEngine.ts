import {
  HorseGenotype,
  HorsePhenotype,
  OffspringProbability,
  BreedingResult,
  PunnettGrid,
  PunnettCell,
  BaseColorCategory,
} from '../types/genetics';

/**
 * Resolves full phenotype from a horse's complete genotype.
 */
export function resolvePhenotype(genotype: HorseGenotype): HorsePhenotype {
  const {
    extension,
    agouti,
    cream,
    dun,
    silver,
    champagne,
    grey,
    roan,
    tobiano,
    frameOvero,
    flaxen,
  } = genotype;

  // Check Lethal White Overo
  const isOO = frameOvero[0] === 'O' && frameOvero[1] === 'O';
  if (isOO) {
    return {
      name: 'Lethal White Overo (LWS)',
      category: 'black',
      summary: 'Homozygous Frame Overo (O/O). Non-viable condition resulting in severe congenital intestinal aganglionosis. Pairings of O/o x O/o are strictly avoided.',
      bodyColor: '#FFFFFF',
      bodySecondaryColor: '#F8FAFC',
      pointsColor: '#FFFFFF',
      maneTailColor: '#FFFFFF',
      eyeColor: '#93C5FD', // light blue
      hasPrimitiveMarkings: false,
      hasRoanBody: false,
      isGreyProgressive: false,
      hasTobiano: false,
      hasFrameOvero: true,
      isLethalWhite: true,
      rarity: 'lethal',
      scientificFormula: formatGenotypeFormula(genotype),
    };
  }

  // 1. Base Color determination (Extension & Agouti)
  const hasE = extension.includes('E');
  const hasA = agouti.includes('A');
  let category: BaseColorCategory = 'chestnut';
  let baseName = 'Chestnut';

  if (!hasE) {
    // ee -> Chestnut / Sorrel
    category = 'chestnut';
    baseName = 'Chestnut';
  } else {
    // E_ -> Black or Bay
    if (hasA) {
      category = 'bay';
      baseName = 'Bay';
    } else {
      category = 'black';
      baseName = 'Black';
    }
  }

  // Modifiers & Dilutions
  const crCount = (cream[0] === 'Cr' ? 1 : 0) + (cream[1] === 'Cr' ? 1 : 0);
  const hasDun = dun.includes('D');
  const hasSilver = silver.includes('Z');
  const hasChampagne = champagne.includes('Ch');
  const hasGrey = grey.includes('G');
  const hasRoan = roan.includes('Rn');
  const hasTobiano = tobiano.includes('TO');
  const hasFrameOvero = frameOvero.includes('O');
  const isFlaxen = category === 'chestnut' && flaxen[0] === 'f' && flaxen[1] === 'f';

  let resolvedName = baseName;
  let bodyColor = '#8B3A1C'; // default chestnut
  let bodySecondaryColor = '#A04A26';
  let pointsColor = '#8B3A1C';
  let maneTailColor = '#6A2A12';
  let eyeColor = '#3F2212'; // deep equine dark brown

  // --- BASE COLOR PALETTES ---
  if (category === 'chestnut') {
    bodyColor = '#A6461D';
    bodySecondaryColor = '#BE5C2E';
    pointsColor = '#A6461D';
    maneTailColor = isFlaxen ? '#F8E8B6' : '#73290D';
    resolvedName = isFlaxen ? 'Flaxen Chestnut' : 'Chestnut';
  } else if (category === 'bay') {
    bodyColor = '#843C1D';
    bodySecondaryColor = '#9E4E28';
    pointsColor = '#1A1412';
    maneTailColor = '#120F0D';
    resolvedName = 'Bay';
  } else if (category === 'black') {
    bodyColor = '#1E1B18';
    bodySecondaryColor = '#2D2824';
    pointsColor = '#12100E';
    maneTailColor = '#0D0B0A';
    resolvedName = 'Black';
  }

  // --- CREAM DILUTION ---
  if (crCount === 1) {
    if (category === 'chestnut') {
      resolvedName = 'Palomino';
      bodyColor = '#E8B647';
      bodySecondaryColor = '#F2C968';
      pointsColor = '#E8B647';
      maneTailColor = '#FFF5D6'; // gleaming flaxen/white
    } else if (category === 'bay') {
      resolvedName = 'Buckskin';
      bodyColor = '#CCA058';
      bodySecondaryColor = '#DDB673';
      pointsColor = '#171412';
      maneTailColor = '#100D0B';
    } else if (category === 'black') {
      resolvedName = 'Smoky Black';
      bodyColor = '#28231E';
      bodySecondaryColor = '#38322B';
      pointsColor = '#1C1814';
      maneTailColor = '#14120F';
    }
  } else if (crCount === 2) {
    eyeColor = '#60A5FA'; // Double-dilute icy blue eyes
    if (category === 'chestnut') {
      resolvedName = 'Cremello';
      bodyColor = '#F7EEDB';
      bodySecondaryColor = '#FFF9EC';
      pointsColor = '#F5E6CC';
      maneTailColor = '#FFFFFF';
    } else if (category === 'bay') {
      resolvedName = 'Perlino';
      bodyColor = '#F2E4CD';
      bodySecondaryColor = '#FAF0DE';
      pointsColor = '#CA9E7B'; // reddish/tan cast points
      maneTailColor = '#F1DFCA';
    } else if (category === 'black') {
      resolvedName = 'Smoky Cream';
      bodyColor = '#EFE9DE';
      bodySecondaryColor = '#F7F3EB';
      pointsColor = '#D8CEBF';
      maneTailColor = '#F5EFEB';
    }
  }

  // --- DUN DILUTION ---
  if (hasDun) {
    if (crCount === 1) {
      // Dun + Single Cream
      if (category === 'chestnut') {
        resolvedName = 'Dunalino';
        bodyColor = '#F0CB74';
        pointsColor = '#E0983A';
        maneTailColor = '#FFF6D8';
      } else if (category === 'bay') {
        resolvedName = 'Dunskin';
        bodyColor = '#D8B876';
        pointsColor = '#161311';
        maneTailColor = '#100D0B';
      } else {
        resolvedName = 'Smoky Grullo';
        bodyColor = '#5C5956';
        pointsColor = '#171513';
        maneTailColor = '#100E0D';
      }
    } else if (crCount === 0) {
      if (category === 'chestnut') {
        resolvedName = 'Red Dun';
        bodyColor = '#D67B54';
        bodySecondaryColor = '#E28F6C';
        pointsColor = '#B24322';
        maneTailColor = '#8A2B10';
      } else if (category === 'bay') {
        resolvedName = 'Classic Dun (Zebra Dun)';
        bodyColor = '#BFA169';
        bodySecondaryColor = '#D1B47E';
        pointsColor = '#1A1614';
        maneTailColor = '#110E0C';
      } else if (category === 'black') {
        resolvedName = 'Grullo (Blue Dun)';
        bodyColor = '#6A6D72';
        bodySecondaryColor = '#7D8086';
        pointsColor = '#1B1C1E';
        maneTailColor = '#121314';
      }
    }
  }

  // --- SILVER DAPPLE (Z) ---
  // Only affects eumelanin (black). On chestnut, it is hidden/carried!
  if (hasSilver) {
    if (category === 'black' && crCount === 0 && !hasDun) {
      resolvedName = 'Silver Dapple (Chocolate)';
      bodyColor = '#3D2F28';
      bodySecondaryColor = '#4E3E35';
      pointsColor = '#3D2F28';
      maneTailColor = '#F0E6D2'; // striking white/flaxen mane & tail
    } else if (category === 'bay' && crCount === 0 && !hasDun) {
      resolvedName = 'Silver Bay';
      pointsColor = '#4A3B33';
      maneTailColor = '#EDE3CF';
    }
  }

  // --- CHAMPAGNE (Ch) ---
  if (hasChampagne) {
    eyeColor = '#B4823A'; // Hazel/Amber eyes
    if (category === 'chestnut') {
      resolvedName = 'Gold Champagne';
      bodyColor = '#E3B964';
      bodySecondaryColor = '#EFCB7C';
      pointsColor = '#E3B964';
      maneTailColor = '#FFF1CE';
    } else if (category === 'bay') {
      resolvedName = 'Amber Champagne';
      bodyColor = '#B58B55';
      bodySecondaryColor = '#C89F6B';
      pointsColor = '#503828';
      maneTailColor = '#3C291D';
    } else if (category === 'black') {
      resolvedName = 'Classic Champagne';
      bodyColor = '#7A6E68';
      bodySecondaryColor = '#8D817A';
      pointsColor = '#463A35';
      maneTailColor = '#382D28';
    }
  }

  // --- ROAN (Rn) ---
  if (hasRoan) {
    if (resolvedName === 'Chestnut') resolvedName = 'Strawberry Roan';
    else if (resolvedName === 'Bay') resolvedName = 'Bay Roan';
    else if (resolvedName === 'Black') resolvedName = 'Blue Roan';
    else resolvedName = `${resolvedName} Roan`;
  }

  // --- WHITE PATTERNS (Tobiano / Frame Overo) ---
  const patternTags: string[] = [];
  if (hasTobiano && hasFrameOvero) patternTags.push('Tovero');
  else if (hasTobiano) patternTags.push('Tobiano');
  else if (hasFrameOvero) patternTags.push('Frame Overo');

  if (patternTags.length > 0) {
    resolvedName = `${resolvedName} ${patternTags.join(' ')}`;
  }

  // --- GREY PROGRESSION (G) ---
  if (hasGrey) {
    resolvedName = `${resolvedName} (Progressive Grey)`;
  }

  // Compose scientific summary
  const summary = generatePhenotypeSummary(
    category,
    resolvedName,
    crCount,
    hasDun,
    hasSilver,
    hasChampagne,
    hasGrey,
    hasRoan,
    hasTobiano,
    hasFrameOvero,
    isFlaxen
  );

  return {
    name: resolvedName,
    category,
    summary,
    bodyColor,
    bodySecondaryColor,
    pointsColor,
    maneTailColor,
    eyeColor,
    hasPrimitiveMarkings: hasDun,
    hasRoanBody: hasRoan,
    isGreyProgressive: hasGrey,
    hasTobiano,
    hasFrameOvero,
    isLethalWhite: false,
    rarity: getRarityLevel(crCount, hasDun, hasSilver, hasChampagne, hasGrey, hasRoan, hasTobiano, hasFrameOvero),
    scientificFormula: formatGenotypeFormula(genotype),
  };
}

function getRarityLevel(
  crCount: number,
  dun: boolean,
  silver: boolean,
  champagne: boolean,
  grey: boolean,
  roan: boolean,
  tobiano: boolean,
  overo: boolean
): 'common' | 'uncommon' | 'rare' | 'very_rare' {
  const score =
    (crCount === 2 ? 3 : crCount === 1 ? 1 : 0) +
    (dun ? 1 : 0) +
    (silver ? 2 : 0) +
    (champagne ? 3 : 0) +
    (roan ? 2 : 0) +
    (grey ? 1 : 0) +
    (tobiano ? 1 : 0) +
    (overo ? 1 : 0);

  if (score >= 4) return 'very_rare';
  if (score >= 2) return 'rare';
  if (score >= 1) return 'uncommon';
  return 'common';
}

function generatePhenotypeSummary(
  category: BaseColorCategory,
  name: string,
  crCount: number,
  dun: boolean,
  silver: boolean,
  champagne: boolean,
  grey: boolean,
  roan: boolean,
  tobiano: boolean,
  overo: boolean,
  flaxen: boolean
): string {
  const parts: string[] = [];

  if (category === 'chestnut') {
    parts.push('Recessive red base (ee) producing pheomelanin only.');
    if (flaxen) parts.push('Homozygous flaxen (ff) lightens mane and tail to blonde/white.');
  } else if (category === 'bay') {
    parts.push('Dominant extension (E_) produces black eumelanin, restricted to points by Agouti (A_).');
  } else {
    parts.push('Dominant extension (E_) with recessive non-agouti (aa) produces uniform black pigment.');
  }

  if (crCount === 1) parts.push('Single Cream allele (Cr/N) causes incomplete dominant dilution of red pigment.');
  if (crCount === 2) parts.push('Double Cream alleles (Cr/Cr) dilute both red and black pigments intensely, with blue eyes.');
  if (dun) parts.push('Dominant Dun gene (D_) produces primitive body dilution, sharp dorsal stripe, and leg barring.');
  if (silver) parts.push('Dominant Silver gene (Z_) lightens black eumelanin, creating a silver/flaxen mane & tail.');
  if (champagne) parts.push('Champagne (Ch_) lightens both pigments with distinct amber/hazel eyes and mottled skin.');
  if (roan) parts.push('Roan (Rn_) introduces white hairs evenly across body barrel while points remain solid.');
  if (grey) parts.push('Dominant Grey (G_) will cause progressive depigmentation with age, turning white/flea-bitten.');
  if (tobiano) parts.push('Tobiano (TO_) produces large rounded vertical white pinto patches crossing the spine.');
  if (overo) parts.push('Frame Overo (O_) causes horizontal jagged white markings; dark legs and white facial splashes.');

  return parts.join(' ');
}

export function formatGenotypeFormula(g: HorseGenotype): string {
  const ext = g.extension.join('/');
  const ag = g.agouti.join('/');
  const cr = g.cream.join('/');
  const dn = g.dun.join('/');
  const sl = g.silver.join('/');
  const ch = g.champagne.join('/');
  const gr = g.grey.join('/');
  const rn = g.roan.join('/');
  const to = g.tobiano.join('/');
  const ov = g.frameOvero.join('/');

  return `${ext} ${ag} ${cr} ${dn} ${sl} ${ch} ${gr} ${rn} ${to} ${ov}`;
}

/**
 * Calculates offspring probabilities using Mendelian assortment.
 */
export function calculateBreedingPair(
  sireGenotype: HorseGenotype,
  damGenotype: HorseGenotype
): BreedingResult {
  const sirePhenotype = resolvePhenotype(sireGenotype);
  const damPhenotype = resolvePhenotype(damGenotype);

  // Each gene locus has 2 possible alleles passed by sire (50% each) and 2 by dam (50% each)
  // Generating 4 offspring combinations per locus:
  const lociKeys: (keyof HorseGenotype)[] = [
    'extension',
    'agouti',
    'cream',
    'dun',
    'silver',
    'champagne',
    'grey',
    'roan',
    'tobiano',
    'frameOvero',
    'flaxen',
  ];

  // For each locus, find all 4 possible combinations:
  const locusCombos: Record<keyof HorseGenotype, [any, any][]> = {} as any;

  for (const locus of lociKeys) {
    const sireAlleles = sireGenotype[locus];
    const damAlleles = damGenotype[locus];

    const combos: [any, any][] = [
      [sireAlleles[0], damAlleles[0]],
      [sireAlleles[0], damAlleles[1]],
      [sireAlleles[1], damAlleles[0]],
      [sireAlleles[1], damAlleles[1]],
    ];

    // Standardize allele order for consistency (e.g. ['E','e'] instead of ['e','E'])
    locusCombos[locus] = combos.map(pair => sortAllelePair(pair, locus));
  }

  // To avoid evaluating 4^11 combinations (which is 4,194,304), notice that loci sort independently!
  // We can calculate probability distributions for each locus independently, and then aggregate:
  // For loci that actually vary (not fixed homozygous in both parents):
  const locusDistributions: Record<keyof HorseGenotype, { genotype: [any, any]; prob: number }[]> = {} as any;

  for (const locus of lociKeys) {
    const combos = locusCombos[locus];
    const counts: Record<string, { genotype: [any, any]; count: number }> = {};

    for (const pair of combos) {
      const key = `${pair[0]}/${pair[1]}`;
      if (!counts[key]) {
        counts[key] = { genotype: pair, count: 0 };
      }
      counts[key].count += 1;
    }

    locusDistributions[locus] = Object.values(counts).map(item => ({
      genotype: item.genotype,
      prob: item.count / 4,
    }));
  }

  // Now perform a cartesian product of the active distributions
  // Notice: Only loci with >1 outcome will branch!
  let currentCombinations: { genotype: Partial<HorseGenotype>; prob: number }[] = [
    { genotype: {}, prob: 1.0 },
  ];

  for (const locus of lociKeys) {
    const dist = locusDistributions[locus];
    const nextCombos: { genotype: Partial<HorseGenotype>; prob: number }[] = [];

    for (const prev of currentCombinations) {
      for (const item of dist) {
        nextCombos.push({
          genotype: { ...prev.genotype, [locus]: item.genotype },
          prob: prev.prob * item.prob,
        });
      }
    }
    currentCombinations = nextCombos;
  }

  // Aggregate results by resolved phenotype name & key attributes
  const phenotypeMap: Record<
    string,
    {
      phenotype: HorsePhenotype;
      genotypes: HorseGenotype[];
      totalProb: number;
    }
  > = {};

  let lethalProb = 0;

  for (const combo of currentCombinations) {
    const fullGenotype = combo.genotype as HorseGenotype;
    const pheno = resolvePhenotype(fullGenotype);

    if (pheno.isLethalWhite) {
      lethalProb += combo.prob;
    }

    const key = `${pheno.name}__${pheno.eyeColor}__${pheno.hasTobiano}__${pheno.hasFrameOvero}__${pheno.isLethalWhite}`;

    if (!phenotypeMap[key]) {
      phenotypeMap[key] = {
        phenotype: pheno,
        genotypes: [],
        totalProb: 0,
      };
    }

    phenotypeMap[key].genotypes.push(fullGenotype);
    phenotypeMap[key].totalProb += combo.prob;
  }

  // Convert to sorted array
  const offspringList: OffspringProbability[] = Object.values(phenotypeMap)
    .map(entry => {
      const percentage = Math.round(entry.totalProb * 10000) / 100;
      return {
        phenotype: entry.phenotype,
        genotypes: entry.genotypes,
        probability: percentage,
        countRatio: formatRatio(entry.totalProb),
        explanation: buildInheritanceExplanation(entry.phenotype, sirePhenotype, damPhenotype),
      };
    })
    .filter(item => item.probability > 0)
    .sort((a, b) => {
      // Keep lethal white at top if present or sort by descending probability
      if (a.phenotype.isLethalWhite && !b.phenotype.isLethalWhite) return -1;
      if (!a.phenotype.isLethalWhite && b.phenotype.isLethalWhite) return 1;
      return b.probability - a.probability;
    });

  const lethalRisk = {
    hasRisk: lethalProb > 0,
    lethalProbability: Math.round(lethalProb * 10000) / 100,
    description:
      lethalProb > 0
        ? `Breeding two Frame Overo (O/o) carriers carries a ${(lethalProb * 100).toFixed(1)}% risk of Lethal White Overo Syndrome (O/O).`
        : 'No lethal gene combinations detected.',
  };

  return {
    sireGenotype,
    damGenotype,
    sirePhenotype,
    damPhenotype,
    offspring: offspringList,
    lethalRisk,
    totalCombinations: currentCombinations.length,
  };
}

/**
 * Standardize pair representation (dominant allele first)
 */
function sortAllelePair(pair: [string, string], locus: keyof HorseGenotype): [any, any] {
  const [a, b] = pair;
  const dominantFirst: Record<string, string> = {
    extension: 'E',
    agouti: 'A',
    cream: 'Cr',
    dun: 'D',
    silver: 'Z',
    champagne: 'Ch',
    grey: 'G',
    roan: 'Rn',
    tobiano: 'TO',
    frameOvero: 'O',
    flaxen: 'F',
  };

  const lead = dominantFirst[locus];
  if (b === lead && a !== lead) return [b, a];
  return [a, b];
}

function formatRatio(prob: number): string {
  // Approximate standard fraction
  const fractions = [
    { p: 1.0, f: '1/1' },
    { p: 0.75, f: '3/4' },
    { p: 0.6667, f: '2/3' },
    { p: 0.5, f: '1/2' },
    { p: 0.375, f: '3/8' },
    { p: 0.3333, f: '1/3' },
    { p: 0.25, f: '1/4' },
    { p: 0.1875, f: '3/16' },
    { p: 0.125, f: '1/8' },
    { p: 0.0625, f: '1/16' },
    { p: 0.03125, f: '1/32' },
  ];

  for (const { p, f } of fractions) {
    if (Math.abs(prob - p) < 0.009) return f;
  }
  return `${Math.round(prob * 100)}%`;
}

function buildInheritanceExplanation(
  offspring: HorsePhenotype,
  sire: HorsePhenotype,
  dam: HorsePhenotype
): string {
  if (offspring.isLethalWhite) {
    return 'Both parents contributed the Frame Overo (O) allele, resulting in homozygous O/O Lethal White Syndrome.';
  }

  const sireName = sire.name;
  const damName = dam.name;

  return `Inherits base coat and dilution factors from ${sireName} (Sire) and ${damName} (Dam), expressing as ${offspring.name}.`;
}

/**
 * Builds a 2x2 Punnett Square for a specific single locus.
 */
export function buildSingleLocusPunnett(
  locus: keyof HorseGenotype,
  sireAlleles: [string, string],
  damAlleles: [string, string]
): PunnettGrid {
  const locusNames: Record<keyof HorseGenotype, { name: string; symbol: string }> = {
    extension: { name: 'Extension Locus (Red/Black Base)', symbol: 'E/e' },
    agouti: { name: 'Agouti Locus (Point Restriction)', symbol: 'A/a' },
    cream: { name: 'Cream Dilution Locus', symbol: 'Cr/N' },
    dun: { name: 'Dun Locus & Primitive Markings', symbol: 'D/d' },
    silver: { name: 'Silver Dapple Locus', symbol: 'Z/z' },
    champagne: { name: 'Champagne Dilution Locus', symbol: 'Ch/ch' },
    grey: { name: 'Progressive Grey Locus', symbol: 'G/g' },
    roan: { name: 'Roan Pattern Locus', symbol: 'Rn/rn' },
    tobiano: { name: 'Tobiano Pinto Locus', symbol: 'TO/to' },
    frameOvero: { name: 'Frame Overo Locus', symbol: 'O/o' },
    flaxen: { name: 'Flaxen Mane & Tail Modifier', symbol: 'F/f' },
  };

  const info = locusNames[locus];

  const grid: PunnettCell[][] = [];
  const genotypeCounts: Record<string, number> = {};

  for (let s = 0; s < 2; s++) {
    const row: PunnettCell[] = [];
    for (let d = 0; d < 2; d++) {
      const sorted = sortAllelePair([sireAlleles[s], damAlleles[d]], locus);
      const code = `${sorted[0]}/${sorted[1]}`;
      genotypeCounts[code] = (genotypeCounts[code] || 0) + 1;

      let note = '';
      if (locus === 'extension') {
        note = code === 'e/e' ? 'Red pigment only (Chestnut)' : 'Can produce Black eumelanin';
      } else if (locus === 'agouti') {
        note = code === 'a/a' ? 'Uniform black (if E_)' : 'Black restricted to points (Bay)';
      } else if (locus === 'cream') {
        note = code === 'Cr/Cr' ? 'Double Dilute (Blue eyes)' : code === 'Cr/N' ? 'Single Dilute (Palomino/Buckskin)' : 'Non-dilute';
      } else if (locus === 'frameOvero') {
        note = code === 'O/O' ? '⚠️ Lethal White (Non-viable)' : code === 'O/o' ? 'Frame Overo Pattern' : 'Solid';
      } else {
        note = `Offspring allele combination: ${code}`;
      }

      row.push({
        sireAllele: sireAlleles[s],
        damAllele: damAlleles[d],
        offspringGenotype: code,
        phenotypeNote: note,
      });
    }
    grid.push(row);
  }

  const ratios = Object.entries(genotypeCounts).map(([genotype, count]) => {
    const percent = (count / 4) * 100;
    const ratioStr = count === 4 ? '4/4 (100%)' : count === 3 ? '3/4 (75%)' : count === 2 ? '2/4 (50%)' : '1/4 (25%)';
    return {
      genotype,
      ratio: ratioStr,
      percent,
      phenotypeImpact: getGenotypeImpactSummary(locus, genotype),
    };
  });

  return {
    locusName: info.name,
    symbol: info.symbol,
    sireGametes: [sireAlleles[0], sireAlleles[1]],
    damGametes: [damAlleles[0], damAlleles[1]],
    grid,
    ratios,
  };
}

function getGenotypeImpactSummary(locus: keyof HorseGenotype, genotype: string): string {
  switch (locus) {
    case 'extension':
      return genotype === 'e/e' ? 'Chestnut / Sorrel base' : 'Black-capable base (Bay or Black)';
    case 'agouti':
      return genotype === 'a/a' ? 'Non-agouti (Solid Black if E_)' : 'Agouti present (Bay if E_)';
    case 'cream':
      return genotype === 'Cr/Cr' ? 'Double dilute (Cremello/Perlino)' : genotype === 'Cr/N' ? 'Single dilute (Palomino/Buckskin)' : 'No cream dilution';
    case 'dun':
      return genotype.includes('D') ? 'Dun coat with dorsal stripe and zebra leg bars' : 'Non-dun';
    case 'silver':
      return genotype.includes('Z') ? 'Lightens black eumelanin to silver/flaxen' : 'Non-silver';
    case 'champagne':
      return genotype.includes('Ch') ? 'Champagne dilution with amber eyes' : 'Non-champagne';
    case 'grey':
      return genotype.includes('G') ? 'Progressively turns white with age' : 'Retains birth coat color';
    case 'roan':
      return genotype.includes('Rn') ? 'Roan body with solid head & points' : 'Non-roan';
    case 'tobiano':
      return genotype.includes('TO') ? 'Tobiano white pinto pattern' : 'Solid coat';
    case 'frameOvero':
      return genotype === 'O/O' ? '⚠️ Lethal White Syndrome' : genotype === 'O/o' ? 'Frame Overo pinto' : 'Solid';
    case 'flaxen':
      return genotype === 'f/f' ? 'Flaxen (blonde) mane & tail on chestnut' : 'Standard mane/tail color';
    default:
      return genotype;
  }
}
