const API_BASE_URL = 'https://crm-empresa-backend.onrender.com/api'
const LOGIN_URL = "https://crm-empresa-backend.onrender.com/api-token-auth/"

export async function login(username, password){
    const response = await fetch(LOGIN_URL,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    })
    if (!response.ok){
        throw new Error('Usuário ou senha inválidos')
    }
    const data = await response.json()
    return data.token
}

function getAuthHeaders(token){
    return{
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
    }
}

export async function criarRegistro(registro, token) {
    const response = await fetch(`${API_BASE_URL}/registros/`, {
        method: 'POST',
        headers: getAuthHeaders(token), 
        body: JSON.stringify(registro),  
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao criar registro");
    }

    return await response.json();  
}


export async function fetchRegistros(token) {
    const response = await fetch(`${API_BASE_URL}/registros/`, {
        method: 'GET',
        headers: getAuthHeaders(token),
    })
    if (!response.ok){
        throw new Error("Erro ao buscar registros");
    }
    return await response.json();
}

export async function editarRegistro(id, dadosAtualizados, token) {
    const response = await fetch(`${API_BASE_URL}/registros/${id}/`, {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(token),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao editar registro");
    }

    return await response.json();
}


export async function deletarRegistro(id, token) {
    const response = await fetch(`${API_BASE_URL}/registros/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao deletar registro");
    }

    // Se deu certo, retorna true ou nada (DRF responde 204 No Content normalmente)
    return true;
}
