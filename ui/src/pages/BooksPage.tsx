import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import SearchBar from "../components/SearchBar";

type Category = {
    id: number;
    name: string;
}

type Book = {
    id: number;
    title: string;
    isbn: string;
    author: string;
    categories: Category[];
}


export const BooksPage = () => {

    const [books, setBooks] = useState<Array<Book>>([]);
    const [message, setMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios("api/books", {params: {name, category}})
            setBooks(response.data)
        }
        fetchBooks();
    }, [name, category])

    function handleClick(id: number) {
        navigate(`/${id}`);
    }

    const handleDelete = async (id: number): Promise<void> => {
        try {
            const response = await axios.delete(`api/books/${id}`);
            setMessage(response.data);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (name: string, category: string) => {
        setName(name)
        setCategory(category)
    };

    return (
        <>

            <Breadcrumb/>
            <SearchBar onSubmit={handleSearch}/>
            <table className="table-auto border-collapse" style={{width: "100%"}}>
                <thead>
                <tr>
                    <th className="px-4 py-2 bg-gray-300 text-gray-600">Isbn</th>
                    <th className="px-4 py-2 bg-gray-300 text-gray-600">Title</th>
                    <th className="px-4 py-2 bg-gray-300 text-gray-600">Author</th>
                    <th className="px-4 py-2 bg-gray-300 text-gray-600">Categories</th>
                    <th className="px-4 py-2 bg-gray-300 text-gray-600">Actions</th>
                </tr>
                </thead>

                <tbody>

                {
                    books.map(book => (

                        <tr key={book.isbn}>
                            <td
                                className="text-blue-600 visited:text-purple-600 border px-4 py-2">

                                {book.isbn}

                            </td>
                            <td className="border px-4 py-2">{book.title}</td>
                            <td className="border px-4 py-2">{book.author}</td>
                            <td className="border px-4 py-2">
                                {book.categories.map(category =>
                                    <div key={category.name}
                                         className="bg-gray-200 inline-block rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category.name}</div>
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                <button className="mr-2" onClick={() => handleDelete(book.id)}>Delete</button>
                                <button onClick={() => handleClick(book.id)}>Show</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {books.length < 1 &&
                <div className="text-grey-700 p-4 text-center w-full">
                    No book found
                </div>}

            {showToast && <div id="toast-bottom-right"
                               className="fixed flex items-center w-full max-w-xs p-8 space-x-4 text-white bg-rose-300 divide-x divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                               role="alert">
                <div className="ml-3 text-md font-normal">{message}</div>
            </div>}


        </>

    )
}
