import prisma from "../db/index.js";

import verify from "../validateToken/validateTokenService.js";


const findManyApplications = async () => {

    const applications = await prisma.kp_applications.findMany({
        include: {
            user: true,
            kp_role: {
                include: {
                    batch: true
                }
            }
        }
    });

    return applications
}

const findApplication = async (id) => {

    const application = await prisma.kp_applications.findUnique({
        where: {
            application_id: id
        },
        include: {
            user: true,
            kp_role: {
                include: {
                    batch: true
                }
            }
        }
    })

    return application;
}

const findSelectedApplications = async (batchNumber, status) => {
    const applications = await prisma.kp_applications.findMany({
        where: {
            ...(status && { status }),  // Include only if `status` has a value
            ...(batchNumber && { kp_role: { batch: { number: batchNumber } } })  // Include only if `batchNumber` has a value
        },
        include: {
            user: true,
            kp_role: {
                include: {
                    batch: true
                }
            }
        }
    });

    return applications;
};

const insertNewApplication = async (token, roleId) => {

    const verifiedUser = verify(token);

    const userId = verifiedUser.user_id;
    const applicationDate = new Date().toISOString();

    await prisma.kp_applications.create({
        data: {
            application_date: applicationDate,
            user: {
                connect: {user_id: userId}
            },
            kp_role: {
                connect: {role_id: roleId}
            }
        }
    });
};

const updateApplication = async (status, id) => {

    const updatedApplication = await prisma.kp_applications.update({
        where: {
            application_id: id
        },
        data: {
            status: status
        },
        include: {
            user: true,
            kp_role: true
        }
    });

    return updatedApplication;
}

const deleteApplication = async (id) => {

    await prisma.kp_applications.delete({
        where: {application_id: id}
    });
};

export { insertNewApplication, findManyApplications, findApplication, findSelectedApplications, updateApplication, deleteApplication }