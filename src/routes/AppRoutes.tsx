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
                <Route path="/" element={typeof user === 'object' && user !== null ? <Navigate to="/dashboard" /> : <Auth />} />
                <Route path="forgot-password" element={typeof user === 'object' && user !== null ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
                <Route
                    path="dashboard"
                    element={
                        <ProtectedPage>
                            <Dashboard />
                        </ProtectedPage>
                    }></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
