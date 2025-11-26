//import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
//import { authActions } from '../store/authSlice';
//import { useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
//import Button from '@mui/material/Button';
import MenuAppBar from '../components/MenuAppBar';
import Dashboard from '../components/Dashboard';

const Home = () => {
    const userData = useSelector( (state: RootState) => state.authentication );
    console.log(userData);

    //const navigate = useNavigate();
    //const dispatch = useDispatch();

    {/*const handleGetOut = () => {
        dispatch(authActions.logout());
        navigate('/');
    }*/}

    return (
        <>
            <MenuAppBar />
            <Dashboard />
            {/*<Typography variant='h1'>Home de {userData.userName}: Soy el usuario {userData.userName} y tengo el rol de {userData.userRole}</Typography>
            <Button variant='contained' onClick={handleGetOut}>SALIR</Button>*/}
        </>
    );
}

export default Home;