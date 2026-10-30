import { useEffect, useState } from 'react';
import palettes from '../utils/palettes';

const PalettePicker = () => {
  const [palette, setPalette] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.portfolioPalette = palette;
  }, [palette]);

  return (
    <div className={`palette-picker${isOpen ? ' is-open' : ''}`}>
      {isOpen && (
        <div className="palette-options" role="group" aria-label="Color palette">
          {palettes.map((item) => (
            <button
              key={item.id}
              type="button"
              title={`${item.label} palette`}
              aria-label={`${item.label} color palette`}
              aria-pressed={palette === item.id}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setPalette(item.id);
                setIsOpen(false);
              }}
              className={palette === item.id ? 'is-selected' : ''}
            >
              <span style={{ background: `linear-gradient(135deg, ${item.accent} 55%, ${item.warm} 55%)` }} />
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="palette-toggle"
        aria-label={isOpen ? 'Close color palette' : 'Open color palette'}
        aria-expanded={isOpen}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className="palette-toggle-swatch"
          style={{ background: `linear-gradient(135deg, ${palettes[0].accent} 55%, ${palettes[0].warm} 55%)` }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default PalettePicker;
