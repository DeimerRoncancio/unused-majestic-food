"use client"

// Importar el proveedor de sesión de NextAuth
import { SessionProvider } from "next-auth/react"

// Componente de proveedores para envolver la aplicación con el proveedor de sesión
export default function Providers({ children }) {
    // Devolver el componente SessionProvider que envuelve a los hijos
    return <SessionProvider>{children}</SessionProvider>
}