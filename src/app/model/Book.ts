import {EnumStatus} from "../Utils/EnumStatus";

export default interface Book {
  id: string;
  title: string;
  author: string;
  status: EnumStatus;
}
