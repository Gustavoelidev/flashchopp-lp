import { Hero } from './components/Hero'
import { Problema } from './components/Problema'
import { Sistema } from './components/Sistema'
import { LojaOnline, Pedidos, Agendamento } from './components/Features'
import { Calculadora } from './components/Calculadora'
import { Dashboard, MaisRecursos, ParaQuem, Planos, CtaFinal, Footer } from './components/Sections'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Problema />
        <Sistema />
        <div id="modulos" className="scroll-mt-4">
          <LojaOnline />
          <Pedidos />
          <Agendamento />
          <Calculadora />
        </div>
        <Dashboard />
        <MaisRecursos />
        <ParaQuem />
        <Planos />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
