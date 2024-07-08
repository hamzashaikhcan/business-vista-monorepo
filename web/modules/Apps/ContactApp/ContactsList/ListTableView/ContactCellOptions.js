import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, updateContactsLabel, updateStarredStatus } from '../../../../../redux/actions/ContactApp';
import CmtList from '../../../../../@coremat/CmtList';
import PropTypes from 'prop-types';
import ExportContacts from '../../ExportContacts';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles((theme) => ({
  contactCellOptionsRoot: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  starViewRoot: {
    transition: 'all 0.3s ease',
    transform: 'translateX(200%)',
  },
  actionOptionRoot: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(100%)',
  },
  menuItemsRoot: {
    width: 200,
    fontSize: 14,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  iconBlock: {
    display: 'block',
  },
  titleLabelsRoot: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    padding: '16px 16px 8px',
  },
}));

const ContactCellOptions = ({ contact, onClickEditContact }) => {
  const dispatch = useDispatch();
  const { labelsList } = useSelector(({ contactApp }) => contactApp);
  const [showMoreOptions, setShowMoreOptions] = useState(null);

  const classes = useStyles();

  const onShowMoreOptions = (event) => {
    setShowMoreOptions(event.currentTarget);
  };

  const onHideMoreOptions = () => {
    setShowMoreOptions(null);
  };

  const onClickStarredIcon = (status) => {
    dispatch(updateStarredStatus([contact.id], status));
  };

  const onClickDeleteOption = () => {
    dispatch(deleteContact([contact.id]));
    onHideMoreOptions();
  };

  const onClickLabelOption = (label) => {
    dispatch(updateContactsLabel([contact.id], label));
    onHideMoreOptions();
  };

  const { starred, labels } = contact;

  return (
    <Box className={classes.contactCellOptionsRoot} onClick={(e) => e.stopPropagation()}>
      <Box className={clsx(classes.starViewRoot, 'star-view')}>
        <Checkbox
          icon={<StarBorderIcon />}
          checkedIcon={<StarIcon style={{ color: '#FF8C00' }} />}
          checked={starred}
          onChange={(e) => onClickStarredIcon(e.target.checked)}
          size="small"
        />
      </Box>

      <Box className={clsx(classes.actionOptionRoot, 'action-option')}>
        <Box ml={1}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => onClickEditContact({ ...contact })}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box ml={1}>
          <Tooltip title="More Options">
            <IconButton size="small" onClick={onShowMoreOptions}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu anchorEl={showMoreOptions} open={Boolean(showMoreOptions)} onClose={onHideMoreOptions}>
          <MenuItem onClick={onHideMoreOptions} className={classes.menuItemsRoot}>
            <ExportContacts data={[{ ...contact }]}>
              <Box component="span" display="flex" alignItems="center">
                <CloudUploadIcon />
                <Box component="span" ml={4}>
                  Export
                </Box>
              </Box>
            </ExportContacts>
          </MenuItem>
          <MenuItem onClick={onClickDeleteOption} className={classes.menuItemsRoot}>
            <DeleteIcon />
            <Box component="span" ml={4}>
              Delete
            </Box>
          </MenuItem>
          <Box className={classes.titleLabelsRoot}>Labels</Box>
          <CmtList
            data={labelsList}
            renderRow={(item, index) => (
              <MenuItem key={index} onClick={() => onClickLabelOption(item.slug)} className={classes.menuItemsRoot}>
                <Box display="flex" alignItems="center" width={1}>
                  <Box>
                    <LabelIcon className={classes.iconBlock} style={{ color: item.color }} />
                  </Box>
                  <Box ml={4} component="span">
                    {item.name}
                  </Box>
                  {labels.includes(item.slug) && (
                    <Box ml="auto">
                      <DoneIcon className={classes.iconBlock} />
                    </Box>
                  )}
                </Box>
              </MenuItem>
            )}
          />
        </Menu>
      </Box>
    </Box>
  );
};

export default ContactCellOptions;

ContactCellOptions.prototype = {
  contact: PropTypes.object.isRequired,
  onClickEditContact: PropTypes.func,
};
