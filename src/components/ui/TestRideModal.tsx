import React, { useState } from 'react';
import { X, CheckCircle, User, Mail, Phone } from 'lucide-react';
import type { ModelVariant } from '../../types';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModelVariant;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Vienna Flagship Centre');
  const [experience, setExperience] = useState('Advanced (5+ years / Track)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="ktm-modal-backdrop" onClick={onClose}>
      <div className="ktm-modal-card crosshair-corner" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
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
            <span className="chapter-number-pill">EXCLUSIVE VIP ACCESS</span>
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
              BOOK A TEST RIDE — KTM 1390 {variant}
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
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle size={56} color="#ff6600" style={{ margin: '0 auto 1.5rem auto' }} />
              <h3
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '2rem',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                TEST RIDE PRIORITY RESERVED
              </h3>
              <p style={{ color: '#aaaabb', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                Your request for the <strong>2026 KTM 1390 Super Duke {variant}</strong> at {city} has been received. Our Factory Specialist will contact you within 24 hours to confirm track/road telemetry setup.
              </p>
              <div
                style={{
                  background: 'rgba(255, 102, 0, 0.08)',
                  border: '1px solid rgba(255, 102, 0, 0.3)',
                  padding: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#ff6600',
                  marginBottom: '1.5rem',
                }}
              >
                PASSCODE: #KTM-BEYOND-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-ktm-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                RETURN TO EXPERIENCE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600', marginBottom: '0.4rem' }}>
                  FULL NAME
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#888899" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Weber"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.8rem 1rem 0.8rem 2.5rem',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-display)',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600', marginBottom: '0.4rem' }}>
                    EMAIL ADDRESS
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#888899" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rider@ktm.com"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.8rem 1rem 0.8rem 2.5rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-display)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600', marginBottom: '0.4rem' }}>
                    PHONE NUMBER
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#888899" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+43 7742 6000"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.8rem 1rem 0.8rem 2.5rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-display)',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600', marginBottom: '0.4rem' }}>
                    PREFERRED KTM CENTRE
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.8rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Mattighofen Factory Headquarters">Mattighofen Factory HQ (Austria)</option>
                    <option value="Vienna Flagship Centre">Vienna Flagship Centre</option>
                    <option value="Munich Performance Centre">Munich Performance Centre</option>
                    <option value="London West End KTM">London West End KTM</option>
                    <option value="Los Angeles Experience Centre">Los Angeles Experience Centre</option>
                    <option value="Sydney Racing Hub">Sydney Racing Hub</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff6600', marginBottom: '0.4rem' }}>
                    RIDING EXPERIENCE
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.8rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Advanced (5+ years / Track)">Advanced (5+ yrs / Track)</option>
                    <option value="Intermediate (2-5 years)">Intermediate (2-5 yrs)</option>
                    <option value="Licensed Enthusiast (1-2 years)">Licensed Enthusiast (1-2 yrs)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-ktm-primary"
                style={{ marginTop: '0.8rem', padding: '0.9rem 2rem', width: '100%' }}
              >
                CONFIRM VIP TEST RIDE RESERVATION
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
