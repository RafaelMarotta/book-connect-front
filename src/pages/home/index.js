import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BookCard = dynamic(() => import('../../components/BookCard'), { ssr: false });

export default function Index() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`https://book-connect-backend.vercel.app/api/livros`);
      const data = await response.json();

      // Fetch images for each book
      const booksWithImages = await Promise.all(data.map(async (book) => {
        const imageResponse = await fetch(`https://book-connect-backend.vercel.app/api/livros/image/${book.id}`);
        console.log(imageResponse)
        const blob = await imageResponse.blob();
        book.imageUrl = URL.createObjectURL(blob);
        return book;
      }));

      setBooks(booksWithImages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCardClick = () => {
    router.push('/livros/detalhes');
  };

  const handleEditClick = (book) => {
    router.push(`/livros/cadastro?id=${book.id}`);
  };

  const handleRemoveClick = (book) => {
    setBookToDelete(book);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    try {
      console.log('Deleting book:', bookToDelete.id)
      const response = await fetch(`https://book-connect-backend.vercel.app/api/livros/${bookToDelete.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setShowModal(false);
        setBooks(books.filter(book => book.id !== bookToDelete.id));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className='container'>
      <div className='row'>
        {books.map(livro => (
          <BookCard
            key={livro.id}
            livro={livro}
            handleCardClick={handleCardClick}
            handleEditClick={() => handleEditClick(livro)}
            handleRemoveClick={() => handleRemoveClick(livro)}
          />
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja deletar o livro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
