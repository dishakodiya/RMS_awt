const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.users.findMany({
            where: { role: 'User' }
        });
        console.log("Found Users:");
        users.forEach(u => {
            console.log(`Email: ${u.email}, Role: ${u.role}, Password length: ${u.password?.length}`);
        });
        
    } catch(e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
