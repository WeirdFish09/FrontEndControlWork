import { stat } from "fs";
import React, { useState } from "react";
import { libraryDefaults } from "../../defaults";
import { Book } from "../../models/Book";
import { BookInfo, Library } from "../../models/Library";
import AddUpdateBookComponent from "../AddUpdateBookComponent/AddUpdateBookComponent";
import { BookListComponent } from "../BookListComponent/BookListComponent";
import "./LibraryComponent.css";


interface LibraryState{
    library: Library;
    books: Book[];
    aboutVisible: boolean;
    bookAddVisible: boolean;
    bookStockUpdateVisible: boolean
}
const LibraryComponent = () => {
    const [state,setState] = useState(libraryDefaults());

    const addBookStock = (bookName: string, stocks: number) => {
        if(stocks < 0){
            setState({...state, bookStockUpdateVisible: !state.bookStockUpdateVisible});
            return;
        }
        const bookEntries = new Map(state.library.books);
        const currentBook = bookEntries.get(bookName);
        if (currentBook !== undefined) {
            currentBook.availableItems = currentBook.availableItems + stocks;
        }
        setState({ ...state, library: { ...state.library, books: bookEntries },bookStockUpdateVisible: !state.bookStockUpdateVisible});
    }

    const returnBook = (bookName: string) => {
        const bookEntries = new Map(state.library.books);
        const currentBook = bookEntries.get(bookName);
        if (currentBook !== undefined) {
            if (currentBook.issuedItems === 0) return;
            currentBook.availableItems = currentBook.availableItems + 1;
            currentBook.issuedItems = currentBook.issuedItems - 1;
        }
        setState({ ...state, library: { ...state.library, books: bookEntries } });
    }

    const issueBook = (bookName: string) => {
        const bookEntries = new Map(state.library.books);
        const currentBook = bookEntries.get(bookName);
        if (currentBook !== undefined) {
            if (currentBook.availableItems === 0) return;
            currentBook.availableItems = currentBook.availableItems - 1;
            currentBook.issuedItems = currentBook.issuedItems + 1;
        }
        setState({ ...state, library: { ...state.library, books: bookEntries } });
    }

    const createBook = (book: Book) => {
        if(state.books.filter(b => b.name === book.name).length > 0){
            setState({ 
                ...state,
                bookAddVisible: !state.bookAddVisible
            });
            return;
        }
        const bookEntries: Map<string, BookInfo> = new Map(state.library.books);
        const books: Book[] = [...state.books, book];
        bookEntries.set(book.name, { availableItems: 1, issuedItems: 0 });
        console.log('books', books);
        setState({ 
            ...state, 
            books: books, 
            library: { ...state.library, books: bookEntries },
            bookAddVisible: !state.bookAddVisible
        });
    }

    const removeBook = (bookName: string) => {
        console.log(state)
        const books: Book[] = [...state.books].filter(b => b.name !== bookName);
        const bookEntries: Map<string, BookInfo> = new Map(state.library.books);
        bookEntries.delete(bookName);
        setState({ 
            ...state, 
            books: books, 
            library: { ...state.library, books: bookEntries } 
        });
    }

    const toggleAbout = () => {
        setState({ ...state, aboutVisible: !state.aboutVisible });
    }
    const toggleAdd = () => {
        setState({ ...state, bookAddVisible: !state.bookAddVisible });
    }
    const toggleUpdate = () => {
        setState({ ...state, bookStockUpdateVisible: !state.bookStockUpdateVisible });
    }
    
    return (
        <div className="library-container">
            <div className="header">
                <div className="header-top">
                    <div className="add-button-container" onClick={() => toggleAdd()}>Add new</div>
                    <div className="library-name">{state.library.name}</div>
                    <div className="info-button" onClick={() => toggleAbout()}>About</div>
                </div>
                <div className="About" hidden={!state.aboutVisible}>
                    address: {state.library.address}
                    <table>
                        <tbody>
                        <tr>
                            <td>Monday</td>
                            <td>Tuesday</td>
                            <td>Wendsday</td>
                            <td>Thursay</td>
                            <td>Friday</td>
                            <td>Saturday</td>
                            <td>Sunday</td>
                        </tr>
                        <tr>
                            <td>{state.library.workSchedule[0]}</td>
                            <td>{state.library.workSchedule[1]}</td>
                            <td>{state.library.workSchedule[2]}</td>
                            <td>{state.library.workSchedule[3]}</td>
                            <td>{state.library.workSchedule[4]}</td>
                            <td>{state.library.workSchedule[5]}</td>
                            <td>{state.library.workSchedule[6]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="book-list">
                <BookListComponent books={state.books} 
                bookStockUpdateVisible={state.bookStockUpdateVisible}
                toggleUpdate={toggleUpdate.bind(this)}
                bookInfoMap={state.library.books}
                removeBook={removeBook.bind(this)}
                addStock={addBookStock.bind(this)}
                removeStock={issueBook.bind(this)}
                createBook={createBook.bind(this)}
                returnBook={returnBook.bind(this)}></BookListComponent>
            </div>
            <div hidden={!state.bookAddVisible}>
                <div className="form-backgroud">
                    <AddUpdateBookComponent book={null}
                        bookInfo={state.library.books.get(state.books[0]?.name) ?? { availableItems: 0, issuedItems: 0 }}
                        addStock={addBookStock.bind(this)}
                        removeStock={issueBook.bind(this)}
                        createBook={createBook.bind(this)}
                        returnBook={returnBook.bind(this)} />
                </div>
            </div>
        </div>
    )
}
export default LibraryComponent;