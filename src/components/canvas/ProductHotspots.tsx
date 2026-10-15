import React from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS } from '../../data/ktmData';
import type { HotspotItem } from '../../types';
import { soundSystem } from '../../utils/audioSystem';

interface ProductHotspotsProps {
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem | null) => void;
  visible?: boolean;
}

export const ProductHotspots: React.FC<ProductHotspotsProps> = ({
  activeHotspot,
  onSelectHotspot,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <group>
      {HOTSPOTS.map((hotspot) => {
        const isActive = activeHotspot?.id === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position3D}>
            <Html
              center
              distanceFactor={6}
              style={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'auto',
              }}
            >
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    soundSystem.playHapticClick(700, 0.06);
                    if (isActive) {
                      onSelectHotspot(null);
                    } else {
                      onSelectHotspot(hotspot);
                    }
                  }}
                  title={hotspot.title}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isActive ? '#ff6600' : 'rgba(10, 10, 14, 0.85)',
                    border: '2px solid #ff6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isActive
                      ? '0 0 25px rgba(255, 102, 0, 0.9)'
                      : '0 0 12px rgba(255, 102, 0, 0.45)',
                    transition: 'all 0.25s ease',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  }}
                  className="hotspot-point"
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isActive ? '#ffffff' : '#ff6600',
                    }}
                  />
                </button>

                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '42px',
                      width: '280px',
                      background: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(255, 102, 0, 0.5)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 102, 0, 0.2)',
                      padding: '14px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff',
                      zIndex: 100,
                      pointerEvents: 'auto',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#ff6600',
                        fontWeight: 700,
                        fontFamily: 'Space Grotesk, monospace',
                        marginBottom: '4px',
                      }}
                    >
                      {hotspot.category}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '6px',
                        lineHeight: 1.25,
                      }}
                    >
                      {hotspot.title}
                    </div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#a0a0b0',
                        lineHeight: 1.45,
                        marginBottom: '8px',
                      }}
                    >
                      {hotspot.description}
                    </p>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#ff8833',
                        background: 'rgba(255, 102, 0, 0.08)',
                        padding: '4px 6px',
                        borderLeft: '2px solid #ff6600',
                        fontFamily: 'Space Grotesk, monospace',
                      }}
                    >
                      {hotspot.techSpec}
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
