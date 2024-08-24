Aplicação desenvolvida para facilitar o encontro entre pessoas professoras e pessoas alunas, que buscam conhecimento em determinados assuntos relacionados a programação.


== Gerenciamento de pessoas professoras: ==

=== GET ===
Rota para consulta de todos os cadastros: http://localhost:3000/teachers

Rota para consulta com parâmetros de location e theme, permitindo filtragem por localidade e assunto ministrado: http://localhost:3000/teachers?location=95900680&theme=JavaScript


=== POST: ===
Rota: http://localhost:3000/teachers/create

Exemplo de request:
`{
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
}`