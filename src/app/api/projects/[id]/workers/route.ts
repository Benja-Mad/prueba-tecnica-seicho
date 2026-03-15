import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const workerIds = body.workerIds || (body.workerId ? [body.workerId] : [])

        if (workerIds.length === 0) {
            return NextResponse.json(
                { error: 'Debe seleccionar al menos un trabajador' },
                { status: 400 }
            )
        }

        const project = await prisma.project.findUnique({
            where: { id: Number(id) }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Proyecto no encontrado' },
                { status: 404 }
            )
        }

        const workers = await prisma.worker.findMany({
            where: { id: { in: workerIds } }
        })

        if (workers.length !== workerIds.length) {
            return NextResponse.json(
                { error: 'Uno o más trabajadores no existen' },
                { status: 404 }
            )
        }

        const updatedProject = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                workers: {
                    connect: workerIds.map((id: number) => ({ id }))
                }
            },
            include: {
                workers: true
            }
        })

        return NextResponse.json(updatedProject, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al asignar trabajadores' },
            { status: 500 }
        )
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
                workers: true
            }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Proyecto no encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(project.workers)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener trabajadores del proyecto' },
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
        const { searchParams } = new URL(request.url)
        const workerId = searchParams.get('workerId')

        if (!workerId) {
            return NextResponse.json(
                { error: 'Se requiere workerId' },
                { status: 400 }
            )
        }

        const updatedProject = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                workers: {
                    disconnect: { id: Number(workerId) }
                }
            },
            include: {
                workers: true
            }
        })

        return NextResponse.json(updatedProject)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al quitar trabajador' },
            { status: 500 }
        )
    }
}