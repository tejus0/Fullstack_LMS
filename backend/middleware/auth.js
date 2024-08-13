import jwt from 'jsonwebtoken'
import counsellorModal from '../models/counsellorDetail.js';
import agentModal from '../models/agentModel.js';

export const isLoggedIn = async(req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    // console.log("decoded value" , decoded)
    const userId = decoded.id;
    let user , res;
    if(decoded.isCounseller){
       res = await counsellorModal.findOne({_id : userId});
     
    }else{
       res = await agentModal.findOne({_id : userId});
    }

    if(res){
      user = res;
    }else{
      return res.status(400).json({
        status:"Error",
        message:"User Does not Exists"
      })
    }
    // console.log("user is : " , user);
    
    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};


export const isSuperAdmin = (req , res, next)=>{
  if(!req.user?.is_admin){
    return res.status(400).json({
      message:"You are not Authorized to access this route"
    })
  }
  next();
}

