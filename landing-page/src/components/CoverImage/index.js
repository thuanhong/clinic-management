import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import circle from '@images/home-one-shape.png';
import { TweenMax, Linear } from 'gsap';
import dockerImg from '@images/home-four-banner.png';
import { Tween } from 'react-gsap';

export const CoverImage = () => {
  let logoElement = useRef(null);
  // let doctorElement = useRef(null);

  useEffect(() => {
    TweenMax.to(logoElement, 10, {
      repeat: -1,
      rotation: 360,
      ease: Linear.easeNone,
    });
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.coverImage}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={10} sm={6}>
              <div className={classes.headingContent}>
                <h1>We are Committed to Your Best Health</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua gravida. Risus commodo.
                </p>
              </div>
              <Button className={classes.activeButton}>Explore</Button>
            </Grid>
            <Grid item xs={10} sm={4}>
              <div style={{ position: 'relative' }}>
                <img
                  width='100%'
                  src={circle}
                  ref={(element) => {
                    logoElement = element;
                  }}
                  alt='some thing'
                />
                <Tween from={{ y: '500px', opacity: 0 }} to={{ y: '0px', opacity: 1 }} duration={2}>
                  <img
                    className={classes.doctorImgStyle}
                    src={dockerImg}
                    // ref={(element) => {
                    //   doctorElement = element;
                    // }}
                    alt='some thing'
                  />
                </Tween>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
