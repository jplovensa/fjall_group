export interface Project {
  id: string
  title: string
  client: string
  location: string
  value: string
  img: string
  category: string
  materialFocus: string
  materialApplication: string
  description: string[]
  materials: string[]
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Nuanu Creative City',
    client: 'NUANU',
    location: 'Bali, Indonesia',
    value: '$1.8M',
    img: '/images/proj-nuanu-final.jpg',
    category: 'High-End Luxury Bespoke',
    materialFocus: 'COMPLEX GEOMETRY',
    materialApplication: 'Delivering complex geometries including a 360-degree IMAX dome and subterranean cave networks. Executed at a scale and speed previously thought impossible by standard masonry metrics.',
    description: [
      'A sprawling 44-hectare visionary development in Bali, spearheaded by Sergey Solonin. Nuanu demands architectural forms that defy conventional masonry.',
      "Fjäll's GX-100 panels allowed us to sculpt highly complex, futuristic geometries rapidly — successfully delivering a 360-degree IMAX dome cinema and complex cave structures that push the boundaries of what modular construction can achieve.",
    ],
    materials: ['GX 100 EPS Panels', 'BEMMELS Structural Reinforcement', 'Parametric Design System', '360° Dome Forming'],
  },
  {
    id: '02',
    title: 'Ulaman Eco Resort',
    client: 'INSPIRAL ARCHITECTS',
    location: 'Bali, Indonesia',
    value: '$1.6M',
    img: '/images/proj-ulaman.jpg',
    category: 'Commercial & Modular',
    materialFocus: 'ORGANIC INTEGRATION',
    materialApplication: 'Partnering with award-winning Inspiral design, our technology provided the unyielding, highly-insulated structural backbone beneath sweeping, organic bamboo architecture.',
    description: [
      'In partnership with Inspiral Architects, Fjäll delivered the unseen strength of Ulaman Eco Resort. The project showcases how our rigid, highly-insulated EPS panels integrate beneath sweeping organic structures.',
      'The result is a pristine eco-resort that breathes naturally while maintaining rigorous structural integrity required for high-end hospitality — proving sustainability and luxury can coexist.',
    ],
    materials: ['GX 100 Panels', 'Bamboo Integration', 'BEMMELS Anchors', 'Thermal Insulation Core'],
  },
  {
    id: '03',
    title: 'Bali Ocean Wedding',
    client: 'PRIVATE DEVELOPER',
    location: 'Uluwatu, Bali',
    value: '$800K',
    img: '/images/proj-wedding.jpg',
    category: 'High-End Luxury Bespoke',
    materialFocus: 'COASTAL RESILIENCE',
    materialApplication: 'Situated on the severe cliff edges of Uluwatu. Our lightweight materials slashed foundation requirements, while the BEMMELS structural frame guarantees immunity against aggressive coastal salt-air corrosion.',
    description: [
      'Prime coastal real estate requires rapid commercialisation. This project involved turning a dramatic Uluwatu cliff edge into a stunning, revenue-generating wedding destination.',
      'Our modular panel system enabled rapid deployment of a bespoke minimalist wedding chapel and luxury villa. The lightweight nature of our materials significantly reduced foundation costs on the cliff edge.',
    ],
    materials: ['Non-Corrosive BEMMELS Basalt Fiber', 'GX 100 Envelopes', 'Cliff-Edge Foundation Kit'],
  },
  {
    id: '04',
    title: 'Kuta Lombok Estates',
    client: 'YASU FUKUDA',
    location: 'Lombok, Indonesia',
    value: '$8M',
    img: '/images/proj-lombok.jpg',
    category: 'High-End Luxury Bespoke',
    materialFocus: 'MARINE ENVIRONMENT',
    materialApplication: 'Developing 7 high-end luxury coastal villas designed by architect Yasu Fukuda. Our MMC technology ensures rapid deployment while providing absolute resistance to the harsh marine environment.',
    description: [
      'An $8 million luxury development on the coast of Kuta, Lombok. Designing for the ocean requires materials that do not surrender to it.',
      'By utilising our BEMMELS volcanic rock fiber beams and EPS panels, these seven luxury villas are virtually immune to coastal weathering — ensuring the developer\'s legacy and the buyer\'s investment lasts for generations.',
    ],
    materials: ['BEMMELS Frame', 'GX 100 Weather-Tight Envelope', 'Coastal Resilience System'],
  },
  {
    id: '05',
    title: 'The Bamboo Lab',
    client: 'BAMBOOLAB ARCHITECT',
    location: 'Lombok, Indonesia',
    value: '$10M+',
    img: '/images/proj-bamboolab.jpg',
    category: 'Commercial & Modular',
    materialFocus: 'HYBRID SCALABILITY',
    materialApplication: 'A massive three-phase mega-project featuring a sprawling lab, luxury resort, and an underground club. We engineered the core hybrid infrastructure to blend bespoke requirements with immense scale.',
    description: [
      'The largest privately-owned development in Lombok, Bamboo Lab is a massive three-phase undertaking comprising a laboratory, underground club, and sprawling resort.',
      'Scaling organic architecture requires industrial strength. Fjäll Group\'s advanced materials act as the unyielding backbone, harmonizing with conventional building methods to deliver a true landmark destination.',
    ],
    materials: ['Hybrid BEMMELS & EPS Matrix', 'Multi-Phase Connectors', 'Subterranean Scalability Kit'],
  },
  {
    id: '06',
    title: 'Drop Pod Networks',
    client: 'FJÄLL GROUP',
    location: 'Bali / Japan',
    value: '$1.4M',
    img: '/images/proj-droppod.jpg',
    category: 'Commercial & Modular',
    materialFocus: 'EXTREME CLIMATE',
    materialApplication: 'Engineered for extreme versatility — from the tropical coasts of Bali and Lombok to the severe alpine conditions of Japan\'s ski resorts. The pinnacle of rapid, luxury deployment.',
    description: [
      'The Drop Pod Network represents the pinnacle of rapid, luxury deployment. Engineered for extreme versatility across dramatically different climates.',
      'Each unit adapts flawlessly from tropical coasts to severe alpine conditions, demonstrating the true global scalability of Fjäll\'s MMC technology and the resilience of BEMMELS and GX-100 in any environment.',
    ],
    materials: ['Thermal EPS Envelope', 'BEMMELS Structural Chassis', 'Climate-Adapt System'],
  },
  {
    id: '07',
    title: 'Lombok Housing Initiative',
    client: 'GOVERNMENT COMMISSION',
    location: 'Lombok, Indonesia',
    value: '250 Units',
    img: '/images/proj-lombok-housing.jpg',
    category: 'Fjäll Affordable Development',
    materialFocus: 'MASS DEPLOYMENT',
    materialApplication: 'Commissioned by the regional government to provide rapid, disaster-resilient housing solutions. We scaled our manufacturing infrastructure to successfully execute and deliver over 250 units at unprecedented speeds.',
    description: [
      'A government-commissioned initiative to provide rapid, disaster-resilient housing solutions following regional infrastructure challenges.',
      'Fjäll Group scaled its manufacturing infrastructure to deliver over 250 structurally superior units — each deploying in a fraction of traditional timelines, yet offering seismic resilience and thermal comfort that masonry cannot match.',
    ],
    materials: ['Mass-Scale GX100 Envelopes', 'Flat-Pack Deployment', 'Rapid Assembly System'],
  },
  {
    id: '08',
    title: 'Sulawesi Government Housing',
    client: 'GOVERNMENT COMMISSION',
    location: 'North Sulawesi, Indonesia',
    value: '1,500 Homes',
    img: '/images/proj-sulawesi.jpg',
    category: 'Fjäll Affordable Development',
    materialFocus: 'REMOTE ACCESSIBILITY',
    materialApplication: 'A massive undertaking involving the development of 1,500 affordable homes across regions with exceptionally difficult accessibility. Our lightweight flat-pack MMC technology bypassed traditional logistical nightmares.',
    description: [
      'A massive undertaking involving the development of 1,500 affordable homes across regions with exceptionally difficult accessibility.',
      'Our lightweight flat-pack MMC technology bypassed traditional logistical nightmares, delivering structurally superior housing to remote communities where traditional construction would be economically unviable.',
    ],
    materials: ['Flat-Pack GX 100', 'Lightweight BEMMELS Framework', 'Localised Skill Transfer'],
  },
]

