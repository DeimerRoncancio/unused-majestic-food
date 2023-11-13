import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user: { label: "Correo electronico", type: "email", placeholder: "Email" },
                password: { label: "Contraseña", type: "password", placeholder: "*******" }
            },
            async authorize(credentials,req) {
                const user = { id: "1",name: "Deimer Roncancio",email: "deimerroncancio@gmail.com" }
                return user
            }
        })
    ]
})

export { handler as GET, handler as POST }