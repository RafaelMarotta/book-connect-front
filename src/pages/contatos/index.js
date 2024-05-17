import Link from "next/link";

export default function Index() {
    return (
        <div className="container m-3 p-3">
            <a href="/contatos/cadastro" className="btn btn-primary">Cadastrar</a>
            <div class="row">
                <div class="col-sm-12">
                    <table id="table-clientes" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aqui os dados da tabela serão preenchidos dinamicamente com JavaScript */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
