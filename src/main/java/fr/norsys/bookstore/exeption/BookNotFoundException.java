package fr.norsys.bookstore.exeption;


public class BookNotFoundException extends Exception {
    public BookNotFoundException(String message) {
        super(message);
    }
}