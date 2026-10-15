import { useState } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { GEAR_DROPS } from '../../data/ktmData';
import type { GearItem } from '../../types';
import { soundSystem } from '../../utils/audioSystem';
import { CinematicReveal } from './CinematicReveal';

interface NewDropsSectionProps {
  onAddToCart?: (item: GearItem) => void;
}

export const NewDropsSection = ({ onAddToCart }: NewDropsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = ['ALL', 'APPAREL', 'FOOTWEAR', 'ACCESSORIES'];

  const filteredDrops = activeCategory === 'ALL'
    ? GEAR_DROPS
    : GEAR_DROPS.filter((item) => item.category === activeCategory || (activeCategory === 'APPAREL' && item.category === 'SPECIAL'));

  const handleAdd = (item: GearItem) => {
    soundSystem.playHapticClick(750, 0.05);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    onAddToCart?.(item);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section
      id="shop"
      style={{
        padding: '7rem 2rem 5rem 2rem',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Section Header */}
      <CinematicReveal threshold={0.08}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#ff6600',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ width: '8px', height: '8px', background: '#ff6600', display: 'inline-block' }} />
            // NEW DROPS
          </div>
          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            RACING GEAR <span style={{ color: '#ff6600' }}>COLLECTION</span>
          </h2>
        </div>

        <p
          style={{
            maxWidth: '480px',
            fontSize: '0.85rem',
            color: '#8e8e9e',
            lineHeight: 1.5,
          }}
        >
          Redefining ultimate street-and-track performance apparel. Built for extreme lean angles, aerodynamic efficiency, and maximum abrasion resistance.
        </p>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: '2px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(500, 0.03);
                setActiveCategory(cat);
              }}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'Space Grotesk, monospace',
                letterSpacing: '0.08em',
                background: activeCategory === cat ? '#ff6600' : 'transparent',
                color: activeCategory === cat ? '#000000' : '#888899',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      </CinematicReveal>

      {/* 8-Card Product Grid */}
      <CinematicReveal delay={1} threshold={0.05}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
        {filteredDrops.map((item) => {
          const isAdded = !!addedItems[item.id];

          return (
            <div
              key={item.id}
              className="glass-panel crosshair-corner"
              style={{
                background: item.isHeroDrop
                  ? 'radial-gradient(circle at 50% 50%, rgba(255, 102, 0, 0.25) 0%, rgba(15, 15, 20, 0.95) 80%)'
                  : 'rgba(12, 12, 16, 0.85)',
                border: item.isHeroDrop
                  ? '1px solid #ff6600'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Top Tag & Category */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.7rem',
                  fontFamily: 'Space Grotesk, monospace',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    color: item.isHeroDrop ? '#ff6600' : '#888899',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.tag}
                </span>
                {item.isHeroDrop && (
                  <span
                    style={{
                      background: '#ff6600',
                      color: '#000000',
                      padding: '2px 6px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                    }}
                  >
                    FEATURED
                  </span>
                )}
              </div>

              {/* Product Visual Container */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  background: 'rgba(5, 5, 8, 0.6)',
                  marginBottom: '1rem',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {item.isHeroDrop && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, transparent 40%, rgba(255, 102, 0, 0.3) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>

              {/* Product Title & Pricing */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div
                    className="font-racing"
                    style={{
                      fontSize: '1.25rem',
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Space Grotesk, monospace',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: item.isHeroDrop ? '#ff6600' : '#e0e0ea',
                    }}
                  >
                    {item.price}
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  onClick={() => handleAdd(item)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    background: isAdded
                      ? '#22c55e'
                      : item.isHeroDrop
                      ? '#ff6600'
                      : 'rgba(255, 255, 255, 0.06)',
                    color: isAdded || item.isHeroDrop ? '#000000' : '#ffffff',
                    border: item.isHeroDrop ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    fontFamily: 'Space Grotesk, monospace',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isAdded ? (
                    <>
                      <Check size={14} /> ADDED TO CART
                    </>
                  ) : item.isHeroDrop ? (
                    <>
                      <Sparkles size={14} /> PRE-ORDER DROP
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> ADD TO CART
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </CinematicReveal>
    </section>
  );
};
