import { createColumnHelper, ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

function firstNameFilterFn(row, columnId, filterValue) {
    if (columnId === 'first_name' && filterValue === 'Unknown' && !row.original.first_name) {
        return true;
    }

    if (filterValue === row.original.first_name) {
        return true;
    }

    return false;

}

firstNameFilterFn.autoRemove = (val) => !val;


function firstNameAccessorFn(row) {
    console.log('row', row);
    return row.first_name;
}


function lastNameCellFn(cell) {
    return (<span style={{ color: 'red' }}>{cell.getValue()}</span>)
}



const columnDef = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'first_name',
        header: 'First Name',
        filterFn: firstNameFilterFn,
        accessorFn: firstNameAccessorFn,
    },
    {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: lastNameCellFn
    },
    {
        accessorKey: 'email',
        header: 'Email',
        filterFn: firstNameFilterFn
    },
    {
        accessorKey: 'date',
        header: 'Date',
        enableColumnFilter: false,
    },
];

export const columnDefDefaultFn = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    columnHelper.accessor((row) => {
        // console.log('row', row);
        return row.first_name || row.last_name;
    }, {
        id: 'first_name',
        header: 'First Name',
        filterFn: firstNameFilterFn,
        cell: (info) => {
            // console.log('info', info);
            return info.row.original.first_name || info.row.original.last_name;
        }
    }),
    {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: lastNameCellFn
    },
    {
        accessorKey: 'email',
        header: 'Email',
        filterFn: firstNameFilterFn
    },
    {
        accessorKey: 'date',
        header: 'Date',
        enableColumnFilter: false,
    },
];

export default columnDef;
