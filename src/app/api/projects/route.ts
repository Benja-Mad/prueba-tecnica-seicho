import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                workers: true
            }
        })
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener proyectos' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const project = await prisma.project.create({
            data: {
                name: body.name,
                client: body.client,
                start_date: new Date(body.start_date),
                finish_date: new Date(body.finish_date),
                workers: body.workerIds ? {
                    connect: body.workerIds.map((id: number) => ({ id }))
                } : undefined
            },
            include: {
                workers: true
            }
        })
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear proyecto' },
            { status: 500 }
        )
    }
}