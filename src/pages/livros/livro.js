import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { NumericFormat } from "react-number-format";
import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";

export default function Cadastro() {
  const [images, setImages] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSynopsis, setBookSynopsis] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`
      );
      const bookData = response.data.items[0].volumeInfo;
      setBookTitle(bookData.title);
      setBookAuthor(bookData.authors.join(", "));
      setBookSynopsis(bookData.description);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-3 mt-2">Adicione um Livro</h2>
      <div className="row">
        <div className="col-md-4">
          <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, isDragging, dragProps }) => (
              <div>
                {imageList.map((image, index) => (
                  <Image
                    className="border"
                    src={image["data_url"]}
                    style={{
                      width: 305,
                      height: 409,
                      borderRadius: "8px 0px 0px 0px",
                      border: "1px solid",
                      opacity: 1,
                      position: "absolute",
                      top: 213,
                      left: 188,
                    }}
                  />
                ))}
                {imageList.length === 0 && (
                  <Button
                    variant="primary mt-2"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Adicionar imagem
                  </Button>
                )}
              </div>
            )}
          </ImageUploading>
        </div>
        <div className="col-md-8">
          <Form>
            <Form.Group className="mb-3" controlId="bookForm.title">
              <Form.Label>Título</Form.Label>
              <div className="d-flex flex-row">
                <Button variant="primary" onClick={handleSearch}>
                  Buscar
                </Button>
                <Form.Control
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Digite o título do livro"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="bookForm.author">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="Digite o nome do autor"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bookForm.synopsis">
              <Form.Label>Sinopse</Form.Label>
              <Form.Control
                type="text"
                value={bookSynopsis}
                onChange={(e) => setBookSynopsis(e.target.value)}
                placeholder="Digite a sinopse do livro"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <div key={`conservation-radio`} className="mb-3">
              <Form.Label>Estado do livro</Form.Label>
              <div className="d-flex flex-row">
                <Form.Check
                  id={0}
                  name={"conservation"}
                  type={"radio"}
                  label={`Novo`}
                  className="m-2"
                />
                <Form.Check
                  id={1}
                  name={"conservation"}
                  type={"radio"}
                  label={`Pouco usado`}
                  className="m-2"
                />
                <Form.Check
                  id={2}
                  name={"conservation"}
                  type={"radio"}
                  label={`Gasto`}
                  className="m-2"
                />
                <Form.Check
                  id={3}
                  name={"conservation"}
                  type={"radio"}
                  label={`Muito Gasto`}
                  className="m-2"
                />
              </div>
            </div>
            <hr />
            <Button variant="primary" className="col-md-12 mr-2">
              Venda
            </Button>{" "}
            <Button variant="primary" className="col-md-12">
              Troca
            </Button>{" "}
          </Form>
        </div>
      </div>
    </div>
  );
}
