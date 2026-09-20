import React, { useState } from 'react';
import { HorsePhenotype, FacialMarking, LegMarking, ManeStyle, AppaloosaPattern } from '../types/genetics';

interface HorseSvgProps {
  phenotype: HorsePhenotype;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showLabels?: boolean;
  interactiveGreyStage?: boolean;
  currentGreyStage?: number;
  onGreyStageChange?: (stage: number) => void;
  // Direct overrides or customization
  facialMarking?: FacialMarking;
  frontLegMarking?: LegMarking;
  hindLegMarking?: LegMarking;
  maneStyle?: ManeStyle;
  appaloosaPattern?: AppaloosaPattern;
  showCustomizerControls?: boolean;
}

// Vector paths for the horse silhouette model
const HORSE_BODY_PATH =
  'M654.471,190.964C697.21,195.416 697.328,205.203 707.51,206.412C802.321,217.666 765.448,320.144 788.924,366.282C789.307,367.036 796.874,377.443 787.79,371.042C781.304,366.472 779.997,358.332 778.777,361.573C778.606,362.028 784.917,381.345 792.885,387.04C794.775,388.391 796.637,388.373 794.885,389.88C794.026,390.619 786.309,390.341 781.679,387.045C781.32,386.79 781.361,386.781 777.51,383.46C776.072,383.537 775.969,383.419 775.963,383.542C775.947,383.899 776.453,384.147 776.436,384.504C780.398,389.747 786.279,392.675 780.508,392.043C751.103,388.822 749.477,347.078 748.48,343.52C748.199,343.596 747.919,343.672 747.639,343.748C747.394,344.035 747.149,344.323 746.904,344.61C748.316,355.543 747.622,355.556 749.471,366.498C750.301,371.411 743.721,363.065 741.305,354.554C728.752,310.332 746.927,267.694 725.492,230.508C717.611,216.836 726.602,234.867 728.738,250.47C735.663,301.061 714.168,312.712 725.369,354.537C734.543,388.79 747.193,388.367 746.746,401.505C745.123,449.165 754.018,480.896 754.186,492.503C754.337,502.857 735.903,503.569 743.59,512.42C744.393,513.344 748.863,518.49 746.383,527.468C745.554,530.472 744.285,530.25 707.496,529.759C701.141,529.675 704.826,525.973 711.908,513.747C715.865,506.915 717.867,508.744 722.083,503.198C735.951,484.957 719.826,426.459 716.982,422.179C709.504,410.925 707.977,401.225 706.062,398.839C676.89,362.5 681.449,357.922 678.43,356.593C676.284,355.648 677.217,364.531 677.29,366.505C678.035,386.548 685.589,398.116 686.221,399.615C690.023,408.64 674.726,427.22 668.706,492.523C667.444,506.21 645.673,501.415 653.897,513.21C657.678,518.632 653.505,527.825 653.157,528.159C651.551,529.697 613.259,528.496 612.652,528.202C611.328,527.559 611.081,526.511 620.947,511.777C625.833,504.48 644.889,502.228 650.731,451.528C654.534,418.519 651.074,418.728 650.985,418.396C647.468,405.39 650.096,404.702 644.529,392.487C626.587,353.123 634.625,349.92 618.252,320.648C615.271,315.318 605.874,329.334 551.479,339.398C505.64,347.879 471.916,345.511 460.502,345.257C458.059,345.202 458.05,346.44 458.096,348.51C459.181,396.531 461.741,411.104 462.684,416.471C463.667,422.068 461.8,428.167 462.311,432.524C466.735,470.249 472.11,480.952 473.708,490.465C475.975,503.963 454.568,502.665 465.056,513.888C468.224,517.277 467.487,528.562 464.503,529.511C462.836,530.041 425.771,529.796 425.416,529.669C423.856,529.11 423.641,527.909 433.957,510.803C436.263,506.978 441.769,508.324 445.637,496.546C450.822,480.756 439.733,435.782 439.189,434.648C433.59,422.975 433.075,423.043 431.759,408.47C431.336,403.775 419.284,371.592 417.677,365.417C415.192,355.866 415.146,368.283 410.198,397.446C407.269,414.711 410.218,415.073 407.282,425.441C401.965,444.221 402.805,444.474 403.114,493.496C403.189,505.354 386.922,503.051 388.831,511.44C389.818,515.778 394.5,515.164 391.559,526.515C390.371,531.099 388.598,530.057 381.499,530.057C350.468,530.054 348.632,529.937 349.281,527.433C349.596,526.218 360.141,510.228 360.672,509.635C365.795,503.907 372.625,508.523 378.459,485.49C380.274,478.324 382.62,442.957 381.816,433.46C380.931,423.013 378.208,423.171 380.101,405.45C380.442,402.259 380.843,398.501 376.704,365.476C373.409,339.192 374.505,338.773 371.857,335.221C346.238,300.849 360.472,285.694 350.073,267.763C319.27,214.647 320.48,213.898 308.99,199.106C306.222,195.542 305.373,197.088 301.356,199.196C296.659,201.661 291.662,200.051 266.817,215.981C262.097,219.007 261.361,222.994 259.214,226.317C254.763,233.205 242.822,230.915 241.635,230.257C236.676,227.51 235.128,230.501 230.77,226.229C227.446,222.971 224.24,209.204 224.136,207.53C223.56,198.195 249.382,169.62 248.867,153.481C248.438,140.021 264.242,133.474 261.292,128.609C259.988,126.459 249.367,108.939 251.951,98.603C252.452,96.595 255.574,95.595 270.984,116.125C273.924,120.043 282.508,117.596 282.343,115.509C282.216,113.896 280.486,91.944 285.478,95.527C292.579,100.623 298.929,115.478 299.75,117.399C300.95,120.206 318.282,121.19 335.279,127.996C400.754,154.213 415.248,180.22 445.484,186.573C473.891,192.543 472.214,198.048 500.515,204.42C531.805,207.91 554.936,202.407 581.416,198.071C620.959,190.65 626.554,190.504 654.471,190.964Z';

