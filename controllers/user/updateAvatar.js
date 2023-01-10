const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const tempPath = req.file.path;

    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();

    const image = await Jimp.read(tempPath);
    image.resize(250, 250);
    image.write(`${avatarsDir}/${_id}.${extention}`);

    fs.unlink(tempUpload);

    const avatarUrl = `${avatarsDir}/${_id}.${extention}`;

    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;

// try {
//     const { path: tempUpload, filename } = req.file;

//     const { _id } = req.user;
//     const [extention] = filename.split(".").reverse();
//     const avatarName = `${_id}.${extention}`;
//     console.log("avatarsDir", avatarsDir);
//     console.log("avatarName", avatarName);
//     const resultUpload = path.join(avatarsDir, avatarName);
//     console.log("resultUpload", resultUpload);
//     const image = await Jimp.read(resultUpload);
//     image.resize(250, 250);
//     image.write(`${avatarsDir}/${_id}1.${extention}`);

//     await fs.rename(tempUpload, resultUpload);

//     const avatarUrl = path.join("avatars", resultUpload);
//     console.log("avatarUrl", avatarUrl);

//     await User.findByIdAndUpdate(_id, { avatarUrl });

//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         avatarUrl,
//       },
//     });
//   }
