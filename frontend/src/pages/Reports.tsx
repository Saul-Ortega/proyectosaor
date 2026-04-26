import { useState } from 'react';
import { ItemType } from '../components/Dashboard';
import MenuAppBar from '../components/MenuAppBar';
import { Box, Button, Paper } from '@mui/material';
import InformeColeccion from '../components/InformeColeccion';
import Tooltip from '@mui/material/Tooltip';

const Reports = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<ItemType[]>([])

    const fetchItems = async () => {
        const response = await fetch('http://localhost:3030/getItems', {
            method:'GET'
        })

         if ( !response.ok ) {
            throw new Error('Error Fetching Data')
        }
    
        const items = await response.json()
        setData(items.data)
    }

    const handleClick = async () => {
        setOpen(!open)
        await fetchItems()
    }

    return (
        <>
            <MenuAppBar />
            <Box component={Paper}>
                <Tooltip title="Mostrar informe de colección" placement='bottom' arrow>
                    <Button variant='contained' style={{width: '300px', height: '40px'}} onClick={handleClick}>
                        INFORME COLECCIÓN
                    </Button>
                </Tooltip>
            </Box>
            {
                open ?
                <InformeColeccion data={data}/>
                :
                <></>
            }
        </>
    );
}

export default Reports;