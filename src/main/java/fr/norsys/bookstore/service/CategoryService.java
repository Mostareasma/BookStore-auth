package fr.norsys.bookstore.service;

import fr.norsys.bookstore.repository.BookRepository;
import fr.norsys.bookstore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

}
