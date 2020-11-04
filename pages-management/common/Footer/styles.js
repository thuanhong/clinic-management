import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    color: "white",
    fontWeight: 500,
    backgroundImage: `url("/static/header-background.jpg")`,
    height: 330,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  spaceShadow: {
    height: 100,
    backgroundColor: 'black',
    filter: 'drop-shadow(black -22px 18px 9px)',
    width: '110vw',
    color: 'white',
  },
  btnGroup: {
    padding: 5,
    color: 'white',
    borderRadius: 50,
    border: 'white 1px solid',
},
}));