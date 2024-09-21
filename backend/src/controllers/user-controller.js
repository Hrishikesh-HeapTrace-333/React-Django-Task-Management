import service from '../services/user-service.js';

const getAllUser = async (req, res) => {
    const users = await service.getAllUser();
    res.status(200).json(users);
};

const loginUser = async (req, res) => {
    try {
        const credentials = req.body;
        const header = req.headers;
        const response = await service.loginUser(credentials, header);
        if (response.message === 'failed') {
            return res.status(401).json(response); 
        }
        res.status(200).json(response); 
    } catch (error) {
        console.error('Error in loginUser controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const registerUser = async (req, res) => {
    try {
      const response = await service.registerUser(req.headers, req.body);
      res.status(200).json(response);
    } catch (error) {
        console.error('Error in registerUser controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {
    getAllUser,
    loginUser,
    registerUser
};
