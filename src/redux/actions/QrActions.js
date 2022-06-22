export const onReadSuccess = (data) => {
    return {
        type: 'qrReadSuccess',
        payload: data,
    }
}

export const timeout = (data = "") => {
    return {
        type: 'timeout',
        payload: data
    }
}

export const qrDataFormCreate = (data) => {
    return {
        type:"qrDataSuccess",
        payload: data
    }
}


// export const QrDataSave = (data = "") => {
//     return {
//         type: "qrDataSave",
//         payload: data
//     }
// }