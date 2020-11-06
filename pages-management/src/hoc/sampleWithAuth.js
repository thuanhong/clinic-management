import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useImmer } from 'use-immer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Loading, Typography } from '@app/components';
import { GET_CURRENT_USER_QUERY, catchError, initApolloClient, cache } from '@app/core';
import { navigationService } from '@app/services';
import { gql } from 'apollo-boost';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

const PERMISSIONS_KEY = 'PERMISSIONS_KEY';
const IS_ADMIN_KEY = 'IS_ADMIN_KEY';

export const withAuth = (PageComponent, validate) => {
  const WithAuth = (props) => {
    const { t } = props;
    const classes = useStyles();
    const [authData, setAuthData] =
      useImmer <
      AuthData >
      {
        authUser: {
          id: '',
          loginType: 'EMAIL',
        },
        isAdmin: false,
        validating: true,
        isValid: false,
        permissions: {},
      };

    const validateWithPermissions = (permissions, isAdmin) => {
      return (aggregateName, action, field) =>
        isAdmin ||
        (!!permissions[aggregateName] &&
          !!permissions[aggregateName][action] &&
          (!field || !!permissions[aggregateName][action][field]));
    };

    const validatePermissions = validateWithPermissions(authData.permissions, authData.isAdmin);

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(
        catchError(async () => {
          const { data, errors } = await initApolloClient().query({
            query: GET_CURRENT_USER_QUERY,
          });
          if (errors || !data || !data.currentUser || !data.currentUser.Token) {
            navigationService.navigateTo({
              url: '/login',
            });
            return;
          }

          let permissions = cache.get(PERMISSIONS_KEY);
          let isAdmin = cache.get(IS_ADMIN_KEY);
          if (!permissions) {
            const { data: permissionsData, errors: permissionsErrors } = await initApolloClient().query({
              query: gql`
                query GetUserPermissions {
                  userPermissions(payload: {}) {
                    permissions
                    isAdmin
                  }
                }
              `,
            });
            if (permissionsErrors || !permissionsData || !permissionsData.userPermissions) {
              navigationService.navigateTo({
                url: '/login',
              });
              return;
            }
            permissions = JSON.parse(permissionsData.userPermissions.permissions);
            isAdmin = permissionsData.userPermissions.isAdmin;
            cache.set(PERMISSIONS_KEY, permissions);
            cache.set(IS_ADMIN_KEY, isAdmin);
          }

          setAuthData((draft) => {
            draft.authUser = data.currentUser;
            draft.isAdmin = isAdmin;
            draft.validating = false;
            draft.isValid = isAdmin || !validate || validate(validateWithPermissions(permissions, isAdmin));
            draft.permissions = permissions;
          });
        }),
      );
      return () => {
        unsubscribe();
      };
    }, []);
    if (authData.validating) {
      return (
        <div className={classes.container}>
          <Loading />
        </div>
      );
    }
    if (!authData.isValid) {
      return (
        <div className={classes.container}>
          <Typography variant='h6' component='p'>
            {t('common:forbidden')}
          </Typography>
        </div>
      );
    }
    return <PageComponent {...props} authUser={authData.authUser} validatePermissions={validatePermissions} />;
  };
  return WithAuth;
};
