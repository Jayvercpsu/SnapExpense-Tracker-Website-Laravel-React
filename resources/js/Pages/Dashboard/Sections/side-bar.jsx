import {
    FiHome,
    FiDollarSign,
    FiCreditCard,
    FiDownload,
    FiSettings,
    FiUser,
    FiLogOut,
} from "react-icons/fi";

export const menuItems = [
    {
        id: "dashboard",
        icon: <FiHome />,
        text: "Dashboard",
        path: "/dashboard/dashboard",
    },
    {
        id: "expenses",
        icon: <span className="text-lg">₱</span>,
        text: "Expenses",
        dropdown: [
            {
                icon: <FiCreditCard />,
                text: "Add Expense",
                path: "/dashboard/add-expense",
            },
            {
                icon: <FiDownload />,
                text: "Import/Export",
                path: "/dashboard/import-export",
            },
        ],
    },
    {
        id: "settings",
        icon: <FiSettings />,
        text: "Settings",
        dropdown: [
            {
                icon: <FiUser />,
                text: "Profile",
                path: "/dashboard/profile",
            },
            {
                icon: <FiLogOut />,
                text: "Logout",
                path: "/dashboard/logout",
            },
        ],
    },
];
