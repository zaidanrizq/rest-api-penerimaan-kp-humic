import prisma from "../db/index.js";
import deleteFile from "../gcp/cloudStorage/fileDelete.js";
import uploadFile from "../gcp/cloudStorage/fileUploader.js";


const getAllRolesKP = async () => {

    const rolesKP = await prisma.kp_roles.findMany({
        include: {
            batch: true
        }
    });

    return rolesKP;
};

const getRoleById = async (id) => {

    const role = await prisma.kp_roles.findUnique({
        where: { 
            role_id: id 
        },
        include: {
            batch: true
        }
    });

    return role;
};

const createRoleKP = async (data, folder, file) => {

    const roleImage = await uploadFile(folder, file);

    await prisma.kp_roles.create({
        data: {
            name: data.name,
            description: data.description,
            kualifikasi: data.kualifikasi,
            role_image: roleImage,
            opened_at: data.opened_at,
            closed_at: data.closed_at,

            batch: {
                connect: {batch_id: parseInt(data.batch_id)}
            }
        }
    });

};

const updateRoleKP = async (id, data, folder, file) => {

    let role = await prisma.kp_roles.update({
        where: {
            role_id: id
        },
        data: {
            name: data.name,
            description: data.description,
            kualifikasi: data.kualifikasi,
            opened_at: data.opened_at,
            closed_at: data.closed_at,

            batch: {
                connect: {batch_id: parseInt(data.batch_id)}
            }
        }
    });

    if (file && role.role_image) {
        await deleteFile(role.role_image);
    }
    const roleImage = file ? await uploadFile(folder, file) : role.role_image;

    role = await prisma.kp_roles.update({
        where: {
            role_id: id
        },
        data: {
            role_image: roleImage
        }
    });

    return role;
};

const deleteRoleKP = async (id) => {

    const { role_image } = await prisma.kp_roles.findUnique({
        where: { role_id : id },
        select: { role_image : true }
    });

    await deleteFile(role_image);

    await prisma.kp_roles.delete({
        where: { role_id: id}
    });
};

export { getAllRolesKP, getRoleById, createRoleKP, updateRoleKP, deleteRoleKP };