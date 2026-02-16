'use client';

import { booksData } from '@/lib/booksData';
import BookGallery from './BookGallery';

export default function BooksSection() {
  return (
    <div id="books">
      {booksData.map((book) => (
        <BookGallery key={book.id} book={book} />
      ))}
    </div>
  );
}