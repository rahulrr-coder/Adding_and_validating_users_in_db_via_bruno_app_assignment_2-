const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        // 1. Get email and password from request body
        const { email, password } = req.body;

        // 2. Validate if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 3. Check if user exists in database
        const user = await User.findOne({ email }); // Assuming you have a User model
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first"
            });
        }

        // 4. Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // 5. Send response based on password comparison
        if (isPasswordValid) {
            // You might want to generate a JWT token here for authentication
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                    // Add other user details you want to send
                    // Make sure not to send the password
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { login };
