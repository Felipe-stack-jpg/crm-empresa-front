import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criarRegistro } from "../api/djangoApi";

function AdicionarRegistro() {
  const [form, setForm] = useState({
    cliente: "",
    produto: "",
    numero_serie: "",
    status: "andamento",
    observacoes: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    criarRegistro(form, token)
      .then(() => {
        navigate("/painel");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Adicionar Registro</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md max-w-md">
        <input
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          placeholder="Cliente"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="produto"
          value={form.produto}
          onChange={handleChange}
          placeholder="Produto"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="numero_serie"
          value={form.numero_serie}
          onChange={handleChange}
          placeholder="Número de Série"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="andamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <textarea
          name="observacoes"
          value={form.observacoes}
          onChange={handleChange}
          placeholder="Observações"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default AdicionarRegistro;
