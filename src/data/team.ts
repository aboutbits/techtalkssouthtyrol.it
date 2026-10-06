export type TeamMember = {
  name: string
  image: string
  company?: string
  companyUrl?: string
  linkedinUrl?: string
}

export const team: TeamMember[] = [
  {
    name: 'Alex Lanz',
    image: '/images/team/alex-lanz.jpg',
    company: 'AboutBits',
    companyUrl: 'https://aboutbits.it',
  },
  {
    name: 'Martin Malfertheiner',
    image: '/images/team/martin-malfertheiner.jpg',
    company: 'AboutBits',
    companyUrl: 'https://aboutbits.it',
  },
  {
    name: 'Tobias Marmsoler',
    image: '/images/team/tobias-marmsoler.jpg',
    company: 'AboutBits',
    companyUrl: 'https://aboutbits.it',
  },
]
