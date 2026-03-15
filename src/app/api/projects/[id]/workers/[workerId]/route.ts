import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string; workerId: string }> }
) {
    try {
        const { id, workerId } = await params

        const updatedProject = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                workers: {
                    disconnect: { id: Number(workerId) }
                }
            },
            include: { workers: true }
        })

        return NextResponse.json(updatedProject)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al desasignar trabajador' },
            { status: 500 }
        )
    }
}