export interface ShowroomBike {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: 'HYPER-NAKED' | 'SUPERSPORT' | 'TRAVEL' | 'FACTORY RALLY';
  displacement: string;
  power: string;
  torque: string;
  weight: string;
  chassis: string;
  colorway: {
    mainColor: string;
    secondaryColor: string;
    rimColor: string;
  };
  podiumPosition: [number, number, number];
  rotationY: number;
}

export const SHOWROOM_BIKES: ShowroomBike[] = [
  {
    id: '1390-r',
    name: 'KTM 1390 SUPER DUKE R',
    subtitle: 'THE BEAST // APEX FLAGSHIP',
    tagline: '190 PS LC8 75° V-Twin with manual WP APEX 48mm split-cartridge suspension',
    category: 'HYPER-NAKED',
    displacement: '1,350 cc',
    power: '190 PS',
    torque: '145 Nm',
    weight: '200.5 kg',
    chassis: 'Chromium-Molybdenum Trellis',
    colorway: {
      mainColor: '#ff6600',
      secondaryColor: '#1a1a20',
      rimColor: '#ff6600',
    },
    podiumPosition: [-2.7, 0, -8],
    rotationY: Math.PI / 4,
  },
  {
    id: '1390-evo',
    name: 'KTM 1390 SUPER DUKE R EVO',
    subtitle: 'SEMI-ACTIVE ELECTRONIC BEAST',
    tagline: 'Generation 2 WP Semi-Active SAT suspension with magnetic solenoid valves and Anti-Dive',
    category: 'HYPER-NAKED',
    displacement: '1,350 cc',
    power: '190 PS',
    torque: '145 Nm',
    weight: '200.5 kg',
    chassis: 'Semi-Active ChroMo Trellis',
    colorway: {
      mainColor: '#ebebee',
      secondaryColor: '#ff6600',
      rimColor: '#ff6600',
    },
    podiumPosition: [2.7, 0, -8],
    rotationY: -Math.PI / 4,
  },
  {
    id: '990-duke',
    name: 'KTM 990 DUKE',
    subtitle: 'THE SNIPER',
    tagline: 'All-new LC8c parallel-twin engine with aggressive predator lightweight styling',
    category: 'HYPER-NAKED',
    displacement: '947 cc',
    power: '123 PS',
    torque: '103 Nm',
    weight: '179 kg',
    chassis: 'Steel Trellis + Cast Swingarm',
    colorway: {
      mainColor: '#ff6600',
      secondaryColor: '#121216',
      rimColor: '#1a1a20',
    },
    podiumPosition: [-2.7, 0, -4],
    rotationY: Math.PI / 4,
  },
  {
    id: '890-duke-r',
    name: 'KTM 890 DUKE R',
    subtitle: 'THE SUPER SCALPEL',
    tagline: 'Brembo Stylema calipers, fully adjustable WP APEX, and razor-sharp steering geometry',
    category: 'HYPER-NAKED',
    displacement: '889 cc',
    power: '121 PS',
    torque: '99 Nm',
    weight: '166 kg',
    chassis: 'Tubular Space Frame',
    colorway: {
      mainColor: '#ff5500',
      secondaryColor: '#30303c',
      rimColor: '#ff5500',
    },
    podiumPosition: [2.7, 0, -4],
    rotationY: -Math.PI / 4,
  },
  {
    id: '790-duke',
    name: 'KTM 790 DUKE',
    subtitle: 'THE ORIGINAL SCALPEL',
    tagline: 'The pure, light, and agile mid-weight twin built for precision street domination',
    category: 'HYPER-NAKED',
    displacement: '799 cc',
    power: '105 PS',
    torque: '87 Nm',
    weight: '174 kg',
    chassis: 'ChroMo Steel Frame',
    colorway: {
      mainColor: '#1f2026',
      secondaryColor: '#ff6600',
      rimColor: '#ff6600',
    },
    podiumPosition: [-2.7, 0, 0],
    rotationY: Math.PI / 4,
  },
  {
    id: '390-duke',
    name: 'KTM 390 DUKE',
    subtitle: 'THE CORNER ROCKET',
    tagline: 'State-of-the-art single-cylinder with launch control, cornering ABS, and 5" TFT',
    category: 'HYPER-NAKED',
    displacement: '399 cc',
    power: '45 PS',
    torque: '39 Nm',
    weight: '165 kg',
    chassis: 'Split Trellis + Curved Swingarm',
    colorway: {
      mainColor: '#ff6600',
      secondaryColor: '#1c1c24',
      rimColor: '#ff6600',
    },
    podiumPosition: [2.7, 0, 0],
    rotationY: -Math.PI / 4,
  },
  {
    id: '1290-adventure-r',
    name: 'KTM 1290 SUPER ADVENTURE R',
    subtitle: 'TRAVEL ENDURO TITAN',
    tagline: '21-inch front spoke wheel, WP XPLOR suspension, and cross-continental V-Twin power',
    category: 'TRAVEL',
    displacement: '1,301 cc',
    power: '160 PS',
    torque: '138 Nm',
    weight: '221 kg',
    chassis: 'Laser-Cut ChroMo Steel',
    colorway: {
      mainColor: '#ffffff',
      secondaryColor: '#ff6600',
      rimColor: '#181820',
    },
    podiumPosition: [-2.7, 0, 4],
    rotationY: Math.PI / 4,
  },
  {
    id: 'rc-8c',
    name: 'KTM RC 8C TRACK EDITION',
    subtitle: 'MOTO2 TRACK WEAPON',
    tagline: 'Hand-built dedicated racing machine with carbon Kevlar fairings and Dymag forged wheels',
    category: 'SUPERSPORT',
    displacement: '889 cc',
    power: '128 PS',
    torque: '101 Nm',
    weight: '142 kg',
    chassis: 'Handmade 25CrMo4 Steel Trellis',
    colorway: {
      mainColor: '#111116',
      secondaryColor: '#ff6600',
      rimColor: '#ff6600',
    },
    podiumPosition: [2.7, 0, 4],
    rotationY: -Math.PI / 4,
  },
  {
    id: 'rc-390',
    name: 'KTM RC 390',
    subtitle: 'GRAND PRIX SUPERSPORT',
    tagline: 'Moto3-inspired aerodynamic bodywork, clip-on bars, and ByBre radial braking',
    category: 'SUPERSPORT',
    displacement: '373 cc',
    power: '44 PS',
    torque: '37 Nm',
    weight: '155 kg',
    chassis: 'Ultra-Lightweight Trellis',
    colorway: {
      mainColor: '#ff5500',
      secondaryColor: '#0a0a0f',
      rimColor: '#ff5500',
    },
    podiumPosition: [-2.7, 0, 8],
    rotationY: Math.PI / 4,
  },
  {
    id: '450-rally',
    name: 'KTM 450 RALLY REPLICA',
    subtitle: 'DAKAR RALLY DOMINATOR',
    tagline: 'The exact factory machine developed by Red Bull KTM to win the grueling Dakar Rally',
    category: 'FACTORY RALLY',
    displacement: '449 cc',
    power: '60+ PS',
    torque: '50+ Nm',
    weight: '139 kg',
    chassis: 'Competition Trellis with Akrapovic',
    colorway: {
      mainColor: '#ffffff',
      secondaryColor: '#141418',
      rimColor: '#ff6600',
    },
    podiumPosition: [2.7, 0, 8],
    rotationY: -Math.PI / 4,
  },
];
