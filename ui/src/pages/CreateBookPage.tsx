import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import Select from 'react-select'
import {useNavigate} from 'react-router-dom';

type Category = {
    id: number;
    name: string;
};

type Book = {
    id?: number;
    title: string;
    isbn: string;
    author: string;
    description: string;
    categories: Category[];
};

type Option = {
    value: string,
    label: string,
}

const CreateBookPage = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [options, setOptions] = useState<Option[]>([]);

    const navigate = useNavigate()

    const handleSelectChange = (selectedOptions: Option[]) => {
        setSelectedOptions(selectedOptions);
        setCategories(selectedOptions.map((option, index) => ({
            id: index,
            name: option.label
        })))
    }

    function handleNewOption(e: SyntheticEvent) {
        e.preventDefault();
        const newOption = (e.target as HTMLInputElement).value;
        const optionObj = {value: newOption, label: newOption};
        setOptions([...options, optionObj]);
    }


    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios("api/categories")
            setOptions(response.data.map((category: Category) => ({
                value: category.name,
                label: category.name
            })));
        }
        fetchCategories();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const book: Book = {
            isbn,
            title,
            author,
            description,
            categories
        }

        if (validate(book)) {
            try {
                await axios.post("api/books", book);
                navigate("/books");

            } catch (err) {
                setError(err.response.data);
            }
        }
    };


    const validate = (book: Book) => {
        const errors: { [key: string]: string } = {};
        if (!book.title) {
            errors['title'] = '*Title required!*';
        }

        if (!book.isbn) {
            errors['isbn'] = '*Isbn required!*';
        }

        if (!book.author) {
            errors['author'] = '*Author required!*';
        }

        if (book.description.length < 10) {
            errors['description'] = '*Description most have at least 10 characters!*';
        }
        if (book.categories.length < 1) {
            errors['categories'] = '*Book should have at least one category!*';
        }

        setFormErrors(errors)
        return !Object.keys(errors).length;
    };

    return (
        <>
            <Breadcrumb/>
            <form className="authForm m-auto mt-8 p-5 col-md-6 border shadow-sm rounded-3 bg-white align-middle">
                {error ? (
                    <p className="text-red-500 text-sm font-bold">{error}</p>
                ) : null}


                <div className="my-5">
                    {formErrors['isbn'] ? (
                        <p className="text-red-500 text-sm font-bold">{formErrors['isbn']}</p>
                    ) : null}
                    <label className="block mb-1 font-bold">ISBN</label>
                    <input
                        className='mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        id="isbn"
                        onChange={(e) => setIsbn(e.target.value)}
                        type="text"
                        placeholder="ISBN"
                    />

                </div>
                <div className="my-5">
                    {formErrors['title'] ? (
                        <p className="text-red-500 text-sm font-bold">{formErrors['title']}</p>
                    ) : null}
                    <label className="block mb-1 font-bold">Title</label>
                    <input
                        className='mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter title"
                    />
                </div>

                <div className="my-5">
                    {formErrors['author'] ? (
                        <p className="text-red-500 text-sm font-bold">{formErrors['author']}</p>
                    ) : null}
                    <label className="block mb-1 font-bold">Author</label>
                    <input
                        className='mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

                        id="author"
                        type="author"
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author"
                    />

                </div>

                <div className="my-5">
                    {formErrors['description'] ? (
                        <p className="text-red-500 text-sm font-bold">{formErrors['description']}</p>
                    ) : null}
                    <label className="block mb-1 font-bold">Description</label>
                    <input
                        className='mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

                        id="description"
                        type="description"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />

                </div>
                <div className="my-5">
                    {formErrors['categories'] ? (
                        <p className="text-red-500 text-sm font-bold">{formErrors['categories']}</p>
                    ) : null}
                    <label className="block mb-1 font-bold">Categories</label>

                    <Select
                        isMulti
                        name="colors"
                        options={options}
                        value={selectedOptions}
                        onChange={handleSelectChange}
                    />

                    <input
                        type="text"
                        placeholder="Add a new category"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.keyCode === 13) {
                                handleNewOption(e);
                            }
                        }}
                        className='` mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                    />

                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </>

    );
};

export default CreateBookPage;
