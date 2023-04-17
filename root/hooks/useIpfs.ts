import { Alert } from "react-native";
import { CommonRequest, IDBITRequest } from "../request";

const pinataApiEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "714738198040addd8a46";
const pinataSecret = "6b41d11e16646d0365136ec09c9b4bdc5ebf52f94c3186f881761232dbf53dfe";
export default function useIpfs() {
  const uploadToIpfs = async (blob: any, file: any) => {
      const formData = new FormData();
      formData.append("file", blob, file.name);
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
          regions: [
            {
              id: "FRA1",
              desiredReplicationCount: 1,
            },
            {
              id: "NYC1",
              desiredReplicationCount: 2,
            },
          ],
        },
      });

      formData.append("pinataOptions", pinataOptions);
      const config = {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecret,
          "Content-Type": "multipart/form-data"
        },
      };
    
    const res= await CommonRequest.post(pinataApiEndpoint, formData,config);

    return res;
  };
  return {
    uploadToIpfs,
  };
}
