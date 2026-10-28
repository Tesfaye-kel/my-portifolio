import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const palettes = [
  { id: 'red', label: 'Red', accent: '#ff4d5e', warm: '#ff9a76' },
  { id: 'green', label: 'Green', accent: '#5dffa8', warm: '#ffb454' },
  { id: 'pink', label: 'Pink', accent: '#ff5c9a', warm: '#8be9fd' },
  { id: 'purple', label: 'Purple', accent: '#8b5cf6', warm: '#c4b5fd' },
  { id: 'orange', label: 'Orange', accent: '#ff6b2c', warm: '#ffd2a6' },
  { id: 'gold', label: 'Gold', accent: '#f5c542', warm: '#f0e6c8' },
  { id: 'cyan', label: 'Cyan', accent: '#22e1ff', warm: '#b6ff6b' },
  { id: 'blue', label: 'Blue', accent: '#4da3ff', warm: '#ffd166' },
  { id: 'brown', label: 'Brown', accent: '#c58a55', warm: '#f0c18a' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Tesfaye-kel', icon: <Github aria-hidden="true" size={22} /> },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin aria-hidden="true" size={22} /> },
  { name: 'X', url: 'https://x.com/tesftesfish', icon: <Twitter aria-hidden="true" size={22} /> },
  { name: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61558584585875', icon: <Facebook aria-hidden="true" size={22} /> },
];

const Hero = () => {
  const { data } = usePortfolio();
  const { profile } = data;
  const [palette, setPalette] = useState('red');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [command, setCommand] = useState('');
  const [terminalLines, setTerminalLines] = useState([]);
  const nextTerminalLineId = useRef(0);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    document.documentElement.dataset.portfolioPalette = palette;
  }, [palette]);

  useEffect(() => {
    document.querySelectorAll('.terminal-output').forEach((output) => {
      if (output.getClientRects().length > 0) output.scrollTop = output.scrollHeight;
    });
  }, [terminalLines]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      const home = document.getElementById('home');
      const bounds = home?.getBoundingClientRect();
      if (!bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      const visibleInput = [...document.querySelectorAll('#home .terminal-input input')]
        .find((input) => input.getClientRects().length > 0);
      visibleInput?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'experience', 'skills', 'projects', 'about', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const name = profile?.name || 'Tesfaye Kelbesa';
  const [firstName, ...remainingName] = name.split(' ');
  const familyName = remainingName.join(' ');
  const role = profile?.title === 'Full Stack Developer'
    ? 'Frontend Dev & AI Freelancer'
    : profile?.title || 'Frontend Dev & AI Freelancer';
  const renderNameLetters = (text, reverse = false) => Array.from(text).map((letter, index) => {
    const colorIndex = reverse ? text.length - index - 1 : index;
    const delayIndex = reverse ? text.length - index - 1 : index;

    return (
      <span
        key={`${text}-${index}`}
        className="hero-name-letter hero-name-letter-card"
        style={{
          '--name-letter-color': palettes[colorIndex % palettes.length].accent,
          '--name-letter-delay': `${delayIndex * 0.12}s`,
        }}
      >
        {letter}
      </span>
    );
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    const commands = [
      ['whoami', name.toLowerCase().replaceAll(' ', '-')],
      ['cat role.txt', `${role}, Haramaya University student`],
      ['ls projects/', 'mesob-sululta/   tenafinder/   smart-shop/'],
      ['cat status.txt', 'open to new roles and freelance work'],
      ['cat philosophy.txt', 'Trying to embrace the world I was given.'],
    ];
    let active = true;
    let commandIndex = 0;

    const createLine = (text, type) => ({
      id: nextTerminalLineId.current++,
      text,
      type,
    });
    const addLine = (text, type) => {
      if (active) {
        const line = createLine(text, type);
        setTerminalLines((lines) => [...lines, line]);
      }
    };
    const schedule = (callback, delay) => timers.push(window.setTimeout(callback, delay));
    const typeCommand = () => {
      if (!active) return;
      if (commandIndex >= commands.length) {
        return;
      }

      const [input, output, outputType = 'output'] = commands[commandIndex];
      let characterIndex = 0;
      const inputLine = createLine('$ ', 'prompt');
      setTerminalLines((lines) => [...lines, inputLine]);
      const typeNextCharacter = () => {
        if (!active) return;
        if (characterIndex < input.length) {
          const character = input[characterIndex];
          setTerminalLines((lines) => {
            const updated = [...lines];
            const lineIndex = updated.findIndex((line) => line.id === inputLine.id);
            if (lineIndex < 0) return lines;
            updated[lineIndex] = { ...updated[lineIndex], text: `${updated[lineIndex].text}${character}` };
            return updated;
          });
          characterIndex += 1;
          schedule(typeNextCharacter, reducedMotion ? 0 : 45);
          return;
        }

        schedule(() => {
          addLine(output, outputType);
          commandIndex += 1;
          schedule(typeCommand, reducedMotion ? 0 : 350);
        }, reducedMotion ? 0 : 200);
      };
      schedule(typeNextCharacter, reducedMotion ? 0 : 45);
    };

    schedule(typeCommand, reducedMotion ? 0 : 500);
    return () => {
      active = false;
      timers.forEach(window.clearTimeout);
    };
  }, [name, role]);

  const selectPalette = (nextPalette) => {
    setPalette(nextPalette);
  };

  const handleSocialLinkClick = (event, link) => {
    event.preventDefault();

    const newTab = window.open('about:blank', '_blank');
    if (newTab) newTab.opener = null;

    const destination = new URL(link.url);
    const command = `$ open ${destination.host}${destination.pathname}`;
    const line = {
      id: nextTerminalLineId.current++,
      text: reducedMotion ? command : '$ ',
      type: 'prompt',
    };
    setTerminalLines((lines) => [...lines, line].slice(-24));

    const openDestination = () => {
      if (newTab && !newTab.closed) {
        newTab.location.href = link.url;
      } else {
        window.location.assign(link.url);
      }
    };

    if (reducedMotion) {
      window.setTimeout(openDestination, 0);
      return;
    }

    let characterIndex = 2;
    const typeNextCharacter = () => {
      if (characterIndex < command.length) {
        const character = command[characterIndex];
        setTerminalLines((lines) => lines.map((item) => (
          item.id === line.id ? { ...item, text: `${item.text}${character}` } : item
        )));
        characterIndex += 1;
        window.setTimeout(typeNextCharacter, 18);
        return;
      }

      openDestination();
    };

    window.setTimeout(typeNextCharacter, 18);
  };

  const runCommand = (event) => {
    event.preventDefault();
    const enteredCommand = command.trim();
    if (!enteredCommand) return;

    const commandName = enteredCommand.toLowerCase();
    if (commandName === 'clear') {
      setTerminalLines([]);
      setCommand('');
      return;
    }

    let response;
    let responseType = 'output';
    switch (commandName) {
      case 'help':
        response = 'whoami  projects  skills  contact  status  clear';
        responseType = 'prompt';
        break;
      case 'whoami':
        response = name.toLowerCase().replaceAll(' ', '-');
        break;
      case 'role':
        response = `${role}, Haramaya University student`;
        break;
      case 'ls':
      case 'projects':
        response = 'mesob-sululta/   tenafinder/   smart-shop/';
        break;
      case 'skills':
        response = [
          'front end| HTML CSS JavaScript Vite',
          'back end | Node Express MySQL Firebase',
          'mobile   | Flutter',
          'tools    | Git GitHub Vercel',
        ].join('\n');
        responseType = 'skills';
        break;
      case 'contact':
        response = 'github.com/Tesfaye-kel';
        break;
      case 'status':
        response = 'open to new roles and freelance work';
        break;
      default:
        response = commandName;
        responseType = 'unknown';
    }

    const commandLines = [
      { id: nextTerminalLineId.current++, text: `$ ${commandName}`, type: 'prompt' },
      { id: nextTerminalLineId.current++, text: response, type: responseType },
    ];
    setTerminalLines((lines) => [...lines, ...commandLines].slice(-24));
    setCommand('');
  };

  const renderTerminalLine = (line) => {
    if (line.type === 'skills') {
      const skillLines = line.text.split('\n');
      return skillLines.map((skillLine, lineIndex) => {
        const [category, skills] = skillLine.split('|');
        return (
          <Fragment key={`${line.id}-${lineIndex}`}>
            <span className="terminal-warm">{category}</span>{skills}
            {lineIndex < skillLines.length - 1 && <br />}
          </Fragment>
        );
      });
    }

    if (line.type === 'unknown') {
      return (
        <>
          <span className="terminal-warm">command not found: {line.text}.</span> Type help.
        </>
      );
    }

    return line.text;
  };

  const renderTerminal = () => (
    <div className="portfolio-terminal">
      <div className="terminal-bar">
        <i />
        <i />
        <i />
        <span>tesfaye@portfolio: ~</span>
      </div>

      <div className="terminal-output" aria-live="polite">
        {terminalLines.map((line, index) => (
          <div
            key={line.id ?? `${index}-${line.text}`}
            className={`${
              line.type === 'prompt' ? 'terminal-prompt' :
                line.type === 'accent' ? 'terminal-warm' :
                  line.type === 'muted' ? 'terminal-muted' :
                    'terminal-text'
            }`}
          >
            {renderTerminalLine(line)}
          </div>
        ))}
      </div>

      <form
        onSubmit={runCommand}
        className="terminal-input"
      >
        <span>$</span>
        <input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') runCommand(event);
          }}
          aria-label="Enter a terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="type help"
        />
        <button type="submit" className="sr-only">Run command</button>
      </form>
    </div>
  );

  return (
    <>
      <section
        id="home"
        className="terminal-hero-grid portfolio-snap-panel"
      >
        <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-status">
            <span />
            Open to new roles
          </div>

          <p className="hero-greeting">
            <b>&gt;</b> hello, I’m
          </p>

          <h1 className="hero-name" aria-label={name}>
            <span className="hero-name-line">
              {renderNameLetters(firstName)}
            </span>
            {familyName && (
              <span
                className="hero-name-line hero-name-second"
                style={{ marginLeft: `${firstName.length}ch` }}
              >
                {renderNameLetters(familyName, true)}
              </span>
            )}
          </h1>

          <div className="portfolio-terminal-mobile">
            {renderTerminal()}
          </div>

          <h2 className="hero-role">{role}</h2>

          <p className="hero-lead">
            I build complete digital products, from responsive websites to cross-platform mobile applications. My focus is on high performance, intuitive user experiences, and scalable solutions that solve real-world problems. I turn ideas into functional, reliable, and visually appealing products through clean code, thoughtful design, and modern technologies.
          </p>

          <div className="hero-buttons">
            <a
              href={`mailto:${profile?.email || 'tesfayekelbesa912@gmail.com'}`}
              className="hero-button hero-button-primary"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="hero-button hero-button-work"
            >
              View my work
            </a>
            <a
              href="https://github.com/Tesfaye-kel"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button"
            >
              GitHub
            </a>
            <a
              href={data.about?.cvUrl || `${import.meta.env.BASE_URL || '/'}cv.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button hero-button-cv"
            >
              View My CV
            </a>
          </div>

          <div className="hero-stats" aria-label="Social media">
            {socialLinks.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => handleSocialLinkClick(event, { name, url })}
                className="hero-stat hero-social-card"
                aria-label={`Visit ${name}`}
                title={name}
              >
                <span>{name}</span>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="portfolio-terminal-desktop">
          {renderTerminal()}
        </div>
        </div>
      </section>
      {createPortal(
        <>
          <nav className="section-dots" aria-label="Page sections">
            {['home', 'experience', 'skills', 'projects', 'about', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                aria-label={section[0].toUpperCase() + section.slice(1)}
                title={section[0].toUpperCase() + section.slice(1)}
                aria-current={activeSection === section ? 'location' : undefined}
                className={activeSection === section ? 'is-active' : ''}
              />
            ))}
          </nav>

          <div className={`palette-picker${isPaletteOpen ? ' is-open' : ''}`}>
            {isPaletteOpen && (
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
                      selectPalette(item.id);
                      setIsPaletteOpen(false);
                    }}
                    className={palette === item.id ? 'is-selected' : ''}
                  >
                    <span
                      style={{ background: `linear-gradient(135deg, ${item.accent} 55%, ${item.warm} 55%)` }}
                    />
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              className="palette-toggle"
              aria-label={isPaletteOpen ? 'Close color palette' : 'Open color palette'}
              aria-expanded={isPaletteOpen}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setIsPaletteOpen((open) => !open)}
            >
              <span
                className="palette-toggle-swatch"
                style={{ background: `linear-gradient(135deg, ${palettes[0].accent} 55%, ${palettes[0].warm} 55%)` }}
                aria-hidden="true"
              />
            </button>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default Hero;
