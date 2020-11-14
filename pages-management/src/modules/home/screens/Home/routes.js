// Import Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';

// Import Pages
import { DashBoard } from './pages/DashBoard';
import { AddPatient } from './pages/Patients';

// Import Components
import { AllPatients } from './components/AllPatients';

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
      path: '/patients',
      name: 'Patients',
      type: 'submenu',
      icon: AccessibleOutlinedIcon,
      children: [
        {
          path: '/all-patients',
          name: 'All Patients',
          component: AllPatients,
        },
        {
          path: '/add-patient',
          name: 'Add Patient',
          component: AddPatient,
        },
        {
          path: '/del-patient',
          name: 'Delete Patient',
          component: AddPatient,
        },
        {
          path: '/update-patient',
          name: 'Update Patient',
          component: AddPatient,
        },
      ],
    },
  ],
};
