import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const images = {
  hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=88',
  room: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=88',
  deck: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=88',
  session: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=88',
  social: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=88',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=88',
  evening: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=88',
  room2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=88',
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: .14 })
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

gsap.registerPlugin(ScrollTrigger)

function useCinematicMotion(scopeRef) {
  useLayoutEffect(() => {
    const root = scopeRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 901px)', () => {
        gsap.to('.hero', {
          backgroundPosition: '50% 62%',
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
        })

        gsap.to('.hero-content', {
          yPercent: 18,
          scale: .94,
          opacity: .45,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
        })

        gsap.to('.s-left', {
          y: -110,
          x: 35,
          rotate: -13,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
        })

        gsap.to('.s-right', {
          y: 95,
          x: -28,
          rotate: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.15 }
        })

        gsap.utils.toArray('.story-image,.feature-image,.deck-band,.event-image,.tour-visual,.case-hero-image').forEach((el) => {
          gsap.fromTo(el,
            { backgroundPosition: '50% 42%' },
            { backgroundPosition: '50% 62%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }
          )
        })

        gsap.utils.toArray('.pillar').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 70 + i * 16, scale: .96 },
            { y: -24 - i * 8, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'bottom 30%', scrub: 1 } }
          )
        })

        gsap.utils.toArray('.tour-step').forEach((el) => {
          const visual = el.querySelector('.tour-visual')
          const copy = el.querySelector('div:nth-child(2)')
          if (visual) gsap.fromTo(visual, { y: 80 }, { y: -50, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } })
          if (copy) gsap.fromTo(copy, { y: 28 }, { y: -20, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 30%', scrub: 1 } })
        })
      })

      mm.add('(max-width: 900px)', () => {
        gsap.to('.hero-content', {
          y: 42,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }
        })
        gsap.utils.toArray('.story-image,.feature-image,.deck-band,.event-image,.tour-visual,.case-hero-image').forEach((el) => {
          gsap.fromTo(el,
            { backgroundPosition: '50% 46%' },
            { backgroundPosition: '50% 56%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .8 } }
          )
        })
      })

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const headings = el.querySelectorAll('h1,h2,h3,h4,h5,.eyebrow,.script')
        if (!headings.length) return
        gsap.from(headings, {
          y: 34,
          opacity: 0,
          duration: .9,
          stagger: .08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true }
        })
      })

      return () => mm.revert()
    }, root)

    return () => ctx.revert()
  }, [])
}

function Brand({ small = false }) {
  return <a className={`brand ${small ? 'brand--small' : ''}`} href="/">
    <span>ROOTMANSION</span>
    <small>TAKORADI · GHANA</small>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Brand small />
    <nav className={open ? 'nav open' : 'nav'}>
      <a href="/#stay">Stay</a>
      <a href="/#deck">The Deck</a>
      <a href="/#sessions">Root Sessions</a>
      <a href="/tour">Vision Tour</a>
      <a href="/case-study">Case Study</a>
    </nav>
    <a className="pill pill-gold desktop-cta" href="#contact">Book a Stay</a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? '×' : '☰'}</button>
  </header>
}

function Footer() {
  return <footer className="footer">
    <Brand small />
    <div className="footer-center">STAY · THE DECK · ROOT SESSIONS · TAKORADI</div>
    <div className="footer-note">GOOD MUSIC<br/>BETTER PEOPLE</div>
  </footer>
}

function Home() {
  const scope = useRef(null)
  useReveal()
  useCinematicMotion(scope)
  return <main ref={scope}>
    <Header />
    <section className="hero" style={{'--bg': `url(${images.hero})`}}>
      <div className="hero-shade"/>
      <div className="grain"/>
      <div className="hero-content">
        <div className="eyebrow">TAKORADI · GHANA</div>
        <h1>ROOTMANSION</h1>
        <div className="brushline"/>
        <h2>STAY. DRINK. GATHER.</h2>
        <p>A spacious harbour-side stay and open deck made for good food, drinks, people and easy Takoradi nights.</p>
        <div className="hero-actions">
          <a className="pill pill-gold" href="#stay">Book a Stay <span>→</span></a>
          <a className="pill pill-outline" href="#sessions">See What's On</a>
        </div>
      </div>
      <div className="scribble s-left">Good Music<br/>Good People<br/>Better Views</div>
      <div className="scribble s-right">Different rhythms.<br/>Same coast.</div>
      <a className="scroll-cue" href="#story">SCROLL ↓</a>
    </section>

    <section id="story" className="story split" data-reveal>
      <div className="story-copy">
        <div className="eyebrow gold">OUR STORY</div>
        <h3>A House<br/>With a Rhythm</h3>
        <p>RootMansion is a relaxed stay, spacious open deck and social house overlooking Takoradi Harbour — built for travellers, friends, food, drinks and the kind of evenings that stretch naturally into night.</p>
        <div className="script">More Than A Stay</div>
      </div>
      <div className="story-image" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.2),rgba(0,0,0,.15)),url(${images.deck})`}}>
        <div className="vertical-words">PEOPLE · MUSIC · CULTURE · TAKORADI · ALWAYS</div>
      </div>
    </section>

    <section className="pillars">
      {[
        ['stay','STAY','Private rooms for weekends, stopovers and longer stays.',images.room],
        ['deck','THE DECK','Drinks, food, harbour air and Takoradi evenings.',images.deck],
        ['sessions','ROOT SESSIONS','On selected nights: acoustic sets, dub poetry, selectors and intimate live moments.',images.session],
      ].map(([id,title,copy,img]) => <a id={id} key={id} href={id==='sessions'?'#event':'#contact'} className="pillar" style={{backgroundImage:`linear-gradient(180deg,transparent 35%,rgba(0,0,0,.88)),url(${img})`}} data-reveal>
        <div><h4>{title}</h4><p>{copy}</p></div><span>→</span>
      </a>)}
    </section>

    <section className="feature feature-stay" data-reveal>
      <div className="feature-image" style={{backgroundImage:`url(${images.room2})`}}/>
      <div className="feature-copy">
        <div className="eyebrow gold">STAY ABOVE THE HARBOUR</div>
        <h3>Wake up where<br/>the city meets<br/>the water.</h3>
        <p>Warm rooms, slow mornings, harbour air. RootMansion turns the overnight stay into part of the story — not an afterthought.</p>
        <a className="text-link" href="#contact">Explore the rooms →</a>
      </div>
    </section>

    <section className="deck-band" style={{backgroundImage:`linear-gradient(90deg,rgba(9,8,6,.88),rgba(9,8,6,.18)),url(${images.deck})`}} data-reveal>
      <div>
        <div className="eyebrow gold">THE DECK</div>
        <h3>Sunset has<br/>a table here.</h3>
        <p>Good food. Cold drinks. Harbour lights. A place to arrive early and leave late.</p>
        <a className="pill pill-outline" href="#contact">Reserve a Table</a>
      </div>
    </section>

    <section id="event" className="event" data-reveal>
      <div className="event-copy">
        <div className="eyebrow gold">UPCOMING · CONCEPT EVENT</div>
        <h3>ROOT SESSIONS <span>#001</span></h3>
        <h5>An Evening at RootMansion</h5>
        <p>Not a concert. Just a good night at the house — drinks flowing, people talking, and a small live set or selector adding texture to the evening.</p>
        <div className="meta">SATURDAY EVENING · ROOTMANSION, TAKORADI</div>
        <div className="hero-actions">
          <a className="pill pill-gold" href="#contact">Reserve</a>
          <a className="pill pill-outline" href="/tour">See the Vision</a>
        </div>
      </div>
      <div className="event-image" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.12),rgba(0,0,0,.55)),url(${images.evening})`}}>
        <div className="scribble event-scribble">Music<br/>People<br/>Place<br/>Purpose</div>
      </div>
    </section>

    <section className="gallery-strip">
      {[images.deck,images.food,images.room2,images.room].map((img,i)=><div key={i} style={{backgroundImage:`url(${img})`}} />)}
    </section>

    <section id="contact" className="closing" data-reveal>
      <div className="eyebrow gold">ROOTMANSION · TAKORADI</div>
      <h3>Come for the view.<br/><em>Stay for the rhythm.</em></h3>
      <p>Rooms, reservations, private gatherings and live sessions.</p>
      <a className="pill pill-gold" href="https://wa.me/" target="_blank">Start a WhatsApp Conversation →</a>
      <small>Concept experience — sample rooms, events and booking flows are illustrative.</small>
    </section>
    <Footer />
  </main>
}

const tourSteps = [
  ['01','THE PLACE','RootMansion already has the hardest part: a real place, a harbour-facing setting, space to gather and a founder with a distinct cultural identity.'],
  ['02','THE OPPORTUNITY','Turn a physical venue into a destination people can discover before they arrive — and remember after they leave.'],
  ['03','STAY','Comfortable rooms give visitors a reason to stay close to the harbour, the deck and the social atmosphere instead of just passing through Takoradi.'],
  ['04','THE DECK','The harbour-facing deck is the social heart: plenty of space, food, drinks, sunset, conversations and private gatherings.'],
  ['05','ROOT SESSIONS','Occasional Root Sessions give the house a cultural signature without turning it into a concert venue — acoustic sets, poetry, selectors and small live moments that fit the room.'],
  ['06','THE FLYWHEEL','One good evening can become dozens of touchpoints: atmosphere → food and drinks → a short live moment → clips → social discovery → booking → return visit.'],
]

