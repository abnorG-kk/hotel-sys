import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {insertRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {deleteRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'

 function RoomList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Room Id', field: 'id' },
      { title: 'Room No', field: 'roomNo' },
      { title: 'Location', field: 'location'},
      {
        title: 'Maintainance needed',
        field: 'maintainanceRequired',
      },
    ]); 
    const rooms = useSelector(state => state.firestore.ordered.room)
    const data = rooms ? (rooms.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="RoomList Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertRoomType(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updateRoomType(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteRoomType(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)


  

  
    return(
        <div>
             {table}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
 //       updateRoomType: (payload) => dispatch(updateRoomType(payload)),
 //       insertRoomType: (payload) => dispatch(insertRoomType(payload)),
 //       deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'room'}
  ])) (RoomList)