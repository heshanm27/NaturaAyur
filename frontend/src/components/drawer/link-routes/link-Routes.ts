import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TableViewIcon from "@mui/icons-material/TableView";
import Home from "../../../pages/Home";
import { ElementType, ReactElement, ReactNode } from "react";
type LinkRoute = {
  path: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  component: ElementType;
  isPrivate: boolean;
  isPublic: boolean;
  isProtected: boolean;
  isActive: boolean;
};

// export const SELLER_ROUTES: LinkRoute = {
//   path: "/",
//   name: "Home",
//   icon: ShoppingBasketIcon,
//   component: <Home />,
//   isPublic: false,
//   isProtected: false,
//   isActive: true,
//   isPrivate: true,
// };

// export const ADMIN_ROUTES: LinkRoute = [
//   {
//     path: "/",
//     name: "Home",
//     icon: ShoppingBasketIcon ,
//     component: Home ,
//     isPublic: false,
//     isProtected: false,
//     isActive: true,
//     isPrivate: true,
//   },
// ];

// export const USER_ROUTES: LinkRoute = [
//     {
//         path: "/",
//         name: "Home",
//         icon: ShoppingBasketIcon ,
//         component: Home ,
//         isPublic: false,
//         isProtected: false,
//         isActive: true,
//         isPrivate: true,
//     }
// ];
