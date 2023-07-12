export interface ExtensionMatrix {
  extType: string;
  extVariables?: string[];
  color: string;
}

const DOC_FILES = ['DOC', 'DOCX', 'DOT', 'WBK', 'XML', 'DOTX', 'DOTM', 'DOCB', 'MSG', 'RVT', 'RFA', 'EML', 'PSD'];
const PDF_FILES = ['PDF'];
const ZIP_FILES = ['ZIP', 'RAR', 'ZIP7Z', 'BCFZIP'];
const HTML_FILES = ['HTML'];
const OBJ_FILES = ['OBJ', 'DAT', 'BT3D'];
export const JPG_FILES = ['JPG', 'PNG', 'GIF', 'BMP', 'TIFF', 'JPEG'];
const XLS_FILES = ['XLS', 'XLT', 'XLM', 'XLL', 'XLA', 'XLA5', 'XLA8', 'XLSX', 'XLSM', 'XLTL', 'XLSB', 'XLW', 'CSV'];
const DWG_FILES = ['DWG', 'BCF', 'NWC', 'DWF', 'NWD', 'RWS', 'DGN'];
const PPT_FILES = ['PPT', 'POT', 'PPS', 'PPA', 'PPAM', 'PPTX', 'PPTM', 'POTX', 'POTM', 'PPAM', 'PPSX', 'PPSM', 'SLDX', 'SLDM', 'PA'];

export const extensionMatrix: ExtensionMatrix[] = [
  {
    color: '#4282ED',
    extType: 'DOC',
    extVariables: DOC_FILES,
  },
  {
    color: '#FC5346',
    extType: 'PDF',
    extVariables: PDF_FILES,
  },
  {
    color: '#7D46FC',
    extType: 'ZIP',
    extVariables: ZIP_FILES,
  },
  {
    color: '#BB6E42',
    extType: 'HTML',
    extVariables: HTML_FILES,
  },
  {
    color: '#484848',
    extType: 'OBJ',
    extVariables: OBJ_FILES,
  },
  {
    color: '#41B795',
    extType: 'JPG',
    extVariables: JPG_FILES,
  },
  {
    color: '#008000',
    extType: 'XLS',
    extVariables: XLS_FILES,
  },
  {
    color: '#D345BF',
    extType: 'DWG',
    extVariables: DWG_FILES,
  },
  {
    color: '#EEB45B',
    extType: 'PPT',
    extVariables: PPT_FILES,
  },
  {
    color: '#808080',
    extType: 'Other',
  },
];
