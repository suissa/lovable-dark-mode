import { CodeBlock } from "@/components/CodeBlock";
import { ArrowRight, Shield, Zap, Lock, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent" />
            <span>Austral</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#tutorial" className="hover:text-foreground transition">Tutorial</a>
            <a href="#types" className="hover:text-foreground transition">Linear Types</a>
            <a href="#benefits" className="hover:text-foreground transition">Benefícios</a>
            <a href="https://austral-lang.org" className="hover:text-foreground transition">Docs ↗</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-mono text-muted-foreground mb-6">
              <Sparkles className="w-3 h-3 text-accent" />
              tutorial / linear-types
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              <span className="gradient-text">Linear Types</span>
              <br />
              em Austral
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Uma forma <em>estática</em> e <em>completa</em> de garantir que recursos
              sejam usados no ciclo de vida correto — sem garbage collector, sem vazamentos,
              sem use-after-free.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#types" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                Começar tutorial <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#benefits" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-card transition">
                Ver benefícios
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl pb-32">
        {/* Resources & Lifecycles */}
        <section id="tutorial" className="py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos e Ciclos de Vida</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Considere uma API de manipulação de arquivos:
          </p>

          <CodeBlock
            filename="file-api.aus"
            code={`type File;

function openFile(path: String): File;

function writeString(file: File, content: String): File;

function closeFile(file: File): Unit;`}
          />

          <p className="text-muted-foreground leading-relaxed mb-6">
            Um programador experiente entende o <em>ciclo de vida implícito</em> do objeto <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">File</code>:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6 pl-2">
            <li>Criamos um handle <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">File</code> chamando <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">openFile</code>.</li>
            <li>Escrevemos no handle zero ou mais vezes.</li>
            <li>Fechamos o arquivo chamando <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">closeFile</code>.</li>
          </ol>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Mas, crucialmente: esse ciclo de vida <strong className="text-foreground">não é imposto pelo compilador</strong>. Existem transições erradas perfeitamente possíveis:
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-3 text-destructive">Vazamentos (Leaks)</h3>
          <p className="text-muted-foreground mb-4">Esquecer de chamar <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">closeFile</code>:</p>
          <CodeBlock
            filename="leak.aus"
            code={`let file: File = openFile("hello.txt");
writeString(file, "Hello, world!");
-- Esqueceu de fechar`}
          />

          <h3 className="text-xl font-semibold mt-10 mb-3 text-destructive">Use-After-Close</h3>
          <p className="text-muted-foreground mb-4">Chamar <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">writeString</code> em um arquivo já fechado:</p>
          <CodeBlock
            filename="use-after-close.aus"
            code={`closeFile(file);
writeString(file, "Goodbye, world!");`}
          />

          <p className="text-muted-foreground mb-4">Ou fechar duas vezes:</p>
          <CodeBlock
            filename="double-close.aus"
            code={`closeFile(file);
closeFile(file);`}
          />

          <p className="text-muted-foreground leading-relaxed">
            No contexto de gerenciamento de memória, esses erros são tão desastrosos que têm
            nomes próprios: <strong className="text-foreground">double free</strong> e{" "}
            <strong className="text-foreground">use-after-free</strong>.
          </p>
        </section>

        {/* What linear types are */}
        <section id="types" className="py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que são Linear Types</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vamos considerar uma API de arquivos linear. Tipos lineares são denotados por
            uma exclamação após o nome:
          </p>

          <CodeBlock
            filename="linear-file.aus"
            code={`type File!;

function openFile(path: String): File!;

function writeString(file: File!, content: String): File!;

function closeFile(file: File!): Unit;`}
          />

          <p className="text-muted-foreground leading-relaxed mb-6">
            Podemos vazar um <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">File!</code>? Não:
          </p>
          <CodeBlock
            filename="cannot-leak.aus"
            code={`let file: File! := openFile("sonnets.txt");
-- Não fazer nada.`}
          />

          <p className="text-muted-foreground leading-relaxed mb-6">
            O compilador reclama: a variável <code className="px-1.5 py-0.5 rounded bg-secondary text-accent text-sm">file</code> é usada zero vezes.
            Existe uma e somente uma forma de usar essa API sem o compilador reclamar:
          </p>

          <CodeBlock
            filename="correct-usage.aus"
            code={`let f: File! := openFile("rilke.txt");
let f_1: File! := writeString(f, "We cannot know his legendary head\\n");
let f_2: File! := writeString(f_1, "with eyes like ripening fruit. And yet his torso\\n");
let f_15: File! := writeString(f_14, "You must change your life.");
closeFile(f_15);`}
          />

          <p className="text-muted-foreground leading-relaxed">
            O valor do arquivo é <em>encadeado</em> pelo código, e cada variável linear é
            usada exatamente uma vez.
          </p>

          <h3 className="text-2xl font-semibold mt-12 mb-4">Generaliza? Sim — banco de dados:</h3>
          <CodeBlock
            filename="linear-db.aus"
            code={`type Db!;

function connect(host: String): Db!;

function query(db: Db!, query: String): Pair[Db!, Rows];

function close(db: Db!) : Unit;`}
          />

          <p className="text-muted-foreground mb-4">A única forma correta de usar:</p>
          <CodeBlock
            filename="db-usage.aus"
            code={`let db: Db! := connect("localhost");
let (db1, rows): Pair[Db!, Rows] := query(db, "SELECT ...");
-- Itera sobre as linhas.
close(db1);`}
          />
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">O que Linear Types oferecem</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                title: "Memória sem GC",
                desc: "Gerenciamento manual sem leaks, use-after-free ou double free — zero overhead em tempo ou espaço.",
              },
              {
                icon: Lock,
                title: "Recursos seguros",
                desc: "Qualquer recurso com ciclo de vida (arquivos, sockets) gerenciado estaticamente, sem erros.",
              },
              {
                icon: Zap,
                title: "Otimização in-place",
                desc: "Código com aparência funcional, mas com mutação real por baixo. Performance imperativa, raciocínio funcional.",
              },
              {
                icon: Sparkles,
                title: "Concorrência segura",
                desc: "Um valor linear tem um único dono — impossível ter múltiplos donos entre threads.",
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
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          Recriação do tutorial <a className="text-accent hover:underline" href="https://austral-lang.org/tutorial/linear-types">austral-lang.org/tutorial/linear-types</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
