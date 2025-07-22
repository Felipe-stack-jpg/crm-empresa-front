import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchRegistros, deletarRegistro } from "../api/djangoApi"

function Painel() {
  const [registros, setRegistros] = useState([])
  const [error, setError] = useState("")
  const [filtro, setFiltro] = useState("") // <- Estado da barra de busca
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    fetchRegistros(token)
      .then(data => {
        setRegistros(data)
        setError("")
      })
      .catch(err => {
        setError(err.message)
        if (err.message.includes("401")) {
          handleLogout()
        }
      })
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleEdit = (id) => {
    navigate(`/editar/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este registro?")
    if (!confirmar) return

    try {
      await deletarRegistro(id, token)
      const atualizados = registros.filter(r => r.id !== id)
      setRegistros(atualizados)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAdd = () => {
    navigate("/adicionar")
  }

  // Filtrando registros pelo termo de busca
  const registrosFiltrados = registros.filter((r) =>
    r.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    r.produto.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className=" p-8 bg-gray-100 min-h-screen">
      <header className=" flex justify-between items-center mb-6">
        <h2 className="text-2xl font-mono font-bold">Painel de Registros</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded transition transform hover:scale-105 active:scale-95"
        >
          Sair
        </button>
      </header>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded transition transform hover:scale-105 active:scale-95"
        >
          + Adicionar Registro
        </button>
        <input
          type="text"
          placeholder="Buscar cliente ou produto"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="ml-4 px-4 py-2 border border-gray-300 rounded w-1/3"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {registrosFiltrados.length === 0 ? (
        <p className="text-gray-600">Nenhum registro encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {registrosFiltrados.map((r) => (
            <li
              key={r.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex flex-wrap gap-2">
                <p className="p-1"><strong>ID:</strong> {r.id}</p>
                <p className="p-1"><strong>Cliente:</strong> {r.cliente} |</p>
                <p className="p-1"><strong>Produto:</strong> {r.produto} |</p>
                <p className="p-1"><strong>Nº Série:</strong> {r.numero_serie} |</p>
                <p className="p-1"><strong>Status:</strong> {r.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(r.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded transition transform hover:scale-105 active:scale-95"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded transition transform hover:scale-105 active:scale-95"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Painel
