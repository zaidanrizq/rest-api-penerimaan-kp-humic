import { getAllRolesKP, getRoleById, createRoleKP, updateRoleKP, deleteRoleKP }from "./roleKPRepository.js";


const getAllRoles = async () => {

    const rolesKP = await getAllRolesKP();

    return rolesKP;
}

const getRole = async (id) => {

    const role = await getRoleById(id);

    return role;
};

const addRole = async (data, folder, file) => {

    await createRoleKP(data, folder, file);
};

const updateRole = async (id, data, folder, file) => {

    const updatedRole = await updateRoleKP(id, data, folder, file);

    return updatedRole;
};

const deleteRole = async (id) => {

    await deleteRoleKP(id);
}; 

export { getAllRoles, getRole, addRole, updateRole, deleteRole };