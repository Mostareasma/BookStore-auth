import {BooksPage} from "../pages/BooksPage.js";
import CreateBookPage from "../pages/CreateBookPage.js";
import Home from "../pages/Home.js";
import ShowBook from "../pages/ShowBook.js";


export const APP_ROUTES = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/books',
        element: BooksPage
    },
    {
        path: '/create',
        element: CreateBookPage
    },
    {
        path: '/:id',
        element: ShowBook
    },
]