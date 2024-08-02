import Book from "./Book";

export default interface State {
  action: string;
  props: {
    book?: Book;
  };
}
