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

const Login = () => {
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState({show: false, isValidated: false})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleUserChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setUser(event.target.value);
    }

    const handlePasswordChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword(event.target.value);
    }

    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const dbUser: string = 'patricia';
        const dbPasswd: string = '1234';

        const isValidated: boolean = user === dbUser && password === dbPasswd;

        setAlert({show: true, isValidated: isValidated});
        //console.log({user, password});

        if ( isValidated ) {
            dispatch(authActions.login({
                name: user,
                role: 'admin'
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
                <TextField label="Usuario" value={user} onChange={handleUserChange} sx={{ width: '100%' }} required/>
                <TextField label="Contraseña" value={password} onChange={handlePasswordChange} type='password'  sx={{ width: '100%' }} required/>
                <Button variant='contained' fullWidth type='submit'>CONECTAR</Button>
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