export interface DataType {
  id: number | string;
  mine: boolean;
  msg: string;
  time: string;
}
export interface NavType {
  id: number | string;
  link: string;
}
export const data: DataType[] = [
  {
    id: 1,
    mine: true,
    msg: "This is my message",
    time: "5 mins ago",
  },
  {
    id: 2,
    mine: false,
    msg: "Yes! lorem ipsum...",
    time: "4 mins ago",
  },
  {
    id: 3,
    mine: true,
    msg: "This is poldit chat",
    time: "3 mins ago",
  },
  {
    id: 4,
    mine: false,
    msg: "This is the long answer. Hope it helps. In publishing and graphic design Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    time: "2 mins ago",
  },
  {
    id: 5,
    mine: true,
    msg: "This is the long answer. Hope it helps.",
    time: "1 mins ago",
  },
  {
    id: 6,
    mine: false,
    msg: "Hello whats up?",
    time: "just now",
  },
  {
    id: 7,
    mine: true,
    msg: "This is the long answer. Hope it helps. In publishing and graphic design Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    time: "just now",
  },
];

export const NavLinks: NavType[] = [
  { id: 1, link: "Profile" },
  { id: 2, link: "All Topics" },
  { id: 3, link: "About" },
  { id: 4, link: "How it Works" },
  { id: 5, link: "Suggestions" },
  { id: 6, link: "Support" },
  { id: 7, link: "Settings" },
];
