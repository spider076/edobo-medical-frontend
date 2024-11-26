const googleVision = require("../config/googleVision");

const processPdf = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded."
    });
  }

  console.log("file path : ", file.path);

  const response = await googleVision({
    filePath: file.path
  });

  // console.log("response : ", response.text);

  //   return res.status(200).json({
  //     success: true,
  //     name: file.originalname,
  //     path: file.path
  //   });
};

module.exports = processPdf;
