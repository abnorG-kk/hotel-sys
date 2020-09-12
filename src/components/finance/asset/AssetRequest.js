import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {insertAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {deleteAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'


 function AssetRequest(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Request ID', field: 'requestID' },
      //{ title: 'Date', field: 'date' },
      { title: 'Asset Type', field: 'assetType'},
      { title: 'Description', field: 'description' },
      { title: 'Quantity', field: 'quantity'},
      { title: 'Unit Price', field: 'unitPrice'},
      { title: 'Total Amount', field: 'totalAmount'},
      { title: 'Status', field: 'status'},
    ]); 
    const room = useSelector(state => state.firestore.ordered.assetRequest)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Asset Requests"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAssetRequest(newData);
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
                props.updateAssetRequest(newData)
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
                props.deleteAssetRequest(oldData.id)
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
        updateAssetRequest: (payload) => dispatch(updateAssetRequest(payload)),
        insertAssetRequest: (payload) => dispatch(insertAssetRequest(payload)),
        deleteAssetRequest: (roomId) => dispatch(deleteAssetRequest(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'assetRequest'}
  ])) (AssetRequest)


 // export default AssetRequest