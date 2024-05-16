import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { Navbar, Nav, Form, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BookConnect</title>
            </Head>
            <Navbar bg="light" expand="lg" className="p-4 d-lg-flex">
                <Navbar.Brand href="/">BookConnect</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex flex-grow-1">
                    <Nav className="mr-auto"></Nav>
                    <Form className="d-lg-flex justify-content-lg-center flex-grow-1">
                        <InputGroup className='w-50'>
                            <FormControl
                                type="text"
                                placeholder="Buscar por livros por título, autor e palavras-chaves"
                                aria-label="Search"
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
                                <button style={{ border: 'none', background: 'none' }}><FontAwesomeIcon icon={faSearch} /></button>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                    <Nav className="ml-auto">
                        <Nav.Link href="/livros/trocas">Trocar Livro</Nav.Link>
                        <Nav.Link href="/livros/vendas">Lançar Venda</Nav.Link>
                        <Nav.Link href="/livros/cadastro">Cadastrar Livro</Nav.Link>
                        <Nav.Link href="/contatos">Contatos</Nav.Link>
                        <Nav.Link href="/enderecos/cadastro">Endereços</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <main className='container-fluid'>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
