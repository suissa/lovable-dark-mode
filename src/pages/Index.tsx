import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Lock, Zap, GitBranch, Terminal, Boxes, Sparkles, Compass } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <Compass className="w-7 h-7 text-accent" />
            <span>Meridional</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#install" className="hover:text-foreground transition">Instalação</a>
            <a href="#commands" className="hover:text-foreground transition">Comandos</a>
            <a href="#manifest" className="hover:text-foreground transition">Manifesto</a>
            <a href="#features" className="hover:text-foreground transition">Recursos</a>
            <Link to="/austral" className="hover:text-foreground transition">Austral ↗</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-mono text-muted-foreground mb-6">
              <Sparkles className="w-3 h-3 text-accent" />
              package manager · austral lang
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              <span className="gradient-text">Meridional</span>
              <br />
              o package manager da Austral
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Builds <em>reprodutíveis</em>, dependências <em>tipadas linearmente</em> e um
              registry descentralizado. Pensado desde o primeiro commit para a segurança de
              capabilities da linguagem Austral.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#install" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                Instalar agora <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/austral" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-card transition">
                Sobre Austral
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl pb-32">
        {/* Install */}
        <section id="install" className="py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-accent" /> Instalação
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Um único binário estático, sem runtime. Instala-se em segundos:
          </p>
          <CodeBlock
            filename="install.sh"
            language="bash"
            code={`curl -sSL https://meridional.austral-lang.org/install | sh

meridional --version
-- meridional 0.4.2 (austral 1.0)`}
          />
        </section>

        {/* Commands */}
        <section id="commands" className="py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <GitBranch className="w-8 h-8 text-accent" /> Fluxo de comandos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Iniciando um projeto novo, adicionando dependências e compilando:
          </p>
          <CodeBlock
            filename="workflow.sh"
            language="bash"
            code={`meridional new my-app
cd my-app

meridional add stdlib@1.0
meridional add net.linear-sockets@0.3

meridional build      -- compila com checagem linear
meridional test       -- roda os testes
meridional publish    -- publica no registry`}
          />
        </section>

        {/* Manifest */}
        <section id="manifest" className="py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Package className="w-8 h-8 text-accent" /> O manifesto Meridional.toml
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cada pacote declara suas dependências e — diferencial do Meridional — as
            <strong className="text-foreground"> capabilities </strong> que precisa do
            ambiente:
          </p>
          <CodeBlock
            filename="Meridional.toml"
            language="toml"
            code={`[package]
name        = "my-app"
version     = "0.1.0"
austral     = "1.0"
authors     = ["you@austral.dev"]

[dependencies]
stdlib              = "1.0"
"net.linear-sockets" = "0.3"
"db.postgres"        = { version = "2.1", features = ["tls"] }

[capabilities]
-- recursos lineares que o programa pode pedir
filesystem = "read"
network    = "tcp"
terminal   = true`}
          />

          <p className="text-muted-foreground leading-relaxed mt-6 mb-4">
            E o lockfile é determinístico — o mesmo input gera o mesmo grafo:
          </p>
          <CodeBlock
            filename="Meridional.lock"
            language="toml"
            code={`# auto-gerado por meridional
[[package]]
name    = "stdlib"
version = "1.0.7"
hash    = "blake3:9c1d…f0e2"

[[package]]
name    = "net.linear-sockets"
version = "0.3.4"
hash    = "blake3:4a77…b8c1"`}
          />
        </section>

        {/* Features */}
        <section id="features" className="py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Por que Meridional</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Lock,
                title: "Capabilities no manifesto",
                desc: "O package manager respeita o sistema linear de capabilities da Austral — uma dependência só recebe o que você declarou.",
              },
              {
                icon: Boxes,
                title: "Builds reprodutíveis",
                desc: "Lockfile com hashes blake3, sandbox de build hermético. O mesmo commit produz o mesmo binário em qualquer máquina.",
              },
              {
                icon: Zap,
                title: "Compilação incremental",
                desc: "Cache por unidade de compilação ligado à árvore de tipos lineares — recompila só o estritamente necessário.",
              },
              {
                icon: GitBranch,
                title: "Registry federado",
                desc: "Publique em meridional.austral-lang.org ou rode seu próprio mirror. Resolução de versões com SemVer estrito.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-border bg-card/40 backdrop-blur hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Austral */}
        <section className="py-16 border-t border-border">
          <div className="rounded-2xl p-8 md:p-12 border border-border bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Novo na linguagem Austral?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Meridional foi desenhado em torno do sistema de Linear Types da Austral. Leia o
              tutorial para entender o modelo que torna tudo isso possível.
            </p>
            <Link to="/austral" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition">
              Ler tutorial Austral <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          Meridional · package manager para <Link className="text-accent hover:underline" to="/austral">Austral</Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
