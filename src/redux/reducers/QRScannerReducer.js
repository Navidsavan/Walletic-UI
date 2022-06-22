
const initialState = {
    qrCodeStatus: "failed", 
    qrData: ""
}

 
const QRCodeScannerReducer = (state=initialState, action) => {
    switch(action.type) {   // can define multiple states
        case 'qrReadSuccess':
            return {qrCodeStatus: 'success', qrData: action.payload};
        case 'timeout': 
            return {qrCodeStatus: 'timeout', qrData: action.payload};
        default: 
            return state;
    }   
}

export const QrDataSaveReducer = (state = "", action) => {
    switch(action.type) {
        case 'qrDataSave':
            return {statusOfDb: action.payload}
        default: 
            return state
    }
}

export const modalReducer = (state = false, action) => {
    if(action.type == "modalToggle") {
        return {
            modalVisible: !state
        }
    } else {
        return state;
    }
}

   

export default QRCodeScannerReducer;