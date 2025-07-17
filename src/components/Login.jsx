import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/djangoApi";

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const token = await login(username, password)
            localStorage.setItem('token', token)
            setError('')
            navigate('/painel')
        }catch (err) {
            setError(err.message)
        }
    }
    return(
        <div className=" flex flex-col justify-center items-center h-screen bg-gray-400">
            <div className=" bg-gray-600 p-2 pr-36 pl-36 rounded-t-md">
                <h2 className="font-mono font-semibold text-blue-200">
                Login
                </h2>
            </div>
            <form onSubmit={handleLogin} className="p-5 border-2 rounded-sm bg-gray-900">
                <div className="p-2">
                    <label className="p-4 text-amber-50">
                    Usuário:
                    </label>
                    <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="rounded-sm border-b-black bg-cyan-900 text-blue-100"
                    />
                </div>
                <div className="p-2">
                    <label className="p-4 text-amber-50">
                        Senha:
                    </label>
                    <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="rounded-sm border-b-black bg-cyan-900 text-blue-100"
                    />
                </div>
                <button type="submit" className="cursor-pointer font-mono text-sm mt-2  p-1 pr-6 pl-6 rounded-md bg-blue-500 text-amber-50 block mx-auto">
                    Entrar
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}

export default Login