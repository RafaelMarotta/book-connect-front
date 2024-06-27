import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from 'react-loading';

export default function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await fetch('https://book-connect-backend.vercel.app/api/vendas');
                const data = await response.json();
                setVendas(data);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVendas();
    }, []);

    const handleEdit = (id) => {
        router.push(`/vendas/editar/${id}`);
    };

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja deletar esta venda?')) {
            try {
                const response = await fetch(`https://book-connect-backend.vercel.app/api/vendas/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    console.log(await response.json())
                    throw new Error('Erro ao deletar venda');
                }
                setVendas(vendas.filter((venda) => venda.id !== id));
            } catch (error) {
                console.error('Erro ao deletar venda:', error);
            }
        }
    };

    return loading ? (
        <div className='d-flex justify-content-center mt-5'>
            <ReactLoading type={"spin"} color={"black"} height={168} width={75} />
        </div>
    ) : (
        <div className="container m-3 p-3">
            <div className="row">
                <div className="col-sm-12">
                    <table id="table-vendas" className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Cliente ID</th>
                                <th scope="col">Data Venda</th>
                                <th scope="col">Delivery</th>
                                <th scope="col">Valor Frete</th>
                                <th scope="col">Endereço ID</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda) => (
                                <tr key={venda.id}>
                                    <td>{venda.id}</td>
                                    <td>{venda.valor}</td>
                                    <td>{venda.cliente_id || 'N/A'}</td>
                                    <td>{new Date(venda.data_venda).toLocaleString()}</td>
                                    <td>{venda.delivery ? 'Sim' : 'Não'}</td>
                                    <td>{venda.valor_frete}</td>
                                    <td>{venda.endereco_id || 'N/A'}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            color='red'
                                            className='pointer'
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(venda.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
