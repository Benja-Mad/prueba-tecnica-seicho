'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface WorkerModalProps {
    isOpen: boolean
    onClose: () => void
    onWorkerCreated?: () => void
}

export default function WorkerFormModal({ isOpen, onClose, onWorkerCreated }: WorkerModalProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        role: 'frontend',
        seniority: 'junior'
    })
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/workers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                router.refresh()
                onWorkerCreated?.()
                onClose()
                setFormData({ name: '', role: 'frontend', seniority: 'junior' })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay con blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Contenedor del modal centrado */}
            <div className="fixed inset-0 flex items-center justify-center">
                <div
                    className="bg-[#2d2d2d] rounded-lg p-6 max-w-md w-full border border-[#404040]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-[#e5e5e5]">Nuevo Trabajador</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                Nombre
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
                                Rol
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                            >
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="design">Diseño</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[#e5e5e5] mb-1">
                                Seniority
                            </label>
                            <select
                                value={formData.seniority}
                                onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                                className="w-full p-2 bg-[#404040] border border-[#4d4d4d] rounded text-[#e5e5e5] focus:outline-none focus:border-[#6c5ce7]"
                            >
                                <option value="junior">Junior</option>
                                <option value="semi_senior">Semi-Senior</option>
                                <option value="senior">Senior</option>
                            </select>
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