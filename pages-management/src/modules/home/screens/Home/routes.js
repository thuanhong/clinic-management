import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { DashBoard } from './components/DashBoard';

export default {
  items: [
    {
      path: '/',
      name: 'dashboard',
      type: 'link',
      icon: DashboardIcon,
      component: DashBoard,
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
  ],
};
