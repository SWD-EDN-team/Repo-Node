import path from "path";

export const uploadSingleFile = async (fileObject) => {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  console.log("__dirname1:", __dirname);

  let uploadPath = path.resolve(__dirname, "../public/images/upload/");

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
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

export const uploadMultipleFiles = async (filesArr) => {
  try {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
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
