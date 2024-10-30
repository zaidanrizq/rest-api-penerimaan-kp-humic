import { createBatch, findBatches, findBatch, updateBatch, deleteBatch } from "./batchRepository.js";


const addBatch = async (data) => {

    await createBatch(data);

};

const getBatches = async () => {

    const batches = await findBatches();

    return batches;
};

const getBatch = async (id) => {

    const batch = await findBatch(id);

    return batch;

};

const editBatch = async (id, data) => {

    await updateBatch(id, data);

};

const removeBatch = async (id) => {

    await deleteBatch(id);

};

export { addBatch, getBatches, getBatch, editBatch, removeBatch };

