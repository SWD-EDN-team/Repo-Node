import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadSingleFile = async (fileObject) => {
  console.log("__dirname1:", __dirname);

  let uploadPath = path.resolve(__dirname, "../public/images/upload/");

  // ✅ Kiểm tra và tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = path.join(uploadPath, finalName);

  try {
    // ✅ Chuyển file vào thư mục (bọc .mv() trong Promise)
    await new Promise((resolve, reject) => {
      fileObject.mv(finalPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      status: "success",
      path: `/images/upload/${finalName}`, // ✅ Trả về đường dẫn hợp lý
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
