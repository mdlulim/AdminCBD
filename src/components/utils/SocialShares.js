import React from 'react'
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton, TwitterIcon, WhatsappIcon, FacebookIcon, EmailIcon } from  "react-share";
import { getListingUrl } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({ 
  socialIcon: {
    marginRight: 10
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    outline: 'none'
  },
  socialName: {
    textTransform: 'capitalize'
  }
}));

export const SocialShareButton = (props) => {

  const handleClick = ((event) =>{ 
    event.stopPropagation(); 
    props.setAnchorEl(event.currentTarget);
  })

  return (
    <IconButton aria-controls={`share-menu-${props.data._id}`} aria-haspopup="true" onClick={handleClick} aria-label="share">
      <ShareIcon />
    </IconButton>
  )
};

export const SocialMediaSharesMenu = (props) => {
  const classes = useStyles();
  const socialIconSize = 26;
  const borderRadius = 6;
  const url = getListingUrl(props.data, true);

  const socialButtons = [
    <FacebookShareButton className={classes.socialButton} hashtag="propertyStore" url={url}>
      <FacebookIcon size={socialIconSize} borderRadius={borderRadius} className={classes.socialIcon} />
      <Typography variant="caption" className={classes.socialName} >Share on facebook</Typography>
    </FacebookShareButton>,
    <TwitterShareButton className={classes.socialButton} hashtag={["propertyStore"]} related={['propertystore']} url={url}>
      <TwitterIcon size={socialIconSize} borderRadius={borderRadius} className={classes.socialIcon}  />
      <Typography variant="caption" className={classes.socialName} >Share on twitter</Typography>
    </TwitterShareButton>,
    <WhatsappShareButton className={classes.socialButton} hashtag="propertyStore" url={url}>
      <WhatsappIcon size={socialIconSize} borderRadius={borderRadius} className={classes.socialIcon}  />
      <Typography variant="caption" className={classes.socialName} >Share on whatsapp</Typography>
    </WhatsappShareButton>,
    <EmailShareButton className={classes.socialButton} url={url}>
      <EmailIcon size={socialIconSize} borderRadius={borderRadius} className={classes.socialIcon}  />
      <Typography variant="caption" className={classes.socialName} >Share via email</Typography>
    </EmailShareButton>
  ];

  return (
    <Menu
      id={`share-menu-${props.data._id}`}
      anchorEl={props.anchorEl}
      keepMounted
      onClose={props.handleClose}
      open={Boolean(props.anchorEl)}
    >
      {
        socialButtons.map( (socialButton, index) => (
          <MenuItem key={index} dense={false}>{socialButton}</MenuItem>
        ))
      }
    </Menu>
  )
};
