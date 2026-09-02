import React, { useState } from 'react';
import { HorsePhenotype } from '../types/genetics';

interface HorseSvgProps {
  phenotype: HorsePhenotype;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showLabels?: boolean;
  interactiveGreyStage?: boolean;
}

// Vector paths for the horse silhouette model
const HORSE_BODY_PATH =
  'M654.471,190.964C697.21,195.416 697.328,205.203 707.51,206.412C802.321,217.666 765.448,320.144 788.924,366.282C789.307,367.036 796.874,377.443 787.79,371.042C781.304,366.472 779.997,358.332 778.777,361.573C778.606,362.028 784.917,381.345 792.885,387.04C794.775,388.391 796.637,388.373 794.885,389.88C794.026,390.619 786.309,390.341 781.679,387.045C781.32,386.79 781.361,386.781 777.51,383.46C776.072,383.537 775.969,383.419 775.963,383.542C775.947,383.899 776.453,384.147 776.436,384.504C780.398,389.747 786.279,392.675 780.508,392.043C751.103,388.822 749.477,347.078 748.48,343.52C748.199,343.596 747.919,343.672 747.639,343.748C747.394,344.035 747.149,344.323 746.904,344.61C748.316,355.543 747.622,355.556 749.471,366.498C750.301,371.411 743.721,363.065 741.305,354.554C728.752,310.332 746.927,267.694 725.492,230.508C717.611,216.836 726.602,234.867 728.738,250.47C735.663,301.061 714.168,312.712 725.369,354.537C734.543,388.79 747.193,388.367 746.746,401.505C745.123,449.165 754.018,480.896 754.186,492.503C754.337,502.857 735.903,503.569 743.59,512.42C744.393,513.344 748.863,518.49 746.383,527.468C745.554,530.472 744.285,530.25 707.496,529.759C701.141,529.675 704.826,525.973 711.908,513.747C715.865,506.915 717.867,508.744 722.083,503.198C735.951,484.957 719.826,426.459 716.982,422.179C709.504,410.925 707.977,401.225 706.062,398.839C676.89,362.5 681.449,357.922 678.43,356.593C676.284,355.648 677.217,364.531 677.29,366.505C678.035,386.548 685.589,398.116 686.221,399.615C690.023,408.64 674.726,427.22 668.706,492.523C667.444,506.21 645.673,501.415 653.897,513.21C657.678,518.632 653.505,527.825 653.157,528.159C651.551,529.697 613.259,528.496 612.652,528.202C611.328,527.559 611.081,526.511 620.947,511.777C625.833,504.48 644.889,502.228 650.731,451.528C654.534,418.519 651.074,418.728 650.985,418.396C647.468,405.39 650.096,404.702 644.529,392.487C626.587,353.123 634.625,349.92 618.252,320.648C615.271,315.318 605.874,329.334 551.479,339.398C505.64,347.879 471.916,345.511 460.502,345.257C458.059,345.202 458.05,346.44 458.096,348.51C459.181,396.531 461.741,411.104 462.684,416.471C463.667,422.068 461.8,428.167 462.311,432.524C466.735,470.249 472.11,480.952 473.708,490.465C475.975,503.963 454.568,502.665 465.056,513.888C468.224,517.277 467.487,528.562 464.503,529.511C462.836,530.041 425.771,529.796 425.416,529.669C423.856,529.11 423.641,527.909 433.957,510.803C436.263,506.978 441.769,508.324 445.637,496.546C450.822,480.756 439.733,435.782 439.189,434.648C433.59,422.975 433.075,423.043 431.759,408.47C431.336,403.775 419.284,371.592 417.677,365.417C415.192,355.866 415.146,368.283 410.198,397.446C407.269,414.711 410.218,415.073 407.282,425.441C401.965,444.221 402.805,444.474 403.114,493.496C403.189,505.354 386.922,503.051 388.831,511.44C389.818,515.778 394.5,515.164 391.559,526.515C390.371,531.099 388.598,530.057 381.499,530.057C350.468,530.054 348.632,529.937 349.281,527.433C349.596,526.218 360.141,510.228 360.672,509.635C365.795,503.907 372.625,508.523 378.459,485.49C380.274,478.324 382.62,442.957 381.816,433.46C380.931,423.013 378.208,423.171 380.101,405.45C380.442,402.259 380.843,398.501 376.704,365.476C373.409,339.192 374.505,338.773 371.857,335.221C346.238,300.849 360.472,285.694 350.073,267.763C319.27,214.647 320.48,213.898 308.99,199.106C306.222,195.542 305.373,197.088 301.356,199.196C296.659,201.661 291.662,200.051 266.817,215.981C262.097,219.007 261.361,222.994 259.214,226.317C254.763,233.205 242.822,230.915 241.635,230.257C236.676,227.51 235.128,230.501 230.77,226.229C227.446,222.971 224.24,209.204 224.136,207.53C223.56,198.195 249.382,169.62 248.867,153.481C248.438,140.021 264.242,133.474 261.292,128.609C259.988,126.459 249.367,108.939 251.951,98.603C252.452,96.595 255.574,95.595 270.984,116.125C273.924,120.043 282.508,117.596 282.343,115.509C282.216,113.896 280.486,91.944 285.478,95.527C292.579,100.623 298.929,115.478 299.75,117.399C300.95,120.206 318.282,121.19 335.279,127.996C400.754,154.213 415.248,180.22 445.484,186.573C473.891,192.543 472.214,198.048 500.515,204.42C531.805,207.91 554.936,202.407 581.416,198.071C620.959,190.65 626.554,190.504 654.471,190.964Z';

