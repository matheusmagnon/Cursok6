import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 500 }, // Aumenta para 5 usuários em 10 segundos
    { duration: '20s', target: 500 }, // Mantém 5 usuários por 20 segundos
    { duration: '10s', target: 0 }, // Reduz para 0 usuários em 10 segundos
  ],
};

export default function () {
  const url = 'http://192.168.0.217:8085/dashboardResultadoAnaliseBarOperation'; // Substitua com sua URL

  const payload = JSON.stringify({
    dominio: "",
    statusMonit: "",
    unidadeOrigem: "",
    de: "2024-12-29",
    ate: "",
    dominiosNome: "",
    nomeUnidadeOrigem: [
      { idDominioUnidade: "3", nomeUnidade: "Xinguara", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "2" },
      { idDominioUnidade: "10", nomeUnidade: "Moju", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "15" },
      { idDominioUnidade: "11", nomeUnidade: "Abaetetuba", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "15" },
      { idDominioUnidade: "12", nomeUnidade: "Altamira", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "17" },
      { idDominioUnidade: "22", nomeUnidade: "Est. Boi Na Grota", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "14" },
      { idDominioUnidade: "43", nomeUnidade: "Exp. Agroexport", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "5" },
      { idDominioUnidade: "61", nomeUnidade: "Breu Branco", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "36" },
      { idDominioUnidade: "65", nomeUnidade: "Com. de Carnes Lima", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" },
      { idDominioUnidade: "66", nomeUnidade: "Dist. de Carnes Xingu", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" },
      { idDominioUnidade: "67", nomeUnidade: "G  Santos Com. Var. Carne", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" },
      { idDominioUnidade: "68", nomeUnidade: "Com. Azevedo", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" },
      { idDominioUnidade: "69", nomeUnidade: "Zelmon", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" },
      { idDominioUnidade: "70", nomeUnidade: "Independência", idProtocolo: "1", nomeProtocolo: "ANÁLISE DE RISCO - NICEPLANET", idDominio: "37" }
    ]
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzgzMjcxNzMsImV4cCI6MTczODM1MDM3MywidXN1YXJpbyI6eyJjaGVja1NlbmhhIjp0cnVlLCJub21lIjoiTWF0aGV1cyBuYXNjaW1lbnRvIiwiaWQiOiIyNDM1IiwiZm90byI6Im1hbi0zNi5wbmciLCJrZXlhdXRoIjoiOGVlNTAyY2ZhNGY5Y2FlYWI5YmNmYjI1YTI1OTZlMWEiLCJpZGlvbWEiOiJwdCIsInVsdGltb0FjZXNzbyI6IjIwMjUtMDEtMzEgMDk6Mzk6MzMiLCJpZFBlcm1pc3Npb24iOiIyNDM1IiwiZG9taW5pb3MiOlsiMzAiLCIzOCIsIjIiLCIzNyIsIjEiLCIxMSIsIjU4NiIsIjU3MiIsIjUiLCI1OTQiLCI1NTQiLCIxNCIsIjU4MSIsIjU3OSIsIjM2IiwiMTciLCIxNSIsIjU4OSIsIjUxMyIsIjU1MiIsIjU3NSIsIjU3NCJdfX0.0OB6w_Dxb2NXsOudzGJHYCs93Gu7oBgaS27egWK7eHg',
    },
  };

  // Faz a requisição POST
  const res = http.post(url, payload, params);

  // Verifica se a resposta está correta
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 300ms': (r) => r.timings.duration < 300,
    'response has results': (r) => r.json('results') !== undefined,
  });

  sleep(1); // Pausa de 1 segundo entre requisições
}
