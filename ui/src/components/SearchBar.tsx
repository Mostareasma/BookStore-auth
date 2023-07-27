import React, {SyntheticEvent, useState} from 'react';

type Props = {
    onSubmit: (name: string, category: string) => void
}

const SearchBar = ({onSubmit}: Props) => {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        onSubmit(name, category)
    };


    // Split the pathname into parts
    const pathParts = window.location.pathname.split('/').filter(Boolean);


    return (
        <form onSubmit={handleSubmit}>

            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Search for books by title..."
                   className="border border-gray-400 rounded p-2 mr-4 mb-4 w-2/5 focus:outline-none focus:border-blue-500"/>
            <input type="text" onChange={(e) => setCategory(e.target.value)}
                   placeholder="Search for books by category..."
                   className="border border-gray-400 rounded p-2 mr-4 mb-4 w-2/5 focus:outline-none focus:border-blue-500"/>

            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg mr-4"
                    type='submit'>Search
            </button>

        </form>
    );
};

export default SearchBar;
