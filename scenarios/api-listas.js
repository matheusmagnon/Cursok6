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
  const url = 'http://192.168.0.10:6006/listas_sociais/pesquisar?consulta=35442328120&lists=lista_simgeo&lists=lista_siga_mt&lists=lista_repsal&lists=lista_mte&lists=lista_ldipa&lists=lista_icmbio&lists=lista_ibama'; // Substitua com sua URL

  // const payload = JSON.stringify({
  //   dados: [
  //     {
  //       id: 165918,
  //       nome: "ACACIO DE MELO FIGUEIREDO da lista MTE",
  //       cpf: "969.417.078-87",
  //       codigoPec: "",
  //       idDominio: "1",
  //       status: 1
  //     },
  //     {
  //       id: 165916,
  //       nome: "teste mateus 2",
  //       cpf: "035.848.940-77",
  //       codigoPec: "123",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165915,
  //       nome: "Teste do Mateus",
  //       cpf: "034.779.250-25",
  //       codigoPec: "",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165914,
  //       nome: "Raphael Henrique",
  //       cpf: "078.484.061-05",
  //       codigoPec: "",
  //       idDominio: "1",
  //       status: 1
  //     },
  //     {
  //       id: 165913,
  //       nome: "teste cadastrando protocolo novo",
  //       cpf: "827.601.710-00",
  //       codigoPec: "",
  //       idDominio: "1",
  //       status: 1
  //     },
  //     {
  //       id: 165912,
  //       nome: "teste dos devs",
  //       cpf: "404.685.500-20",
  //       codigoPec: "",
  //       idDominio: "1",
  //       status: 1
  //     },
  //     {
  //       id: 165911,
  //       nome: "Liz Luzia Lúcia da Costa",
  //       cpf: "460.594.272-60",
  //       codigoPec: "",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165910,
  //       nome: "ERGINO ADÃO DE OLIVEIRA BASTOS",
  //       cpf: "460.584.861-49",
  //       codigoPec: "1231",
  //       idDominio: "1",
  //       status: 1
  //     },
  //     {
  //       id: 165909,
  //       nome: "NOVO PRODUTOR NÃO DEVE SER CADASTRADO",
  //       cpf: "47.985.047/0001-15",
  //       codigoPec: "5",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165908,
  //       nome: "NOVO PRODUTOR",
  //       cpf: "32.238.902/0001-57",
  //       codigoPec: "5",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165906,
  //       nome: "Proprietário",
  //       cpf: "716.073.232-49",
  //       codigoPec: "",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165903,
  //       nome: "CRISTIANE VICENTINI CALIL",
  //       cpf: "09.993.402/800",
  //       codigoPec: "1",
  //       idDominio: "513",
  //       status: 1
  //     },
  //     {
  //       id: 165902,
  //       nome: "produtor do prodes soma",
  //       cpf: "797.655.300-30",
  //       codigoPec: "",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165901,
  //       nome: "Produtor do prodes menor que 6,25",
  //       cpf: "660.558.750-20",
  //       codigoPec: "",
  //       idDominio: "37",
  //       status: 1
  //     },
  //     {
  //       id: 165900,
  //       nome: "Produtor do prodes < 6,25",
  //       cpf: "696.188.620-54",
  //       codigoPec: "01",
  //       idDominio: "37",
  //       status: 1
  //     }
  //   ],
  //   count: {
  //     total: 98166,
  //     active: 98166
  //   }
  // });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzgzMjcxNzMsImV4cCI6MTczODM1MDM3MywidXN1YXJpbyI6eyJjaGVja1NlbmhhIjp0cnVlLCJub21lIjoiTWF0aGV1cyBuYXNjaW1lbnRvIiwiaWQiOiIyNDM1IiwiZm90byI6Im1hbi0zNi5wbmciLCJrZXlhdXRoIjoiOGVlNTAyY2ZhNGY5Y2FlYWI5YmNmYjI1YTI1OTZlMWEiLCJpZGlvbWEiOiJwdCIsInVsdGltb0FjZXNzbyI6IjIwMjUtMDEtMzEgMDk6Mzk6MzMiLCJpZFBlcm1pc3Npb24iOiIyNDM1IiwiZG9taW5pb3MiOlsiMzAiLCIzOCIsIjIiLCIzNyIsIjEiLCIxMSIsIjU4NiIsIjU3MiIsIjUiLCI1OTQiLCI1NTQiLCIxNCIsIjU4MSIsIjU3OSIsIjM2IiwiMTciLCIxNSIsIjU4OSIsIjUxMyIsIjU1MiIsIjU3NSIsIjU3NCJdfX0.0OB6w_Dxb2NXsOudzGJHYCs93Gu7oBgaS27egWK7eHg',
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
