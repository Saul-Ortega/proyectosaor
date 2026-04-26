import { styled } from '@mui/material/styles';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Tooltip from '@mui/material/Tooltip';

export interface ItemType {
    id?: number;
    item_name: string;
    brand: string;
    item_type: string;
    price: string;
}

const itemInitialState: ItemType = {
    item_name: '',
    brand: '',
    item_type: '',
    price: '0'
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Dashboard() {
    const [item, setItem] = useState(itemInitialState)
    const [tableData, setTableData] = useState([])
    const userData = useSelector( (state: RootState) => state.authentication );
    
    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        
        const queryParams = new URLSearchParams({
            item_name: item.item_name,
            brand: item.brand,
            item_type: item.item_type,
            price: parseFloat(item.price).toFixed(2).toString()
        })

        const response = await fetch(`http://localhost:3030/addItem?${queryParams}`, {
            method: 'GET'
        });
        
        if ( !response.ok ) {
            throw new Error('Error')
        }

        const result = await response.json()
    
        if ( result === 1 ) {
            alert('Datos insertados con éxito')
        }
        
        setItem(itemInitialState)
        await fetchItems()
    }

    const fetchItems = async () => {
        const response = await fetch('http://localhost:3030/getItems', {
            method:'GET'
        })

        if ( !response.ok ) {
            throw new Error('Error Fetching Data')
        }
    
        const data = await response.json()
        setTableData(data.data)
    }

    useEffect( () => {
        fetchItems()
    }, [])

    const handleDeleteItem = async (row: ItemType) => {
        const queryParams = new URLSearchParams({
            id: row.id?.toString() || ''
        })

        const response = await fetch(`http://localhost:3030/deleteItem?${queryParams}`, {
            method: 'GET'
        });

        if ( !response.ok ) {
            throw new Error('Error')
        }

        const result = await response.json()
    
        if ( result === 1 ) {
            alert('Datos eliminados con éxito')
        }

        await fetchItems()
    }

    return(
        <>
            <Box
            component='form'
            onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid size={12} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Grid size={3}>
                            <TextField label="Nombre" value={item.item_name} onChange={(event) => setItem({...item, item_name: event.target.value})} fullWidth required />
                        </Grid>
                        <Grid size={3}>
                            <TextField label="Marca" value={item.brand} onChange={(event) => setItem({...item, brand: event.target.value})} fullWidth required />
                        </Grid>
                        <Grid size={3}>
                            <TextField label="Tipo" value={item.item_type} onChange={(event) => setItem({...item, item_type: event.target.value})} fullWidth required />
                        </Grid>
                        <Grid size={3}>
                            <TextField label="Precio" value={item.price} type='number' onChange={(event) => setItem({...item, price: event.target.value})} fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid size={12}>
                        <Tooltip title="Añadir fila a la tabla" placement='bottom' arrow>
                            <Button variant="outlined" type="submit">+ INSERTAR DATOS</Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>

            <Divider orientation="horizontal" variant='fullWidth' sx={{ border:'2px solid grey', marginTop: '30px', marginBottom: '30px' }} flexItem/>

            <TableContainer component={Paper}>
                <Table aria-label="DATOS DE LOS ÍTEMS">
                    <TableHead>
                        <TableRow>
                            {
                                userData.userRole === 'admin' ?
                                <StyledTableCell></StyledTableCell>
                                :
                                <></>
                            }
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Marca</StyledTableCell>
                            <StyledTableCell>Tipo</StyledTableCell>
                            <StyledTableCell>Precio</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map(( row: ItemType) => (
                            <TableRow key={row.id}>
                                {
                                    userData.userRole === 'admin' ?
                                    <TableCell>
                                        <Tooltip title="Eliminar fila" placement='bottom' arrow>
                                            <Button onClick={() => handleDeleteItem(row)}>
                                                <DeleteIcon />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    :
                                    <></>
                                }
                                <TableCell>{row.item_name}</TableCell>
                                <TableCell>{row.brand}</TableCell>
                                <TableCell>{row.item_type}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Dashboard