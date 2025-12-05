import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#000000] font-sans text-[#C8C8C8]">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Last Updated Pill */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1a1a1a] border border-[#0BB37A]">
                        <span className="text-sm font-medium text-[#C8C8C8]">
                            Última actualización: 5 de diciembre de 2025
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Política de Privacidad de <span className="text-[#0BB37A]">Recobra</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#C8C8C8] max-w-2xl mx-auto">
                        Esta Política de Privacidad explica cómo la aplicación Recobra para iOS trata la información del usuario. Al usar la app, aceptas las prácticas descritas a continuación
                    </p>
                </div>

                <div className="space-y-8">
                    {/* BLOCK 1 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-[#0BB37A] mb-4">
                            Información que Recobra no recolecta
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Recobra no recolecta ni almacena información personal identificable.</p>
                            <p>No guardamos datos de uso, las apps que bloqueas, tu historial de navegación, contactos, fotos, mensajes ni ubicación.</p>
                            <p>No usamos servidores ni bases de datos externas. Toda la aplicación funciona localmente en tu iPhone.</p>
                            <p>No compartimos, vendemos ni cedemos ningún dato o información a terceros.</p>
                        </div>
                    </section>

                    {/* BLOCK 2 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Información que utiliza Recobra para funcionar
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Recobra accede únicamente a funciones necesarias para que la aplicación opere, siempre de forma local en tu dispositivo:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-white">NFC:</strong> se usa para detectar la tarjeta Recobra cuando la acercas al teléfono y activar una sesión de bloqueo.</li>
                                <li><strong className="text-white">Tiempo de Pantalla:</strong> con tu permiso explícito, Recobra utiliza las funcionalidades de Tiempo de Pantalla de Apple para bloquear las apps que tú elijas.</li>
                                <li><strong className="text-white">Datos técnicos mínimos del dispositivo:</strong> como la versión del sistema operativo y el estado del permiso de Tiempo de Pantalla, para asegurar que la app pueda funcionar correctamente.</li>
                            </ul>
                            <p>Ninguna de esta información se envía a servidores externos ni se comparte con nadie. Todas las acciones de bloqueo se ejecutan en tu propio dispositivo.</p>
                        </div>
                    </section>

                    {/* BLOCK 3 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Cómo utilizamos la información mínima recolectada
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>La información a la que Recobra accede se usa únicamente para:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Activar el bloqueo de aplicaciones cuando acercas la tarjeta NFC a tu iPhone.</li>
                                <li>Gestionar las reglas de bloqueo que configuras a través de Tiempo de Pantalla.</li>
                                <li>Garantizar el correcto funcionamiento de la app en tu dispositivo y solucionar posibles errores técnicos.</li>
                            </ul>
                            <p>No utilizamos esta información para publicidad, perfiles de usuario, analítica de comportamiento ni ningún otro propósito ajeno al funcionamiento básico de Recobra.</p>
                        </div>
                    </section>

                    {/* BLOCK 4 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Compartición de datos
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Recobra no comparte, no vende y no transmite tus datos a terceros.</p>
                            <p>No utilizamos proveedores externos para procesar tu información personal porque nuestro diseño actual es totalmente local.</p>
                            <p>Si en el futuro incorporamos servidores o servicios de terceros, actualizaremos esta política de privacidad antes de que esos cambios entren en vigor.</p>
                        </div>
                    </section>

                    {/* BLOCK 5 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Tu control sobre Recobra
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Tú decides qué apps se bloquean y durante cuánto tiempo.</li>
                                <li>Puedes cambiar o revocar en cualquier momento los permisos de Tiempo de Pantalla desde los ajustes de tu iPhone.</li>
                                <li>Puedes desinstalar Recobra cuando quieras. No conservamos datos tuyos después de la desinstalación.</li>
                            </ul>
                        </div>
                    </section>

                    {/* BLOCK 6 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Uso por menores
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Recobra está disponible para niños de 4 años en adelante, siempre que el dispositivo y la cuenta de Apple estén configurados por un adulto responsable.</p>
                            <p>No usamos Recobra para recopilar información personal de menores.</p>
                            <p>Recomendamos que padres o tutores revisen y configuren los ajustes de Tiempo de Pantalla y el uso de la tarjeta Recobra junto con el menor.</p>
                        </div>
                    </section>

                    {/* BLOCK 7 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Cambios a esta Política de Privacidad
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en la app o en los requisitos legales.</p>
                            <p>Cuando hagamos cambios significativos, actualizaremos la fecha en la parte superior de esta página. Te recomendamos revisar esta política periódicamente.</p>
                        </div>
                    </section>

                    {/* BLOCK 8 */}
                    <section className="bg-[#0a0a0a] rounded-3xl p-8 border border-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Contacto
                        </h2>
                        <div className="space-y-4 text-[#C8C8C8]">
                            <p>Si tienes preguntas sobre esta Política de Privacidad, sobre cómo funciona Recobra o sobre el tratamiento de la información, puedes escribirnos a:</p>
                            <a href="mailto:recobratutiempo@gmail.com" className="text-[#0BB37A] hover:underline text-lg font-medium">
                                recobratutiempo@gmail.com
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    )
}
