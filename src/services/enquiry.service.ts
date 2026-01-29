import { prisma } from '../lib/prisma';
import { EnquiryStatus } from '../../generated/prisma/client';
const createEnquiry = async (enquiryData: any): Promise<any> => {
    const { name, email, phone, courseId, message } = enquiryData;
    if (!name || !email || !phone) {
        throw new Error('Name, email, and phone are required fields.');
    }
    const newEnquiry = await prisma.enquiry.create({
        data: {
            name,
            email,
            phone,
            courseId,
            message,
        },
    });
    return newEnquiry;

};

const getEnquiryById = async (id: number): Promise<any> => {
    const enquiry = await prisma.enquiry.findUnique({
        where: { id },
    });
    return enquiry;
}

const getEnquiries = async (filters: any): Promise<any[]> => {
    const { status, courseId, assignedToId, agentId, page = 1, limit = 10 } = filters;
    if (page < 1 || limit < 1) {
        throw new Error('Page and limit must be positive integers.');
    }
    if (limit > 50) {
        throw new Error('Limit cannot exceed 50.');
    }
    const skip = (page - 1) * limit;
    const enquiries = await prisma.enquiry.findMany({
        where: {
            ...(status && { status }),
            ...(courseId && { courseId }),
            ...(assignedToId && { assignedToId }),
            ...(agentId && { agentId }),
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
    return enquiries;
}


const assignEnquiryToCounselor = async (enquiryId: number, counselorId: string): Promise<any> => {
    const updatedEnquiry = await prisma.enquiry.update({
        where: { id: enquiryId },
        data: { assignedToId: counselorId },
    });
    return updatedEnquiry;
}

const addAgentToEnquiry = async (enquiryId: number, agentId: string): Promise<any> => {
    const updatedEnquiry = await prisma.enquiry.update({
        where: { id: enquiryId },
        data: { agentId },
    });
    return updatedEnquiry;
}

const updateEnquiryStatus = async (enquiryId: number, status: EnquiryStatus): Promise<any> => {
    const updatedEnquiry = await prisma.enquiry.update({
        where: { id: enquiryId },
        data: { status },
    });
    return updatedEnquiry;
}

const updateEnquiry = async (enquiryId: number, updateData: any): Promise<any> => {
    const allowedFields = ['name', 'email', 'phone', 'courseId', 'message', 'note', 'remark', 'status'];
    const dataToUpdate: any = {};
    for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
            dataToUpdate[field] = updateData[field];
        }
    }
    const updatedEnquiry = await prisma.enquiry.update({
        where: { id: enquiryId },
        data: dataToUpdate,
    });
    return updatedEnquiry;
}

const deleteEnquiry = async (enquiryId: number): Promise<any> => {
    const deletedEnquiry = await prisma.enquiry.delete({
        where: { id: enquiryId },
    });
    return deletedEnquiry;
}




export { createEnquiry, getEnquiryById, getEnquiries, addAgentToEnquiry, assignEnquiryToCounselor, updateEnquiryStatus, updateEnquiry };