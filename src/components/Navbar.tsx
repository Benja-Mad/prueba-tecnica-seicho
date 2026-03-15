'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProjectFormModal from './ProjectFormModal'
import WorkerFormModal from './WorkerFormModal'

export default function Navbar() {
    const [showProjectModal, setShowProjectModal] = useState(false)
    const [showWorkerModal, setShowWorkerModal] = useState(false)

    return (
        <>
            <nav className="bg-[#0d0d0d] border-b border-[#404040] sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#6c5ce7]">Seicho</span>
                            <span className="text-sm text-[#a0a0a0] hidden sm:inline">|  Gestión de proyectos</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <Link
                                href="/projects"
                                className="px-4 py-2 text-[#e5e5e5] hover:text-[#6c5ce7] hover:bg-[#2d2d2d] rounded-lg transition-all duration-200"
                            >
                                Proyectos
                            </Link>
                            <Link
                                href="/workers"
                                className="px-4 py-2 text-[#e5e5e5] hover:text-[#6c5ce7] hover:bg-[#2d2d2d] rounded-lg transition-all duration-200"
                            >
                                Trabajadores
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowProjectModal(true)}
                                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 bg-[#2d2d2d] border border-[#404040] text-[#e5e5e5] rounded-lg hover:bg-[#3d3d3d] hover:border-[#6c5ce7] transition-all duration-200 text-sm cursor-pointer"
                            >
                                <span className="text-lg">+</span> Proyecto
                            </button>
                            <button
                                onClick={() => setShowWorkerModal(true)}
                                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 bg-[#2d2d2d] border border-[#404040] text-[#e5e5e5] rounded-lg hover:bg-[#3d3d3d] hover:border-[#6c5ce7] transition-all duration-200 text-sm cursor-pointer"
                            >
                                <span className="text-lg">+</span> Trabajador
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            <ProjectFormModal
                isOpen={showProjectModal}
                onClose={() => setShowProjectModal(false)}
                onProjectCreated={() => {
                    window.location.reload()
                }}
            />
            <WorkerFormModal
                isOpen={showWorkerModal}
                onClose={() => setShowWorkerModal(false)}
                onWorkerCreated={() => {
                    window.location.reload()
                }}
            />
        </>
    )
}