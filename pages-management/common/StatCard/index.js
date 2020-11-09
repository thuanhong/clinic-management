import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const StatCard = ({ title, value, color, IconComponent }) => {
  const classes = useStyles();

  return (
    <Card elevation={15} style={{ borderColor: '#fefefe', padding: 10 }}>
      <CardContent className={classes.content}>
        <Grid direction={'row'} container spacing={4}>
          <Grid item style={{ borderColor: color }}>
            <IconComponent fontSize='large' className={classes.iconFloat} style={{ color: color }} />
          </Grid>
          <Grid item justify='center' alignItems='center' alignContent='center'>
            <Box display='flex' height='100%' flexDirection='column' alignItems='center' justifyContent='center'>
              <Typography variant='p' style={{ color: color }}>
                {title}
              </Typography>
              <Typography variant='h6' style={{ color: color, fontSize: 30, fontWeight: 300 }}>
                {value}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
