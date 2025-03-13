import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadSingleFile = async (fileObject) => {
  console.log("__dirname1:", __dirname);

  let uploadPath = path.resolve(__dirname, "../public/images/upload/");

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  let extName = path.extname(fileObject.name);
  let uniqueId = uuidv4();

  let finalName = `${uniqueId}${extName}`;
  let finalPath = path.join(uploadPath, finalName);

  try {
    await new Promise((resolve, reject) => {
      fileObject.mv(finalPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      status: "success",
      id: uniqueId,
      path: `/images/upload/${finalName}`,
      error: null,
    };
  } catch (error) {
    console.log(">> check error: " + error);
    return {
      status: "failed",
      path: null,
      error: error.toString(),
    };
  }
};

export const uploadMultipleFiles = async (filesArr) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload/");
    let resultArr = [];
    let countSuccess = 0;
    console.log("filesArr ", filesArr);

    for (let i = 0; i < filesArr.length; i++) {
      let extName = path.extname(filesArr[i].name);
      let baseName = path.basename(filesArr[i].name, extName);

      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await filesArr[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          finalName: filesArr[i].name,
          error: null,
        });
      } catch (error) {
        console.log(">> check error: " + error);
        resultArr.push({
          status: "failed",
          path: null,
          finalName: filesArr[i].name,
          error: JSON.stringify(error),
        });
      }
    }

    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(">> check error: " + error);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};
