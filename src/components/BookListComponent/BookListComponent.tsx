import React, { useState } from "react";
import { Book } from "../../models/Book";
import { BookInfo } from "../../models/Library";
import AddUpdateBookComponent from "../AddUpdateBookComponent/AddUpdateBookComponent";
import "./BookListComponent.css";

interface BookListProps {
    books: Book[];
    bookInfoMap: Map<string, BookInfo>;
    removeBook: any;
    createBook: any;
    addStock: any;
    removeStock: any;
    returnBook: any;
    toggleUpdate: any;
    bookStockUpdateVisible: boolean;
}
export const BookListComponent = (props: BookListProps) => {
    const [activeBookName, setActiveBookName] = useState("");
    const booksView = props.books.map(b => {
        return (
            <div key={`${b.name} ${b.author}`}>
                <div  className="book-container">
                    <img src={b.imageLink} onClick={() => {setActiveBookName(b.name); props.toggleUpdate()}} width="280px"></img>
                    <div  className="book-short-desc">
                        <div onClick={() => {setActiveBookName(b.name); props.toggleUpdate()}} className="book-name">{b.name}</div>
                        <div onClick={() => {setActiveBookName(b.name); props.toggleUpdate()}} className="book-authors">{b.author}</div>
                        <div className="remove-book" onClick={() => props.removeBook(b.name)}><i>remove</i></div>
                    </div>
                </div>
                <div hidden={activeBookName !== b.name || props.bookStockUpdateVisible}>
                <AddUpdateBookComponent book={b} 
                        bookInfo={props.bookInfoMap.get(b.name) ?? { availableItems: 0, issuedItems: 0 }}
                        addStock={props.addStock}
                        removeStock={props.removeStock}
                        createBook={props.createBook}
                        returnBook={props.returnBook} />
                </div>
            </div>
        )
    })

    return (
        <div className="books-list">
            {booksView}
        </div>
    )
}