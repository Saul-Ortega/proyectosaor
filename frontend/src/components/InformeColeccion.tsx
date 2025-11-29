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
                            label: 'Export CSV',
                            exportFunc: (col, data) => ExportCsv(col, data, 'Items_CSV'),
                        },
                        {
                            label: "Export PDF",
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