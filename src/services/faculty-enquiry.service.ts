import { prisma } from '../lib/prisma';
import { FacultyEnquiryStatus } from '../../generated/prisma/client';

const createFacultyEnquiry = async (enquiryData: any): Promise<any> => {
    const { name, email, phone, message, resume, availableDate } = enquiryData;
    if (!name || !email || !phone) {
        throw new Error('Name, email, and phone are required fields.');
    }
    const newEnquiry = await prisma.facultyEnquiry.create({
        data: {
            name,
            email,
            phone,
            message,
            resume,
            availableDate,
        },
    });
    return newEnquiry;
};

const getFacultyEnquiryById = async (id: number): Promise<any> => {
    const enquiry = await prisma.facultyEnquiry.findUnique({
        where: { id },
    });
    return enquiry;
};

const getFacultyEnquiries = async (filters: any): Promise<any[]> => {
    const { status, assignedToId, page = 1, limit = 10 } = filters;
    if (page < 1 || limit < 1) {
        throw new Error('Page and limit must be positive integers.');
    }
    if (limit > 50) {
        throw new Error('Limit cannot exceed 50.');
    }
    const skip = (page - 1) * limit;

    const enquiries = await prisma.facultyEnquiry.findMany({
        where: {
            ...(status && { status }),
            ...(assignedToId && { assignedToId }),
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
    return enquiries;
};

const assignFacultyEnquiryToHr = async (enquiryId: number, hrId: number): Promise<any> => {
    const updatedEnquiry = await prisma.facultyEnquiry.update({
        where: { id: enquiryId },
        data: { assignedToId: hrId },
    });
    return updatedEnquiry;
};

const updateFacultyEnquiryStatus = async (enquiryId: number, status: FacultyEnquiryStatus): Promise<any> => {
    const updatedEnquiry = await prisma.facultyEnquiry.update({
        where: { id: enquiryId },
        data: { status },
    });
    return updatedEnquiry;
};

const updateFacultyEnquiry = async (enquiryId: number, updateData: any): Promise<any> => {
    const allowedFields = ['name', 'email', 'phone', 'message', 'resume', 'availableDate', 'note', 'remark'];
    const dataToUpdate: any = {};
    for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
            dataToUpdate[field] = updateData[field];
        }
    }
    const updatedEnquiry = await prisma.facultyEnquiry.update({
        where: { id: enquiryId },
        data: dataToUpdate,
    });
    return updatedEnquiry;
};

const deleteFacultyEnquiry = async (enquiryId: number): Promise<any> => {
    const deletedEnquiry = await prisma.facultyEnquiry.delete({
        where: { id: enquiryId },
    });
    return deletedEnquiry;
};

export {
    createFacultyEnquiry,
    getFacultyEnquiryById,
    getFacultyEnquiries,
    assignFacultyEnquiryToHr,
    updateFacultyEnquiryStatus,
    updateFacultyEnquiry,
    deleteFacultyEnquiry,
};