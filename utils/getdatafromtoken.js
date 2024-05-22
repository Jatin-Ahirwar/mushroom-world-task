import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    const token = req.cookies.get('OutSideJWT')?.value;

    if (!token || typeof token !== 'string') {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
