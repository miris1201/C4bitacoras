
export const isNumeric = ( value?: string | number ) => {
    return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

export const calcTotalAmount = ( price:number, discount:number, quantity:number ) => {

    let importe = price * quantity;
    let discountCalc = ( discount > 0 ) ? importe * (discount * .01) : 0;

    return (importe - discountCalc);

}

export const downloadAsPDF = (pdf64: string) => {
    
    if (pdf64.startsWith("JVB")) {
        pdf64 = "data:application/pdf;base64," + pdf64;
      downloadFileObject(pdf64);
    } else if (pdf64.startsWith("data:application/pdf;base64")) {
      downloadFileObject(pdf64);
    }
  
}

export const downloadFileObject = (base64: string ) => {

    const linkSource = base64;
    const downloadLink = document.createElement("a");
    const fileName = "notaDeSalida.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target= "_blank";
    downloadLink.click();
    
}

export const getToken = () => (localStorage.getItem('token'))
  ? localStorage.getItem('token')
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;