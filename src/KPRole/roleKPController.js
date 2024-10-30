import { Router } from "express";
import { getAllRoles, getRole, addRole, updateRole, deleteRole } from "./roleKPService.js";
import verify from "../validateToken/validateTokenService.js"
import upload from "../multer/index.js";


const router = new Router();

router.get('/', async (req, res) => {

    try {

        const rolesKP = await getAllRoles();

        return res.status(200).json({
            status: "Success",
            data: rolesKP
        })

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
});

router.get('/:id', async (req, res) => {

    let  { id } = req.params;

    id = parseInt(id);

    try {
        
        const role = await getRole(id);
        
        if (!role) {
            return res.status(404).json({
                status: "Fail",
                message: "Role not found."
            })
        }

        return res.status(200).json({
            status: "Success",
            data: role
        });

    } catch (error) {

        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }

});

router.post('/', upload.single('role_image'), async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "Fail",
            message: "Access denied. No token provided."
        });
    }

    try {
        verify(token);
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}.`
        });
    }

    try {

        const data  = req.body;
        
        const file = req.file;

        if (!data || !file) {
            return res.status(404).json({
                status: 'Fail',
                message: 'All data must be provided'
            });
        }

        await addRole(data, 'KP Role Images', file);

        return res.status(201).json({
            status: 'Success',
            message: 'Successfuly added KP role.'
        });

    } catch (error) {

        if (error.code === 'P2002') {

            const existedData = "slug";

            return res.status(400).json({
                status: "Fail",
                message: `Posisi KP with this ${existedData} already exists.`
            });
        }

        return res.status(500).json({
            status: "Error",
            message: `Error ${error}: ${error.message}`
        });
    }
});

router.put('/:id', upload.single('role_image'), async (req,res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.' 
        });
    }

    try {
        verify(token);
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}.`
        });
    }

    try {
        
        let { id } = req.params;

        id = parseInt(id);

        const data  = req.body;
        
        const file = req.file ? req.file : null;

        const updatedRole = await updateRole(id, data, 'KP Role Images', file);

        return res.status(200).json({
            status: 'Success',
            data: updatedRole
        })

    } catch (error) {

        if (error.code === 'P2002') {

            const existedData = "slug";

            return res.status(400).json({
                status: "Fail",
                message: `Posisi KP with this ${existedData} already exists.`
            });
        }

        return res.status(500).json({
            status: "Error",
            message: `Internal Server Error ${error} ${error.message}`
        });

    }

});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(404).json({
            status: "Fail",
            message: "KP Role not found"
        });
    }

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

        await deleteRole(parseInt(id));

        return res.status(200).json({
            status: "Success",
            message: "Application successfuly removed."
        });
    } catch (error) {

        return res.status(500).json({

            status: "Error",
            message: `Internal Server Error: ${error} ${error.message}`
        });
    }
});

export default router; 