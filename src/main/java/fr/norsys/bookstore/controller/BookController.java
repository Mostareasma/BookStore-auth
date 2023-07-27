package fr.norsys.bookstore.controller;

import fr.norsys.bookstore.exeption.BookNotFoundException;
import fr.norsys.bookstore.exeption.InvalidRequestException;
import fr.norsys.bookstore.model.Book;
import fr.norsys.bookstore.service.BookService;
import jakarta.annotation.Nullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/books")
public class BookController {
    @Autowired
    private BookService booksService;

    @GetMapping
    public ResponseEntity<List<Book>> getAll(@Nullable String name, @Nullable String category) {
        List<Book> books;
        if ((name == null || name.isBlank()) && (category == null || category.isBlank())) {
            books = booksService.getAll();
        } else if (name == null || name.isBlank()) {
            books = booksService.search(null, category.trim());
        } else if (category == null || category.isBlank()) {
            books = booksService.search(name.trim(), null);
        } else {
            books = booksService.search(name.trim(), category.trim());
        }
        return ResponseEntity.ok().body(books);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Book book) throws InvalidRequestException {
        Book savedBook = booksService.save(book);
        return ResponseEntity.ok().body(savedBook);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getById(@PathVariable Long bookId) throws BookNotFoundException {
        Book book = booksService.getById(bookId);
        return ResponseEntity.ok().body(book);
    }



}