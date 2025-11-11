export interface Club {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  room: string;
  category: string;
  advisor: string;
  contactEmail: string;
  meetingTime: string;
  nextMeeting?: string;
  coordinates?: { lat: number; lng: number };
  socials?: {
    website?: string;
    instagram?: string;
    discord?: string;
  };
}

export const clubs: Club[] = [
  {
    slug: "tech-club",
    name: "Tech Club",
    shortDesc: "Explore the latest in technology and build amazing projects together",
    longDesc: "Tech Club is your gateway to innovation. Whether you're interested in coding, hardware, AI, or emerging tech trends, we provide hands-on workshops, guest speakers from the industry, and collaborative project opportunities.",
    room: "VGLE8109",
    category: "Technology",
    advisor: "Dr. Tech Smith",
    contactEmail: "techclub@piercecollege.edu",
    meetingTime: "Mondays 1:00 PM - 2:00 PM PST",
    nextMeeting: "Monday, 1:00 PM",
    coordinates: { lat: 34.185663, lng: -118.573097 }
  },
  {
    slug: "shpe",
    name: "SHPE (Society of Hispanic Professional Engineers)",
    shortDesc: "Build an inclusive community that empowers students in STEM",
    longDesc: "To build an inclusive community that empowers and fosters students in STEM. We aim to help our members realize their fullest potential by providing personal growth through mentorship, leadership development, networking, educational support, and community engagement.",
    room: "AT3804",
    category: "Engineering",
    advisor: "Prof. Maria Rodriguez",
    contactEmail: "shpe@piercecollege.edu",
    meetingTime: "Thursdays 2:00 PM - 3:00 PM PST",
    nextMeeting: "Thursday, 2:00 PM",
    coordinates: { lat: 34.184705, lng: -118.579943 }
  },
  {
    slug: "scientific-journal-club",
    name: "Pierce Science Journal Club",
    shortDesc: "Discuss cutting-edge scientific research and discoveries",
    longDesc: "Join us in exploring the latest scientific publications, discussing breakthrough research, and developing critical thinking skills. Perfect for aspiring scientists and curious minds alike.",
    room: "CFS920321",
    category: "Science",
    advisor: "Dr. Sarah Johnson",
    contactEmail: "sciencejournal@piercecollege.edu",
    meetingTime: "Every other Friday 1:45 PM - 2:45 PM PST",
    nextMeeting: "Friday, 1:45 PM",
    coordinates: { lat: 34.186134, lng: -118.579714 }
  },
  {
    slug: "math-club",
    name: "Math Club",
    shortDesc: "Solve challenging problems and explore mathematical concepts",
    longDesc: "Dive into the fascinating world of mathematics! From number theory to calculus competitions, we make math fun and accessible for everyone.",
    room: "MS2102",
    category: "Mathematics",
    advisor: "Prof. David Chen",
    contactEmail: "mathclub@piercecollege.edu",
    meetingTime: "Wednesdays 3:00 PM - 4:00 PM PST",
    nextMeeting: "Wednesday, 3:00 PM"
  },
  {
    slug: "physics-club",
    name: "Physics Club",
    shortDesc: "Explore the fundamental laws of the universe",
    longDesc: "From quantum mechanics to astrophysics, discover the wonders of physics through demonstrations, discussions, and hands-on experiments.",
    room: "SC1204",
    category: "Science",
    advisor: "Dr. Robert Williams",
    contactEmail: "physics@piercecollege.edu",
    meetingTime: "Tuesdays 2:30 PM - 3:30 PM PST",
    nextMeeting: "Tuesday, 2:30 PM"
  },
  {
    slug: "api-club",
    name: "API Club",
    shortDesc: "Learn to build and integrate powerful APIs",
    longDesc: "Master the art of API development and integration. Build real-world projects, learn industry best practices, and connect applications together.",
    room: "VGLE8105",
    category: "Technology",
    advisor: "Prof. Lisa Anderson",
    contactEmail: "apiclub@piercecollege.edu",
    meetingTime: "Fridays 12:00 PM - 1:00 PM PST",
    nextMeeting: "Friday, 12:00 PM"
  },
  {
    slug: "lego-club",
    name: "LEGO Club",
    shortDesc: "Build, create, and innovate with LEGO robotics",
    longDesc: "Combine creativity with engineering! Build LEGO robots, participate in competitions, and learn programming through hands-on projects.",
    room: "EN1302",
    category: "Engineering",
    advisor: "Prof. Michael Brown",
    contactEmail: "lego@piercecollege.edu",
    meetingTime: "Thursdays 3:30 PM - 4:30 PM PST",
    nextMeeting: "Thursday, 3:30 PM"
  },
  {
    slug: "women-in-stem",
    name: "Women in STEM",
    shortDesc: "Empowering women to excel in science and technology",
    longDesc: "A supportive community for women pursuing careers in STEM. Network with professionals, attend workshops, and break barriers together.",
    room: "SC2201",
    category: "Science",
    advisor: "Dr. Jennifer Lee",
    contactEmail: "womeninstem@piercecollege.edu",
    meetingTime: "Wednesdays 1:00 PM - 2:00 PM PST",
    nextMeeting: "Wednesday, 1:00 PM"
  },
  {
    slug: "girls-who-code",
    name: "Girls Who Code",
    shortDesc: "Learn coding in a supportive, inclusive environment",
    longDesc: "Join a global movement closing the gender gap in technology. Learn to code, build apps, and launch your tech career with an amazing community.",
    room: "VGLE8201",
    category: "Technology",
    advisor: "Ms. Angela Martinez",
    contactEmail: "girlswhocode@piercecollege.edu",
    meetingTime: "Mondays 2:30 PM - 3:30 PM PST",
    nextMeeting: "Monday, 2:30 PM"
  },
  {
    slug: "engineering-club",
    name: "Engineering Club",
    shortDesc: "Design, build, and innovate engineering solutions",
    longDesc: "Get hands-on engineering experience through projects, competitions, and industry partnerships. All engineering disciplines welcome!",
    room: "EN2401",
    category: "Engineering",
    advisor: "Prof. James Wilson",
    contactEmail: "engineering@piercecollege.edu",
    meetingTime: "Tuesdays 4:00 PM - 5:00 PM PST",
    nextMeeting: "Tuesday, 4:00 PM"
  },
  {
    slug: "chemistry-club",
    name: "Chemistry Club",
    shortDesc: "Experiment, discover, and explore the world of chemistry",
    longDesc: "Conduct exciting experiments, learn laboratory techniques, and discover how chemistry shapes our world. Safety goggles required!",
    room: "CH1505",
    category: "Science",
    advisor: "Dr. Patricia Green",
    contactEmail: "chemistry@piercecollege.edu",
    meetingTime: "Fridays 2:00 PM - 3:00 PM PST",
    nextMeeting: "Friday, 2:00 PM"
  },
  {
    slug: "chess-club",
    name: "Chess Club",
    shortDesc: "Master strategy and compete in tournaments",
    longDesc: "Whether you're a beginner or grandmaster, improve your chess skills, compete in tournaments, and enjoy the timeless game of strategy.",
    room: "LB3102",
    category: "Recreation",
    advisor: "Prof. Alexander Ivanov",
    contactEmail: "chess@piercecollege.edu",
    meetingTime: "Wednesdays 4:00 PM - 5:30 PM PST",
    nextMeeting: "Wednesday, 4:00 PM"
  }
];

export const categories = [
  "Technology",
  "Engineering",
  "Science",
  "Mathematics",
  "Recreation"
];
