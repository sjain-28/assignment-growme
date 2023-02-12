import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';



const DataTable = ({
    rows,
    columns,

   
    
}) => {
    const [pageSize, setPageSize] = useState(5);
    return (
      <DataGrid 
            rows={rows}
            columns={columns}
            
            sx={{ height: 600, width: 600 }}
            //checkboxSelection
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[2, 5, 10]}
        />
    )
}

export default DataTable;
