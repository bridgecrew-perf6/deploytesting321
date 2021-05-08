import IUser from "../../../models/interfaces/user";

interface IChat {
  _id: string;
  message: string;
  creator: string | null | undefined;
  poll: string;
  creationDate: string;
  chatImages?: string[];
}
