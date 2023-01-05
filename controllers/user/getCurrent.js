const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    ststaus: "OK",
    code: 200,
    message: "user logined",
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
