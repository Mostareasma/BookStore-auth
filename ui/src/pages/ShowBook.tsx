import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

type Category = {
    id: number;
    name: string;
};

type Book = {
    id: number;
    title: string;
    isbn: string;
    author: string;
    description: string;
    categories: Category[];
};

const ShowBook = () => {
    const [book, setBook] = useState<Book>();
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios(`api/books/${id}`);
            setBook(response.data);
        };
        fetchBooks();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Breadcrumb/>
            <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 mx-4 sm:w-3/4 lg:w-1/2 xl:w-1/3">
                    <h1 className="text-2xl font-bold mb-4"><strong>Title: </strong>{book.title}</h1>
                    <p className="text-gray-600 mb-4"><strong>By:</strong> {book.author}</p>
                    <p className="mb-4"><strong>Isbn: </strong>{book.isbn}</p>
                    <strong>Categories: </strong>
                    <ul>
                        {book.categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                    <p className="mb-4"><strong>Description: </strong>{book.description}</p>
                </div>
            </div>
        </>
    );
};

export default ShowBook;
