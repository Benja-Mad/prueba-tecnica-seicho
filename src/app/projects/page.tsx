'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProjectFormModal from '@/components/ProjectFormModal'

interface Worker {
    id: number
    name: string
    role: string
    seniority: string
}

interface Project {
    id: number
    name: string
    client: string
    start_date: string
    finish_date: string
    workers: Worker[]
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const fetchProjects = () => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-[#6c5ce7]">Cargando proyectos...</div>
        </div>
    )

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#e5e5e5]">Proyectos</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#6c5ce7] text-white px-4 py-2 rounded hover:bg-[#8b7cf0] transition-colors"
                >
                    + Nuevo Proyecto
                </button>
            </div>

            {projects.length === 0 ? (
                <p className="text-[#a0a0a0]">No hay proyectos aún.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {projects.map(project => (
                        <Link href={`/projects/${project.id}`} key={project.id}>
                            <div className="bg-[#2d2d2d] border border-[#404040] rounded-lg p-4 hover:border-[#6c5ce7] hover:shadow-lg transition-all duration-200 cursor-pointer">
                                <h2 className="text-xl font-semibold text-[#FFFFFF] mb-2">{project.name}</h2>
                                <p className="text-[#a0a0a0] mb-1">
                                    <span className="text-[#e5e5e5]">Cliente:</span> {project.client}
                                </p>
                                <p className="text-[#a0a0a0] text-sm mb-2">
                                    {new Date(project.start_date).toLocaleDateString()} - {new Date(project.finish_date).toLocaleDateString()}
                                </p>
                                <div className="mt-3">
                                    <p className="text-sm font-medium text-[#e5e5e5] mb-2">Trabajadores:</p>
                                    {project.workers.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {project.workers.map(worker => (
                                                <span key={worker.id} className="bg-[#404040] text-[#e5e5e5] px-2 py-1 rounded text-xs">
                                                    {worker.name} ({worker.role})
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-[#666]">Sin trabajadores asignados</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <ProjectFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onProjectCreated={fetchProjects}
            />
        </div>
    )
}