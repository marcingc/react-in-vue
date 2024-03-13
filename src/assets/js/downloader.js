export function openPdfFileInBrowser(fileName, response) {
  let ieEDGE = navigator.userAgent.match(/Edge/g);
  let ie = navigator.userAgent.match(/.NET/g); // IE 11+
  let oldIE = navigator.userAgent.match(/MSIE/g);

  let blob = new Blob([response], {type: 'application/pdf'});
  if (ie || oldIE || ieEDGE) {
    // window.navigator.msSaveBlob(blob, fileName);
    // navigator.msSaveOrOpenBlob(file, fileName);
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const fileURL = URL.createObjectURL(blob);
    const newWindow = window.open(fileURL, '_blank');
  }
}

export function downloadFile(typeOfFile, nameOfFile, response) {
  let ieEDGE = navigator.userAgent.match(/Edge/g);
  let ie = navigator.userAgent.match(/.NET/g); // IE 11+
  let oldIE = navigator.userAgent.match(/MSIE/g);

  let blob = new Blob([response], {type: typeOfFile});
  let fileName = nameOfFile;

  if (ie || oldIE || ieEDGE) {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    //BUG FIX FOR FIREFOX 67, 68
    // link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
