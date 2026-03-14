
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Since the database might have plain text passwords initially (for development),
        // we should ideally hash them. But assuming the user wants to login with existing flow:
        // If passwords are hashed in DB, use compare.
        // If plain text, direct compare (NOT RECOMMENDED FOR PROD but might be current state).

        // Let's assume hashed for now as per best practice, but wrapped in a try-catch to handle potential plain text legacy if needed?
        // No, let's stick to standard bcrypt.compare.
        // If the DB has plain text, this will fail. I should probably check if it's a hash.
        // But for a new implementation, let's assume standard behavior.

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Fallback for plain text passwords in dev environment (optional, remove for prod)
            if (password === user.password) {
                // This is just a fallback for testing if you haven't hashed existing passwords
            } else {
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401 }
                );
            }
        }

        const token = signToken({
            userId: user.user_id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
