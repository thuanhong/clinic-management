import React from 'react';
import * as yup from 'yup';
import { AuthLayout, Link, Button, Form } from '@app/components';
import { WithTranslation, withTranslation, FieldInfo, showNotification, catchError } from '@app/core';
import { navigationService, authService } from '@app/services';
import { config } from '@app/config';
import { useImmer } from 'use-immer';
import { useStyles } from './styles';

const initialValues = {
  email: '',
};

const Screen = (props) => {
  /* --- variables & states - begin --- */
  const { t } = props;
  const [isBusy, setIsBusy] = useImmer < boolean > false;
  const classes = useStyles();

  const fields = [
    {
      name: 'email',
      label: t('email'),
      required: true,
    },
  ];
  const validationSchema =
    yup.object().shape <
    FormData >
    {
      email: yup
        .string()
        .required(
          t('common:requiredError', {
            field: t('email'),
          }),
        )
        .matches(
          config.regex.email,
          t('common:invalidError', {
            field: t('email'),
          }),
        ),
    };
  /* --- variables & states - end --- */

  /* --- actions & events - begin --- */
  const onSubmit = catchError(
    async (input) => {
      await authService.sendPasswordResetEmail(input.email);
    },
    setIsBusy,
    {},
    {
      'auth/user-not-found': true,
    },
    () => {
      showNotification({
        type: 'SUCCESS',
        message: t('requestSent'),
      });
      setTimeout(() => {
        navigationService.navigateTo({
          url: '/login',
        });
      }, 2000);
    },
  );
  /* --- actions & events - end --- */

  return (
    <AuthLayout title={t('forgotPassword')}>
      <Form
        initialValues={initialValues}
        fields={fields}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        isBusy={isBusy}
      >
        <div className={classes.buttonContainer}>
          <Button
            disabled={isBusy}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
          >
            {props.t('recoverPassword')}
          </Button>
          <Link href='/login' title={props.t('back')} showAsText className={classes.button}>
            <Button disabled={isBusy} variant='contained' color='default' fullWidth>
              {props.t('back')}
            </Button>
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'forgot_password'],
  };
};

export const ForgotPasswordScreen = withTranslation('forgot_password')(Screen);
