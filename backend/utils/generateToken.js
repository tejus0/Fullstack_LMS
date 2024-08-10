import jwt from 'jsonwebtoken'

// Function to sign a JWT token
function generateToken(user , isCounseller=true) {
 
  const secretKey = process.env.SECRET_KEY;

  
  const payload = {
    id: user.id,
    isCounseller
  };

  
  const options = {
    expiresIn: '1h', 
  };

  // Sign the token
  const token = jwt.sign(payload, secretKey, options);

  return token;
}

export default generateToken;
