import {EnumStatus} from "../utils/EnumStatus";

export default interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  status: EnumStatus;
  description: string;
}
