export const profile = {
  name: 'Harsh Kumar',
  initials: 'HK',
  role: 'Software Developer',
  tagline: 'Backend that holds the line under load.',
  location: 'Kanpur, IN',
  status: 'Open to full-stack roles',
  email: 'harshkumarr9251@gmail.com',
  phone: '+91 9555617287',
  phoneDisplay: '+91 95556 17287',
  links: {
    linkedin: 'https://linkedin.com/in/harsh-kumar-44a37a256',
    linkedinLabel: '/harsh-kumar-44a37a256',
    github: 'https://github.com/Harshkumarr911',
    githubLabel: '/Harshkumarr911',
    leetcode: 'https://leetcode.com/u/Harshkumar14/',
    leetcodeLabel: '/Harshkumar14',
  },
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const marqueeItems = [
  'JAVA',
  'SPRING BOOT',
  'REACT.JS',
  'MYSQL',
  'MONGODB',
  'REDIS',
  'JWT / RBAC',
  'Html',
  'CSS',
  'k6 LOAD TESTING',
]

export const stats = [
  { value: 2026, suffix: '', label: 'QUALIFIED GATE CSE 2026 conducted by IIT Guwahati' },
  { value: 0, suffix: '%', label: 'REQUEST FAILURES ACROSS 100,000+ ITERATIONS' },
  { value: 80, suffix: '%', label: 'ACCURACY — NLP EMERGENCY CLASSIFIER, 6 TYPES' },
  { value: 150, suffix: '+', label: 'DSA PROBLEMS SOLVED ON LEETCODE' },
]

export const aboutTimeline = [
  { year: '2022', text: 'Started B.Tech, Computer Science & Engineering, Allenhouse Institute of Technology.' },
  { year: '23-25', text: 'Continued academic and professional development. Skilled in Java, Spring Boot, React, MySQL, MongoDB etc.' },
  {year: '2025', text: "Completed the Internship on MERN stack" },
  { year: '2025', text: 'Took over as Team Lead on Athlete Arena — architecture, sprint planning, delivery.' },
  {year: '2026', text: 'Make the Team #1 in the final year project evaluation, Athlete Arena, Allenhouse Institute of Technology.'},
  { year: '2026', text: 'Graduated in June. Looking for full-stack / backend developer roles.' },
]

export const processSteps = [
  {
    num: '01',
    title: 'Discover',
    text: 'Understand the real constraint first — traffic pattern, latency budget, or team size — before writing a line of code.',
  },
  {
    num: '02',
    title: 'Architect',
    text: 'Layered Controller-Service-Repository design, data modeling, and picking the right cache or queue for the job.',
  },
  {
    num: '03',
    title: 'Build',
    text: 'Spring Boot services and React interfaces, committed in small reviewable pieces, tests written where they matter.',
  },
  {
    num: '04',
    title: 'Prove & Deploy',
    text: 'Run the code, deploy it, and run the load test with k6,JMeter, or Postman. & deploy to live on Renderw. Monitor and iterate.',
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'JavaScript', 'SQL'] },
  { title: 'Frontend', items: ['React JS', 'HTML', 'CSS', 'Responsive Design'] },
  {
    title: 'Backend',
    items: ['Spring', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'Socket.IO', 'Microservices', 'Multithreading'],
  },
  { title: 'Databases', items: ['MySQL', 'MongoDB', 'Redis'] },
  { title: 'Testing & Tools', items: ['JUnit', 'Postman', 'JMeter', 'k6', 'Git / GitHub', 'Playwright'] },
  { title: 'CS Core', items: ['DSA', 'OOP', 'DBMS', 'System Design'] },
]

export const beyondSkills = [
  { num: '01', title: 'Team Leadership', text: 'Led a 4-member engineering team as Team Lead through a full project lifecycle.' },
  { num: '02', title: 'Ownership', text: 'Owned system design, architecture, and technical decisions end to end.' },
  { num: '03', title: 'Sprint Planning', text: 'Ran sprint planning and kept feature delivery on schedule.' },
  { num: '04', title: 'Collaboration', text: ' Collaborated with cross-functional member to deliver a high-quality product.' },

]

