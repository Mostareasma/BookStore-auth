import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-100 my-8 h-full">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                    Welcome to Your Bookshelf
                </h1>
                <div className="pb-8">
                    <Link
                        to="/books"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg mr-4"
                    >
                        View All Books
                    </Link>

                    <Link
                        to="/create"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        Add a New Book
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
