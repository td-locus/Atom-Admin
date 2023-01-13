/**
 * Application Routes
 */

// Dependencies
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefaultSkeleton from '../components/reusable/DefaultSkeleton';
import { useAppSelector } from '../hooks/useAppSelector';

// Pages
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard/Dashboard';

const Main = lazy(() => import('../pages/Dashboard/Main'));
const Users = lazy(() => import('../pages/Dashboard/Users'));
const Groups = lazy(() => import('../pages/Dashboard/Groups'));
const Tasks = lazy(() => import('../pages/Dashboard/Tasks'));
const Events = lazy(() => import('../pages/Dashboard/Events'));
const Domains = lazy(() => import('../pages/Dashboard/Domains'));
const Profile = lazy(() => import('../pages/Dashboard/Profile'));

const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

interface ProtectedRouteProps {
    children: JSX.Element;
}

const AppRoutes = () => {
    const [user] = useAppSelector(state => [state.user.admin]);
    const ProtectedPage = ({ children }: ProtectedRouteProps) => {
        return user === undefined ? <Navigate to={'/'} /> : children;
    };

    return (
        <Suspense fallback={<DefaultSkeleton />}>
            <Routes>
                <Route path="/" element={typeof user === 'object' && user !== undefined ? <Navigate to="/dashboard" /> : <Auth />} />
                <Route path="forgot-password" element={typeof user === 'object' && user !== undefined ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedPage>
                            <Dashboard />
                        </ProtectedPage>
                    }>
                    <Route index element={<Main />} />
                    <Route path="users" element={<Users />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="events" element={<Events />} />
                    <Route path="domains" element={<Domains />} />
                    <Route path="me" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
