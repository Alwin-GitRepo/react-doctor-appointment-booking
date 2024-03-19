import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (user) => {
    return jwt.sign({id : user._id,role : user.role},process.env.JWT_SECRET,{
        expiresIn : '15d'
    })
}

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    if (role === 'patient') {
      user = await User.findOne({ email });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    }

    // check if the user exists
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user based on the role
    if (role === 'patient' || role === 'doctor') {
      const newUser = new (role === 'patient' ? User : Doctor)({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });

      await newUser.save();
      res.status(200).json({ success: true, message: 'User Successfully Created' });
    } else {
      // Handle invalid role
      res.status(400).json({ success: false, message: 'Invalid role' });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Internal Server Error, Try Again' });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user (patient or doctor) by email
        const user = await User.findOne({ email }) || await Doctor.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid Credentials" });
        }

        // Generate token
        const token = generateToken(user);

        // Destructure user object, excluding sensitive information
        const { password: _, role, appointments, ...rest } = user._doc;

        res.status(200).json({
            status: true,
            message: "Successfully Logged In",
            token,
            data: { ...rest },
            role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Failed to Login" });
    }
};
