export interface ChapterItem {
  id: 'hero' | 'showroom' | 'transition' | 'office' | 'machine' | 'reveal';
  number: string;
  title: string;
  headline: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  videoDuration: number; // approximate duration in seconds
  telemetry: {
    rpm?: number;
    gear?: string;
    speed?: number;
    downforce?: string;
    airflow?: string;
    temp?: string;
    leanAngle?: number;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  callToAction?: {
    label: string;
    action: string;
  };
}

export const CINEMATIC_CHAPTERS: ChapterItem[] = [
  {
    id: 'hero',
    number: '01',
    title: 'THE HERO POSTER',
    headline: 'BEYOND THE RIDE.',
    subtitle: 'ENGINEERED TO CHALLENGE THE LIMITS.',
    description:
      'Forged in dark industrial silence. The silhouette of uncompromised hyper-naked performance stands poised beneath focused spotlights, shrouded in atmospheric haze.',
    videoSrc: '/videos/flow-01-hero-poster.mp4',
    posterSrc: '/images/flow-poster.jpg',
    videoDuration: 9.3,
    telemetry: {
      rpm: 1350,
      gear: 'N',
      speed: 0,
      temp: '82°C',
    },
    metrics: [
      { label: 'POWER', value: '190 PS' },
      { label: 'TORQUE', value: '145 NM' },
      { label: 'DISPLACEMENT', value: '1,350 CC' },
      { label: 'DRY WEIGHT', value: '168 KG' },
    ],
    callToAction: {
      label: 'SCROLL TO BEGIN',
      action: 'scroll-down',
    },
  },
  {
    id: 'showroom',
    number: '02',
    title: 'THE SHOWROOM',
    headline: 'SANCTUARY OF SPEED.',
    subtitle: 'FORGED IN MATTIGHOFEN. REVEALED IN SILENCE.',
    description:
      'Enter the cathedral of mechanical precision. A vast architectural showroom with polished concrete, structural monoliths, and illuminated display pedestals framing the championship lineage.',
    videoSrc: '/videos/flow-02-showroom-office.mp4',
    posterSrc: '/images/flow-showroom-1.jpg',
    videoDuration: 9.4,
    telemetry: {
      rpm: 2400,
      gear: '1',
      speed: 24,
      temp: '86°C',
    },
    metrics: [
      { label: 'CHASSIS', value: 'Chromoly Steel Trellis' },
      { label: 'SUBFRAME', value: 'Cast Aluminum' },
      { label: 'FRONT RAKE', value: '65.3°' },
      { label: 'TRAIL', value: '107 MM' },
    ],
  },
  {
    id: 'transition',
    number: '03',
    title: 'ARCHITECTURAL TRANSITION',
    headline: 'TRANSPARENT PRECISION.',
    subtitle: 'WHERE DESIGN MEETS ENGINEERING REALITY.',
    description:
      'Gliding through acoustic glass partitions into the skunkworks. Structural lines intersect with overhead ambient arrays as the boundary between showroom aesthetics and aerodynamics blurs.',
    videoSrc: '/videos/flow-02-showroom-office.mp4',
    posterSrc: '/images/flow-showroom-2.jpg',
    videoDuration: 9.4,
    telemetry: {
      rpm: 4200,
      gear: '2',
      speed: 48,
      temp: '89°C',
      downforce: '+4.2 kg @ 180 km/h',
    },
    metrics: [
      { label: 'AERODYNAMICS', value: 'Winglet Downforce' },
      { label: 'WIND TUNNEL', value: 'Mattighofen Aero Lab' },
      { label: 'DRAG COEFF', value: '0.31 Cd' },
      { label: 'STABILITY', value: 'High-Speed Yaw Damping' },
    ],
  },
  {
    id: 'office',
    number: '04',
    title: 'ENGINEERING OFFICE',
    headline: 'AERODYNAMIC DEVELOPMENT.',
    subtitle: 'OPTIMIZING AIRFLOW. PERFECTING DOWNFORCE.',
    description:
      'Inside the design atelier. Senior aerodynamicists examine CFD pressure heatmaps and scale clay prototypes. Real-time telemetry calculations dictate every intake scoop and fairing curvature.',
    videoSrc: '/videos/flow-03-office-workshop.mp4',
    posterSrc: '/images/flow-lounge.jpg',
    videoDuration: 9.4,
    telemetry: {
      rpm: 6500,
      gear: '3',
      speed: 110,
      temp: '92°C',
      downforce: '+8.6 kg @ 250 km/h',
      airflow: 'Mach 0.28 Simulation',
    },
    metrics: [
      { label: 'COMPUTATION', value: 'Supercomputing CFD' },
      { label: 'TELEMETRY', value: '6-Axis Bosch IMU' },
      { label: 'CAN-BUS', value: '500 kbps Stream' },
      { label: 'MODES', value: 'RAIN / STREET / SPORT / TRACK' },
    ],
  },
  {
    id: 'machine',
    number: '05',
    title: 'THE MACHINE REVEALED',
    headline: 'THE NAKED TRUTH.',
    subtitle: '1,350cc LC8 V-TWIN // WP SEMI-ACTIVE CHASSIS.',
    description:
      'Macro tracking across hand-machined billet aluminum, Brembo Stylema monobloc calipers, 320mm floating rotors, and the inverted 48mm WP APEX cartridge forks. Mechanical perfection stripped of disguise.',
    videoSrc: '/videos/flow-03-office-workshop.mp4',
    posterSrc: '/images/engine-detail.jpg',
    videoDuration: 9.4,
    telemetry: {
      rpm: 8800,
      gear: '4',
      speed: 175,
      temp: '94°C',
      leanAngle: 48.5,
    },
    metrics: [
      { label: 'ENGINE', value: '75° V-Twin DOHC' },
      { label: 'BRAKES', value: 'Dual 320mm Brembo Stylema' },
      { label: 'SUSPENSION', value: 'WP APEX Gen-3 SAT' },
      { label: 'EXHAUST', value: 'Akrapovič Titanium Link' },
    ],
    callToAction: {
      label: 'INSPECT 3D CHASSIS',
      action: 'open-3d',
    },
  },
  {
    id: 'reveal',
    number: '06',
    title: 'THE FINAL MOMENT',
    headline: 'ENGINEERED TO MOVE YOU.',
    subtitle: 'PERFORMANCE. PRECISION. PURPOSE.',
    description:
      'The complete machine stands immortalized in cinematic spotlight. Ready to dominate apexes and defy conventions. Experience the pinnacle of Austrian hyper-naked engineering.',
    videoSrc: '/videos/flow-04-final-reveal.mp4',
    posterSrc: '/images/hero-single-dark.jpg',
    videoDuration: 9.4,
    telemetry: {
      rpm: 10500,
      gear: '6',
      speed: 285,
      temp: '96°C',
      leanAngle: 54.0,
    },
    metrics: [
      { label: '0-100 KM/H', value: '2.8 SEC' },
      { label: 'TOP SPEED', value: '299+ KM/H' },
      { label: 'POWER-TO-WEIGHT', value: '1.13 HP/KG' },
      { label: 'STATUS', value: 'READY TO RACE' },
    ],
    callToAction: {
      label: 'EXPLORE THE MACHINE',
      action: 'explore-machine',
    },
  },
];
