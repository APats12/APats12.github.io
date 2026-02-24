import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './InteractiveTerminal.css';

type LineType = 'input' | 'output' | 'error' | 'system';

interface HistoryLine {
  type: LineType;
  content: string[];
}

const WELCOME: HistoryLine[] = [
  {
    type: 'system',
    content: [
      'Welcome to aryan@ucsc:~',
      '─────────────────────────────────────',
      "Type 'help' to see available commands.",
    ],
  },
];

const ALL_COMPLETIONS = [
  'help', 'ls', 'clear',
  'cat aboutme.txt',
  'cd about', 'cd projects', 'cd resume',
];

function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    '  ls                  list available pages',
    '  cd <page>           navigate to a page',
    '  cat aboutme.txt     read about me',
    '  clear               clear the terminal',
    '  [tab]               autocomplete commands',
    '',
    "  pages: about, projects, resume",
  ],
  ls: ['about/    projects/    resume.pdf'],
  'cat aboutme.txt': [
    "i'm aryan — a cs grad from uc santa cruz.",
    'i build across the stack: backend systems,',
    'ml pipelines, and full-stack apps.',
    'currently looking for swe roles.',
    '',
    '  github   → github.com/APats12',
    '  linkedin → linkedin.com/in/aryan-patel-485ab71aa',
    '  email    → aryandhpatel12@gmail.com',
  ],
};

const InteractiveTerminal = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const pushLine = (lines: HistoryLine[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    // Echo the input
    const inputLine: HistoryLine = { type: 'input', content: [raw] };

    if (!cmd) {
      pushLine([inputLine]);
      return;
    }

    // Save to command history
    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIdx(-1);

    // Handle clear
    if (cmd === 'clear') {
      setHistory(WELCOME);
      return;
    }

    // cd navigation
    if (cmd.startsWith('cd ')) {
      const dest = cmd.slice(3).trim();
      if (dest === 'about') {
        pushLine([inputLine, { type: 'system', content: ['navigating to /about...'] }]);
        setTimeout(() => navigate('/about'), 400);
        return;
      }
      if (dest === 'projects') {
        pushLine([inputLine, { type: 'system', content: ['navigating to /projects...'] }]);
        setTimeout(() => navigate('/projects'), 400);
        return;
      }
      if (dest === 'resume') {
        pushLine([inputLine, { type: 'system', content: ['opening resume.pdf...'] }]);
        setTimeout(() => window.open('/AryanDPatelResume.pdf', '_blank'), 400);
        return;
      }
      if (dest === '..' || dest === '~' || dest === 'home') {
        pushLine([inputLine, { type: 'system', content: ['already at ~/'] }]);
        return;
      }
      pushLine([
        inputLine,
        { type: 'error', content: [`cd: ${dest}: No such directory. Try: about, projects, resume`] },
      ]);
      return;
    }

    // Static commands
    const output = COMMANDS[cmd];
    if (output) {
      pushLine([inputLine, { type: 'output', content: output }]);
      return;
    }

    // Unknown
    pushLine([
      inputLine,
      { type: 'error', content: [`command not found: ${cmd}. Try 'help'.`] },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = ALL_COMPLETIONS.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        pushLine([{ type: 'output', content: [matches.join('    ')] }]);
        setInput(longestCommonPrefix(matches));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx]);
    }
  };

  return (
    <motion.div
      className="iterm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* macOS-style header */}
      <div className="iterm-header">
        <div className="iterm-buttons">
          <span className="iterm-btn red" />
          <span className="iterm-btn yellow" />
          <span className="iterm-btn green" />
        </div>
        <span className="iterm-title mono">bash — ~/aryan-portfolio</span>
      </div>

      {/* Terminal body */}
      <div className="iterm-body mono" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className={`iterm-block iterm-${line.type}`}>
            {line.type === 'input' && (
              <div className="iterm-row">
                <span className="iterm-prompt">aryan@ucsc:~$</span>
                <span className="iterm-cmd">{line.content[0]}</span>
              </div>
            )}
            {line.type !== 'input' &&
              line.content.map((text, j) => (
                <div key={j} className="iterm-row iterm-out-row">
                  {text}
                </div>
              ))}
          </div>
        ))}

        {/* Live input row */}
        <div className="iterm-row iterm-input-row">
          <span className="iterm-prompt">aryan@ucsc:~$</span>
          <div className="iterm-input-wrap">
            <span className="iterm-input-ghost">{input}</span>
            <span className="iterm-cursor" />
            <input
              ref={inputRef}
              className="iterm-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
