import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { NumericFormat } from 'react-number-format';
import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function Cadastro() {
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div className='container'>
      <h2 className='mb-3 mt-2'>Adicione um Livro</h2>
      <Form>
        <Form.Group className="mb-3" controlId="bookForm.title">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Digite o título do livro" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookForm.author">
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome do autor" />
        </Form.Group>

        <div className='row'>
          <Form.Group className="mb-3 col-md-6" controlId="bookForm.buyPrice">
            <Form.Label>Valor Compra</Form.Label>
            <NumericFormat
              prefix={"R$ "}
              decimalScale={2}
              placeholder="Valor pago pelo livro"
              className='form-control'
              decimalSeparator=','
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-6" controlId="bookForm.sellPrice">
            <Form.Label>Valor Venda</Form.Label>
            <NumericFormat
              prefix={"R$ "}
              decimalScale={2}
              placeholder="Valor estimado de venda"
              className='form-control'
              decimalSeparator=','
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="bookForm.synopsis">
          <Form.Label>Sinopse</Form.Label>
          <Form.Control type="text" placeholder="Digite a sinopse do livro" as="textarea" rows={3} />
        </Form.Group>
        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Form.Group className="mb-3" controlId="bookForm.title">
              <Form.Label>Imagem do Livro</Form.Label>
              <div>
                {imageList.map((image, index) => (
                  <div key={index} className='position-relative'>
                    <Button variant="danger" style={{position: 'absolute', top: 12, left:-10, textAlign: 'center', borderRadius: 50, fontSize: '12px'}} onClick={() => onImageRemove(index)}>X</Button>
                    <br></br>
                    <Image className='border' src={image['data_url']} height={150} />                    
                    <br></br>
                  </div>
                ))}
                {imageList.length === 0 && (
                  <Button variant="primary mt-2"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Clique ou arraste uma imagem
                  </Button>)}
              </div>
            </Form.Group>
          )}
        </ImageUploading>
        <div key={`conservation-radio`} className="mb-3">
          <Form.Label>Estado do livro</Form.Label>
          <div className='d-flex flex-row'>
            <Form.Check
              id={0}
              name={'conservation'}
              type={'radio'}
              label={`Novo`}
              className='m-2'
            />
            <Form.Check
              id={1}
              name={'conservation'}
              type={'radio'}
              label={`Semi-novo`}
              className='m-2'
            />
            <Form.Check
              id={2}
              name={'conservation'}
              type={'radio'}
              label={`Com marcas de uso`}
              className='m-2'
            />
            <Form.Check
              id={3}
              name={'conservation'}
              type={'radio'}
              label={`Desgastado`}
              className='m-2'
            />
          </div>
        </div>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button variant="primary" className='col-md-3'>Adicionar Livro</Button>
        </div>
      </Form>
    </div>
  );
}
