export interface NavType {
  id: number | string;
  link: string;
  url: string;
}

export interface Pollquestion {
  id: number;
  question: string;
  images: boolean;
  type: string;
}

export const NavLinks: NavType[] = [
  { id: 1, link: "Profile", url: "Profile" },
  { id: 2, link: "All Topics", url: "Profile" },
  { id: 3, link: "About", url: "Profile" },
  { id: 4, link: "How it Works", url: "Profile" },
  { id: 5, link: "Suggestions", url: "Profile" },
  { id: 6, link: "Support", url: "Profile" },
  { id: 7, link: "Settings", url: "Profile" },
];

export const data: Pollquestion[] = [
  {
    id: 1,
    question: "This is 1st Qestion about Polldit?",
    images: false,
    type: "openEnded",
  },
  {
    id: 2,
    question:
      "This is the long answer. Hope it helps. In publishing and graphic design Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    images: false,
    type: "multiChoice",
  },
  {
    id: 3,
    question:
      "If the only thing you care about configuring is the language server's settings, you might be able to use the on_init hook and the workspace did Change Configuration notification",
    images: true,
    type: "openEnded",
  },
  {
    id: 4,
    question:
      "Most of the tutorials that I've read on arrays in JavaScript (including w3schools and devguru) suggest that you can initialize an array with a certain length by passing an integer to the Array constructor using the var test = new Array(4); syntax. Before doing this, please familiarize yourself with the risk of automatically running project local code in the lua interpreter. If the only thing you care about configuring is the language server's settings, you might be able to use the on_init hook and the workspace/didChangeConfiguration notification. This is the long answer. Hope it helps. In publishing and graphic design Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    images: false,
    type: "openEnded",
  },
  {
    id: 5,
    question:
      "Before doing this, please familiarize yourself with the risk of automatically running project local code in the lua interpreter.",
    images: true,
    type: "multiChoice",
  },
];

export const images = [
  "https://i.redd.it/rv4p5dsebk831.png",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg",
  "https://media.cntraveler.com/photos/60596b398f4452dac88c59f8/4:3/w_3556,h_2667,c_limit/MtFuji-GettyImages-959111140.jpg",
];

export const topics: string[] = [
  "All",
  "Art",
  "Music",
  "Parenting",
  "Sports",
  "Technology",
  "Coding",
  "Gaming",
  "Esports",
];
export const subtopics = [
  {
    topic: "Sports",
    subtopics: ["Baseball", "Basketball", "Football", "Golf", "Cricket"],
  },
  {
    topic: "Music",
    subtopics: [
      "Pop",
      "Hiphop",
      "Rap",
      "Trap",
      "Dubstep",
      "Country",
      "Dance",
      "Classical",
      "Blues",
      "Jazz",
      "Orhcestra",
      "Funk",
      "Rnb",
      "Rock",
      "Heavy Metal",
      "Electro",
      "Punk Rock",
      "Techno",
      "Soul",
      "Trance",
    ],
  },
  {
    topic: "Technology",
    subtopics: [
      "Deep Learning",
      "Robotics",
      "Cryptocurrency",
      "Mobile Development",
      "Augmented Reality",
    ],
  },
];
