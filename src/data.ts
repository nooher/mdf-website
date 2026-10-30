/* Central content for the MDF site — charity facts, programmes, trustees.
 * All copy is final; only trustee photos and full biographies await MDF. */

export const CHARITY = {
  name: 'Muft Development Foundation',
  short: 'MDF',
  number: '1218194',
  regDate: '22 May 2026',
  regulator: 'Charity Commission for England and Wales',
  structure: 'Charitable Incorporated Organisation (CIO)',
  domain: 'muftdevelopmentfoundation.org.uk',
  // Only mailboxes that actually exist in Zoho. grants/safeguarding route to info@.
  email: 'info@muftdevelopmentfoundation.org.uk',
  donationsEmail: 'donations@muftdevelopmentfoundation.org.uk',
  grantsEmail: 'info@muftdevelopmentfoundation.org.uk',
  safeguardingEmail: 'info@muftdevelopmentfoundation.org.uk',
  office: 'Bexley, DA14 5PE, United Kingdom',
  registerUrl: 'https://register-of-charities.charitycommission.gov.uk/en/charity-search',
}

// Bank details for direct giving. These are published on the Donate page, so
// any change here changes what donors are told to pay into — treat with care.
export const BANK = {
  accountName: 'Muft Development Foundation',
  bank: 'Metro Bank',
  accountType: 'Community Account',
  sortCode: '23-05-80',
  accountNumber: '58462144',
  iban: 'GB96MYMB23058058462144',
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'Grants', to: '/grants' },
  { label: 'Events', to: '/events' },
  { label: 'News', to: '/news' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const VALUES = [
  { title: 'Faith', body: 'Islam treats giving as an obligation rather than a kindness. That is the starting point for everything here.' },
  { title: 'Knowledge', body: 'Most of the families we want to reach are held back by interrupted schooling, not by a lack of effort.' },
  { title: 'Growth', body: 'Relief is temporary by design. We would rather help a household reach the point where it no longer needs us.' },
  { title: 'Compassion', body: 'We keep records, answer awkward questions, and treat the people we help as people rather than cases.' },
]

export type Programme = {
  slug: string
  title: string
  tagline: string
  summary: string
  approach: string
  points: string[]
  who: string[]
  photo: string
  photoAlt: string
}

export const PROGRAMMES: Programme[] = [
  {
    slug: 'poverty-relief',
    title: 'Poverty Relief',
    tagline: 'Food, water, and help through a crisis',
    photo: '/photos/poverty-relief.jpg',
    photoAlt: 'Volunteers packing food and essential-supply donations for families in need',
    summary:
      'We give grants and practical help to households that cannot cover the basics. Food, clean water, medical costs, and the things that get a family through a bad month.',
    approach:
      'We would rather reach fewer people properly than many people badly. Help is arranged through local organisations we have checked ourselves, so money is spent where it was meant to go and can be accounted for afterwards. Where a household needs more than a single payment, we try to stay with it until things are steadier.',
    points: [
      'Emergency food, clean water, and essential supplies',
      'Support with medical treatment and basic necessities',
      'Grants for equipment, services, and facilities for those in need',
      'A focus on lasting change, not only immediate relief',
    ],
    who: [
      'Families facing hardship in the UK and abroad',
      'People affected by crisis, displacement, or disaster',
      'Those without access to food, clean water, or medical care',
      'Vulnerable households in need of essential support',
    ],
  },
  {
    slug: 'education',
    title: 'Education',
    tagline: 'Fees, books, and somewhere to study',
    photo: '/photos/education.jpg',
    photoAlt: 'A teacher supporting two students with their schoolwork at a classroom desk',
    summary:
      'We pay for the things that keep people in learning: fees and bursaries, books and equipment, and the supplementary classes that fill the gaps left by everything else.',
    approach:
      'Poverty and interrupted schooling usually arrive together. Our education work is aimed at the moment a young person is about to drop out over a sum of money that is small to us and decisive to them, and at the teachers and classrooms that make staying worth it.',
    points: [
      'Supplementary schools and study support',
      'Scholarships and bursaries for those who need them',
      'Educational resources, equipment, and facilities',
      'Adult and community learning',
    ],
    who: [
      'Children and young people without access to quality education',
      'Students who need financial support to keep learning',
      'Communities lacking learning resources or facilities',
      'Adults seeking to build skills and literacy',
    ],
  },
  {
    slug: 'youth-development',
    title: 'Youth Development',
    tagline: 'Somewhere to go, someone to learn from',
    photo: '/photos/youth-development.jpg',
    photoAlt: 'A diverse group of young people collaborating and smiling together indoors',
    summary:
      'We fund activities, training, and mentoring for young people who have few safe places to spend their time and few adults to learn from.',
    approach:
      'Young people are not a problem to be managed. Most of this work is unglamorous: paying for a hall, a coach, a course, or the bus fare to get there. What actually changes things is that somebody turns up week after week, so we fund the kind of programme that lasts a year rather than a weekend.',
    points: [
      'Recreational and leisure activities for social welfare',
      'Skills training and personal development',
      'Mentoring and positive role models',
      'Pathways to work, volunteering, and civic life',
    ],
    who: [
      'Young people at risk of exclusion or disadvantage',
      'Those who benefit from mentoring and role models',
      'Youth seeking skills, activities, and belonging',
      'Communities investing in the next generation',
    ],
  },
  {
    slug: 'islamic-education',
    title: 'Islamic Education',
    tagline: 'Support for madrasas and Qur’anic learning',
    photo: '/photos/islamic-education.jpg',
    photoAlt: 'Children reading together with focus and concentration at a community madrasa',
    summary:
      'We support madrasas and Qur’anic learning in accordance with the Holy Qur’an and the Sunnah of the Prophet Muhammad ﷺ.',
    approach:
      'Community madrasas tend to run on donated time and borrowed rooms. We help with the practical side of that: teaching materials, safe premises, and training for the volunteers who do the teaching. Classes we support are open to anyone who wants to attend.',
    points: [
      'Qur’anic and Sunnah-based education and Islamic studies',
      'Support for community madrasas',
      'Values of compassion, honesty, and service',
      'Programmes open and welcoming to the whole community',
    ],
    who: [
      'Children and adults seeking Qur’anic and Islamic learning',
      'Community madrasas and places of learning',
      'Families wanting grounding in faith and values',
      'Anyone drawn to learn, of any background',
    ],
  },
]

export type WorkStep = { title: string; body: string }
export const HOW_WE_WORK: WorkStep[] = [
  { title: 'Finding out what is needed', body: 'We ask people directly rather than deciding on their behalf. Where we do not know a community well, we go through someone who does.' },
  { title: 'Checking who we work with', body: 'Before any money moves there is paperwork, references, and a frank conversation about how funds will be handled and recorded.' },
  { title: 'Sending it where it was meant to go', body: 'A gift given for a purpose is spent on that purpose. A transfer marked Zakat reaches only those eligible to receive it.' },
  { title: 'Showing our working', body: 'We keep a record of what came in and what it paid for, and report each year to our trustees and to the Charity Commission.' },
]

// Trustee `photo` — drop a file in /public/trustees/ and set the path here
// (e.g. '/trustees/zahara.jpg'); the card shows the photo, else a monogram.
// `bio` paragraphs are separated by \n\n; omit for trustees without one yet.
export type Trustee = { name: string; role: string; term: string; photo?: string; bio?: string }
export const TRUSTEES: Trustee[] = [
  {
    name: 'Hajjat Zahara Dattani',
    role: 'Chairperson',
    term: 'Founder · 9-year term',
    photo: '/trustees/zahara.jpg',
    bio: 'Hajjat Zahara Dattani is a Tanzanian-born entrepreneur, community leader, and humanitarian based in Surrey, England. She is the Founder, Chief Executive Officer, and International Chairperson of the Taawanu Islamic Foundation, an organisation dedicated to community development, economic empowerment, and social welfare across East Africa.\n\nIn the United Kingdom, Hajjat Zahara leads a healthcare company supporting young adults living with mental health challenges and learning disabilities. She also holds several business interests in Africa, including Zahra Pure Drinking Water, real estate, and a logistics services company operating across East, Central, and Southern Africa.\n\nThrough the Taawanu Islamic Foundation, she has led initiatives providing clean-water infrastructure, entrepreneurship training and economic-empowerment opportunities, and support for orphans, widows, and other vulnerable groups, while advancing Islamic values and educational development.\n\nHajjat Zahara is a committed advocate for education and youth empowerment, frequently invited as a guest speaker at higher-learning institutions — including the Muslim University of Morogoro (MUM), which invited her in July 2026 to address students on academic and career development — and at joint-university forums in Dar es Salaam. She consistently advocates for girls’ education, youth discipline, entrepreneurship, and community advancement.',
  },
  { name: 'Mr. Salim Jumbe Mwawegu', role: 'Treasurer', term: 'Founder · 9-year term', photo: '' },
  {
    name: 'Ms. Ruriko Mohamed Mubago',
    role: 'Safeguarding Lead',
    term: 'Founder · 9-year term',
    photo: '/trustees/ruriko.jpg',
    bio: 'Ruriko is a dedicated Safeguarding Lead who is passionate about serving her community with compassion, integrity, and a strong sense of amanah (trust). She is committed to promoting the wellbeing, dignity, and safety of individuals by helping to create environments where everyone feels respected, valued, and protected.\n\nIn addition to her professional role, Ruriko volunteers as a Madrasa Teaching Assistant at Barking Islamic Centre, where she supports young learners in developing a love for Islam, strengthening their faith, and growing in Islamic knowledge and good character. She considers it a privilege to contribute to the education and nurturing of the next generation through Islamic teaching and guidance.\n\nGuided by the values of khidmah (service), ihsan (excellence), and rahmah (mercy), Ruriko strives to make a positive and lasting impact within her community, praying that her efforts are accepted by Allah (SWT) and serve as a means of benefit for those around her.',
  },
  {
    name: 'Mrs. Moza Ali Said Abdallah',
    role: 'Secretary',
    term: 'Founder · 9-year term',
    photo: '/trustees/moza.jpg',
    bio: 'Moza Ali Said Abdallah holds a Bachelor of Arts in Law and is a qualified Early Years Educator. She serves as Secretary of Muft Development Foundation, where she provides leadership in governance, administrative coordination, and organisational communication.\n\nDrawing on her legal background and passion for education and community development, she is committed to promoting transparency, accountability, and effective collaboration in support of the Foundation’s mission. Moza is dedicated to advancing initiatives that alleviate poverty, expand access to education, empower young people, and promote Islamic values in accordance with the teachings of the Holy Qur’an and the Sunnah of the Prophet Muhammad ﷺ.',
  },
  {
    name: 'Mr. Hassan Mdimu Mshangama',
    role: 'Trustee, Grants & Partnerships',
    term: 'Founder · 9-year term',
    photo: '/trustees/hassan.jpg',
    bio: 'Hassan is the Trustee Founder of Muft Development Foundation, a charitable organisation dedicated to advancing community development through education, healthcare, and humanitarian initiatives.\n\nProfessionally, Hassan is a Business and Healthcare Management graduate at Anglia Ruskin University (ARU), and the Managing Director of a care agency providing high-quality, person-centred services to young adults and older people. He is committed to delivering compassionate care that promotes dignity, independence, and wellbeing while leading excellence in health and social care.',
  },
  {
    name: 'Miss. Mariam Omar Lyambila',
    role: 'Trustee, Communications',
    term: 'Founder · 9-year term',
    photo: '/trustees/mariam.jpg',
    bio: 'Mariam Omar is a Founder Member and Trustee of the Foundation, and a passionate communications professional, mentor, entrepreneur, and philanthropist with over 20 years of experience across media, communications, culinary arts, and community development.\n\nA former senior communications and editorial leader at the BBC, she has specialised in strategic communications, media relations, and politically sensitive content — leading multidisciplinary teams and shaping high-impact messaging across broadcast, digital, and social media in the UK and internationally, with particular expertise in stakeholder engagement and crisis communications.\n\nBeyond media, Mariam is a senior professional in the catering industry, with more than two decades of culinary experience including private catering for diplomats, clergy, and high-profile clients. She is also a dedicated mentor, having supported the establishment of several media organisations in the region and nurtured the next generation of professionals.\n\nAbove all, Mariam has always been a philanthropist at heart. Long before the Foundation was established, she dedicated her time and resources to supporting orphans, widows, people living with disabilities, and families struggling to make ends meet — values instilled in her from an early age. As a founder member and trustee, she continues this lifelong commitment to serving others and helping create opportunities and hope for vulnerable communities.',
  },
]

// Social channels. URLs are stored without the share-tracking parameters the
// apps append when you copy a link (igsh, _t, si) — those identify whoever
// copied it and do not belong on a public page. Keep this list in sync with
// the sameAs array in index.html.
export type Social = { name: string; url: string }
export const SOCIALS: Social[] = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61593026826306' },
  { name: 'Instagram', url: 'https://www.instagram.com/muft_development_foundation_uk' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/muft-development-foundation-uk' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@muft_development' },
  { name: 'YouTube', url: 'https://www.youtube.com/@muftdevelopmentfoundationuk' },
]
export const ACTIVE_SOCIALS = SOCIALS.filter(s => s.url.trim().length > 0)

