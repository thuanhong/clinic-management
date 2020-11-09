import React, { useEffect, useState } from 'react';
import { LoadingPage } from '@common/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@services/AuthService';

export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        AuthService.check_auth().then((res) => {
          if (res.statusCode === 200) {
            if (Router.pathname === '/login') {
              Router.push('/');
            } else {
              setLoading(false);
            }
          } else {
            if (Router.pathname === '/login') {
              setLoading(false);
            } else {
              Router.push('/login');
            }
          }
        });
      }

      fetchData();
    }, []);

    return <div>{loading ? <LoadingPage /> : <PageComponent />}</div>;
  };
  return WithAuth;
};
