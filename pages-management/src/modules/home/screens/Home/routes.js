// Import Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HealingIcon from '@material-ui/icons/Healing';
import ReceiptIcon from '@material-ui/icons/Receipt';

// Import Pages
import { DashBoard } from './pages/DashBoard';
import { AllDoctors } from './pages/AllDoctors';
import { AllPatients } from './pages/AllPatients';
import { PatientDetail } from './pages/PatientDetail';
import { DoctorDetail } from './pages/DoctorDetail';
import { Appointments } from './pages/Appointments';
import { PhysicalExamination } from './pages/PhysicalExamination';
import { Examination } from './pages/Examination';

// Import Components
import { AddStaff } from './components/AddStaff';

const adminRoutes = {
  items: [
    {
      path: '/',
      name: 'Dashboard',
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
          path: '/doctor-detail',
          name: 'Doctor Detail',
          component: DoctorDetail,
          hide: true,
        },
      ],
    },
    {
      path: '/appointment',
      name: 'appointment',
      type: 'link',
      icon: ScheduleIcon,
      component: Appointments,
    },
    {
      path: '/staff',
      name: 'staff',
      type: 'link',
      icon: PersonAddIcon,
      component: AddStaff,
    },
  ],
};

const doctorRoutes = {
  items: [
    {
      path: '/physical',
      name: 'Physical',
      type: 'submenu',
      icon: HealingIcon,
      children: [
        {
          path: '/',
          name: 'Physical',
          component: PhysicalExamination,
        },
        {
          path: '/examination',
          name: 'Examination',
          component: Examination,
          hide: true,
        },
      ],
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
          path: '/doctor-detail',
          name: 'Doctor Detail',
          component: DoctorDetail,
          hide: true,
        },
      ],
    },
  ],
};

const nurseRoutes = {
  items: [
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
          path: '/doctor-detail',
          name: 'Doctor Detail',
          component: DoctorDetail,
          hide: true,
        },
      ],
    },
    {
      path: '/',
      name: 'Appointment',
      type: 'link',
      icon: ScheduleIcon,
      component: Appointments,
    },
  ],
};

export default {
  adminRoutes,
  doctorRoutes,
  nurseRoutes,
};
