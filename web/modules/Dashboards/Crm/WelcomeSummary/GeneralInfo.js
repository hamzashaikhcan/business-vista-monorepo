import React from 'react';
import MessageIcon from '@material-ui/icons/Message';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  navLink: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    color: theme.palette.text.secondary,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 10,
  },
  titleSpace: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('sm')]: {
      marginTop: 15,
    },
  },
}));

const GeneralInfo = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography component="div" variant="h5" className={classes.titleSpace}>
        You Have
      </Typography>

      <Link href="#messages">
        <a className={classes.navLink}>
          <MessageIcon className={classes.iconRoot} /> 5 Unread messages
        </a>
      </Link>
      <Link href="#invitations">
        <a className={classes.navLink}>
          <MailOutlineIcon className={classes.iconRoot} /> 2 Pending invitations
        </a>
      </Link>
      <Link href="#tasks">
        <a className={classes.navLink}>
          <CheckCircleIcon className={classes.iconRoot} /> 7 Due Tasks
        </a>
      </Link>
      <Link href="#notifications">
        <a className={classes.navLink}>
          <NotificationsIcon className={classes.iconRoot} /> 3 Other notifications
        </a>
      </Link>
    </div>
  );
};

export default GeneralInfo;
