import User from '../models/UserSchema.js'
import Bookings from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateUser =  async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{$set : req.body},{new : true})
        res.status(200).json({success : true,message : 'Sucessfully updated',data : updatedUser})
    }
    catch (err) {
        res.status(500).json({success : false,message : 'Failed to update'})
    }
}

export const deleteUser =  async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({success : true,message : 'Sucessfully deleted'})
    }
    catch (err) {
        res.status(500).json({success : false,message : 'Failed to delete'})
    }
}

export const getSingleUser =  async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select('-password')
        res.status(200).json({success : true,message : 'User found',data : user})
    }
    catch (err) {
        res.status(404).json({success : false,message : 'No user found'})
    }
}

export const getAllUser =  async (req, res) => {

    try {
        const users = await User.find({}).select('-password')
        res.status(200).json({success : true,message : 'Users found',data : users})
    }
    catch (err) {
        res.status(404).json({success : false,message : 'No users found'})
    }
}

export const getUserProfile = async (req, res) => {

    const userId = req.userId

    try 
    {
        const user = await User.findById(userId)

        if (!user)
        {
            return res.status(404).json({success : false, message : 'User not found'})
        }

        const {password, ...rest} = user._doc
        res.status(200).json({success : true, message : 'Profile info loading', data : {...rest}})
    }
    catch (err) 
    {
        res.status(500).json({success : false, message : 'Something went wrong'})
    }
}

export const getMyAppointments = async (req, res) => {
    try {
        // Step-1: Retrieve appointments from booking for a specific user
        const bookings = await Bookings.find({ user: req.userId });
        console.log("Bookings:", bookings); // Add this line for debugging

        // Check if there are no bookings
        if (bookings.length === 0) {
            return res.status(200).json({ success: true, message: 'No appointments found', data: [] });
        }

        // Step-2: Extract doctor IDs from appointment bookings
        const doctorIds = bookings.map(el => el.doctor);
        console.log("Doctor IDs:", doctorIds); // Add this line for debugging

        // Step-3: Retrieve doctors using doctor IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');
        console.log("Doctors:", doctors); // Add this line for debugging

        res.status(200).json({ success: true, message: 'Appointments info loading', data: doctors });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Something went wrong...' });
    }
};

