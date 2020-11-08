import AppsIcon from '@material-ui/icons/Apps';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ExploreIcon from '@material-ui/icons/Explore';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

export default {
  items: [
    {
      path: '/',
      name: 'Home',
      type: 'link',
      icon: ExploreIcon,
      component: AppsIcon,
    },
    {
      path: '/apps',
      name: 'Apps',
      type: 'submenu',
      icon: AppsIcon,
      badge: {
        type: 'primary',
        value: '5',
      },
      children: [
        {
          path: '/calendar',
          name: 'Calendar',
          component: AppsIcon,
        },
        // {
        //   path: '/media',
        //   name: 'Media',
        //   component: Media
        // },
        // {
        //   path: '/messages',
        //   name: 'Messages',
        //   component: Messages
        // },
        // {
        //   path: '/social',
        //   name: 'Social',
        //   component: Social
        // },
        // {
        //   path: '/chat',
        //   name: 'Chat',
        //   component: Chat
        // }
      ],
    },
    // {
    //   name: 'Error',
    //   type: 'submenu',
    //   icon: FaceIcon,
    //   children: [
    //     {
    //       path: '/404',
    //       name: '404',
    //       component: NotFound
    //     },
    //     {
    //       path: '/500',
    //       name: 'Error',
    //       component: BackendError
    //     }
    //   ]
    // },
    {
      path: 'https://iamnyasha.github.io/react-primer-docs/',
      name: 'Documentation',
      type: 'external',
      icon: LocalLibraryIcon,
    },
    {
      path: 'https://primer.fusepx.com',
      name: 'Get Angular Version',
      type: 'external',
      icon: BookmarkIcon,
    },
  ],
};
