import Link from "next/link";

export default function Index() {
    return (
        <div>
            <section className="border border-primary">
                <h1>Listagem de Contatos</h1>
            </section>
            <section className="border border-dark mt-2">
                <div className="row">
                    <Link href="/contatos/cadastro" className="col-6">Cadastrar Novo Contato</Link>
                    <Link href="/enderecos/cadastro" className="col-6">Cadastrar Novo Endereço</Link>
                </div>
            </section>
        </div>
    );
}
