 
![Captura de tela de 2024-08-29 21-38-24](https://github.com/user-attachments/assets/70e76fd9-a2c0-4e43-a3bf-97d0b24878bd)
<small><i> Logo criada em: https://looka.com/ </i></small>

<h4 div align="center">
Aplicação desenvolvida para facilitar o encontro entre pessoas professoras e pessoas alunas. O objetivo desse projeto é a disceminação de conhecimentos em assuntos e temas relacionados a programação para iniciantes na área.
</h4></div>

<hr>


## Tecnologias utilizadas:
* Git/Github;
* Node.js;
* Nestjs;
* PostgreSQL.

## Principais funcionalidades:
* Cadastro de pessoas professoras;
* Cadastro de pessoas alunas;
* Consultar quem ministra um conteúdo, podendo utilizar a filtragem de localização e assunto ou uma busca geral.

## Funcionalidades secundárias:
* Sistema de login;
* Controle de cotas para pessoas de baixa renda, de escolas públicas, refugiados, etc.
* Implementação de sistema que permita que pessoas alunas agendem aulas, conforme agenda de docentes.
* Pedido de review em pr's.

## Gerenciamento de pessoas professoras:

### GET
* Rota para consulta de todos os cadastros: **http://localhost:3000/teachers**
* Rota para consulta com parâmetros de _'location'_ e _'theme'_, possibilitando encontrar o match por proximidade assunto/tema: **http://localhost:3000/teachers?location=95900680&theme=JavaScript**


### POST:
* Rota: **http://localhost:3000/teachers/create**

Exemplo de request:
```{
  "name": "João Matheus Borges",
  "mail": "joaomatheus@example.com",
  "password": "@#$123",
  "telefone": "+55 11 91234-5678",
  "description": "Professor de programação com 5 anos de experiência. Foco em Backend",
  "cep": "95900-680",
  "specialties": [
    "TypeScript",
    "SQL",
    "JavaScript"
  ],
  "availability": false,
  "created_at": "2024-08-24T15:23:00Z",
  "updated_at": "2024-08-24T10:00:00Z"
}
```


## Gerenciamento de pessoas alunas:

### GET
* Rota para consulta de todos os cadastros: **http://localhost:3000/students**

## POST
* Rota: **http://localhost:3000/students**

Exemplo de request:
```{
  "name": "Lucas Silva",
  "mail": "lucass@example.com",
  "password": "@#$1234",
  "telefone": "+55 11 91234-4444",
  "description": "Aluno de Engenharia de Software",
  "cep": "95900-704",
  "specialties": [
    "HTML",
    "SQL",
    "JavaScript"
  ],
  "availability": true
}
```



=======
>>>>>>> a348e9a (feat: adição de endpoints get e post para gerenciamento de professores #1)
