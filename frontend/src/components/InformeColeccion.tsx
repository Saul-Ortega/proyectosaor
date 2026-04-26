import { ItemType } from "./Dashboard";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useTheme } from "@mui/material/styles";

interface Props {
    data: ItemType[]
}

const InformeColeccion = ({ data }: Props) => {
    const col: Array<Column<ItemType>> = [
        { title: 'Nombre', field: 'item_name', filtering: false },
        { title: 'Marca', field: 'brand', filtering: true },
        { title: 'Tipo', field: 'item_type', filtering: true },
        { title: 'Precio', field: 'price', type: 'numeric', filtering: false },
    ]

    const theme = useTheme();

    return (
        <>
            <MaterialTable 
                title='Informe de Items'
                columns={col}
                data={data}
                options={{
                    exportMenu: [
                        {
                            label: 'Exportar CSV',
                            exportFunc: (col, data) => ExportCsv(col, data, 'Items_CSV'),
                        },
                        {
                            label: "Exportar PDF",
                            exportFunc: (col, data) => ExportPdf(col, data, "Items_PDF"),
                        }
                    ],
                    headerStyle: {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.default
                    },
                    columnsButton: true,
                    filtering: true,
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsPerPage: 'Filas por página:',
                        labelRows: 'filas',
                        firstAriaLabel: 'Primera Página',
                        firstTooltip: 'Primera Página',
                        previousAriaLabel: 'Página Anterior',
                        previousTooltip: 'Página Anterior',
                        nextAriaLabel: 'Siguiente Página',
                        nextTooltip: 'Siguiente Página',
                        lastAriaLabel: 'Última Página',
                        lastTooltip: 'Última Página'
                    },
                    toolbar: {
                        showColumnsTitle: 'Mostrar Columnas',
                        showColumnsAriaLabel: 'Mostrar Columnas',
                        exportTitle: 'Exportar',
                        exportAriaLabel: 'Exportar',
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar',
                        searchAriaLabel: 'Buscar',
                        clearSearchAriaLabel: 'Limpiar Búsqueda'
                    },
                    body: {
                        emptyDataSourceMessage: 'Nada que mostrar',
                    },
                }}
                renderSummaryRow={({ column, data }) =>
                    column.field === 'price' ? 
                    {
                        value: data.reduce((acc, row) => acc + parseFloat(row.price), 0),
                        style: {background: theme.palette.secondary.main}
                    }
                    :
                    undefined
                }
            />
        </>
    );
}

export default InformeColeccion;