export const projects = [
  {
    id: 'athlete-arena',
    period: '2025 — 2026 · CAPSTONE, TEAM LEAD',
    title: 'Athlete Arena',
    description:
      'A full-stack sports e-learning platform for three user roles, built on a layered Controller-Service-Repository architecture in Spring Boot.',
    bullets: [
      'Live 1:1 coaching, social feed, news, events, nearby places, self-paced videos',
      'JWT-secured endpoints; Redis for sessions and leaderboard caching',
      'Load tested to 4,000+ RPS across 100,000+ iterations at 0% failure',
    ],
    tags: ['React.js', 'Spring Boot', 'MySQL', 'Redis', 'JWT', 'k6'],
    metrics: [
      { value: '4,000+', label: 'RPS PEAK' },
      { value: '3', label: 'USER ROLES' },
      { value: '#1', label: 'TEAM SCORE' },
    ],
    terminal: [
      { k: '$', text: 'k6 run athlete-arena-load.js' },
      { k: '→', text: 'vus: ', v: '300', rest: ', duration: ', v2: '10m' },
      { k: '→', text: 'requests/sec: ', v: '4,021' },
      { k: '→', text: 'iterations: ', v: '104,382' },
      { k: '→', text: 'failed: ', v: '0%' },
    ],
    link: { label: 'Live site', href: 'https://athletearena-fitness-and-sports-services.onrender.com/' },
  },
  {
    id: 'emergency-rescue',
    period: '2026 · REAL-TIME SYSTEMS',
    title: 'Emergency Rescue Platform',
    description:
      'A real-time dispatch system built to cut campus safety broadcast latency, using Socket.IO for live updates across student, watchman, and admin roles.',
    bullets: [
      'NLP pipeline auto-categorizes 6 emergency types at ~80% accuracy',
      'JWT + RBAC across three role types, with rate limiting on every endpoint',
      'In active use by 1,000+ campus users',
    ],
    tags: ['Java', 'Spring Boot', 'React.js', 'MongoDB', 'Socket.IO'],
    metrics: [
      { value: '6', label: 'EMERGENCY TYPES' },
      { value: '80%', label: 'CLASSIFIER ACCURACY' },
      { value: '1,000+', label: 'CAMPUS USERS' },
    ],
    terminal: [
      { k: '$', text: 'classify_report --live' },
      { k: '→', text: 'type: ', v: 'fire', rest: ', confidence: ', v2: '0.83' },
      { k: '→', text: 'dispatch: ', v: 'watchman-02' },
      { k: '→', text: 'socket: ', v: 'connected' },
      { k: '→', text: 'latency: ', v: '~40ms' },
    ],
    link: { label: 'View on GitHub', href: 'https://github.com/Harshkumarr911' },
  },
  {
    id: 'log-monitoring',
    period: 'PORTFOLIO BUILD · OBSERVABILITY',
    title: 'Job Portal',
    description: 'A modern job portal built with React.js and Node.js, featuring a clean UI and seamless user experience.',
    bullets: [
      'Real-time job listings and application tracking with WebSocket integration',
      'JWT-based authentication and role-based access control for users and employers',
      'Implemented search and filter functionality for job listings using JPA and Specifications',
    ],
    tags: ['Spring Boot', 'React.js', 'MySQL',  'JWT', 'WebSocket'],
    metrics: [
      { value: 'Live Job Listings', label: 'STREAM DATA' },
      { value: '100+', label: 'Companies LISTED' },
    ],
    terminal: [
      { k: '$', text: 'tail -f service.log | alert' },
      { k: '→', text: 'index: ', v: 'logs-prod-*' },
      { k: '→', text: 'topic: ', v: 'error-events' },
      { k: '→', text: 'status: ', v: 'streaming' },
      { k: '→', text: 'alert_rule: ', v: 'armed' },
    ],
    link: { label: 'View on GitHub', href: 'https://github.com/Harshkumarr911' },
  },
]

export const featuredAchievement = {
  quote:
    'Lead the team as Team Lead, overseeing end-to-end technical execution — architecture, API design, feature delivery — while presenting progress to faculty mentors, and achieved the highest evaluation score among all teams on the project.',
  
  attribution: 'Final Year Project evaluation, Athlete Arena, Allenhouse Institute of Technology',
}

export const achievements = [
  { icon: 'Trophy', value: '#1 of all teams', label: 'Highest evaluation score, Athlete Arena capstone' },
  {icon: 'Award', value: 'Gate Quailified', label: 'Qualified Gate CSE 2026' },
  { icon: 'Award', value: 'Internship / Training', label: 'Internship - MERN Stack Technology -2025' },
  { icon: 'Code2', value: '200+ DSA Problems', label: 'DSA problems solved on LeetCode & Geeks for Geeks' },
  { icon: 'Award', value: 'Crio.do', label: 'Java Programming, Beginner to Advanced — 2025' },
  
]
