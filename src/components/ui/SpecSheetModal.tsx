import React, { useState } from 'react';
import { X, ShieldCheck, ExternalLink } from 'lucide-react';
import { SPECIFICATIONS } from '../../data/ktmData';
import type { ModelVariant } from '../../types';

interface SpecSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModelVariant;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ENGINE' | 'CHASSIS' | 'ELECTRONICS'>('ALL');

  if (!isOpen) return null;

  return (
    <div className="ktm-modal-backdrop" onClick={onClose}>
      <div className="ktm-modal-card crosshair-corner" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(255, 102, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(18, 18, 24, 0.95)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="chapter-number-pill">OFFICIAL VERIFIED SPECS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600' }}>
                KTM 1390 SUPER DUKE {variant}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Barlow Condensed',
                fontSize: '2rem',
                fontStyle: 'italic',
                fontWeight: 900,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0.2rem 0 0 0',
              }}
            >
              TECHNICAL SPECIFICATIONS DIRECTORY
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '1rem 2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 10, 14, 0.8)',
          }}
        >
          {(['ALL', 'ENGINE', 'CHASSIS', 'ELECTRONICS'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#ff6600' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab ? '#000000' : '#d0d1dc',
                fontWeight: activeTab === tab ? 800 : 600,
                border: 'none',
                padding: '0.4rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Specs Table */}
        <div style={{ padding: '1.5rem 2rem', maxHeight: '55vh', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 102, 0, 0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ff6600' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>PARAMETER</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>1390 SUPER DUKE R</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>1390 SUPER DUKE R EVO</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>ENGINEERING NOTE</th>
              </tr>
            </thead>
            <tbody>
              {SPECIFICATIONS.map((spec, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#ffffff' }}>
                    {spec.label}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#ff6600', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {spec.valueR} {spec.unit}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#00ccff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {spec.valueEVO} {spec.unit}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#888899', fontSize: '0.8rem' }}>
                    {spec.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1rem 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(10, 10, 14, 0.95)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666677', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={14} color="#00ff66" />
            <span>AUTHENTIC MATTIGHOFEN FACTORY SPECIFICATION DATA</span>
          </div>

          <a
            href="https://www.ktm.com/en-int/models/naked-bike/ktm-1390-super-duker2024.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#ff6600',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            OFFICIAL KTM PORTAL <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
