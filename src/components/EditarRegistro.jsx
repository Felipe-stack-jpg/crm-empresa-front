import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editarRegistro } from "../api/djangoApi";

function EditarRegistro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [registro, setRegistro] = useState({
    cliente: "",
    produto: "",
    numero_serie: "",
    status: "andamento",
    observacoes: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!token) {
        navigate("/login");
        return;
    }

    fetch(`https://crm-empresa-backend.onrender.com/api/registros/${id}/`, {
        headers: {
        "Authorization": `Token ${token}`,  // Adicione isso!
        }
    })
        .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar registro");
        return res.json();
        })
        .then(data => {
        setRegistro(data);
        setError("");
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [id, token, navigate]);


  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editarRegistro(id, registro, token);
      navigate("/painel");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Editar Registro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-semibold">Cliente:</label>
          <input
            type="text"
            name="cliente"
            value={registro.cliente}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Produto:</label>
          <input
            type="text"
            name="produto"
            value={registro.produto}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Número de Série:</label>
          <input
            type="text"
            name="numero_serie"
            value={registro.numero_serie}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status:</label>
          <select
            name="status"
            value={registro.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Observações:</label>
          <textarea
            name="observacoes"
            value={registro.observacoes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default EditarRegistro;
