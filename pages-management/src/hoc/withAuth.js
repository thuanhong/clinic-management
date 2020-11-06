import React, { Component } from 'react';
import Router from 'next/router';
import { AuthService } from '@services/AuthService';
import { CookieHandler } from '@utils/Cookies';
import { LoadingPage } from '@common/LoadingPage';

export default function withAuth(AuthComponent) {
  return class Authenticated extends Component {
    static async getInitialProps() {
      if (CookieHandler.getCookieFromBrowser('refreshtoken') && CookieHandler.getCookieFromBrowser('access_token')) {
        let response = await AuthService.check_auth();
        if (response.status === 200) {
          return {
            seshToken: CookieHandler.getCookieFromBrowser('access_token'),
          };
        } else {
          return {
            seshToken: '',
          };
        }
      }
      // Return props.
      return {
        seshToken: '',
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        token: props.seshToken,
      };
    }

    componentDidMount() {
      if (this.state.token === '') {
        Router.push('/login');
      } else if (this.state.token !== '') {
        this.setState({ isLoading: false });
      }
    }

    render() {
      return <div>{this.state.isLoading ? <LoadingPage /> : <AuthComponent />}</div>;
    }
  };
}
