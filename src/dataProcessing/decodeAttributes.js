const getTypeOfFrame = (data) => {
    let type;
    switch(data[0]){
        case 0xff : 
            type = 'socketEnd';
        break;
        case 0x00 :
            type = 'data';
        break;
            
    }
    return type;
}

const decodeMacAddress = (data) =>{
    //read the mac address from the frame
    //the mac address is 6 bytes long
    const macAddressBytes = frame.slice(0, 6);
    return macAddressBytes.toString('hex');
}



module.exports = {decodeMacAddress , getTypeOfFrame };
