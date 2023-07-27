package fr.norsys.bookstore.exeption;


public class InvalidRequestException extends Exception {

    public InvalidRequestException(String message) {
        super(message);
    }
}