// // const sessionIdToUserMap = new Map();// we are maintaining state here ki jse hi user login ho vo cookies mai jakr save hojaye we now use tokens

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// module.exports = {
//   setUser,
//   getUser,
// };


//stateless
const jwt = require("jsonwebtoken");
const secret = "neeraj$123"; // koi b unknown bnda hmare data ko change nhi kr skta agr uske pas yh secret key nhi hui
function setUser(user) {// setUser call from handleLogin in controler in user.js

  return jwt.sign({//payload
    //user._id is by default make by db User(collection)
    _id: user._id, // go to static router if this current user id  match with the database id then only current user links will show on screen
    email: user.email,
  }, 
  secret,); 
  //The library automatically adds iat (Issued At) to the payload.console window mai id ,email or iat print hoga ,iat default print hora h payload lga h isiliye
} // it is used to create token 



// function setUser(user) {
//   return jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//     },
//     secret, // Use env in production
//     { expiresIn: "1d" }
//   );
// }


function getUser(token) {
  console.log("token= " ,token); // open jwt.io and paste that token it wil give you current user data and then paste secret for signature verification

  if (!token) return null;
  try {
    return jwt.verify(token, secret); // returns decoded user if data and secret matches
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
