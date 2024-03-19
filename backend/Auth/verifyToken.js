import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js'

export const authenticate = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (!authToken || !authToken.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No Token, Authorization denied' });
        }

        const token = authToken.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findOne({ _id: userId, role: { $in: roles } });
        const doctor = await Doctor.findOne({ _id: userId, role: { $in: roles } });

        if (!user && !doctor) {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }

        req.currentUser = user || doctor;
        next();
    } catch (error) {
        console.error('Error in restrict middleware:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