const HORSE_FORELOCK_PATH =
  'M278,118C271,116 260,122 254,134C249,143 247,153 250,161C252,163 255,162 254,158C251,150 255,141 261,135C265,132 269,140 272,149C274,155 273,159 277,152C281,143 280,132 283,124C284,120 281,118 278,118Z';

const HORSE_MANE_PATH =
  'M290,124C298,112 312,111 322,119C327,123 330,130 336,125C346,116 362,120 372,132C378,139 384,141 394,136C408,130 424,140 434,153C440,161 447,165 457,160C470,154 482,166 488,182C492,193 488,202 480,209C474,205 468,199 462,193C454,185 447,191 440,199C436,193 432,185 426,179C418,171 410,175 404,185C398,178 392,171 384,167C374,161 366,167 360,178C354,169 347,161 338,157C327,151 318,157 312,168C306,158 300,149 294,139C290,133 287,128 290,124Z';

const HORSE_TAIL_PATH =
  'M708,206C728,202 755,212 774,235C790,255 794,290 793,335C792,375 790,415 787,455C784,480 777,502 766,515C761,520 754,521 750,512C754,495 758,470 756,445C754,432 746,444 740,458C734,472 727,484 722,478C725,460 730,435 728,410C726,380 731,348 729,315C726,275 719,245 712,225C709,218 707,212 708,206Z';

