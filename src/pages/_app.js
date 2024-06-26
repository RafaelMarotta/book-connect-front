import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { useState } from 'react';
import { Navbar, Nav, Form, InputGroup, FormControl, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    function handleSearch(event) {
        event.preventDefault(); // Prevents the default form submission
        router.push(`/home?text=${encodeURIComponent(searchText)}`);
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BookConnect</title>
            </Head>
            {router.pathname !== '/login' && (
                <Navbar bg="light" expand="lg" className="p-4 d-lg-flex book-navbar">
                    <Navbar.Brand href="/home"><Image src='/images/logoprincipal.png' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex flex-grow-1">
                        <Nav className="mr-auto"></Nav>
                        <Form className="d-lg-flex justify-content-lg-center flex-grow-1" onSubmit={handleSearch}>
                            <InputGroup className='w-50'>
                                <FormControl
                                    type="text"
                                    placeholder="Buscar por livros por título, autor e palavras-chaves"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{ paddingRight: '2.5rem' }}
                                />
                                <InputGroup.Text style={{
                                    position: 'absolute',
                                    right: '10px',
                                    zIndex: 10,
                                    border: 'none',
                                    background: 'none',
                                    color: '#495057'
                                }}>
                                    <button type="submit" style={{ border: 'none', background: 'none' }}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form>
                        <Nav className="ml-auto">
                            <Nav.Link href="/livros/cadastro">Cadastrar Livro</Nav.Link>
                            <Nav.Link href="/livros/vendas">Vendas</Nav.Link>
                            <Nav.Link href="/livros/trocas">Trocas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>)
            }
            <main className='container-fluid'>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
