import React from 'react';
import { CINEMATIC_CHAPTERS } from '../../data/chaptersData';

interface ChapterProgressBarProps {
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
}

export const ChapterProgressBar: React.FC<ChapterProgressBarProps> = ({
  activeChapterIndex,
  onSelectChapter,
}) => {
  return (
    <aside className="chapter-nav-tracker" aria-label="Chapter Navigation">
      {CINEMATIC_CHAPTERS.map((chap, idx) => {
        const isActive = activeChapterIndex === idx;

        return (
          <button
            key={chap.id}
            type="button"
            className={`chapter-nav-dot ${isActive ? 'active' : ''}`}
            onClick={() => onSelectChapter(idx)}
            aria-label={`Jump to chapter ${chap.number}: ${chap.title}`}
          >
            <span>{chap.number}</span>
            <span className="dot-circle" />
          </button>
        );
      })}
    </aside>
  );
};
