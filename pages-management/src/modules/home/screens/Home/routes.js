// Import Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

// Import Pages
import { DashBoard } from './pages/DashBoard';
import { AllDoctors } from './pages/AllDoctors';
import { AllPatients } from './pages/AllPatients';
import { PatientDetail } from './pages/PatientDetail';
import { DoctorDetail } from './pages/DoctorDetail';

// Import Components
import { AddPatient } from './components/AddPatient';

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
    {
      path: '/doctors',
      name: 'Doctors',
      type: 'submenu',
      icon: LocalHospitalIcon,
      children: [
        {
          path: '/all-doctors',
          name: 'All Doctors',
          component: AllDoctors,
        },
        {
          path: '/add-doctor',
          name: 'Add Doctor',
          component: AddPatient,
        },
        {
          path: '/doctor-detail',
          name: 'Doctor Detail',
          component: DoctorDetail,
          hide: true,
        },
      ],
    },
  ],
};