// Flowing (Baroque / Wild) Mane & Tail
const HORSE_FORELOCK_PATH =
  'M278,118C271,116 260,122 254,134C249,143 247,153 250,161C252,163 255,162 254,158C251,150 255,141 261,135C265,132 269,140 272,149C274,155 273,159 277,152C281,143 280,132 283,124C284,120 281,118 278,118Z';

const HORSE_MANE_PATH =
  'M290,124C298,112 312,111 322,119C327,123 330,130 336,125C346,116 362,120 372,132C378,139 384,141 394,136C408,130 424,140 434,153C440,161 447,165 457,160C470,154 482,166 488,182C492,193 488,202 480,209C474,205 468,199 462,193C454,185 447,191 440,199C436,193 432,185 426,179C418,171 410,175 404,185C398,178 392,171 384,167C374,161 366,167 360,178C354,169 347,161 338,157C327,151 318,157 312,168C306,158 300,149 294,139C290,133 287,128 290,124Z';

const HORSE_TAIL_PATH =
  'M708,206C728,202 755,212 774,235C790,255 794,290 793,335C792,375 790,415 787,455C784,480 777,502 766,515C761,520 754,521 750,512C754,495 758,470 756,445C754,432 746,444 740,458C734,472 727,484 722,478C725,460 730,435 728,410C726,380 731,348 729,315C726,275 719,245 712,225C709,218 707,212 708,206Z';

// Sport (Hunter / Pulled) Mane & Tail
const SPORT_MANE_PATH =
  'M288,118 C302,112 315,116 328,124 C342,126 355,128 370,136 C385,142 398,145 412,154 C426,160 440,165 454,174 C464,180 472,184 478,190 C474,194 466,190 458,184 C442,174 426,168 410,158 C394,150 380,146 366,138 C352,132 338,128 324,122 C312,118 300,116 288,118 Z';

const SPORT_TAIL_PATH =
  'M708,206 C722,203 740,210 752,226 C764,244 766,275 765,320 C764,360 762,395 760,425 L732,425 C735,395 738,360 738,320 C738,280 732,250 724,232 C716,218 710,212 708,206 Z';

// Roached (Hogged / Standing Crest) Mane
const ROACHED_MANE_PATH =
  'M286,116 C305,106 332,108 362,118 C398,130 435,150 472,174 C470,180 462,180 456,176 C425,155 390,136 358,126 C330,118 306,117 286,122 Z';

