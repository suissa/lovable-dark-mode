import { useState } from "react";
import { Check, Copy, Circle } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

// Lightweight Austral-flavored syntax highlighter
const KEYWORDS = [
  "let", "function", "type", "return", "if", "else", "for", "while",
  "module", "import", "end", "case", "of", "when", "is", "do", "in",
];
const TYPES = ["File", "Db", "String", "Unit", "Pair", "Rows", "Pointer", "T", "File!", "Db!"];

function highlight(line: string) {
  // comments
  if (line.trim().startsWith("--")) {
    return <span style={{ color: "hsl(var(--syntax-comment))" }}>{line}</span>;
  }
  const tokenRegex = /(\s+|"[^"]*"|\b\d+\b|\b[A-Za-z_][A-Za-z0-9_]*!?\b|[(){}\[\]:;,.<>=+\-*/!])/g;
  const parts = line.match(tokenRegex) ?? [line];
  return parts.map((tok, i) => {
    if (/^\s+$/.test(tok)) return tok;
    if (/^"/.test(tok)) return <span key={i} style={{ color: "hsl(var(--syntax-string))" }}>{tok}</span>;
    if (/^\d+$/.test(tok)) return <span key={i} style={{ color: "hsl(var(--syntax-number))" }}>{tok}</span>;
    if (KEYWORDS.includes(tok)) return <span key={i} style={{ color: "hsl(var(--syntax-keyword))", fontWeight: 600 }}>{tok}</span>;
    if (TYPES.includes(tok) || /^[A-Z]/.test(tok)) return <span key={i} style={{ color: "hsl(var(--syntax-type))" }}>{tok}</span>;
    if (/^[(){}\[\]:;,.<>=+\-*/!]$/.test(tok)) return <span key={i} style={{ color: "hsl(var(--syntax-punct))" }}>{tok}</span>;
    // function call detection: next non-space is '('
    return <span key={i} style={{ color: "hsl(var(--syntax-function))" }}>{tok}</span>;
  });
}

export const CodeBlock = ({ code, filename = "example.aus", language = "austral" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="my-6 overflow-hidden rounded-xl border border-border shadow-2xl"
      style={{ background: "hsl(var(--editor-bg))" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-border"
        style={{ background: "hsl(var(--editor-titlebar))" }}
      >
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-[#ff5f56] text-[#ff5f56]" />
          <Circle className="w-3 h-3 fill-[#ffbd2e] text-[#ffbd2e]" />
          <Circle className="w-3 h-3 fill-[#27c93f] text-[#27c93f]" />
          <span className="ml-3 text-xs font-mono text-muted-foreground">{filename}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{language}</span>
          <button
            onClick={onCopy}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {/* Code area */}
      <div className="flex font-mono text-sm overflow-x-auto">
        <div
          className="select-none px-4 py-4 text-right border-r border-border/60"
          style={{ color: "hsl(var(--editor-line))" }}
        >
          {lines.map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        <pre className="py-4 px-5 flex-1 leading-6" style={{ color: "hsl(var(--editor-text))" }}>
          {lines.map((line, i) => (
            <div key={i}>{highlight(line) || "\u00A0"}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};
