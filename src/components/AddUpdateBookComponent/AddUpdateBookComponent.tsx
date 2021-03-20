import { FormEvent, useEffect, useState } from "react";
import { Book } from "../../models/Book";
import { BookInfo } from "../../models/Library";
import "./AddUpdateBookComponent.css";

interface IBookAddProp {
    book: Book | null;
    bookInfo: BookInfo
    createBook: any;
    addStock: any;
    removeStock: any;
    returnBook: any;
}
const AddUpdateBookComponent = (props: IBookAddProp) => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [stocks, setStocks] = useState(0);

    useEffect(() => {
        const { book } = props;
        setName(book?.name || '');
        setAuthor(book?.author || '');
        setImageLink(book?.imageLink || '');
    }, [props.book]);
    
    let innerHtml;
    if(props.book !== null){
        const handleStocksChange = (e: any) => {
            setStocks(e.target.value);
        };
        const addStocks = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.addStock(props.book?.name, Number(stocks));
        }
        innerHtml = (
            <form className="book-add-container" onSubmit={addStocks}>
                <img src={props.book.imageLink} width="240px"></img>
                <div>Name: {props.book.name}</div>
                <div>Author: {props.book.author}</div>
                <div>Available items: {props.bookInfo.availableItems}</div>
                <div>Issued items: {props.bookInfo.issuedItems}</div>
                <div className="btn" onClick={() => props.removeStock(props.book?.name)}><i>Issue Book</i></div>
                <div className="btn" onClick={() => props.returnBook(props.book?.name)}><i>Return Book</i></div>
                <div><label>Add stocks:</label><input type="number" name="stocks" onChange={e => handleStocksChange(e)} /></div>
                <div><input type="submit" value="Submit"/></div>
            </form>
        )

    } else {
        const handleNameChange = (e: any) => {
            setName(e.target.value);
        };

        const handleAuthorChange = (e: any) => {
            setAuthor(e.target.value);
        };

        const handleImageLinkChange = (e: any) => {
            setImageLink(e.target.value);
        };

        const createBook = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.createBook({
                name,
                author,
                imageLink
            });
        }

        innerHtml = (
            <div className="book-add-container">
                <form onSubmit={createBook}>
                    <div><label>Name:</label><input type="text" name="name" minLength={3} onChange={e => handleNameChange(e)} /></div>
                    <div><label>Author:</label><input type="text" name="author" minLength={3} onChange={e => handleAuthorChange(e)} /></div>
                    <div><label>ImageLink:</label><input type="text" name="imageLink" minLength={3} onChange={e => handleImageLinkChange(e)} /></div>
                    <div><input type="submit" value="Submit"/></div>
                </form>
            </div>
        );
    }
    return (
        <div>
            {innerHtml}
        </div>
    )
}

export  default AddUpdateBookComponent;