// Structural facts about the charity — framed as "At a glance", NOT impact,
// because MDF is newly registered with no delivered outcomes to report yet.
export const AT_A_GLANCE = [
  { value: '4', label: 'Charitable purposes' },
  { value: '9', label: 'Year trustee terms' },
  { value: '6', label: 'Founder trustees' },
  { value: '2026', label: 'Registered with the Charity Commission' },
]

export const DONATE_AMOUNTS = [10, 25, 50, 100]

export type Faq = { q: string; a: string }
export const FAQS: Faq[] = [
  { q: 'Are you a registered charity?', a: 'Yes. We are registered with the Charity Commission for England and Wales as a Charitable Incorporated Organisation, number 1218194. You can look us up on the public register without taking our word for it.' },
  { q: 'How do I make a donation?', a: 'By bank transfer. The account details are on the Donate page. A transfer carries no card fees, so the whole of your gift reaches the charity. Use your surname as the payment reference and we will know who to thank.' },
  { q: 'Is my donation Zakat-eligible?', a: 'Our poverty-relief and education work falls within the categories eligible for Zakat. Mark your transfer ZAKAT and we hold it separately, so that it reaches only those entitled to receive it.' },
  { q: 'How do I know my money is used well?', a: 'At this stage you cannot judge us on results, because we have not delivered any yet. What you can check is our constitution, our registration certificate, and who our trustees are. All of it is on this site. Our first annual accounts will be filed with the Charity Commission and published in full.' },
  { q: 'Do you help only Muslims?', a: 'No. Our values come from Islam, but nobody is asked about their faith before being helped, and nobody is asked to take part in anything religious in order to receive it.' },
  { q: 'Where do you work?', a: 'Our constitution allows us to work in the United Kingdom and overseas. In practice we will start where our trustees already have people they trust, and grow from there rather than announcing a map we cannot yet cover.' },
  { q: 'How can I get involved?', a: 'Give once or by standing order, offer a skill, or bring us a project you think we should fund. A small charity at the beginning has more use for a good introduction than for almost anything else.' },
  { q: 'How can I contact you?', a: 'Email info@muftdevelopmentfoundation.org.uk or use the form on the contact page. There is no inbox team here. A trustee reads what you send.' },
]
