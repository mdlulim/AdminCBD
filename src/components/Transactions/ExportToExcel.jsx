import React from "react";
import ReactExport from "react-export-excel";



export default function ExportToExcel(props) {
    const { data } = props;
    const ExcelFile = ReactExport.ExcelFile;
     const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

const dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];
        return (
            <ExcelFile element={<button className="btn btn-info btn-icon">Export Excel</button>}>
                <ExcelSheet data={data} name="Transactions">
                    <ExcelColumn label="TransactionID" value="txid"/>
                    <ExcelColumn label="Type" value="subtype"/>
                    <ExcelColumn label="Fees" value="fee"/>
                    <ExcelColumn label="Amount" value="amount"/>
                    <ExcelColumn label="Status" value="status"/>
                    <ExcelColumn label="Updated" value="updated"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }