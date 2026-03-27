import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { FaReact, FaNodeJs, FaDatabase, FaRobot, FaGithub, FaRegStar } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiVercel, SiPrisma, SiExpress, SiZod, SiShadcnui, SiOpenai } from "react-icons/si";
import { MdPeopleAlt } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Header from "@app/components/page/header";
import Footer from "@app/components/page/footer";

export default function Thanks() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      <Header />
      <main className="relative flex-1 flex flex-col">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col flex-1 px-3 sm:px-4 md:px-6 pt-4 md:pt-6 pb-10 md:pb-12">
        <div className="flex justify-start w-full mb-4 md:mb-6">
          <button
            type="button"
            aria-label="Voltar para a página principal"
            onClick={() => navigate("/")}
            className="
              inline-flex items-center gap-1.5 rounded-lg border border-default/60 bg-slate-900/70
              px-3 py-2 text-sm font-semibold text-default shadow-sm
              hover:bg-default/15 hover:border-default transition-colors duration-200
            "
          >
            <IoChevronBack className="h-5 w-5 shrink-0" aria-hidden />
            Voltar
          </button>
        </div>
        <Card className="border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/10 mb-8">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-2">
              <FaRegStar className="text-yellow-400 animate-pulse" /> Agradecimentos & Sobre o Projeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-slate-300 text-lg max-w-3xl mx-auto">
              Este portfólio foi desenvolvido com dedicação e paixão por tecnologia, buscando sempre as melhores práticas e ferramentas modernas para entregar uma experiência rica e intuitiva.
            </p>
          </CardContent>
        </Card>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <Card className="flex-1 border-slate-700 bg-slate-900/80">
            <CardHeader className="flex flex-col items-center gap-2 pb-2">
              <span className="flex items-center gap-2 text-xl font-semibold text-cyan-400">
                <FaReact className="text-cyan-400" /> Frontend
              </span>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-cyan-400 font-bold text-lg"><FaReact className="text-cyan-400" />React</span>
                  <span className="text-slate-200 text-base pl-7">Biblioteca principal para construção da interface.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-blue-400 font-bold text-lg"><SiTypescript className="text-blue-400" />Typescript</span>
                  <span className="text-slate-200 text-base pl-7">Tipagem estática para maior segurança e produtividade.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-sky-400 font-bold text-lg"><SiTailwindcss className="text-sky-400" />Tailwind CSS</span>
                  <span className="text-slate-200 text-base pl-7">Utilitário para estilização rápida e responsiva.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-violet-400 font-bold text-lg"><SiShadcnui className="text-violet-400" />shadcn/ui</span>
                  <span className="text-slate-200 text-base pl-7">Componentes de UI modernos e acessíveis.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-green-400 font-bold text-lg"><FaRobot className="text-green-400" />Jotai</span>
                  <span className="text-slate-200 text-base pl-7">Gerenciamento de estado simples e eficiente.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-black font-bold text-lg"><SiVercel className="text-black bg-white rounded-full p-0.5" />Vercel v0 (IA)</span>
                  <span className="text-slate-200 text-base pl-7">Auxílio na estilização e prototipação de componentes.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-green-300 font-bold text-lg"><SiOpenai className="text-green-300" />ChatGPT</span>
                  <span className="text-slate-200 text-base pl-7">Apoio em refatoração, melhorias de código, lógica e ideias para o frontend.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="flex-1 border-slate-700 bg-slate-900/80">
            <CardHeader className="flex flex-col items-center gap-2 pb-2">
              <span className="flex items-center gap-2 text-xl font-semibold text-emerald-400">
                <FaNodeJs className="text-emerald-400" /> Backend
              </span>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold text-lg"><FaNodeJs className="text-emerald-400" />Node.js</span>
                  <span className="text-slate-200 text-base pl-7">Plataforma para execução do servidor.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-gray-300 font-bold text-lg"><SiExpress className="text-gray-300" />Express</span>
                  <span className="text-slate-200 text-base pl-7">Framework para criação de APIs robustas.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-blue-400 font-bold text-lg"><SiTypescript className="text-blue-400" />Typescript</span>
                  <span className="text-slate-200 text-base pl-7">Tipagem estática também no backend.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-pink-400 font-bold text-lg"><SiZod className="text-pink-400" />Zod</span>
                  <span className="text-slate-200 text-base pl-7">Validação de dados eficiente e segura.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-yellow-400 font-bold text-lg"><FaDatabase className="text-yellow-400" />MVC</span>
                  <span className="text-slate-200 text-base pl-7">Organização do código em camadas (Model, View, Controller).</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-indigo-400 font-bold text-lg"><SiPrisma className="text-indigo-400" />Prisma</span>
                  <span className="text-slate-200 text-base pl-7">ORM para manipulação de banco de dados.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="flex-1 border-slate-700 bg-slate-900/80">
            <CardHeader className="flex flex-col items-center gap-2 pb-2">
              <span className="flex items-center gap-2 text-xl font-semibold text-yellow-300">
                <MdPeopleAlt className="text-yellow-300" /> Agradecimentos Especiais
              </span>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-white font-bold text-lg"><FaGithub className="text-white" />Open Source</span>
                  <span className="text-slate-200 text-base pl-7">À comunidade open source e aos criadores das ferramentas utilizadas.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-green-300 font-bold text-lg"><FaRobot className="text-green-300" />IA & Ferramentas</span>
                  <span className="text-slate-200 text-base pl-7">À IA (Vercel v0, ChatGPT) pelo suporte em ideias, refatoração e prototipação.</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="flex items-center gap-2 text-yellow-400 font-bold text-lg"><FaRegStar className="text-yellow-400" />Apoiadores</span>
                  <span className="text-slate-200 text-base pl-7">A todos que apoiam e incentivam o desenvolvimento contínuo.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
} 