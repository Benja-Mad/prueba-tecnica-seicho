import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto px-4">
                <h1 className="text-5xl font-bold text-[#e5e5e5] mb-6">
                    Gestión de Proyectos
                </h1>
                <p className="text-xl text-[#a0a0a0] mb-12">
                    Aplicación de administración de proyectos
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/projects"
                        className="bg-[#6c5ce7] text-white px-8 py-4 rounded-lg hover:bg-[#8b7cf0] transition-colors text-lg font-medium"
                    >
                        Administrar Proyectos
                    </Link>
                    <Link
                        href="/workers"
                        className="bg-[#2d2d2d] text-white px-8 py-4 rounded-lg hover:bg-[#3d3d3d] transition-colors text-lg font-medium border border-[#404040]"
                    >
                        Administrar Trabajadores
                    </Link>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
                    <div className="bg-[#2d2d2d] p-6 rounded-lg border border-[#404040]">
                        <h3 className="text-[#6c5ce7] font-bold mb-2">Proyectos</h3>
                        <p className="text-[#a0a0a0] text-sm">Crea, edita y da seguimiento a tus proyectos</p>
                    </div>
                    <div className="bg-[#2d2d2d] p-6 rounded-lg border border-[#404040]">
                        <h3 className="text-[#6c5ce7] font-bold mb-2">Equipos</h3>
                        <p className="text-[#a0a0a0] text-sm">Administra trabajadores y sus roles</p>
                    </div>
                    <div className="bg-[#2d2d2d] p-6 rounded-lg border border-[#404040]">
                        <h3 className="text-[#6c5ce7] font-bold mb-2">Asignaciones</h3>
                        <p className="text-[#a0a0a0] text-sm">Asigna trabajadores a proyectos fácilmente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}