const User = require("../models/User");
const bcrypt = require('bcrypt')

const getUserID = async () => {
    const userFound = await User.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .lean()
      .exec()
    if (!userFound) {
      return 'U0000'
    } else {
      let userID = userFound.user_id
      if (userID.substr(0, 1) === 'U') {
        userID = userID.substr(1)
        const numberUser = parseInt(userID, 10)
        userID = ('0000' + (numberUser + 1)).slice(-4)
        return `U${userID}`
      } else {
        return ''
      }
    }
  }





const creatNewUser = async (req, res) => {
  try {
    const { username, password, name , role} = req.body;
    if (!username || !password || !name) {
      return res
        .status(401)
        .json({ success: false, message: "Cant create NewUser" });
    }

    const duplicate=await User.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(409).json({success:false,message:'Duplicate Username'})
    }

    const hashedPwd = bcrypt.hashSync(password,10)
    const userID = await getUserID()
    const userOpject = {
        user_id:userID,
        username,
        password:hashedPwd,
        name,
        role
    }
    const user = await User.create(userOpject)

    if(!user) return res.status(400).json({success:false,message:'Invalid user data recived'})

    res.status(201).json({success:true,message:'New User '+name+'create'})

  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

module.exports={creatNewUser}