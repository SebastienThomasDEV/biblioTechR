import {EnumStatus} from "../utils/EnumStatus";

export default interface Book {
  id: string;
  title: string;
  author: string;
  status: EnumStatus;
  description: string;
}
