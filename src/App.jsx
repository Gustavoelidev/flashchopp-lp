import { MotionConfig } from 'framer-motion'
import { Hero, Nav } from './components/Hero'
import { Problema } from './components/Problema'
import { Sistema } from './components/Sistema'
import { LojaOnline, Pedidos, Agendamento } from './components/Features'
import { Calculadora } from './components/Calculadora'
import { TickerPedidos, AppWall } from './components/Infinite'
import { Faq } from './components/Faq'
import { Dashboard, MaisRecursos, ParaQuem, Planos, CtaFinal, Footer } from './components/Sections'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <Hero />
      <TickerPedidos />
      <main>
        <Problema />
        <div id="funcionalidades" className="scroll-mt-16">
          <Sistema />
          <LojaOnline />
          <Pedidos />
          <Agendamento />
          <Calculadora />
        </div>
        <AppWall />
        <Dashboard />
        <MaisRecursos />
        <ParaQuem />
        <Planos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </MotionConfig>
  )
}
