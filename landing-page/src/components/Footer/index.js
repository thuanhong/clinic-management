import React from 'react';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './styles';
import { Facebook, GitHub, LinkedIn, Email } from '@material-ui/icons';

export const Footer = () => {
  const classes = useStyles();

  const linkContact = [
    {
      icon: <Facebook />,
      link: 'https://www.facebook.com/thuan.hong.50552',
    },
    {
      icon: <GitHub />,
      link: 'https://github.com/thuanhong',
    },
    {
      icon: <LinkedIn />,
      link: 'https://www.linkedin.com/in/thuan-hong-48b22618b/',
    },
    {
      icon: <Email />,
      link: 'thuanhong357@gmail.com',
    },
  ];

  return (
    <footer className={classes.root}>
      <div className={classes.spaceShadow}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: '100vw',
          }}
        >
          {linkContact.map((link, index) => (
            <Link key={index} href={link.link} style={{ margin: 20 }}>
              <IconButton className={classes.btnGroup}>{link.icon}</IconButton>
            </Link>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <p>Copyright &copy; 2020 Hong Thanh Thuan </p>
      </div>
    </footer>
  );
};
