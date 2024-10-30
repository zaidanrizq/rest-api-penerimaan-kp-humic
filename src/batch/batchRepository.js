import prisma from "../db/index.js";


const createBatch = async (data) => {

    await prisma.batches.create({
        data: {
            number: data.number,
            semester: data.semester,
            year: data.year,
            opened_at: data.opened_at,
            closed_at: data.closed_at
        }
    });
    
};

const findBatches = async () => {

    const batches = await prisma.batches.findMany();

    return batches;

};

const findBatch = async (id) => {

    const batch = await prisma.batches.findUnique({
        where: { batch_id: id }
    });

    return batch;

};

const updateBatch = async (id, data) => {

    await prisma.batches.update({
        where: {batch_id: id},
        data: {
            number: data.number,
            semester: data.semester,
            year: data.year,
            opened_at: data.opened_at,
            closed_at: data.closed_at
        }
    });

};

const  deleteBatch = async (id) => {

    await prisma.batches.delete({
        where: {batch_id: id}
    });

};

export { createBatch, findBatches, findBatch, updateBatch, deleteBatch };