import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import Grid from '@mui/material/Grid';

interface User {
    id?: number;
    user_name: string;
    user_login: string;
    user_password: string;
    user_role: string;
}

const userInitialState: User = {
    user_name: '',
    user_login: '',
    user_password: '',
    user_role: ''
}

const Login = () => {
    const [ user, setUser ] = useState(userInitialState);
    const [ alert, setAlert ] = useState({show: false, isValidated: false})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchLogin = async () => {
        const queryParams = new URLSearchParams({
            user_login: user.user_login,
            user_password: user.user_password
        })

        const response = await fetch(`http://localhost:3030/login?${queryParams}`, {
            method: 'GET'
        })

        if ( !response.ok ) {
            throw new Error('Error')
        }

        return await response.json()
    }

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const data = await fetchLogin()
        const isValidated = data.user_name && data.user_role

        setUser({...user, user_name: data.user_name, user_role: data.user_role})
        setAlert({show: true, isValidated: isValidated});

        if ( isValidated ) {
            dispatch(authActions.login({
                name: data.user_name,
                role: data.user_role
            }))

            navigate('/home');
        }
    }

    return(
        <>
            <Box
            component='form'
            onSubmit={handleSubmit}
            >
                <Typography variant='h3'>SISTEMA DE ACCESO</Typography>
                <AccountBoxIcon sx={{ width: '60px', height: '60px' }}/>
                <Grid container size={12} style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                    <Grid size={{md: 6, xs: 8}}>
                        <TextField label="Usuario" value={user.user_login} onChange={(event) => setUser({...user, user_login: event.target.value})} fullWidth required/>
                    </Grid>
                    <Grid size={{md: 6, xs: 8}}>
                        <TextField label="Contraseña" value={user.user_password} onChange={(event) => setUser({...user, user_password: event.target.value})} type='password' fullWidth required/>
                    </Grid>
                    <Grid size={{md: 6, xs: 8}}>
                        <Button variant='contained' fullWidth type='submit'>CONECTAR</Button>
                    </Grid>
                </Grid>
                { alert.show ? 
                    ( alert.isValidated ) ? 
                    /*<Alert severity='success'>Acceso concedido</Alert>*/
                    ''
                    : 
                    <Alert severity='error'>Usuario y/o contraseña incorrectos</Alert> 
                : 
                ''}
            </Box>
        </>
    );
}

export default Login;