import { Router } from "express";
import { applyKp, getAllApplications, getApplication, getSelectedApplications, updateStatusApplication, removeApplicaton } from "./applicationKPService.js";
import verify from "../validateToken/validateTokenService.js"


const router = Router();

router.get('/', async (req, res) => {

    try {

        const authToken = req.headers['authorization']?.split(' ')[1];

        if (!authToken) {
            return res.status(401).json({ 
                status: "Fail",
                message: 'Access denied. No token provided.' 
            });
        }

        try {

            verify(authToken);

        } catch (error) {

            return res.status(401).json({
                status: "Fail",
                message: `Access denied ${error.message}`
            })
        }

        const applications = await getAllApplications();

        return res.status(200).json({
            status: "Success",
            data: applications
        });

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: error.message
        });

    }
});

router.get('/download', async (req, res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        verify(authToken);
    } catch (error) {

        return res.status(401).json({
            status: "Fail",
            message: `Access denied ${error.message}`
        })
    }

    try {

        const { batchNumber, status } = req.query;

        if (batchNumber == null || status == null) {
            return res.status(400).json({
                status: "Fail",
                message: "All data must be provided"
            });
        }

        const applications = await getSelectedApplications(batchNumber, status);

        return res.status(200).json({
            status: "Success",
            data: applications
        });

    } catch (error) {

        return res.status(500).json({
            status: "Fail",
            message: `Internal Server Error ${error} ${error.message}`
        });

    }


});

router.get('/:id', async (req,res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.'})
    }

    try {

        try {
            verify(authToken);
        } catch (error) {

            return res.status(401).json({
                status: "Fail",
                message: `Access denied ${error.message}`
            })
        }

        let { id } = req.params;

        id = parseInt(id)
        
        const application = await getApplication(id);

        if (!application) {
            return res.status(404).json({
                status: "Fail",
                message: "Application not found."
            })
        }

        return res.status(200).json({
            status: "Success",
            data: application
        })

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: `Error: ${error.message}`
        })
    }
});

router.post('/', async (req, res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        
        const { roleId } = req.body;

        await applyKp(authToken, roleId);

        return res.status(201).json({
            status: "Success",
            message: "User successfully applied Kerja Praktik"
        });

    } catch (error) {

        if (error.code === 'P2002') {

            return res.status(400).json({
                status: "Fail",
                message: `An application with this ${error.meta.target} already exists.`
            });

        }

        return res.status(500).json({
            status: "Error",
            message: "Internal server error."
        });

    }
});

router.put('/:id', async (req,res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.'})
    }

    try {

        try {
            verify(authToken);
        } catch (error) {

            return res.status(401).json({
                status: "Fail",
                message: `Access denied ${error.message}`
            })
        }

        let { id } = req.params;
        id = parseInt(id);

        const { status } = req.body;

        if (!status) {
            return res.status(404).json({
                status: "Fail",
                message: "Status pendaftaran not provided."
            });
        }

        const updatedApplication = await updateStatusApplication(status, id) ;

        return res.status(200).json({
            status: "Success",
            data: updatedApplication
        });

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: `Error: ${error.message}`
        })
    }
});

router.delete('/:id', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "Fail",
            message: "Access denied. No token provided"
        });
    }

    try {
        verify(token);
    } catch (error) {
        return res.status(401).json({
            status: "Fail",
            message: `Access denied. ${error.message}`
        });
    }

    try {

        const { id } = req.params;

        await removeApplicaton(parseInt(id));

        return res.status(200).json({
            status: "Success",
            message: "Application successfuly removed."
        });

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: `Internal Server Error. ${error.message}`
        });
        
    }
});

export default router;