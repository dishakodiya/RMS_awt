import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.users.findFirst({
            where: { role: 'User' }
        });

        if (user) {
            console.log('Found user:', user.email);
            const hashedPassword = await bcrypt.hash('password123', 10);
            await prisma.users.update({
                where: { user_id: user.user_id },
                data: { password: hashedPassword }
            });
            console.log('Password updated to password123');
        } else {
             console.log('No user with role User found.');
        }

    } catch(e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
