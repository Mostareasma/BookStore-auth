import React from 'react';
import {Link} from 'react-router-dom';
import {ChevronRight, HomeIcon} from './icons/Icones';

const Breadcrumb = () => {


    // Split the pathname into parts
    const pathParts = window.location.pathname.split('/').filter(Boolean);


    return (
        <nav className="flex pt-5 pb-10" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/"
                          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <HomeIcon/>
                        Home
                    </Link>
                </li>
                {/* Map each part of the path name to a list item */}
                {pathParts.map((part, i) => (
                    <li key={i}>
                        <div className="flex items-center">
                            <ChevronRight/>
                            <span
                                className="capitalize ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{part}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
