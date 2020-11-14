import React, { useEffect, useState } from 'react';
import { LoadingPage } from '@common/LoadingPage';
import Router from 'next/router';
import { AuthService } from '@services/AuthService';
import { CookieHandler } from '@utils/Cookies';

export const withAuth = (PageComponent) => {
  const WithAuth = () => {
    const [loading, setLoading] = useState(true);
    // check this lib useswr

    useEffect(() => {
      async function fetchData() {
        // const result = await AuthService.get_token();
        // CookieHandler.setCookie('access_token', result.msg.access_token);
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
              // AuthService.get_token().then((res) => {
              //   if (res.statusCode === 200) {
              //     CookieHandler.setCookie('access_token', res.msg.access_token);
              //     setLoading(false);
              //   } else {
              //     Router.push('/login');
              // }
              // });
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
