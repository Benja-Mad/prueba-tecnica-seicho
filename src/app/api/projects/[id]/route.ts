import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: { workers: true }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Proyecto no encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener proyecto' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const project = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                name: body.name,
                client: body.client,
                start_date: new Date(body.start_date),
                finish_date: new Date(body.finish_date),
                workers: body.workerIds ? {
                    set: body.workerIds.map((id: number) => ({ id }))
                } : undefined
            },
            include: { workers: true }
        })

        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al actualizar proyecto' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.project.delete({ where: { id: Number(id) } })
        return NextResponse.json({ message: 'Proyecto eliminado' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al eliminar proyecto' },
            { status: 500 }
        )
    }
}