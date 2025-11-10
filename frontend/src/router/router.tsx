import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Reports from '../pages/Reports';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    { 
        path:'/', 
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'reports',
                element: <Reports />,
            },
        ],
    },
]);

export default router;