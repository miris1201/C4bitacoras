import { write, utils  } from 'xlsx';
import * as FileSaver from "file-saver";

export const exportFile = ( fileName: string, dataExport: Array<any>, sheetName = "data" ) => {
    //Exportando a Excel de manera genérica, pondiendolo sin formato y tambien en una sola hoja.
    if( dataExport.length > 0){

        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        
        const ws = utils.json_to_sheet( dataExport );
        //const wb = utils.book_new();
        const wb = { 
            Sheets: { data: ws }, 
            SheetNames: [sheetName] 
        };
        const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);

    }

};