function Tour() {
  const scope = useRef(null)
  useReveal()
  useCinematicMotion(scope)
  return <main ref={scope} className="tour-page">
    <Header />
    <section className="tour-hero" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.2),#090806 98%),url(${images.hero})`}}>
      <div className="eyebrow">ROOTMANSION · VISION TOUR</div>
      <h1>From a place<br/><em>to a destination.</em></h1>
      <p>A visual concept for what RootMansion could become online and in culture.</p>
      <span className="scroll-cue static">SCROLL ↓</span>
    </section>
    {tourSteps.map(([n,kicker,copy],i)=><section key={n} className={`tour-step ${i%2?'reverse':''}`} data-reveal>
      <div className="tour-number">{n}</div>
      <div><div className="eyebrow gold">{kicker}</div><h2>{copy.split(' — ')[0]}</h2><p>{copy}</p></div>
      <div className="tour-visual" style={{backgroundImage:`url(${[images.deck,images.deck,images.room,images.food,images.session,images.evening][i]})`}}/>
    </section>)}
    <section className="ecosystem" data-reveal>
      <div className="eyebrow gold">ONE NIGHT · MANY SURFACES</div>
      <h2>ROOT SESSIONS #001</h2>
      <p>One evening becomes a content and commerce system.</p>
      <div className="ecosystem-grid">
        {['THE EVENING','REEL / SHORT','FACEBOOK POST',"WHAT'S ON",'TABLE RESERVATION','STAY THE NIGHT'].map((x,i)=><div key={x} className="eco-card">
          <span>0{i+1}</span><strong>{x}</strong><small>{['Capture the atmosphere','Publish the moment','Build local reach','Show what is happening','Convert interest','Extend the experience'][i]}</small>
        </div>)}
      </div>
    </section>
    <section className="tour-end" data-reveal>
      <div className="eyebrow gold">THE BIGGER PLAY</div>
      <h2>Not a website.<br/><em>A digital home for the venue.</em></h2>
      <div className="hero-actions"><a href="/" className="pill pill-outline">View the Demo</a><a href="/case-study" className="pill pill-gold">Open the Case Study →</a></div>
    </section>
    <Footer/>
  </main>
}

function CaseStudy() {
  const scope = useRef(null)
  useReveal()
  useCinematicMotion(scope)
  const sections = useMemo(()=>[
    ['CURRENT STATE','The signal is already there.','Blakka Route has an authentic music and performance identity, while RootMansion introduces a physical hospitality and social space. The current public digital footprint is Facebook-first, which means the opportunity is not to “fix” a brand — it is to give an emerging one a proper home.'],
    ['BRAND SYSTEM','Three reasons to come.','STAY gives travellers a home. THE DECK gives Takoradi a spacious place to eat, drink and gather. ROOT SESSIONS adds occasional cultural programming people can follow and share without making performance the whole identity.'],
    ['REVENUE SURFACES','More than room nights.','Accommodation. Food and drinks. Table reservations. Private gatherings and selective event hire. Over time: ticketed sessions, artist residencies, brand events, creator stays and direct booking.'],
    ['CONTENT ENGINE','The venue creates its own marketing.','Every sunset, meal, gathering, guest story and occasional live moment becomes material. Live clips feed Reels, TikTok, Facebook and YouTube. Those surfaces drive discovery back to an owned event and booking experience.'],
    ['FUTURE SYSTEM','Start visual. Add machinery when demand earns it.','Direct room booking, event ticketing, a live calendar, WhatsApp automation, artist/session archives, email and SMS, analytics, and eventually a repeatable content workflow.'],
  ],[])
  return <main ref={scope} className="case-page">
    <Header/>
    <section className="case-hero" data-reveal>
      <div><div className="eyebrow gold">CONCEPT CASE STUDY · 2026</div><h1>Building a digital home<br/>for <em>RootMansion.</em></h1><p>Hospitality, social life and Takoradi harbour atmosphere — brought into one coherent experience.</p></div>
      <div className="case-hero-image" style={{backgroundImage:`url(${images.deck})`}}/>
    </section>
    <section className="case-intro" data-reveal><span>THE IDEA</span><h2>RootMansion should not feel like an Airbnb, and it should not feel like a concert venue either.</h2><p>It should feel like a spacious Takoradi social house you can eat, drink, gather and stay in — with culture woven through it.</p></section>
    {sections.map(([eyebrow,title,copy],i)=><section className="case-row" key={eyebrow} data-reveal>
      <div className="case-index">0{i+1}</div><div><div className="eyebrow gold">{eyebrow}</div><h3>{title}</h3></div><p>{copy}</p>
    </section>)}
    <section className="system-map" data-reveal><div className="eyebrow gold">THE ROOTMANSION LOOP</div><div className="loop">{['EXPERIENCE','CAPTURE','PUBLISH','DISCOVER','BOOK','RETURN'].map((x,i)=><div key={x}><span>0{i+1}</span>{x}</div>)}</div></section>
    <section className="case-close" data-reveal><h2>A place with rhythm<br/>deserves a brand with one.</h2><p>This demo is a concept experience. Photography, room details, event names and booking flows are placeholders until RootMansion’s real launch assets are captured.</p><a href="/" className="pill pill-gold">Enter RootMansion →</a></section>
    <Footer/>
  </main>
}

export default function App(){
  const path = window.location.pathname
  if(path.startsWith('/tour')) return <Tour/>
  if(path.startsWith('/case-study')) return <CaseStudy/>
  return <Home/>
}

