// Import Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';

// Import Pages
import { DashBoard } from './pages/DashBoard';

// Import Components
import { AddPatient } from './components/AddPatient';
import { AllPatients } from './components/AllPatients';
import { PatientDetail } from './components/PatientDetail';

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
          path: '/patient-detail',
          name: 'Patient Detail',
          component: PatientDetail,
          hide: true,
        },
      ],
    },
  ],
};
