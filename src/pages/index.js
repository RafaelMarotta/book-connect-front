import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /login
        const redirectToLogin = () => {
            router.push('/login');
        };

        // Call the redirect function
        redirectToLogin();
    }, []);

    return (
        <div>
            <h1>Carregando ...</h1>
        </div>
    );
};

export default IndexPage;