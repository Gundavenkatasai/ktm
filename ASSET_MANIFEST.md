# KTM: BEYOND THE RIDE — ASSET & LICENSING MANIFEST

This document catalogues every reference video, image, 3D model, and audio asset integrated into the **KTM — BEYOND THE RIDE** production website.

---

## 1. Google Flow Cinematic Video Clips

All 4 video files supplied in the workspace were inspected frame-by-frame, catalogued, preserved in their original format, and mapped directly to the 6 cinematic website chapters.

| File Name (Standardized) | Original Source File | File Size | Duration | Resolution | Chapter Mapping | Content Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`flow-01-hero-poster.mp4`** | `Motorcycle_commercial_camera_take_20261015222729.mp4` | 5.07 MB | 9.3s | 1920×1080 | **Chapter 01 (Hero)** & **Chapter 02 (Transition)** | Opens on dark industrial studio spotlight on the KTM 1390 Super Duke R with smoke haze. Slow camera push forward, tracks past the right fairing/tail, and passes through doors into the showroom. |
| **`flow-02-showroom-office.mp4`** | `Motorcycle_commercial_video_gene…_20261015222738.mp4` | 5.65 MB | 9.4s | 1920×1080 | **Chapter 02 (Showroom)**, **Chapter 03 (Glass)**, **Chapter 04 (Office)** | Glides down the central showroom aisle between illuminated circular bike pedestals. Approaches structural glass wall, passes into the engineering office where aerodynamicists discuss airflow: *"We need to optimize the airflow, the airflow right here."* |
| **`flow-03-office-workshop.mp4`** | `Motorcycle_commercial_production…_20261015222743.mp4` | 5.59 MB | 9.4s | 1920×1080 | **Chapter 04 (Office/Bay)** & **Chapter 05 (Machine Macro)** | Transitions through design lounge into engineering room with CAD displays and scale models. Moves into prototype bay where an engineer inspects the bike, then executes an extreme macro track onto front wheel, Brembo caliper, WP fork, and drilled brake disc. |
| **`flow-04-final-reveal.mp4`** | `Motorcycle_commercial_production…_20261015222750.mp4` | 2.22 MB | 9.4s | 1920×1080 | **Chapter 06 (The Final Brand Moment)** | Sits poised in dark studio spotlight with subtle atmospheric smoke. Rim lighting outlines the orange fuel tank, chromoly trellis frame, and predator headlight for the closing hero shot. |

---

## 2. Reference Imagery & Loading Postcards

The AI-generated photographic references supplied in the workspace serve as video posters, loading fallbacks, and visual benchmarks for material shaders:

| File Name | Location | Dimensions | File Size | Usage & Role |
| :--- | :--- | :--- | :--- | :--- |
| **`poster.jpg` / `flow-poster.jpg`** | `public/images/` | 1920×1080 | 222 KB | Scene 01 Hero Poster backdrop & initial instant-render image before video buffer |
| **`showroom-1.jpg` / `flow-showroom-1.jpg`** | `public/images/` | 1920×1080 | 220 KB | Scene 02 Showroom wide aisle poster & fallback |
| **`showroom-2.jpg` / `flow-showroom-2.jpg`** | `public/images/` | 1920×1080 | 270 KB | Scene 03 Architectural Glass transition poster & fallback |
| **`lounge.jpg` / `flow-lounge.jpg`** | `public/images/` | 1920×1080 | 178 KB | Scene 04 Engineering VIP Lounge poster & fallback |
| **`engine-detail.jpg`** | `public/images/` | 1920×1080 | 815 KB | Scene 05 Macro mechanical engine detail card |
| **`headlight-cockpit.jpg`** | `public/images/` | 1920×1080 | 775 KB | TFT display & split-LED headlight detail card |
| **`hero-single-dark.jpg`** | `public/images/` | 1920×1080 | 694 KB | Scene 06 Studio hero poster fallback |

---

## 3. Real-Time 3D Assets

| Asset Name | Format | Size | Node Hierarchy | License | Role in Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`Motorcycle-Seperated.glb`** | Binary glTF (.glb) | 420 KB | `LightScreen`, `Tires`, `Aluminium`, `Rims`, `MainBody`, `SecondaryBody` | CC-BY 4.0 / Web-Optimized | Real-time interactive 3D WebGL model in Three.js/R3F. Supports 360° orbital drag, X-Ray chassis separation, real-time PBR material customization, and hotspot markers. |

---

## 4. Synthesized Audio Engine

- **Type**: Web Audio API Procedural Synthesizer (`KTMAutosound`)
- **Components**:
  - Primary cylinder: Sawtooth oscillator at 45 Hz (~1,350 RPM idle)
  - Secondary offset cylinder: Triangle oscillator at 90 Hz (75° V-Twin angle)
  - Sub-bass rumble: Sine wave at 30 Hz
  - Resonant Biquad Filter: Lowpass at 320 Hz, Q: 3.5, surging to 1,200 Hz on throttle rev
  - UI Audio: Synthesized haptic sine clicks on button hover and chapter transitions
- **Policy**: Autoplay starts muted, fully user-controlled via top navigation toggle.
