import axios from 'axios';
import Axios, { AxiosRequestConfig, Method } from "axios";
import constants from '../constants';
import { Alert } from 'react-native';

const pinata_api_key = '0c4b96ff8706c7354792';
const pinata_secret_api_key =
  '4c3e410b069a3eeef7a54738b0bd0b6b8ea68011e5de61517e4e2158ef7fddd3';

export const testAuthentication = () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key,
        pinata_secret_api_key,
      },
    })
    .then(function (response) {
      console.log('res: ', response);
    })
    .catch(function (error) {
      console.log('e: ', error);
    });
};
export const pinJsonToIPFS = (params: any,fetchFallBack:(responseData:any)=>void,fetchError:(responseData:any)=>void)=> {
    const pinJSONToIPFSEndpoint = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const pinataApiKey = "714738198040addd8a46";
  const pinataSecret = "6b41d11e16646d0365136ec09c9b4bdc5ebf52f94c3186f881761232dbf53dfe";
  const headers={
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataSecret,
    }

  fetch(pinJSONToIPFSEndpoint, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(params)
  })
  .then((response) => response.json())
  .then((responseData) => {
    fetchFallBack(responseData)
  
  })
  .catch((error) => {
    console.warn(error);
    fetchError(error)
  })
  

};
export const pinFileToIPFS = async (formData: FormData,fetchFallBack:(responseData:any)=>void,fetchError:(responseData:any)=>void) => {
  const pinataApiEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  formData.append(
    'pinataMetadata',
    JSON.stringify({
      name: 'file',
      keyvalues: {
        title: 'file',
      },
    })
  );

  //pinataOptions are optional
  formData.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1,
          },
          
          {
            id: 'NYC1',
            desiredReplicationCount: 2,
          },
        ],
      },
    })
  );

  
  fetch(pinataApiEndpoint, {
    method: 'post',
    headers: {
      pinata_api_key:'714738198040addd8a46',
      pinata_secret_api_key:'6b41d11e16646d0365136ec09c9b4bdc5ebf52f94c3186f881761232dbf53dfe',
        },
    body: formData
  })
  .then((response) => response.json())
  .then((responseData) => {
    fetchFallBack(responseData)
  
  })
  .catch((error) => {
    console.warn(error);
    fetchError(error)
  })
  

  // const resp = await axios.post(pinataApiEndpoint, formData, {
    //   maxBodyLength: Infinity,
    //   headers: {
    //     pinata_api_key,
    //     pinata_secret_api_key,
    //   },
    // })
    // Alert.alert(JSON.stringify(resp))
    // return resp;
};

// hit up the contract