import { Router } from "express";
import { addBatch, getBatches, getBatch, editBatch, removeBatch } from "./batchService.js"
import verify from "../validateToken/validateTokenService.js"


const router = Router();

router.post('/', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        verify(token)
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}`
        });
    }

    try {
        
        const data = req.body;

        if (!data) {
            return res.status(404).json({
                status: 'Fail',
                message: 'All data must be provided.'
            });
        }

        await addBatch(data);

        return res.status(201).json({
            status: 'Success',
            message: 'Batch successfuly created.'
        });

    } catch (error) {

        if (error.code === 'P2002') {
            return res.status(400).json({
                status: "Fail",
                message: `Batch number already existed.`
            });
        }

        return res.status(500).json({
            status: 'Fail',
            message: `Internal Server Error ${error}: ${error.message}`
        });

    }
});

router.get('/', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        verify(token)
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}`
        });
    }

    try {

        const batches = await getBatches();

        return res.status(200).json({
            status: 'Success',
            data: batches
        });

    } catch (error) {

        return res.status(500).json({
            status: 'Fail',
            message: `Internal Server Error ${error}: ${error.message}`
        });

    }
});

router.get('/:id', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        verify(token)
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}`
        });
    }

    try {

        const { id } = req.params;

        const batch = await getBatch( parseInt(id) );

        if (!batch) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Batch not found'
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: batch
        });

    } catch (error) {

        console.log(error.message)

        return res.status(500).json({
            status: 'Fail',
            message: `Internal Server Error ${error}: ${error.message}`
        });

    }
});

router.put('/:id', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        verify(token)
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}`
        });
    }

    try {

        const { id } = req.params;

        const data = req.body;

        if (!data) {
            return res.status(404).json({
                status: 'Fail',
                message: 'All data must be provided.'
            });
        }

        await editBatch( parseInt(id), data );

        return res.status(200).json({
            status: 'Success',
            message: 'Update batch successful'
        });

    } catch (error) {

        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'Fail',
                message: 'Batch not found',
            });
        }

        if (error.code === 'P2002') {
            return res.status(400).json({
                status: "Fail",
                message: `Batch number already existed.`
            });
        }

        return res.status(500).json({
            status: 'Fail',
            message: `Internal Server Error ${error}: ${error.message}`
        });
    }
});

router.delete('/:id', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        verify(token)
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: `Access denied. ${error.message}`
        });
    }

    try {

        const { id } = req.params;

        await removeBatch( parseInt(id) );

        return res.status(200).json({
            status: 'Success',
            message: 'Batch deleted successfuly.'
        });

    } catch (error) {

        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'Fail',
                message: 'Batch not found',
            });
        }

        return res.status(500).json({
            status: 'Fail',
            message: `Internal Server Error ${error}: ${error.message}`
        });
    }
});

export default router;