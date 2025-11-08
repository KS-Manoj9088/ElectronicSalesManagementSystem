import User from "../models/User";

export const protect = async(req, res, next)=>{
    let token;
    

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user){
                return res.status(401).json({ message: 'User not found' });
            }

            if (!req.user.isActive) {
                return res.status(401).json({ message: 'User account is blocked' });
            }

            next();
        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                message : 'Not authorized, token failed'
            });
        }
    }

    if(!token){
        return res.status(401).json({
            message : 'Not authorized, no token'
        });
    }
}

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};