export const productTiers = [
  {
    id: 'luxury',
    title: 'High-End Luxury Bespoke',
    tagline: 'Uncompromising architectural ambition.',
    desc: 'We deliver uncompromising architectural ambition with flawless monolithic finishes, providing the aesthetic of bespoke masonry without the traditional wait. Our BEMMELS framework provides absolute resistance to harsh marine environments and aggressive coastal salt-air corrosion.',
    examples: 'Kuta Lombok Estates, Bali Ocean Wedding',
  },
  {
    id: 'commercial',
    title: 'Commercial & Modular',
    tagline: 'Rapidly deployable B2B assets.',
    desc: 'We engineer rapidly deployable B2B assets and eco-resorts built for extreme climates. The Drop Pod Network demonstrates our global scalability, adapting flawlessly from tropical coasts to severe alpine conditions. Ulaman showcases our ability to integrate our structural backbone beneath sweeping organic architecture.',
    examples: 'Drop Pod Networks, Ulaman Eco Resort, Bamboo Lab',
  },
  {
    id: 'affordable',
    title: 'Fjäll Affordable Development',
    tagline: 'Mass-scale, rapid-deployment housing.',
    desc: 'We provide mass-scale, rapid-deployment housing designed to solve global shortages. This cost-effective methodology is structurally superior to traditional masonry, proven by our successful execution of the Lombok Housing Initiative, which rapidly deployed over 250 disaster-resilient units under government commission.',
    examples: 'Lombok Housing Initiative, Sulawesi Government Housing',
  },
]
