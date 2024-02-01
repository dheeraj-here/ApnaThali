import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Restaurant from "pages/restaurants"
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Customer from "pages/customer"
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Help from "pages/helps"
import Cube from "examples/Icons/Cube";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { FoodBankOutlined, MoneyRounded } from "@mui/icons-material";
import Policy from "pages/policy";
import AdfScannerOutlinedIcon from '@mui/icons-material/AdfScannerOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import Expense from "pages/customer copy";
import Machine from "pages/machines"
import Helps from "examples/Icons/Help"
import Notification from 'pages/notification'
import Whatsapp from 'pages/whatsapp'

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    icon: <PersonOutlineOutlinedIcon size="12px" />,
    component: <Customer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Restaurants",
    key: "restaurants",
    route: "/restaurants",
    icon: <FoodBankOutlined size="12px" />,
    component: <Restaurant />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Expense",
    key: "expense",
    route: "/expense",
    icon: <CreditCard size="12px" />,
    component: <Expense />,
    noCollapse: true,
  },
 
  {
    type: "collapse",
    name: "Machines",
    key: "machines",
    route: "/machines",
    icon: <AdfScannerOutlinedIcon size="12px" />,
    component: <Machine />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notification",
    key: "notification",
    route: "/notification",
    icon: <NotificationsNoneOutlinedIcon size="12px" />,
    component: <Notification />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Whatsapp",
  //   key: "whatsapp",
  //   route: "/whatsapp",
  //   icon: <MoneyRounded size="12px" />,
  //   component: <Whatsapp />,
  //   noCollapse: true,
  // },

  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Policy",
    key: "policy",
    route: "/policy",
    icon: <PolicyOutlinedIcon size="12px" />,
    component: <Policy />,
    noCollapse: true,
  },
  {
    route: "/login",
    component: <SignIn />,
  },
  {
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Helps",
    key: "helps",
    route: "/helps",
    icon: <Helps size="1px" />,
    component: <Help />,
    noCollapse: true,
  },
];

export default routes;
