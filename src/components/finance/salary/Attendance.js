import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {insertAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {deleteAttendance} from '../../../redux/actions/financeActions/AttendanceActions'

 function Attendance(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Attendance ID', field: 'attendanceID' },
        { title: 'Employee ID', field: 'employeeID' },
        { title: 'Department', field: 'department', lookup: 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Month', field: 'month'},
        { title: 'Year', field: 'year' },
        { title: 'Total Working Days', field: 'totWDays'},
        { title: 'Total Working Hours', field: 'totWHours'},
        { title: 'Actual Working Days', field: 'actWDays'},
        { title: 'Actual Working Hours', field: 'actWHours'},
        { title: 'Allowances', field: 'allowances'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'On Loan', field: 'loan', lookup: {30:'Yes', 31:'No'}},
    ]); 
    const atten = useSelector(state => state.firestore.ordered.attendanceFin)
    const data = atten ? (atten.map(atten => ({...atten}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Attendance Information"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAttendance(newData);
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
                props.updateAttendance(newData)
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
                props.deleteAttendance(oldData.id)
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
        updateAttendance: (payload) => dispatch(updateAttendance(payload)),
        insertAttendance: (payload) => dispatch(insertAttendance(payload)),
        deleteAttendance: (attendanceID) => dispatch(deleteAttendance(attendanceID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'attendanceFin'}
  ])) (Attendance)
  

  //export default Attendance