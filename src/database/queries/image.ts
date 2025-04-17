import prisma from '../client';

export async function saveImageUpload(telegramId: number, imageUrl: string) {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    });
    if (!user) return null;
    return prisma.imageUpload.create({
        data: {
            userId: user.id,
            imageUrl,
        },
    });
}
