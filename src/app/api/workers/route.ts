import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const workers = await prisma.worker.findMany()
        return NextResponse.json(workers)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener trabajadores' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const worker = await prisma.worker.create({
            data: {
                name: body.name,
                role: body.role,
                seniority: body.seniority
            }
        })
        return NextResponse.json(worker, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear trabajador' },
            { status: 500 }
        )
    }
}