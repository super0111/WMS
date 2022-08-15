// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Warehouse',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Slot',
    path: '/dashboard/slot',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'QRCode Detect',
    path: '/dashboard/detectQRCode',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Shop',
    path: '/404',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Pilot Request',
    path: '/404',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Drone Repairs',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
