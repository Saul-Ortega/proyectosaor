import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Login = () => {
    return(
        <>
            <Container>
                <Typography variant='h1'>Página Login de Saúl Alberto Ortega Rodríguez</Typography>
                <Typography variant='h2'>Título h2</Typography>
                <Typography variant='h3'>Título h3</Typography>
                <Typography variant='subtitle1'>Subtítulo 1</Typography>
                <Typography variant='caption'>Caption</Typography>
                <Button variant='outlined' color={'primary'}>Botón 1</Button>
                <Button variant='text' color={'secondary'}>Botón 2</Button>
                <Button variant='outlined' color={'error'}>Botón 3</Button>
                <Button variant='contained' color={'success'}>Botón 4</Button>
                <Button variant='outlined' color={'warning'}>Botón 5</Button>
                <Button variant='text' color={'info'}>Botón 6</Button>
            </Container>
        </>
    );
}

export default Login