export const HorseSvg: React.FC<HorseSvgProps> = ({
  phenotype,
  className = '',
  size = 'responsive',
  showLabels = false,
  interactiveGreyStage = true,
}) => {
  // Grey stage: 0 = born coat, 1 = dapple grey, 2 = mature white/flea-bitten
  const [greyStage, setGreyStage] = useState<number>(phenotype.isGreyProgressive ? 1 : 0);

  // Compute actual visual colors according to grey stage
  let effectiveBody = phenotype.bodyColor;
  let effectiveSecondary = phenotype.bodySecondaryColor || phenotype.bodyColor;
  let effectivePoints = phenotype.pointsColor;
  let effectiveMane = phenotype.maneTailColor;
  let effectiveEyes = phenotype.eyeColor;

  if (phenotype.isGreyProgressive && greyStage > 0) {
    if (greyStage === 1) {
      // Dapple grey transition
      effectiveBody = '#8F9DAE';
      effectiveSecondary = '#CBD5E1';
      effectivePoints = '#475569';
      effectiveMane = '#CBD5E1';
    } else if (greyStage === 2) {
      // Mature flea-bitten / white grey
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

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Grey Stage Selector if horse carries Grey gene */}
      {phenotype.isGreyProgressive && interactiveGreyStage && (
        <div className="mb-2 flex items-center gap-1.5 px-3 py-1 bg-stone-100/90 rounded-full border border-stone-200 text-xs text-stone-700 shadow-xs">
          <span className="font-medium text-stone-500">Grey Stage:</span>
          <button
            type="button"
            onClick={() => setGreyStage(0)}
            className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${
              greyStage === 0 ? 'bg-stone-800 text-white' : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            Birth
          </button>
          <button
            type="button"
            onClick={() => setGreyStage(1)}
            className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${
              greyStage === 1 ? 'bg-stone-800 text-white' : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            Dapple (Age 4)
          </button>
          <button
            type="button"
            onClick={() => setGreyStage(2)}
            className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${
              greyStage === 2 ? 'bg-stone-800 text-white' : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            Mature (White)
          </button>
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

          {/* Dapple Ring Pattern for Dapple Grey */}
          <pattern id={`dapplePattern-${uniqueId}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="9" stroke="#E2E8F0" strokeWidth="2.8" fill="none" strokeOpacity="0.42" />
            <circle cx="3" cy="3" r="6" stroke="#CBD5E1" strokeWidth="2.2" fill="none" strokeOpacity="0.32" />
          </pattern>

          {/* Ground Soft Shadow */}
          <radialGradient id={`groundShadow-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#292524" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#292524" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#292524" stopOpacity="0" />
          </radialGradient>

          {/* Exact Silhouette Clip Path (for clamping patterns, points, and markings) */}
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

            {/* Clipped Overlays (Points, Patterns, Markings clamped strictly within body bounds) */}
            <g clipPath={`url(#bodyClip-${uniqueId})`}>
              {/* Lower-leg Points (Bay, Buckskin, Dun dark legs) */}
              {effectivePoints !== effectiveBody && !phenotype.isLethalWhite && (
                <rect x="300" y="380" width="460" height="160" fill={`url(#pointsGrad-${uniqueId})`} />
              )}

              {/* Natural Hooves (unless carrying white tobiano socks) */}
              <rect
                x="320"
                y="512"
                width="440"
                height="22"
                fill={phenotype.hasTobiano ? '#E2E8F0' : '#2A2522'}
                opacity={phenotype.hasTobiano ? 0.95 : 0.88}
              />

              {/* Roan Stippling (Intermingled white body hairs across torso) */}
              {phenotype.hasRoanBody && !phenotype.isLethalWhite && greyStage === 0 && (
                <rect x="360" y="160" width="370" height="260" fill={`url(#roanPattern-${uniqueId})`} />
              )}

              {/* Dapple Rings (Grey Stage 1) */}
              {phenotype.isGreyProgressive && greyStage === 1 && (
                <rect x="300" y="130" width="450" height="290" fill={`url(#dapplePattern-${uniqueId})`} />
              )}

              {/* Dun Primitive Markings: Bold Dorsal Stripe */}
              {phenotype.hasPrimitiveMarkings && !phenotype.isLethalWhite && (
                <g id="dun-markings">
                  {/* Dorsal line tracing crest to tail dock */}
                  <path
                    d="M440,186 C480,195 530,205 580,200 C630,193 680,193 710,206 C680,198 630,198 580,204 C530,208 480,199 440,189 Z"
                    fill={darkenHex(effectivePoints, 0.35)}
                    opacity="0.9"
                  />
                  {/* Subtle shoulder bar */}
                  <path
                    d="M380,250 C375,280 365,310 355,330 C358,332 368,310 384,275 C390,260 388,252 380,250 Z"
                    fill={darkenHex(effectivePoints, 0.3)}
                    opacity="0.5"
                  />
                </g>
              )}

              {/* Tobiano White Patches (Crossing topline at withers and flank, white legs) */}
              {phenotype.hasTobiano && !phenotype.isLethalWhite && (
                <g id="tobiano-patches">
                  {/* Flank and Croup patch crossing spine */}
                  <path
                    d="M510,190 C540,180 580,180 610,195 C625,230 650,270 620,310 C585,320 540,315 520,280 C500,245 495,220 510,190 Z"
                    fill="#FFFFFF"
                  />
                  {/* Withers and lower neck patch */}
                  <path
                    d="M410,140 C435,120 460,150 450,180 C430,190 405,175 400,155 Z"
                    fill="#FFFFFF"
                  />
                  {/* White stockings / lower legs */}
                  <rect x="340" y="440" width="130" height="90" fill="#FFFFFF" opacity="0.96" />
                  <rect x="610" y="430" width="150" height="100" fill="#FFFFFF" opacity="0.96" />
                </g>
              )}

              {/* Frame Overo White Patches (Jagged horizontal mid-body splashes) */}
              {phenotype.hasFrameOvero && !phenotype.isLethalWhite && (
                <g id="overo-patches">
                  <path
                    d="M520,225 C545,210 580,220 605,212 C620,226 650,224 658,245 C642,272 615,276 595,265 C568,276 540,265 528,250 Z"
                    fill="#FFFFFF"
                  />
                  {/* White face splash / bald face */}
                  <path
                    d="M240,130 C252,120 262,150 256,180 C245,200 230,190 234,155 Z"
                    fill="#FFFFFF"
                  />
                </g>
              )}
            </g>

            {/* Flowing Mane & Forelock */}
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

            {/* Flowing Tail */}
            <path
              id="horse-tail"
              d={HORSE_TAIL_PATH}
              fill={`url(#tailGrad-${uniqueId})`}
              className="transition-colors duration-300"
            />

            {/* Expressive Eye Profile */}
            <g id="horse-eye">
              {/* Eye socket / lid contour */}
              <ellipse cx="267" cy="146" rx="5.5" ry="4" fill="#18181B" opacity="0.5" />
              {/* Iris (Dynamic genetic eye color) */}
              <ellipse cx="267" cy="146" rx="3.8" ry="3" fill={effectiveEyes} />
              {/* Pupil */}
              <ellipse cx="267" cy="146" rx="2.2" ry="1.6" fill="#0A0A0B" />
              {/* Specular Catchlight */}
              <circle cx="268.5" cy="144.8" r="0.9" fill="#FFFFFF" opacity="0.95" />
            </g>
          </g>
        </g>
      </svg>

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
