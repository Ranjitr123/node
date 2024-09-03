const Staff = require('../models/Staff');

// Create a new staff member
exports.createStaff = async (req, res) => {
    try {
        const { name, age, developer } = req.body;
        const staff = new Staff({ name, age, developer });
        await staff.save();
        res.status(201).send(staff);
    } catch (error) {
        res.status(500).send({ error: 'Error creating staff member' });
    }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).send(staff);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching staff members' });
    }
};

// Get a staff member by ID
exports.getStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).send({ error: 'Staff member not found' });
        }
        res.status(200).send(staff);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching staff member' });
    }
};

// Delete a staff member by ID
exports.deleteStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).send({ error: 'Staff member not found' });
        }
        res.status(200).send({ message: 'Staff member deleted successfully', staff });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting staff member' });
    }
};
