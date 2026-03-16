'use client'
import { useEffect, useState } from 'react'
import WorkerFormModal from '@/components/WorkerFormModal'
import {formatSeniority} from "@/lib/utils";

interface Worker {
    id: number
    name: string
    role: string
    seniority: string
}

export default function WorkersPage() {
    const [workers, setWorkers] = useState<Worker[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const fetchWorkers = () => {
        fetch('/api/workers')
            .then(res => res.json())
            .then(data => {
                setWorkers(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchWorkers()
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-[#6c5ce7]">Cargando trabajadores...</div>
        </div>
    )

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#e5e5e5]">Trabajadores</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#6c5ce7] text-white px-4 py-2 rounded hover:bg-[#8b7cf0] transition-colors"
                >
                    + Nuevo Trabajador
                </button>
            </div>

            {workers.length === 0 ? (
                <p className="text-[#a0a0a0]">No hay trabajadores aún.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {workers.map(worker => (
                        <div key={worker.id} className="bg-[#2d2d2d] border border-[#404040] rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-[#FFFFFF] mb-2">{worker.name}</h2>
                            <div className="space-y-1">
                                <p className="text-[#a0a0a0]">
                                    <span className="text-[#e5e5e5]">Rol:</span> {worker.role}
                                </p>
                                <p className="text-[#a0a0a0]">
                                    <span className="text-[#e5e5e5]">Seniority:</span> {formatSeniority(worker.seniority)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <WorkerFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onWorkerCreated={fetchWorkers}
            />
        </div>
    )
}