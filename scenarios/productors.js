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
  const url = 'http://192.168.0.10:8083/produtores/1/0'; 

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzgxNTY3MjgsImV4cCI6MTczODE3OTkyOCwidXN1YXJpbyI6eyJjaGVja1NlbmhhIjp0cnVlLCJub21lIjoiTWF0aGV1cyBuYXNjaW1lbnRvIiwiaWQiOiIyNDM1IiwiZm90byI6Im1hbi0zNi5wbmciLCJrZXlhdXRoIjoiNWQ0ODljMDRmMWRhNjhmNmYwZmM5Mjk3Y2IyYTE4NmQiLCJpZGlvbWEiOiJwdCIsInVsdGltb0FjZXNzbyI6IjIwMjUtMDEtMjkgMTA6MTg6NDgiLCJpZFBlcm1pc3Npb24iOiIyNDM1IiwiZG9taW5pb3MiOlsiMzAiLCIzOCIsIjIiLCIzNyIsIjEiLCIxMSIsIjU4NiIsIjU3MiIsIjUiLCI1OTQiLCI1NTQiLCIxNCIsIjU4MSIsIjU3OSIsIjM2IiwiMTciLCIxNSIsIjU4OSIsIjUxMyIsIjU1MiIsIjU3NSIsIjU3NCJdfX0.QOwgTEOwx0F2DD_R6q5L7WCeg1zIpcwZewO2LZtQ_h4',
      'permittoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzgxNTY3MjgsImV4cCI6MTczODE3OTkyOCwidXN1YXJpbyI6eyJpZCI6IjIyODEiLCJpZFVzdWFyaW8iOiIyNDM1Iiwibm9tZSI6Ijg4OC41NDkuOTAwLTc4IiwidG9rZW5Vc2VyIjoiZTFmNjNkYjZiOTE0NmM4YzFiYTVkNTJjYzk0NWVlM2YiLCJ1bHRpbW9BY2Vzc28iOiIyMDI1LTAxLTI5IDEwOjE4OjQ4IiwidGlwb1BsYXRhZm9ybWEiOiIxIiwiaWRVc2VyUGxhdGFmb3JtYSI6IjI0MzUifX0.icrA7uiBmiEa23Yd0wSt8OC0nkLM_3Kb7ZNhhh74Z64'
    },
  };

  // Faz a requisição GEP
  const res = http.get(url, params,  { timeout: '60s' });

  // Verifica se a resposta está correta
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 300ms': (r) => r.timings.duration < 800,
    'response has results': (r) => r.json('results') !== undefined,
  });

  sleep(1); // Pausa de 1 segundo entre requisições
}
