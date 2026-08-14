'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Copy, Check, RotateCcw } from 'lucide-react';
import { useData } from '@/context/DataContext';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const {
    aboutProfile,
    projects,
    achievements,
    skills,
    journey,
    socials,
    setCurrentRoute,
    setContactModalOpen,
  } = useData();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'whoami',
      output: (
        <div className="space-y-1 text-slate-200">
          <p className="font-semibold text-white">{aboutProfile.name}</p>
          <p className="text-blue-400 text-xs">Full-Stack Developer</p>
          <p className="text-emerald-400 text-xs">Cybersecurity Enthusiast</p>
        </div>
      ),
    },
    {
      id: 'init-2',
      command: 'status',
      output: (
        <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
          <li>Building impactful digital products</li>
          <li>Exploring secure architectures & network defense</li>
          <li>Open to meaningful tech collaborations</li>
        </ul>
      ),
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(['whoami', 'status']);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const lowerCmd = trimmed.toLowerCase();
    setCommandHistory(prev => [trimmed, ...prev.filter(c => c !== trimmed)].slice(0, 25));
    setHistoryIndex(-1);

    let resultOutput: React.ReactNode = null;

    switch (lowerCmd) {
      case 'help':
        resultOutput = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-blue-300 font-semibold mb-1">Available whitelisted commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono">
              <span className="text-emerald-400">whoami</span>
              <span className="text-emerald-400">role</span>
              <span className="text-emerald-400">about</span>
              <span className="text-emerald-400">projects</span>
              <span className="text-emerald-400">achievements</span>
              <span className="text-emerald-400">skills</span>
              <span className="text-emerald-400">journey</span>
              <span className="text-emerald-400">contact</span>
              <span className="text-emerald-400">status</span>
              <span className="text-emerald-400">socials</span>
              <span className="text-emerald-400">clear</span>
              <span className="text-slate-400">ls, pwd, date</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-2">💡 Tip: You can type navigation commands to jump between sections!</p>
          </div>
        );
        break;

      case 'whoami':
        resultOutput = (
          <div className="space-y-0.5 text-xs">
            <p className="font-bold text-white text-sm">{aboutProfile.name}</p>
            <p className="text-blue-300">{aboutProfile.education} • {aboutProfile.publicLocation}</p>
            <p className="text-slate-300 italic mt-1 font-sans">"{aboutProfile.headline}"</p>
          </div>
        );
        break;

      case 'role':
        resultOutput = (
          <div className="space-y-1 text-xs text-slate-200">
            <p className="text-blue-400 font-semibold">Primary: Full-Stack Web Developer</p>
            <p className="text-emerald-400 font-semibold">Specialization: Application Security & Network Defense</p>
            <p className="text-slate-300">Focus: {aboutProfile.currentFocus}</p>
          </div>
        );
        break;

      case 'about':
        resultOutput = (
          <div className="space-y-1 text-xs text-slate-200">
            <p>{aboutProfile.bio}</p>
            <button
              onClick={() => setCurrentRoute('about')}
              className="mt-1 inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Go to full About page →
            </button>
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        {
          const published = projects.filter(p => p.published);
          resultOutput = (
            <div className="space-y-2 text-xs">
              <p className="text-blue-300 font-medium">Published Projects ({published.length}):</p>
              <div className="space-y-1.5 pl-2 border-l-2 border-blue-500/40">
                {published.map(p => (
                  <div key={p.id} className="flex flex-col">
                    <span className="font-semibold text-emerald-400">{p.title} <span className="text-[10px] text-slate-400 font-normal">[{p.category}]</span></span>
                    <span className="text-slate-300 text-[11px]">{p.description}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentRoute('projects')}
                className="mt-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                View all in Projects page →
              </button>
            </div>
          );
        }
        break;

      case 'achievements':
        {
          const publishedAch = achievements.filter(a => a.published);
          resultOutput = (
            <div className="space-y-2 text-xs">
              <p className="text-blue-300 font-medium">Verified Recognitions & Certificates ({publishedAch.length}):</p>
              <div className="space-y-1.5 pl-2 border-l-2 border-amber-500/40">
                {publishedAch.slice(0, 4).map(a => (
                  <div key={a.id}>
                    <span className="font-semibold text-amber-300">{a.title}</span>
                    <span className="text-slate-400 text-[10px] ml-1">({a.issuer}, {a.year})</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentRoute('achievements')}
                className="mt-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                Explore all credentials →
              </button>
            </div>
          );
        }
        break;

      case 'skills':
        {
          const dev = skills.filter(s => s.category === 'DEVELOPMENT' && s.published).map(s => s.name).join(', ');
          const sec = skills.filter(s => s.category === 'CURRENTLY_LEARNING' && s.published).map(s => s.name).join(', ');
          const tools = skills.filter(s => s.category === 'TOOLS' && s.published).map(s => s.name).join(', ');
          resultOutput = (
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><span className="text-blue-400 font-semibold">Development:</span> {dev}</p>
              <p><span className="text-cyan-400 font-semibold">Tools:</span> {tools}</p>
              <p><span className="text-emerald-400 font-semibold">Security & Learning:</span> {sec}</p>
              <button
                onClick={() => setCurrentRoute('skills')}
                className="mt-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                View full interactive skills chart →
              </button>
            </div>
          );
        }
        break;

      case 'journey':
        {
          const timeline = journey.filter(j => j.published);
          resultOutput = (
            <div className="space-y-1.5 text-xs">
              <p className="text-blue-300 font-medium">Timeline Overview:</p>
              <div className="space-y-1 pl-2 border-l border-blue-400/30">
                {timeline.map(item => (
                  <div key={item.id} className="text-slate-300">
                    <span className="font-bold text-white font-mono">{item.dateOrYear}</span>: {item.title}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentRoute('journey')}
                className="mt-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                View complete journey timeline →
              </button>
            </div>
          );
        }
        break;

      case 'contact':
        resultOutput = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-semibold">Direct Contact channels:</p>
            <p>📧 Email: <a href="mailto:malik.ibrahim.dev@gmail.com" className="text-blue-300 underline">malik.ibrahim.dev@gmail.com</a></p>
            <p>📍 Location: Depok, Indonesia (UTC+7)</p>
            <button
              onClick={() => setContactModalOpen(true)}
              className="mt-1 text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Open Contact Form →
            </button>
          </div>
        );
        break;

      case 'status':
        resultOutput = (
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
            <li><span className="text-emerald-400 font-semibold">Active:</span> Building scalable full-stack applications</li>
            <li><span className="text-blue-400 font-semibold">Security:</span> Researching OWASP vulnerabilities & network defense</li>
            <li><span className="text-amber-400 font-semibold">Status:</span> Open for freelance, internships & collaboration</li>
          </ul>
        );
        break;

      case 'socials':
      case 'github':
        resultOutput = (
          <div className="space-y-1 text-xs text-slate-300">
            {socials.filter(s => s.published).map(s => (
              <p key={s.id}>
                <span className="text-blue-400 font-medium">{s.platform}:</span>{' '}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:underline">
                  {s.label}
                </a>
              </p>
            ))}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'pwd':
        resultOutput = <span className="text-xs text-slate-300 font-mono">/home/malik/portfolio-v2.6</span>;
        break;

      case 'date':
        resultOutput = <span className="text-xs text-slate-300 font-mono">{new Date().toUTCString()}</span>;
        break;

      case 'sudo':
        resultOutput = (
          <div className="text-xs text-amber-300 font-mono">
            ⚠️ Permission denied: You are an honored guest in this portfolio environment. Root privileges are reserved for Malik!
          </div>
        );
        break;

      default:
        resultOutput = (
          <div className="text-xs text-rose-300 font-mono">
            Command not found: <span className="font-bold text-white">"{trimmed}"</span>. Type <span className="text-emerald-400 font-bold">"help"</span> to view allowed commands.
          </div>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: resultOutput,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'whoami', 'role', 'about', 'projects', 'achievements', 'skills', 'journey', 'contact', 'status', 'clear', 'socials'];
      const match = available.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="interactive-terminal"
      onClick={focusInput}
      className="relative flex flex-col w-full max-w-lg bg-[#0F1E36] border border-[#1E3A66] rounded-2xl shadow-2xl overflow-hidden font-mono text-white transition-all duration-200 hover:border-blue-500/50"
      style={{
        boxShadow: '0 20px 40px -15px rgba(16, 42, 86, 0.4), 0 0 0 1px rgba(23, 105, 232, 0.15)',
      }}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A1628] border-b border-[#1E3A66]/70 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block"></span>
          </div>
          <span className="text-[12px] text-slate-400 font-sans font-medium ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            malik@portfolio:~
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Copy Terminal Logs"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyHistory();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            title="Reset Terminal"
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Logs Window */}
      <div className="p-4 sm:p-5 h-64 sm:h-72 overflow-y-auto custom-scrollbar space-y-3 text-xs sm:text-[13px]">
        {/* Welcome greeting */}
        <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800/80">
          <p className="text-blue-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Malik Ibrahim Portfolio Interactive Terminal v2.6
          </p>
          <p className="text-slate-400">Type <span className="text-emerald-400 font-semibold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for all commands or click the chips below.</p>
        </div>

        {/* History stream */}
        {history.map(item => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 font-medium">
              <span className="text-emerald-400">malik@portfolio:~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-4 text-slate-200">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Input Prompt */}
        <div className="flex items-center gap-2 text-blue-400 font-medium pt-1">
          <span className="text-emerald-400 whitespace-nowrap">malik@portfolio:~$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white outline-none font-mono text-xs sm:text-[13px] caret-transparent"
              placeholder=""
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
            {/* Custom blinking terminal cursor */}
            <span
              className="absolute pointer-events-none w-2 h-4 bg-emerald-400 inline-block animate-pulse"
              style={{
                left: `${Math.min(inputVal.length * 7.8, 320)}px`,
              }}
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Interactive Quick-Action Chips */}
      <div className="px-3.5 py-2.5 bg-[#0A1628]/95 border-t border-[#1E3A66]/50 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-slate-400 text-[10px] mr-1 hidden sm:inline">Try:</span>
        {['whoami', 'role', 'projects', 'achievements', 'skills', 'journey', 'status', 'clear'].map(cmd => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
            }}
            className="px-2 py-0.5 rounded-md bg-[#162C4E] hover:bg-blue-600/80 text-blue-200 hover:text-white transition cursor-pointer text-[11px] font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
