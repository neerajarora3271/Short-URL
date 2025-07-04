const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid; //This line retrieves the uid (user ID) from the  cookies. agr cookies section mai uid h toh yh us uid ki 
  //heklp se user ki info nikale ga getUser ke through ,or vo data req.user mai dal dega 
  //ye data setuser se save hua h jo getuser nikal ke dera h 

  const user = getUser(userUid); //Calls a function getUser() to fetch the user object based on the uid.



  req.user = user;// it is used to fetch current user which is logged in printing on console window
console.log(" { it is req.user set by setUser which is in auth.js(service)}  current user is",req.user);

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
