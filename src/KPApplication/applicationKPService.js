import { application } from "express";
import { insertNewApplication, findManyApplications, findApplication, findSelectedApplications, updateApplication, deleteApplication } from "./applicationKPRepository.js";


const getAllApplications = async () => {
    
    const applications = await findManyApplications();

    return applications;
}

const getApplication = async (id) => {

    const application = await findApplication(id);

    return application;
}

const getSelectedApplications = async (batchNumber, status) => {

    const applications = await findSelectedApplications(batchNumber, status);

    return applications;
}

const applyKp = async (token, roleId) => {

    await insertNewApplication(token, roleId);

};

const updateStatusApplication = async (status, id) => {

    const updatedApplication = await updateApplication(status, id);

    return updatedApplication;
};

const removeApplicaton = async (id) => {

    await deleteApplication(id);
};

export { applyKp, getAllApplications, getApplication, getSelectedApplications, updateStatusApplication, removeApplicaton }