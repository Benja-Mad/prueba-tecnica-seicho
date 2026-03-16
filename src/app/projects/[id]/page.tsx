'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatSeniority } from "@/lib/utils";
import EditProjectModal from "@/components/EditProjectModal";

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

export default function ProjectDetail() {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [availableWorkers, setAvailableWorkers] = useState<Worker[]>([])
    const [loading, setLoading] = useState(true)
    const [showWorkerSelector, setShowWorkerSelector] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedWorkers, setSelectedWorkers] = useState<number[]>([])

    const fetchProject = () => {
        fetch(`/api/projects/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setProject(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoading(false)
            })
    }

    const fetchAvailableWorkers = () => {
        fetch('/api/workers')
            .then(res => res.json())
            .then(data => {
                if (project) {
                    const projectWorkerIds = project.workers.map(w => w.id)
                    const available = data.filter((w: Worker) => !projectWorkerIds.includes(w.id))
                    setAvailableWorkers(available)
                }
            })
    }

    useEffect(() => {
        fetchProject()
    }, [params.id])

    useEffect(() => {
        if (project) {
            fetchAvailableWorkers()
        }
    }, [project])

    const handleAssignWorkers = async () => {
        if (selectedWorkers.length === 0) return

        try {
            for (const workerId of selectedWorkers) {
                await fetch(`/api/projects/${params.id}/workers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ workerId })
                })
            }

            fetchProject()
            setShowWorkerSelector(false)
            setSelectedWorkers([])
        } catch (error) {
            console.error('Error assigning workers:', error)
        }
    }

    const handleUnassignWorker = async (workerId: number) => {
        try {
            await fetch(`/api/projects/${params.id}/workers/${workerId}`, {
                method: 'DELETE',
            })
            fetchProject()
        } catch (error) {
            console.error('Error unassigning worker:', error)
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-[#6c5ce7]">Cargando proyecto...</div>
        </div>
    )

    if (!project) return (
        <div className="text-center py-12">
            <h2 className="text-2xl text-[#e5e5e5] mb-4">Proyecto no encontrado</h2>
            <Link href="/projects" className="text-[#6c5ce7] hover:underline">
                Volver a proyectos
            </Link>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto">
            {/* Cabecera con navegación */}
            <div className="mb-6">
                <Link href="/projects" className="text-[#6c5ce7] hover:underline inline-flex items-center gap-1">
                    ← Volver a proyectos
                </Link>
            </div>

            {/* Tarjeta del proyecto */}
            <div className="bg-[#2d2d2d] border border-[#404040] rounded-lg p-6">
                {/* Header con título y botón de editar */}
                <div className="flex justify-between items-start mb-8">
                    <h1 className="text-3xl font-bold text-[#e5e5e5]">{project.name}</h1>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="p-2 text-[#a0a0a0] hover:text-[#6c5ce7] hover:bg-[#404040] rounded-lg transition-colors"
                        title="Editar proyecto"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </div>

                {/* Sección Cliente - Fechas con más espaciado */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* Columna Cliente */}
                    <div>
                        <p className="text-[#a0a0a0] text-sm mb-1">Cliente</p>
                        <p className="text-[#e5e5e5] font-medium text-lg">{project.client}</p>
                    </div>

                    {/* Columna Fecha Inicio */}
                    <div>
                        <p className="text-[#a0a0a0] text-sm mb-1">Fecha Inicio</p>
                        <p className="text-[#e5e5e5] font-medium text-lg">
                            {new Date(project.start_date).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Columna Fecha Término */}
                    <div>
                        <p className="text-[#a0a0a0] text-sm mb-1">Fecha Término</p>
                        <p className="text-[#e5e5e5] font-medium text-lg">
                            {new Date(project.finish_date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Sección de trabajadores - con más espaciado superior */}
                <div className="pt-4 border-t border-[#404040]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#e5e5e5]">
                            Trabajadores Asignados ({project.workers.length})
                        </h2>
                        <button
                            onClick={() => setShowWorkerSelector(true)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#6c5ce7] text-white rounded hover:bg-[#8b7cf0] transition-colors text-sm"
                        >
                            <span className="text-lg">+</span> Asignar
                        </button>
                    </div>

                    {project.workers.length === 0 ? (
                        <p className="text-[#a0a0a0] text-center py-8 border border-dashed border-[#404040] rounded">
                            No hay trabajadores asignados a este proyecto
                        </p>
                    ) : (
                        <div className="grid gap-3">
                            {project.workers.map(worker => (
                                <div
                                    key={worker.id}
                                    className="flex justify-between items-center p-3 bg-[#404040] rounded group"
                                >
                                    <div>
                                        <span className="text-[#e5e5e5] font-medium">{worker.name}</span>
                                        <span className="text-[#a0a0a0] text-sm ml-2">({worker.role})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-[#4d4d4d] text-[#e5e5e5] px-2 py-1 rounded">
                                            {formatSeniority(worker.seniority)}
                                        </span>
                                        <button
                                            onClick={() => handleUnassignWorker(worker.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-[#a0a0a0] hover:text-red-400 transition-all duration-200"
                                            title="Desasignar trabajador"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de asignación de trabajadores (existente) */}
            {showWorkerSelector && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setShowWorkerSelector(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div
                            className="bg-[#2d2d2d] rounded-lg p-6 max-w-md w-full border border-[#404040]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-[#e5e5e5] mb-4">
                                Asignar Trabajadores
                            </h3>
                            {availableWorkers.length === 0 ? (
                                <p className="text-[#a0a0a0] text-center py-8">
                                    No hay trabajadores disponibles para asignar
                                </p>
                            ) : (
                                <>
                                    <div className="space-y-2 max-h-96 overflow-y-auto mb-6">
                                        {availableWorkers.map(worker => (
                                            <label
                                                key={worker.id}
                                                className="flex items-center gap-3 p-3 bg-[#404040] rounded hover:bg-[#4d4d4d] cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedWorkers.includes(worker.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedWorkers([...selectedWorkers, worker.id])
                                                        } else {
                                                            setSelectedWorkers(selectedWorkers.filter(id => id !== worker.id))
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-[#6c5ce7] bg-[#404040] border-[#4d4d4d] rounded focus:ring-[#6c5ce7]"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-[#e5e5e5] font-medium">{worker.name}</p>
                                                    <p className="text-[#a0a0a0] text-sm">{worker.role} • {formatSeniority(worker.seniority)}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setShowWorkerSelector(false)
                                                setSelectedWorkers([])
                                            }}
                                            className="px-4 py-2 border border-[#4d4d4d] rounded text-[#e5e5e5] hover:bg-[#404040] transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleAssignWorkers}
                                            disabled={selectedWorkers.length === 0}
                                            className="px-4 py-2 bg-[#6c5ce7] text-white rounded hover:bg-[#8b7cf0] disabled:bg-[#404040] transition-colors"
                                        >
                                            Asignar {selectedWorkers.length} trabajador(es)
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {project && (
                <EditProjectModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    project={project}  // ✅ project SÍ existe
                    onProjectUpdated={fetchProject}
                />
            )}
        </div>
    )
}