
export const QRCodeGenerationReducer = (state="", action) => {
    switch(action.type) {   // can define multiple states
        case 'qrDataSuccess':
            return {qrCodeStatus: 'success', orderDetails: action.payload};
        default: 
            return state;
    }   
}