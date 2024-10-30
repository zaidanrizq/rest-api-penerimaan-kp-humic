import prisma from "../db/index.js";
import verify from "../validateToken/validateTokenService.js";
import uploadFile from "../gcp/cloudStorage/fileUploader.js";
import deleteFile from "../gcp/cloudStorage/fileDelete.js";


const findVerifiedUser = async (token) => {

    const verifiedToken = verify(token);

    const userId = verifiedToken.user_id

    const user = await prisma.users.findUnique({
        where: {
            user_id: userId
        },
        select: {
            full_name: true,
            birth_date: true,
            gender: true,
            nim: true,
            perguruan_tinggi: true,
            prodi: true,
            cv: true,
            portfolio: true,
            phone_number: true,
            email: true,
            profile_picture: true,
            kp_application: true
        }
    });

    return user;
}

const updateVerifiedUser = async (token, data, files) => {

    const verifiedToken = verify(token);

    const userId = verifiedToken.user_id

    let user = await prisma.users.update({
        where: {
            user_id: userId
        },
        data: {
            full_name: data.full_name,
            birth_date: data.birth_date,
            gender: data.gender,
            nim: data.nim,
            perguruan_tinggi: data.perguruan_tinggi,
            prodi: data.prodi,
            phone_number: data.phone_number,
            email: data.email,
        },
    });

    const folderPP = files[1].folder;
    const filePP = files[1].file;
    if (filePP && user.profile_picture) {
        await deleteFile(user.profile_picture);
    }
    const profilePicture = filePP ? await uploadFile(folderPP, filePP) : user.profile_picture;

    const folderCV = files[0].folder;
    const fileCV = files[0].file;
    if (fileCV && user.cv) {
        await deleteFile(user.cv);
    }
    const cv = fileCV ? await uploadFile(folderCV, fileCV) : user.cv;

    const folderPortfolio = files[2].folder;
    const filePortfolio = files[2].file;
    if (filePortfolio && user.portfolio) {
        await deleteFile(user.portfolio);
    }
    const portfolio = filePortfolio ? await uploadFile(folderPortfolio, filePortfolio) : user.portfolio;

    user = await prisma.users.update({
        where: {
            user_id: userId
        },
        data: {
            cv: cv,
            profile_picture: profilePicture,
            portfolio: portfolio
        }
    });

    return user;
};

export { findVerifiedUser, updateVerifiedUser}