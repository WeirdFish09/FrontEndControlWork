import { Book } from "./models/Book";
import { BookInfo, Library } from "./models/Library";

export const libraryDefaults = () => {
    const books: Book[] = [
        {
            name: "Tokyo Ghoul, Vol. 1",
            author: "Sui Ishida",
            imageLink: "https://images-na.ssl-images-amazon.com/images/I/81gv-D-LqhL.jpg"
        },
        {
            name: "Goodnight Punpun, Vol. 1",
            author: "Inio Asano",
            imageLink: "https://images-na.ssl-images-amazon.com/images/I/917IJDfk36L.jpg"
        }
    ]
    const bookEntries = new Map<string,BookInfo>();
    bookEntries.set("Tokyo Ghoul, Vol. 1", {availableItems: 4, issuedItems: 1});
    bookEntries.set("Goodnight Punpun, Vol. 1", {availableItems: 2, issuedItems: 0});
    const library: Library = {
        address: "Example str. 123",
        name: "Library of Culture",
        workSchedule: ["10:00 - 22:00", "10:00 - 22:00", "10:00 - 22:00", "10:00 - 22:00", "10:00 - 22:00", "11:00 - 18:00", "11:00 - 18:00"],
        books: bookEntries,
    }
    return {library, books, aboutVisible:false, bookAddVisible: false, bookStockUpdateVisible: false};
}