const userRouter = require("express").Router();
const { getUserById, updateUserEmail, updateUserPassword } = require("../db/user");
const {
  verifyUpdateUserEmailRequest, verifyUpdateUserPasswordRequest
} = require("../middleware/verifyUpdateUserRequest");

userRouter.get("/", async (req, res) => {
  const userId = Number(req.user);

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    return res.send(user);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
});

userRouter.put("/email", verifyUpdateUserEmailRequest, async (req, res) => {
  const { email } = req.body;
  const userId = Number(req.user);

  try {
    const updatedEmail = await updateUserEmail(email, userId);
    return res.send(updatedEmail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error!");
  }
});

userRouter.put("/password", verifyUpdateUserPasswordRequest, async (req, res) => {
    const { password } = req.body;
    const userId = Number(req.user);
  
    try {
      const updated = await updateUserPassword(password, userId);

      if(updated){
        return res.send("Password Updated!")
      } else{
        return res.status(500).send("Server has problem updating passsword!");
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal server error!");
    }
  });

module.exports = userRouter;
