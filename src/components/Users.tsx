import React, { useEffect, useState } from 'react'
import { IUsers } from '../models/IUsers';
import { UsersService } from '../services/UsersService';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from "./DataTable.jsx";
import {  Typography} from '@mui/material'



export interface IState{
    users:IUsers[];
    height:string;
    width:string;
}
   


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'userId',
    headerName: 'User Id',
    minWidth: 150,
   
  },
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 200,
   
  },
  {
    field: 'body',
    headerName: 'Body',
    minWidth: 200,
    
  },
];



const Users: React.FC<IState> = () => {
  
    const [state,setState]= useState<IState>({ 
        users:[] as IUsers[],  
    });

    useEffect(() => {
        setState({...state});
        UsersService.getAllUsers().then((res) => {
            setState({...state,users:res.data})
            console.log(res.data);
            
        }).catch(e => setState({
            ...state
        }));
       
    }, []);
    const{ users} = state;
    return (
        <>
      
            <div className="container">
                    <Typography variant='h3'> Data From API</Typography>
                      <DataTable
                        rows={users}
                        columns={columns}
                 
                        />
            </div>
      
        </>
    )
}

export default Users
