# KTM: BEYOND THE RIDE
### A Cinematic, Scroll-Controlled 3D WebGL Automotive Experience

> **Production Launch Experience for the 2026 KTM 1390 Super Duke R & EVO**  
> Inspired by premium automotive advertising, futuristic industrial architecture, skunkworks engineering studios, and award-winning interactive 3D WebGL experiences.

---

## ⚡ Executive Summary

**KTM: BEYOND THE RIDE** is an immersive, scroll-controlled interactive automotive web application that transports visitors through a physical, connected architectural world:
1. **Scene 01 — The Hero Poster**: Full-screen industrial spotlight reveal of the 1390 Super Duke R in dark atmospheric smoke with real-time tachometer HUD and LC8 audio engine.
2. **Scene 02 — The Sanctuary of Speed (Showroom)**: Gliding forward through the architectural portal into the vast Mattighofen showroom featuring illuminated pedestals and authentic KTM fleet models.
3. **Scene 03 — Architectural Transition**: Acoustic glass partition traversal with dynamic reflection highlights and aerodynamic telemetry.
4. **Scene 04 — Aerodynamic Lab (Engineering Office)**: KTM aerodynamics team in discussion around blueprints and telemetry screens ("Optimize airflow right here"), transitioning into the prototype bay.
5. **Scene 05 — The Machine Revealed**: Macro tracking across front Brembo Stylema calipers, 320mm floating discs, WP Apex inverted cartridge forks, seamlessly transitioning into an interactive 3D WebGL model with X-Ray chassis toggle and colorway customizer.
6. **Scene 06 — The Final Brand Moment**: Dramatic three-quarter hero reveal in dark studio lighting with comprehensive technical specifications modal, VIP test ride booking, and 360° turntable orbit mode.

---

## 🛠️ Technology Architecture

- **Core Framework**: React 19 + TypeScript + Vite 8
- **3D & WebGL Engine**: Three.js (r186) + `@react-three/fiber` + `@react-three/drei`
- **Animation & Scroll Control**: Deterministic RequestAnimationFrame scroll scrubbing + GSAP ScrollTrigger
- **Soundscape**: Web Audio API KTM LC8 V-Twin Engine Synthesizer (75° offset dual-oscillator + sub-bass + resonant lowpass filter + throttle rev impulse)
- **Styling**: Vanilla CSS Design System with KTM Factory Racing tokens (`#ff6600`), typography (`Barlow Condensed`, `Space Grotesk`, `Outfit`), and glassmorphism telemetry cards.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v24.15.0 verified)
- **npm**: v9.0.0 or later

### Installation & Launch
```bash
# 1. Clone or navigate to the workspace
cd website

# 2. Start the local development server
npm run dev

# 3. Open in your browser
# URL: http://localhost:5173/
```

### Production Build
```bash
# Compile and bundle with Vite & Rolldown
npm run build

# Preview the production build locally
npm run preview
```

---

## 🎬 Cinematic Chapters & Storyline

| Chapter | Scene Title | Key Narrative & Visuals | Audio / Interactive Trigger |
| :--- | :--- | :--- | :--- |
| **01** | **The Hero Poster** | Dark industrial studio, orange rim lighting, split-LED predator headlight, smoke haze | Rev LC8 Engine / Hold to Rev 10k RPM |
| **02** | **The Showroom** | Architectural showroom runway, multiple podiums with authentic KTM fleet | Showroom fleet specs card |
| **03** | **Architectural Transition** | Pushing through dark acoustic glass partition, hexagonal overhead lights | Aerodynamics downforce telemetry |
| **04** | **Engineering Office** | Design team discussing CFD heatmaps ("Optimize airflow right here"), workshop prototype | Spoken engineering dialogue badge |
| **05** | **The Machine Revealed** | Macro tracking on Brembo Stylema calipers, WP Apex fork, 320mm discs, LC8 engine | 3D Model / X-Ray Chassis / Livery Picker |
| **06** | **The Final Brand Moment** | Complete motorcycle in dark studio spotlight, "ENGINEERED TO MOVE YOU" | 360° Orbit / Spec Sheet / VIP Test Ride |

---

## 🎨 Design System & Color Palette

- **KTM Racing Orange**: `#ff6600` (Core identity, shift lights, chassis accents)
- **Void Black**: `#050507` (Deep backdrop, studio floor)
- **Charcoal / Graphite**: `#121218` (Glass panels, cards, shadows)
- **Metallic White**: `#ffffff` (Condensed italic headlines, telemetry numbers)
- **Aero Cyan**: `#00ccff` (Downforce data, EVO suspension highlights)

---

## 📱 Responsiveness & Accessibility

- **Responsive Viewport**: Auto-scales on mobile, tablet, laptop, and ultra-wide displays.
- **Scroll Synchronization**: Works with desktop mousewheel, laptop trackpads, mobile touch gestures, and keyboard arrows.
- **Reduced Motion**: Respects `prefers-reduced-motion` media query by disabling intense ember particles and smoothing animations.
- **Audio Autoplay**: Audio starts muted adhering to browser autoplay policies; enabled via visible user toggle.

---

© 2026 KTM Sportmotorcycle GmbH. Built for "KTM: Beyond the Ride".
