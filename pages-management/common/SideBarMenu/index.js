import React from 'react';
import clsx from 'clsx';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Link, Typography, NoSsr, Button } from '@material-ui/core';
import { useStyles } from './styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';


const StyledTreeItem = (props) => {
  const { link, labelText, labelIcon, color, bgColor, ...other } = props;
  const classes = useStyles();
  const Item = (
    <div
      className={classes.labelRoot}
      style={{
        color,
      }}
    >
      <span className={classes.labelIconContainer}>
        {!!labelIcon && labelIcon}
      </span>
      <Typography variant='body2' className={classes.labelText}>
        {labelText}
      </Typography>
    </div>
  );

  return (
    <TreeItem
      label={
        link ? (
          <Link href={link} className={clsx(classes.link, classes.labelRoot)} title={labelText}>
            {Item}
          </Link>
        ) : (
            Item
          )
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.rootItem,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
};

const renderMenuItems = (navItems) => {
  return (
    <>
      {navItems.map((navItem) => (
        <StyledTreeItem
          key={navItem.id}
          nodeId={navItem.id}
          labelText={navItem.title}
          labelIcon={navItem.icon}
          color={'white'}
          bgColor={navItem.bgColor || '#141b25'}
          link={navItem.link}
        >
          {navItem.children && renderMenuItems(navItem.children)}
        </StyledTreeItem>
      ))}
    </>
  );
};

export const SideBarMenu = (props) => {
  const { navItems } = props;
  const classes = useStyles();
  const defaultExpanded = navItems.filter((m) => m.expanded).map((m) => m.id);

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={defaultExpanded}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div className={classes.defaultEndIcon} />}
    >
      <>
        {renderMenuItems(navItems)}
      </>
    </TreeView>
  );
};