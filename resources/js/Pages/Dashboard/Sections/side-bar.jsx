import { FiHome, FiSettings, FiUser, FiLogOut, FiPlus } from "react-icons/fi";

export const menuItems = [
    {
        id: "dashboard",
        icon: <FiHome />,
        text: "Dashboard",
        path: "/dashboard/dashboard",
    },
    {
        id: "add-expense",
        icon: <FiPlus />,
        text: "Add Expense",
        path: "/dashboard/add-expense",
    },
    {
        id: "profile",
        icon: <FiUser />,
        text: "Profile",
        path: "/dashboard/profile",
    },
    {
        id: "logout",
        icon: <FiLogOut />,
        text: "Logout",
        path: "/dashboard/logout",
    },
];
