const userRouter = require("express").Router();
const {
  getUserById,
  updateUserEmail,
  updateUserPassword,
} = require("../db/user");
const {
  verifyUpdateUserEmailRequest,
  verifyUpdateUserPasswordRequest,
} = require("../middleware/verifyUpdateUserRequest");

userRouter.get("/", async (req, res) => {
  const userId = Number(req.user);

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error getting user profile");
  }
});

userRouter.put("/email", verifyUpdateUserEmailRequest, async (req, res) => {
  const { email } = req.body;
  const userId = Number(req.user);

  try {
    const updatedEmail = await updateUserEmail(email, userId);
    return res.status(200).send(updatedEmail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

userRouter.put(
  "/password",
  verifyUpdateUserPasswordRequest,
  async (req, res) => {
    const { password } = req.body;
    const userId = Number(req.user);

    try {
      const updated = await updateUserPassword(password, userId);

      if (updated) {
        return res.status(200).send("Password Updated!");
      } else {
        return res.status(500).send("Error updating passsword!");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal server error!");
    }
  }
);

module.exports = userRouter;
