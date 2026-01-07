// post save() method
runValidators: true is not required

// for patch runValidators: true is required
await User.findByIdAndUpdate(req.params.id, req.body, {
runValidators: true,
});

---

//flow of Signup

1. Validation of Data
2. Encrypt Password
3. Save data in DB

let encryptedPassword = await bcrypt.hash(password, 10); // send this to sigunup API

---

// flow of login

1. compare user entered plain password and DB Encrypted password
   bcrypt.compare(password, user.password)
2. If password matched then server creates JWT token and send in cookies in response
   const token = jwt.sign({ \_id: user.\_id, email: user.email }, "secretkey", {
   expiresIn: "1h",
   }); // Generate JWT token
   res.cookie("token", token, { httpOnly: true })
3. whenever any api request is send then compare req cookies is valid or not

---

//create middleware for Authentication

1. Get token from cookies
2. verify token
3. get user data from token
4. attach user to req object

---

// user is instance of User Model so we can offload few methods to User schema
userSchema.methods.getJWT = async function () {
const token = jwt.sign({ \_id: this.\_id }, "secretkey", {
expiresIn: "1h",
});
return token;
};

const token = await user.getJWT(); // can be called in this way

---

Indexes

- for optimized searching of records
- when you add unique field then indexes are automically added
- for explicitely adding indexes you need to add it in schema/model
- you can create compound index if you want to search more than one field
