'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Worker {
    id: number
    name: string
    role: string
}

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
    onProjectCreated?: () => void
}

export default function ProjectFormModal({ isOpen, onClose, onProjectCreated }: ProjectModalProps) {
    const router = useRouter()
    const [workers, setWorkers] = useState<Worker[]>([])
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        start_date: '',
        finish_date: '',
        workerIds: [] as number[]
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            fetch('/api/workers')
                .then(res => res.json())
                .then(data => setWorkers(data))
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                router.refresh()
                onProjectCreated?.()
                onClose()
                setFormData({ name: '', client: '', start_date: '', finish_date: '', workerIds: [] })
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleWorker = (workerId: number) => {
        setFormData(prev => ({
            ...prev,
            workerIds: prev.workerIds.includes(workerId)
                ? prev.workerIds.filter(id => id !== workerId)
                : [...prev.workerIds, workerId]
        }))
    }
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay con blur - ocupa toda la pantalla */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose} // Cierra al hacer clic fuera
            />

            {/* Contenedor del modal centrado */}
            <div className="fixed inset-0 flex items-center justify-center">
                <div
                    className="bg-[#2d2d2d] rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#404040]"
                    onClick={(e) => e.stopPropagation()} // Evita que clics dentro cierren el modal
                >
                    <h2 className="text-2xl font-bold mb-4 text-[#e5e5e5]">Nuevo Proyecto</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                Nombre del Proyecto
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                Cliente
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                    Fecha Inicio
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                    Fecha Término
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.finish_date}
                                    onChange={(e) => setFormData({ ...formData, finish_date: e.target.value })}
                                    className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[#e5e5e5] mb-2">
                                Trabajadores
                            </label>
                            <div className="space-y-2 max-h-40 overflow-y-auto bg-[#404040] border border-[#4d4d4d] rounded p-2">
                                {workers.map(worker => (
                                    <label key={worker.id} className="flex items-center gap-2 p-1 hover:bg-[#4d4d4d] rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.workerIds.includes(worker.id)}
                                            onChange={() => toggleWorker(worker.id)}
                                            className="rounded border-[#4d4d4d] bg-[#404040] text-[#6c5ce7]"
                                        />
                                        <span className="text-sm text-[#e5e5e5]">{worker.name}</span>
                                        <span className="text-xs text-[#a0a0a0]">({worker.role})</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-[#4d4d4d] rounded text-[#e5e5e5] hover:bg-[#404040] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-[#6c5ce7] text-white rounded hover:bg-[#8b7cf0] disabled:bg-[#404040] transition-colors"
                            >
                                {loading ? 'Creando...' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}