export type ModelVariant = 'R' | 'EVO';

export type ColorwayId = 'signature-orange' | 'stealth-black' | 'evo-white' | string;

export interface Colorway {
  id: ColorwayId;
  name: string;
  tagline: string;
  mainColor: string;
  secondaryColor: string;
  rimColor: string;
  frameColor: string;
}

export type CameraViewName =
  | 'HeroFront'
  | 'HeroThreeQuarter'
  | 'SideProfile'
  | 'RearThreeQuarter'
  | 'EngineDetail'
  | 'SuspensionDetail'
  | 'CockpitDetail'
  | 'FullProduct'
  | 'FinalReveal';

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export interface HotspotItem {
  id: string;
  title: string;
  category: string;
  description: string;
  techSpec: string;
  position3D: [number, number, number];
  cameraView: CameraState;
  modelTarget?: 'R' | 'EVO' | 'BOTH';
}

export interface SpecificationItem {
  label: string;
  valueR: string;
  valueEVO: string;
  unit: string;
  description: string;
  verifiedSourceUrl: string;
}

export interface GearItem {
  id: string;
  title: string;
  price: string;
  category: 'APPAREL' | 'FOOTWEAR' | 'ACCESSORIES' | 'SPECIAL';
  image: string;
  tag: string;
  isHeroDrop?: boolean;
}

export interface AthleteItem {
  id: string;
  name: string;
  team: string;
  country: string;
  series: string;
  badge: string;
  image: string;
}
