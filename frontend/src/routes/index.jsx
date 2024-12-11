import { PrivateRouter } from "../components/PrivateRouter";
import { Layout } from "../layout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { SettingsPage } from "../pages/SettingsPage";
import { SignLoginPage } from "../pages/SignUpPage";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <PrivateRouter />,
                children: [
                    {
                        path: "/",
                        element: <HomePage/>
                    },
                    {
                        path: '/profile',
                        element: <ProfilePage/> 
                    }
                ]
            },
            
            {
                path: '/settings',
                element: <SettingsPage/> 
            },
        ]
    },
    {
        path: '/signup',
        element: <SignLoginPage/> 
    },
    {
        path: '/login',
        element: <LoginPage/> 
    },
]