import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row } from 'react-bootstrap';

const BookCard = dynamic(() => import('../components/BookCard'), { ssr: false });

export default function Index() {
  return (
    <div className='container'>
      <div className='row'>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
}
