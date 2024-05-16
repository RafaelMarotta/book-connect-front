import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const BookCard = dynamic(() => import('../../components/BookCard'), { ssr: false });

export default function Index() {
  const router = useRouter();

  function handleCardClick() {
    router.push('/livros/detalhes');
  }

  function handleEditClick() {
    router.push('/livros/cadastro');
  }

  function handleRemoveClick() {
    console.log('Remove book');
  }

  return (
    <div className='container'>
      <div className='row'>
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        <BookCard handleCardClick={handleCardClick} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
      </div>
    </div>
  );
}