export const HorseSvg: React.FC<HorseSvgProps> = ({
  phenotype,
  className = '',
  size = 'responsive',
  showLabels = false,
  interactiveGreyStage = true,
  currentGreyStage,
  onGreyStageChange,
  facialMarking,
  frontLegMarking,
  hindLegMarking,
  maneStyle,
  appaloosaPattern,
  showCustomizerControls = false,
}) => {
  // Effective markings & styles
  const [localFacial, setLocalFacial] = useState<FacialMarking>(facialMarking || phenotype.facialMarking || 'none');
  const [localFrontLeg, setLocalFrontLeg] = useState<LegMarking>(frontLegMarking || phenotype.frontLegMarking || 'none');
  const [localHindLeg, setLocalHindLeg] = useState<LegMarking>(hindLegMarking || phenotype.hindLegMarking || 'none');
  const [localManeStyle, setLocalManeStyle] = useState<ManeStyle>(maneStyle || phenotype.maneStyle || 'flowing');
  const [localAppaloosa, setLocalAppaloosa] = useState<AppaloosaPattern>(appaloosaPattern || phenotype.appaloosaPattern || 'none');

  // Sync if props change
  const activeFacial = facialMarking || phenotype.facialMarking || localFacial;
  const activeFrontLeg = frontLegMarking || phenotype.frontLegMarking || localFrontLeg;
  const activeHindLeg = hindLegMarking || phenotype.hindLegMarking || localHindLeg;
  const activeManeStyle = maneStyle || phenotype.maneStyle || localManeStyle;
  const activeAppaloosa = appaloosaPattern || phenotype.appaloosaPattern || localAppaloosa;

  // Progressive Grey stages:
  // 0 = Born / Foal coat (100% base pigment)
  // 1 = Steel / Early Grey (~3 yrs)
  // 2 = Dapple Grey (~7 yrs)
  // 3 = Flea-bitten / Snow White (~12+ yrs)
  const [internalGreyStage, setInternalGreyStage] = useState<number>(phenotype.isGreyProgressive ? 2 : 0);
  const activeGreyStage = currentGreyStage !== undefined ? currentGreyStage : internalGreyStage;

  const handleSetGreyStage = (st: number) => {
    setInternalGreyStage(st);
    if (onGreyStageChange) {
      onGreyStageChange(st);
    }
  };

  // Compute actual visual colors according to grey stage
  let effectiveBody = phenotype.bodyColor;
  let effectiveSecondary = phenotype.bodySecondaryColor || phenotype.bodyColor;
  let effectivePoints = phenotype.pointsColor;
  let effectiveMane = phenotype.maneTailColor;
  let effectiveEyes = phenotype.eyeColor;

  if (phenotype.isGreyProgressive && activeGreyStage > 0) {
    if (activeGreyStage === 1) {
      // Steel Grey / Early Grizzled (~3-4 yrs)
      effectiveBody = mixHex(phenotype.bodyColor, '#64748B', 0.55);
      effectiveSecondary = mixHex(effectiveSecondary, '#94A3B8', 0.45);
      effectivePoints = mixHex(effectivePoints, '#334155', 0.35);
      effectiveMane = mixHex(effectiveMane, '#94A3B8', 0.45);
    } else if (activeGreyStage === 2) {
      // Dapple Grey (~6-8 yrs)
      effectiveBody = '#8F9DAE';
      effectiveSecondary = '#CBD5E1';
      effectivePoints = '#475569';
      effectiveMane = '#CBD5E1';
    } else if (activeGreyStage === 3) {
      // Mature Snow White / Flea-bitten (~12+ yrs)
      effectiveBody = '#F8FAFC';
      effectiveSecondary = '#FFFFFF';
      effectivePoints = '#E2E8F0';
      effectiveMane = '#FFFFFF';
    }
  }

  // Lethal white override
  if (phenotype.isLethalWhite) {
    effectiveBody = '#FFFFFF';
    effectiveSecondary = '#F8FAFC';
    effectivePoints = '#FFFFFF';
    effectiveMane = '#FFFFFF';
    effectiveEyes = '#93C5FD';
  }

  // Hoof colors: White leg markings cause unpigmented light horn hooves (#E5DDCB)
  const hasFrontWhite = activeFrontLeg !== 'none' || phenotype.hasTobiano || phenotype.hasSplashWhite;
  const hasHindWhite = activeHindLeg !== 'none' || phenotype.hasTobiano || phenotype.hasSplashWhite;
  const frontHoofColor = hasFrontWhite ? '#E5DDCB' : '#2A2522';
  const hindHoofColor = hasHindWhite ? '#E5DDCB' : '#2A2522';

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Progressive Greying Timeline Scrubber (When Grey G_ is present) */}
      {phenotype.isGreyProgressive && interactiveGreyStage && (
        <div className="mb-3 w-full max-w-md bg-stone-100/90 rounded-md border border-stone-200 p-2 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-stone-500 mb-1.5 px-1">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
              Progressive Greying (G Locus)
            </span>
            <span>
              {activeGreyStage === 0 && 'Birth (Foal Coat)'}
              {activeGreyStage === 1 && 'Steel Grey (~3 Yrs)'}
              {activeGreyStage === 2 && 'Dapple Grey (~7 Yrs)'}
              {activeGreyStage === 3 && 'Flea-Bitten / Snow (12+ Yrs)'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {[
              { stage: 0, label: '0y: Birth', desc: 'Base Coat' },
              { stage: 1, label: '3y: Steel', desc: 'Grizzled' },
              { stage: 2, label: '7y: Dapple', desc: 'Dapple Rings' },
              { stage: 3, label: '12y+: Flea', desc: 'Snow White' },
            ].map(item => {
              const isSelected = activeGreyStage === item.stage;
              return (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => handleSetGreyStage(item.stage)}
                  className={`py-1 px-1.5 rounded text-center transition-all ${
                    isSelected
                      ? 'bg-stone-800 text-white font-bold shadow-2xs'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  <div className="text-[11px] font-semibold leading-tight">{item.label}</div>
                  <div className="text-[9px] opacity-75 font-serif italic hidden sm:block">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Primary Vector Horse Model */}
      <svg
        viewBox="0 0 858 653"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size === 'sm' ? '180px' : size === 'md' ? '280px' : '420px' }}
      >
        <defs>
          {/* Main Body Anatomical Gradient */}
          <linearGradient id={`bodyGrad-${uniqueId}`} x1="300" y1="120" x2="650" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={effectiveSecondary} />
            <stop offset="55%" stopColor={effectiveBody} />
            <stop offset="100%" stopColor={darkenHex(effectiveBody, 0.14)} />
          </linearGradient>

          {/* Mane Gradient */}
          <linearGradient id={`maneGrad-${uniqueId}`} x1="280" y1="95" x2="460" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={lightenHex(effectiveMane, 0.16)} />
            <stop offset="100%" stopColor={effectiveMane} />
          </linearGradient>

          {/* Tail Gradient */}
          <linearGradient id={`tailGrad-${uniqueId}`} x1="710" y1="205" x2="780" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={lightenHex(effectiveMane, 0.14)} />
            <stop offset="60%" stopColor={effectiveMane} />
            <stop offset="100%" stopColor={darkenHex(effectiveMane, 0.18)} />
          </linearGradient>

          {/* Leg Points Gradient (fading from knees/hocks to dark cannons) */}
          <linearGradient id={`pointsGrad-${uniqueId}`} x1="0" y1="390" x2="0" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={effectivePoints} stopOpacity="0" />
            <stop offset="45%" stopColor={effectivePoints} stopOpacity="0.85" />
            <stop offset="100%" stopColor={effectivePoints} stopOpacity="1" />
          </linearGradient>

          {/* Roan Stipple Pattern */}
          <pattern id={`roanPattern-${uniqueId}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="#FFFFFF" fillOpacity="0.5" />
            <circle cx="10" cy="5" r="1.7" fill="#FFFFFF" fillOpacity="0.42" />
            <circle cx="6" cy="11" r="1.3" fill="#FFFFFF" fillOpacity="0.45" />
            <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" fillOpacity="0.38" />
          </pattern>

          {/* Dapple Ring Pattern for Dapple Grey (Stage 2) */}
          <pattern id={`dapplePattern-${uniqueId}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="9" stroke="#E2E8F0" strokeWidth="2.8" fill="none" strokeOpacity="0.45" />
            <circle cx="3" cy="3" r="6" stroke="#CBD5E1" strokeWidth="2.2" fill="none" strokeOpacity="0.35" />
          </pattern>

          {/* Flea-bitten Freckling Pattern (Stage 3 Mature Grey) */}
          <pattern id={`fleabittenPattern-${uniqueId}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="5" r="1.0" fill="#78350F" fillOpacity="0.7" />
            <circle cx="12" cy="3" r="0.8" fill="#451A03" fillOpacity="0.6" />
            <circle cx="16" cy="14" r="0.9" fill="#78350F" fillOpacity="0.65" />
            <circle cx="7" cy="16" r="0.7" fill="#27272A" fillOpacity="0.55" />
          </pattern>

          {/* Appaloosa Leopard Spots Pattern */}
          <pattern id={`appaloosaPattern-${uniqueId}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <ellipse cx="6" cy="7" rx="3.5" ry="2.6" fill={effectivePoints} fillOpacity="0.85" transform="rotate(-15 6 7)" />
            <ellipse cx="20" cy="9" rx="2.8" ry="3.8" fill={darkenHex(effectiveBody, 0.25)} fillOpacity="0.78" transform="rotate(25 20 9)" />
            <circle cx="14" cy="21" r="2.3" fill={effectivePoints} fillOpacity="0.8" />
            <circle cx="2" cy="24" r="1.5" fill={darkenHex(effectiveBody, 0.25)} fillOpacity="0.6" />
            <circle cx="26" cy="25" r="1.8" fill={effectivePoints} fillOpacity="0.7" />
          </pattern>

          {/* Appaloosa Vertically Striped Hooves Pattern */}
          <pattern id={`stripedHoofPattern-${uniqueId}`} width="6" height="24" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="3" height="24" fill="#4B3F34" />
            <rect x="3" y="0" width="3" height="24" fill="#DFD2BF" />
          </pattern>

          {/* Ground Soft Shadow */}
          <radialGradient id={`groundShadow-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#292524" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#292524" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#292524" stopOpacity="0" />
          </radialGradient>

          {/* Exact Silhouette Clip Path (Clamping all patterns and white markings strictly inside horse outline) */}
          <clipPath id={`bodyClip-${uniqueId}`}>
            <path d={HORSE_BODY_PATH} />
          </clipPath>
        </defs>

        {/* Realistic Ground Contact Shadow under hooves */}
        <ellipse cx="445" cy="638" rx="340" ry="14" fill={`url(#groundShadow-${uniqueId})`} />

        {/* Master Scaled & Positioned Horse Container */}
        <g id="horse-group" transform="matrix(1,0,0,1,-336.190316,-142.698672)">
          <g transform="matrix(1.5,0,0,1.5,0,0)">
            {/* Base Horse Body Silhouette */}
            <path
              id="horse-body"
              d={HORSE_BODY_PATH}
              fill={`url(#bodyGrad-${uniqueId})`}
              className="transition-colors duration-300"
            />

            {/* Clipped Overlays (Clamped strictly within body bounds) */}
            <g clipPath={`url(#bodyClip-${uniqueId})`}>
              {/* Lower-leg Points (Bay, Buckskin, Dun dark legs) */}
              {effectivePoints !== effectiveBody && !phenotype.isLethalWhite && (
                <rect x="300" y="380" width="460" height="160" fill={`url(#pointsGrad-${uniqueId})`} />
              )}

              {/* Natural Hooves - Separated into Front and Hind with genetic horn coloring */}
              {/* Hind Hooves */}
              <rect
                x="605"
                y="512"
                width="155"
                height="22"
                fill={activeAppaloosa !== 'none' ? `url(#stripedHoofPattern-${uniqueId})` : hindHoofColor}
                opacity={0.94}
              />
              {/* Front Hooves */}
              <rect
                x="340"
                y="512"
                width="135"
                height="22"
                fill={activeAppaloosa !== 'none' ? `url(#stripedHoofPattern-${uniqueId})` : frontHoofColor}
                opacity={0.94}
              />

              {/* Roan Stippling (Intermingled white body hairs across torso) */}
              {phenotype.hasRoanBody && !phenotype.isLethalWhite && activeGreyStage === 0 && (
                <rect x="360" y="160" width="370" height="260" fill={`url(#roanPattern-${uniqueId})`} />
              )}

              {/* Dapple Rings (Progressive Grey Stage 2) */}
              {phenotype.isGreyProgressive && activeGreyStage === 2 && (
                <rect x="300" y="130" width="450" height="290" fill={`url(#dapplePattern-${uniqueId})`} />
              )}

              {/* Flea-bitten Russet Freckles (Progressive Grey Stage 3) */}
              {phenotype.isGreyProgressive && activeGreyStage === 3 && (
                <rect x="230" y="100" width="540" height="340" fill={`url(#fleabittenPattern-${uniqueId})`} />
              )}

              {/* Dun Primitive Markings: Bold Dorsal Stripe & Shoulder Bar */}
              {phenotype.hasPrimitiveMarkings && !phenotype.isLethalWhite && (
                <g id="dun-markings">
                  <path
                    d="M440,186 C480,195 530,205 580,200 C630,193 680,193 710,206 C680,198 630,198 580,204 C530,208 480,199 440,189 Z"
                    fill={darkenHex(effectivePoints, 0.35)}
                    opacity="0.9"
                  />
                  <path
                    d="M380,250 C375,280 365,310 355,330 C358,332 368,310 384,275 C390,260 388,252 380,250 Z"
                    fill={darkenHex(effectivePoints, 0.3)}
                    opacity="0.5"
                  />
                </g>
              )}

              {/* Appaloosa / Leopard Complex Markings */}
              {activeAppaloosa !== 'none' && !phenotype.isLethalWhite && (
                <g id="appaloosa-markings">
                  {activeAppaloosa === 'blanket' && (
                    <>
                      {/* White croup/rump blanket */}
                      <path
                        d="M510,195 C560,186 630,190 675,210 C705,248 708,285 680,335 C635,355 565,345 525,305 C500,265 500,225 510,195 Z"
                        fill="#FFFFFF"
                        opacity="0.94"
                      />
                      {/* Spotted roan stipples on blanket */}
                      <rect x="510" y="190" width="180" height="150" fill={`url(#appaloosaPattern-${uniqueId})`} />
                    </>
                  )}
                  {activeAppaloosa === 'leopard' && (
                    <>
                      {/* All-over leopard coat */}
                      <path
                        d="M360,180 C440,170 540,180 660,195 C705,240 705,300 665,350 C580,370 460,360 380,320 C340,280 340,230 360,180 Z"
                        fill="#FFFFFF"
                        opacity="0.92"
                      />
                      <rect x="350" y="160" width="350" height="200" fill={`url(#appaloosaPattern-${uniqueId})`} />
                    </>
                  )}
                  {activeAppaloosa === 'fewspot' && (
                    <path
                      d="M480,185 C550,178 630,185 680,205 C710,250 710,295 675,345 C625,365 545,355 500,315 C475,270 470,220 480,185 Z"
                      fill="#FFFFFF"
                      opacity="0.96"
                    />
                  )}
                  {activeAppaloosa === 'snowflake' && (
                    <g id="snowflake-markings">
                      <circle cx="530" cy="230" r="3.5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="560" cy="215" r="4.5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="590" cy="240" r="4" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="620" cy="225" r="5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="640" cy="260" r="3.5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="580" cy="275" r="4" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="550" cy="285" r="3" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="610" cy="295" r="4" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="650" cy="290" r="3.5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="670" cy="250" r="4" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="510" cy="260" r="2.5" fill="#FFFFFF" opacity="0.94" />
                      <circle cx="480" cy="245" r="3" fill="#FFFFFF" opacity="0.9" />
                      <circle cx="535" cy="305" r="2.5" fill="#FFFFFF" opacity="0.9" />
                      <circle cx="630" cy="315" r="3" fill="#FFFFFF" opacity="0.9" />
                    </g>
                  )}
                  {/* Appaloosa Mottled Pinkish Muzzle Skin */}
                  <g id="appaloosa-mottled-muzzle" opacity="0.75">
                    <circle cx="218" cy="204" r="3" fill="#F4B8B0" />
                    <circle cx="223" cy="207" r="2.5" fill="#3D261C" />
                    <circle cx="215" cy="209" r="2.2" fill="#F4B8B0" />
                    <circle cx="220" cy="213" r="2.8" fill="#F4B8B0" />
                    <circle cx="226" cy="211" r="2.4" fill="#3D261C" />
                  </g>
                </g>
              )}

              {/* Tobiano White Patches */}
              {phenotype.hasTobiano && !phenotype.isLethalWhite && (
                <g id="tobiano-patches">
                  <path
                    d="M510,190 C540,180 580,180 610,195 C625,230 650,270 620,310 C585,320 540,315 520,280 C500,245 495,220 510,190 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M410,140 C435,120 460,150 450,180 C430,190 405,175 400,155 Z"
                    fill="#FFFFFF"
                  />
                  <rect x="340" y="440" width="130" height="90" fill="#FFFFFF" opacity="0.96" />
                  <rect x="610" y="430" width="150" height="100" fill="#FFFFFF" opacity="0.96" />
                </g>
              )}

              {/* Frame Overo White Patches */}
              {phenotype.hasFrameOvero && !phenotype.isLethalWhite && (
                <g id="overo-patches">
                  <path
                    d="M520,225 C545,210 580,220 605,212 C620,226 650,224 658,245 C642,272 615,276 595,265 C568,276 540,265 528,250 Z"
                    fill="#FFFFFF"
                  />
                </g>
              )}

              {/* Splash White (High stockings & Crisp white belly) */}
              {phenotype.hasSplashWhite && !phenotype.isLethalWhite && (
                <g id="splash-white-markings">
                  <path
                    d="M440,310 C480,300 540,302 580,312 C570,350 450,350 440,310 Z"
                    fill="#FFFFFF"
                  />
                  <rect x="330" y="420" width="150" height="110" fill="#FFFFFF" />
                  <rect x="600" y="420" width="160" height="110" fill="#FFFFFF" />
                </g>
              )}

              {/* Leg Markings (Front & Hind) */}
              {/* Front Leg Markings */}
              {activeFrontLeg !== 'none' && !phenotype.hasTobiano && !phenotype.isLethalWhite && (
                <g id="front-leg-marking">
                  {activeFrontLeg === 'coronet' && (
                    <rect x="335" y="504" width="145" height="12" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeFrontLeg === 'pastern' && (
                    <rect x="335" y="490" width="145" height="26" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeFrontLeg === 'sock' && (
                    <rect x="335" y="458" width="145" height="58" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeFrontLeg === 'stocking' && (
                    <rect x="335" y="415" width="145" height="101" fill="#FFFFFF" opacity="0.96" />
                  )}
                </g>
              )}

              {/* Hind Leg Markings */}
              {activeHindLeg !== 'none' && !phenotype.hasTobiano && !phenotype.isLethalWhite && (
                <g id="hind-leg-marking">
                  {activeHindLeg === 'coronet' && (
                    <rect x="605" y="504" width="160" height="12" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeHindLeg === 'pastern' && (
                    <rect x="605" y="490" width="160" height="26" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeHindLeg === 'sock' && (
                    <rect x="605" y="458" width="160" height="58" fill="#FFFFFF" opacity="0.96" />
                  )}
                  {activeHindLeg === 'stocking' && (
                    <rect x="605" y="415" width="160" height="101" fill="#FFFFFF" opacity="0.96" />
                  )}
                </g>
              )}

              {/* Facial Markings (Star, Strip, Blaze, Snip, Bald Face) */}
              {activeFacial !== 'none' && !phenotype.isLethalWhite && (
                <g id="facial-marking">
                  {activeFacial === 'star' && (
                    <polygon points="268,138 272,144 268,150 264,144" fill="#FFFFFF" />
                  )}
                  {activeFacial === 'strip' && (
                    <path d="M256,150 Q246,175 238,196 L234,195 Q243,174 253,150 Z" fill="#FFFFFF" />
                  )}
                  {activeFacial === 'star-strip' && (
                    <>
                      <polygon points="268,136 272,143 268,150 264,143" fill="#FFFFFF" />
                      <path d="M268,148 Q252,175 238,198 L234,196 Q249,174 266,148 Z" fill="#FFFFFF" />
                    </>
                  )}
                  {activeFacial === 'blaze' && (
                    <>
                      <path
                        d="M266,134 Q275,142 271,152 Q262,174 248,198 Q240,208 232,210 Q228,204 234,194 Q246,168 256,146 Q260,136 266,134 Z"
                        fill="#FFFFFF"
                      />
                      {/* Pink skin shading at muzzle */}
                      <ellipse cx="230" cy="208" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.4" />
                    </>
                  )}
                  {activeFacial === 'snip' && (
                    <>
                      <ellipse cx="230" cy="208" rx="4.5" ry="3" fill="#FFFFFF" />
                      <ellipse cx="230" cy="208" rx="3" ry="2" fill="#FCA5A5" opacity="0.35" />
                    </>
                  )}
                  {activeFacial === 'bald' && (
                    <>
                      <path
                        d="M272,130 Q278,145 272,162 Q262,190 248,212 Q236,226 224,222 Q220,210 225,196 Q238,165 252,142 Q262,130 272,130 Z"
                        fill="#FFFFFF"
                      />
                      <ellipse cx="228" cy="212" rx="7" ry="4.5" fill="#FCA5A5" opacity="0.45" />
                    </>
                  )}
                </g>
              )}
            </g>

            {/* Mane & Forelock (According to activeManeStyle) */}
            {activeManeStyle === 'flowing' && (
              <>
                <path
                  id="horse-forelock"
                  d={HORSE_FORELOCK_PATH}
                  fill={`url(#maneGrad-${uniqueId})`}
                  className="transition-colors duration-300"
                />
                <path
                  id="horse-mane"
                  d={HORSE_MANE_PATH}
                  fill={`url(#maneGrad-${uniqueId})`}
                  className="transition-colors duration-300"
                />
              </>
            )}

            {activeManeStyle === 'sport' && (
              <>
                <path
                  id="horse-forelock-sport"
                  d="M275,119 C270,118 262,123 258,131 C254,138 255,145 258,142 C262,137 266,131 272,126 Z"
                  fill={`url(#maneGrad-${uniqueId})`}
                />
                <path
                  id="horse-mane-sport"
                  d={SPORT_MANE_PATH}
                  fill={`url(#maneGrad-${uniqueId})`}
                  className="transition-colors duration-300"
                />
              </>
            )}

            {activeManeStyle === 'roached' && (
              <path
                id="horse-mane-roached"
                d={ROACHED_MANE_PATH}
                fill={`url(#maneGrad-${uniqueId})`}
                className="transition-colors duration-300"
              />
            )}

            {/* Tail (Flowing vs Sport) */}
            {activeManeStyle === 'sport' ? (
              <path
                id="horse-tail-sport"
                d={SPORT_TAIL_PATH}
                fill={`url(#tailGrad-${uniqueId})`}
                className="transition-colors duration-300"
              />
            ) : (
              <path
                id="horse-tail"
                d={HORSE_TAIL_PATH}
                fill={`url(#tailGrad-${uniqueId})`}
                className="transition-colors duration-300"
              />
            )}

            {/* Expressive Eye Profile */}
            <g id="horse-eye">
              {activeAppaloosa !== 'none' && (
                <ellipse cx="267" cy="146" rx="6.5" ry="4.8" fill="#FFFFFF" opacity="0.9" />
              )}
              <ellipse cx="267" cy="146" rx="5.5" ry="4" fill="#18181B" opacity="0.5" />
              <ellipse cx="267" cy="146" rx="3.8" ry="3" fill={effectiveEyes} />
              <ellipse cx="267" cy="146" rx="2.2" ry="1.6" fill="#0A0A0B" />
              <circle cx="268.5" cy="144.8" r="0.9" fill="#FFFFFF" opacity="0.95" />
            </g>
          </g>
        </g>
      </svg>

      {/* Optional In-Place Anatomy & Markings Customizer */}
      {showCustomizerControls && (
        <div className="mt-3 w-full p-3 bg-stone-50 rounded-xs border border-stone-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-stone-500 tracking-wider">
            <span>Anatomical Customizer</span>
            <span>Live Phenotype Overlays</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Face Marking */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Face Marking</label>
              <select
                value={activeFacial}
                onChange={e => setLocalFacial(e.target.value as FacialMarking)}
                className="w-full text-xs py-1 px-1.5 bg-white border border-stone-300 rounded font-sans"
              >
                <option value="none">None (Plain)</option>
                <option value="star">Star</option>
                <option value="strip">Strip</option>
                <option value="star-strip">Star & Strip</option>
                <option value="blaze">Blaze</option>
                <option value="snip">Snip</option>
                <option value="bald">Bald Face</option>
              </select>
            </div>

            {/* Front Leg */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Front Leg White</label>
              <select
                value={activeFrontLeg}
                onChange={e => setLocalFrontLeg(e.target.value as LegMarking)}
                className="w-full text-xs py-1 px-1.5 bg-white border border-stone-300 rounded font-sans"
              >
                <option value="none">None (Dark Hoof)</option>
                <option value="coronet">Coronet Band</option>
                <option value="pastern">Pastern</option>
                <option value="sock">Sock</option>
                <option value="stocking">Stocking</option>
              </select>
            </div>

            {/* Hind Leg */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Hind Leg White</label>
              <select
                value={activeHindLeg}
                onChange={e => setLocalHindLeg(e.target.value as LegMarking)}
                className="w-full text-xs py-1 px-1.5 bg-white border border-stone-300 rounded font-sans"
              >
                <option value="none">None (Dark Hoof)</option>
                <option value="coronet">Coronet Band</option>
                <option value="pastern">Pastern</option>
                <option value="sock">Sock</option>
                <option value="stocking">Stocking</option>
              </select>
            </div>

            {/* Mane Style */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Mane & Tail Style</label>
              <select
                value={activeManeStyle}
                onChange={e => setLocalManeStyle(e.target.value as ManeStyle)}
                className="w-full text-xs py-1 px-1.5 bg-white border border-stone-300 rounded font-sans"
              >
                <option value="flowing">Flowing Baroque</option>
                <option value="sport">Sport / Hunter Pulled</option>
                <option value="roached">Roached Arch Crest</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Optional labels or color swatch pills */}
      {showLabels && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-stone-200 text-xs shadow-2xs">
            <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: effectiveBody }} />
            <span className="text-stone-700 font-medium">Body</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-stone-200 text-xs shadow-2xs">
            <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: effectivePoints }} />
            <span className="text-stone-700 font-medium">Points</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-stone-200 text-xs shadow-2xs">
            <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: effectiveMane }} />
            <span className="text-stone-700 font-medium">Mane & Tail</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-stone-200 text-xs shadow-2xs">
            <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: effectiveEyes }} />
            <span className="text-stone-700 font-medium">Eyes</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility helpers for SVG color manipulation
function lightenHex(hex: string, percent: number): string {
  if (!hex.startsWith('#')) return hex;
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) + Math.round(255 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * percent);
  let b = (num & 0x0000ff) + Math.round(255 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function darkenHex(hex: string, percent: number): string {
  if (!hex.startsWith('#')) return hex;
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) - Math.round(255 * percent);
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * percent);
  let b = (num & 0x0000ff) - Math.round(255 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function mixHex(hex1: string, hex2: string, weight: number): string {
  if (!hex1.startsWith('#') || !hex2.startsWith('#')) return hex1;
  const c1 = parseInt(hex1.replace('#', ''), 16);
  const c2 = parseInt(hex2.replace('#', ''), 16);

  const r1 = c1 >> 16;
  const g1 = (c1 >> 8) & 0x00ff;
  const b1 = c1 & 0x0000ff;

  const r2 = c2 >> 16;
  const g2 = (c2 >> 8) & 0x00ff;
  const b2 = c2 & 0x0000ff;

  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
