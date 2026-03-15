'use client'
import { useState } from 'react'

interface EditProjectModalProps {
    isOpen: boolean
    onClose: () => void
    project: {
        id: number
        name: string
        client: string
        start_date: string
        finish_date: string
    }
    onProjectUpdated: () => void
}

export default function EditProjectModal({
                                             isOpen,
                                             onClose,
                                             project,
                                             onProjectUpdated
                                         }: EditProjectModalProps) {
    const [formData, setFormData] = useState({
        name: project.name,
        client: project.client,
        start_date: project.start_date.split('T')[0],
        finish_date: project.finish_date.split('T')[0]
    })
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                onProjectUpdated()
                onClose()
            }
        } catch (error) {
            console.error('Error editing project:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />
            <div className="fixed inset-0 flex items-center justify-center">
                <div
                    className="bg-[#2d2d2d] rounded-lg p-6 max-w-md w-full border border-[#404040]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-xl font-bold text-[#e5e5e5] mb-4">
                        Editar Proyecto
                    </h3>

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

                        <div className="grid grid-cols-2 gap-4 mb-6">
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
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}