import React, { useState } from 'react';
import { useRouter } from 'next/router';


function Index({ Component, pageProps }) {
  const router = useRouter();

  const handleLoadLoginPage = () => {
    router.push("/login")
  };

  return (
    <div onLoad={handleLoadLoginPage()}>
    </div>
  );
}

export default Index;