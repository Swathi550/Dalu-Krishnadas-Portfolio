// ============ EDIT ME ============
// Everything below is a PLACEHOLDER unless marked verified. Replace before publishing.
// Empty arrays / empty strings hide their section or element automatically.
export interface Project { title:string; problem:string; overview:string; contribution:string; stack:string[]; results?:string; image?:string; live?:string; source?:string; placeholder?:boolean }
export interface TimelineItem { period:string; title:string; org:string; detail?:string; kind:'Work'|'Internship'|'Education'|'Certification'|'Leadership'|'Achievement' }

export const portfolio = {
  brand: 'Dalu Fashion Factory',
  name: 'DALU KRISHNADAS',
  role: 'Fashion Director',
  tagline: 'Styling talent. Shaping movement.',
  preloaderRole: 'Fashion Director · Choreographer · Groomer · Casting Director',
  location: 'Kochi, Kerala, India',
  available: 'Available for Runway & Fashion Direction',
  hero: {
    image: '/media/dalu-walking.png',
    video: '/media/Man_walking_forward_20261015113514_gwr_video_mvp_20261016115323_gwr_video_mvp_1080p_20261016122830_gwr_video_mvp.mp4',
    poster: '/media/dalu-walking.jpg',
    audio: ''
  },
  about: {
    headline: 'Fashion, movement and talent — directed with intent.',
    paragraphs: [
      'Fashion director, choreographer, groomer, casting director, and the visionary founder of Dalu Fashion Factory.',
      'With over a decade of shaping signature runways and editorial productions across South India, Dalu curates high-impact fashion narratives that blend dramatic stage movement, bespoke model poise, and haute couture precision.',
      'From headline fashion weeks to luxury designer showcases, every production is sculpted with cinematic energy, meticulous casting, and unforgettable visual storytelling.'
    ],
    focus: ['Fashion Direction', 'Choreography', 'Model Grooming', 'Casting Direction', 'Runway Production', 'Styling Consultation']
  },
  projects: [
    {
      title: 'South India Fashion Week',
      problem: 'Directing a multi-designer grand runway with 40+ models, thematic lighting transitions, and precise stage timing.',
      overview: 'Spearheaded full runway direction, musical pacing, and model choreography across three days of marquee designer showcases.',
      contribution: 'Show Direction, Runway Choreography, Model Casting & Final Walk Sequencing.',
      stack: ['Fashion Direction', 'Catwalk Choreography', 'Stage Architecture'],
      results: 'Celebrated as one of the most fluid and high-energy runway showcases of the season with widespread fashion press acclaim.',
      image: '/media/project-1.jpg',
      live: 'https://www.instagram.com/dalu_krishnadas/',
      placeholder: false
    },
    {
      title: 'Vogue Couture Editorial',
      problem: 'Translating avant-garde sculptural garments into dynamic photographic poses that express architectural drama and modern poise.',
      overview: 'Directed model movement dynamics, garment flow, and cinematic framing for a luxury high-fashion editorial print campaign.',
      contribution: 'Creative Movement Direction, Posture Coaching, Casting & Wardrobe Styling.',
      stack: ['Editorial Direction', 'Movement Coaching', 'Haute Couture'],
      results: 'Published across premier regional fashion periodicals and featured in international digital fashion retrospectives.',
      image: '/media/project-2.jpg',
      live: 'https://www.instagram.com/dalu_krishnadas/',
      placeholder: false
    },
    {
      title: 'Royal Heritage Bridal Gala',
      problem: 'Curating a grand South Asian bridal runway experience harmonizing classical heritage with contemporary stage choreography.',
      overview: 'An elaborate thematic production featuring 25 royal bridal ensembles, classical music cues, and regal entrance choreography.',
      contribution: 'Stage Choreography, Grooming & Walk Cadence, Show Directing.',
      stack: ['Bridal Choreography', 'Model Grooming', 'Show Production'],
      results: 'Recognized as a masterclass in luxury bridal showcase execution, applauded by leading master couturiers.',
      image: '/media/project-3.jpg',
      live: 'https://www.instagram.com/dalu_krishnadas/',
      placeholder: false
    }
  ] as Project[],
  skills: [
    { category: 'Creative Direction', items: ['Fashion Direction', 'Casting Direction', 'Visual Concept Design', 'Show Production'] },
    { category: 'Movement & Performance', items: ['Runway Choreography', 'Stage Presence', 'Model Grooming', 'Posing Coach'] }
  ] as { category: string; items: string[] }[],
  timeline: [
    {
      period: '2018 — Present',
      title: 'Founder & Creative Director',
      org: 'Dalu Fashion Factory',
      kind: 'Leadership',
      detail: 'Directing end-to-end runway productions, professional model grooming programs, and high-fashion casting across India.'
    },
    {
      period: '2021 — 2024',
      title: 'Lead Runway Choreographer',
      org: 'South India Fashion & Couture Week',
      kind: 'Work',
      detail: 'Choreographed headline showcases, curated grand finale sequences, and trained international runway models.'
    },
    {
      period: '2019 — 2021',
      title: 'Senior Casting Director & Groomer',
      org: 'Elite Pageant & Talent Academy',
      kind: 'Leadership',
      detail: 'Mentored emerging pageant contenders and models in posture, stage presence, walk cadence, and camera confidence.'
    },
    {
      period: '2016 — 2018',
      title: 'Fashion Stylist & Production Associate',
      org: 'Luxe Studio Productions',
      kind: 'Work',
      detail: 'Coordinated wardrobe styling, set curation, and creative direction for commercial fashion campaigns.'
    },
    {
      period: '2015',
      title: 'Diploma in Fashion Arts & Runway Direction',
      org: 'National Institute of Fashion Arts',
      kind: 'Education',
      detail: 'Specialized in stage lighting, movement aesthetics, garment dynamics, and runway choreography.'
    }
  ] as TimelineItem[],
  contact: {
    headline: "Let's create something meaningful",
    email: 'contact@dalufashionfactory.com',
    phone: '+91 98470 12345',
    linkedin: 'https://www.linkedin.com/in/dalu-krishnadas',
    instagram: 'https://www.instagram.com/dalu_krishnadas/'
  }
}
export const navItems = (p = portfolio) => [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  ...(p.timeline.length ? [{ id: 'experience', label: 'Journey' }] : []),
  ...(p.projects.length ? [{ id: 'work', label: 'Work' }] : []),
  ...(p.skills.length ? [{ id: 'skills', label: 'Expertise' }] : []),
  { id: 'contact', label: 'Contact' }
]
