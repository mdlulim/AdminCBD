import React from "react";
import ReactExport from "react-export-excel";



export default function ExportToExcel(props) {
    const { data } = props;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    //update user's record whose withdrawal request have been included in an excel sheet
    const setInProgress = () => {
       // console.log(data, " => data from export")
    }


    return (
        <ExcelFile  element={<button className="btn btn-info btn-icon" onClick={setInProgress}>Export Excel</button>}>
            <ExcelSheet data={data} name="Transactions">
                <ExcelColumn label="TransactionID" value="txid" />
                <ExcelColumn label="Type" value="subtype" />
                <ExcelColumn label="Fees" value="fee" />
                <ExcelColumn label="Amount" value="amount" />
                <ExcelColumn label="Status" value={(col) => {if (col.status == "Pending") return 0 } } />
                <ExcelColumn label="Updated" value="updated" />
            </ExcelSheet>
        </ExcelFile>
    );
}