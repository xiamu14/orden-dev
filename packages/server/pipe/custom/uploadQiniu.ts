import fetch from "node-fetch";
import path from "path";
import qiniu from "qiniu";
import { setTaskName } from "../utils/common";

const config = new qiniu.conf.Config();

export default async function uploadQiniu(context: any) {
  try {
    const { buildAndroid, prepareEnv, logger } = context;
    const { productFile } = buildAndroid;
    const { ENV_TYPE } = prepareEnv;
    // get uploadToken
    const url =
      ENV_TYPE === "alpha"
        ? "https://hugoapia.yocdev.com/storage/upload"
        : "https://hugoapi.ctssvc.com/storage/upload";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        storage: "Qiniu",
        size: 0,
        name: path.basename(productFile),
        fileType: "apk",
        width: 0,
        height: 0,
        originPath: "string",
        userId: 0,
      }),
    });
    const data = (await response.json()) as any;

    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const key = data.key;
    let uploadToken = data.token;

    const uploadRes = await new Promise((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        key,
        productFile,
        putExtra,
        function (respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr);
          }

          if (respInfo.statusCode == 200) {
            console.log("upload success \n");
            logger.info(data.url);
            resolve(true);
            console.log({ qiniuDownloadUrl: data.url });
          } else {
            console.warn("something wrong \n");
            console.log(respInfo.statusCode);
            console.log(respBody);
            resolve(false);
          }
        }
      );
    });

    if (uploadRes) {
      return { downloadUrl: data.url };
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

setTaskName("uploadQiniu", uploadQiniu);
