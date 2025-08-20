import { uniqueId } from 'lodash';

import {
  IconLayoutDashboard,
  IconClipboardCheck,
  IconSearch,
  IconPlane,
  IconBuildingSkyscraper,
  IconFileText,
  IconUsers,
  IconBuildingFactory,
  IconShieldCheck,
  IconKey,
  IconUser,
  IconFileCertificate,
  IconTicket,
  IconHelpCircle,
  IconBook2,
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard, 
    href: '/',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Bookings ',
    icon: IconClipboardCheck,
    href: '/booking',
  },

  {
    navlabel: true,
    subheader: 'Other',
  },
  {
    id: uniqueId(),
    title: 'New Search',
    icon: IconSearch,
    href: '/search/',
    children: [
      {
        id: uniqueId(),
        title: 'Flights',
        icon: IconPlane,
        href: '/flights',
      },
      {
        id: uniqueId(),
        title: 'Hotels',
        icon: IconBuildingSkyscraper,
        href: '/hotels',
       
      },

      {
        id: uniqueId(),
        title: 'Reservations sheet',
        icon: IconFileText,
        href: '/offline-bookings',
      },
      
    ],
  },
  {
    id: uniqueId(),
    title: 'Tenants',
    icon: IconBuildingFactory,
    href: '/tenants',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUsers,
    href: '/users',
   },
  {
    id: uniqueId(),
    title: 'Suppliers',
    subtitle: 'This is the sutitle',
    icon: IconBuildingFactory,
    href: '/suppliers',
  },

  {
    id: uniqueId(),
    title: 'Roles',
    icon: IconShieldCheck,
    href: '/roles',
   
  },
  {
    id: uniqueId(),
    title: 'Permissions',
    icon: IconKey,
    href: '/permissions',
   
  }, 
  {
    navlabel: true,
    subheader: 'Travelers Management',
  },
  {
    id: uniqueId(),
    title: 'Travelers',
    icon: IconUser,
    href: '/travelers',
  },
  {
    id: uniqueId(),
    title: 'travel Policy',
    icon: IconFileCertificate,
    href: '/travel-policy',
  },
  {
    navlabel: true,
    subheader: 'Support',
  },
  {
    id: uniqueId(),
    title: 'Support Tickets',
    icon: IconTicket,
    href: '/support-tickets',
  },
  {
    id: uniqueId(),
    title: 'FAQs',
    icon: IconHelpCircle,
    href: '/faqs',
  },
  {
    id: uniqueId(),
    title: 'Knowledge Base',
    icon: IconBook2,
    href: '/knowledge-base',
  },
  
];

export default Menuitems;
