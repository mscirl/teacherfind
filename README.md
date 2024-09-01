![Captura de tela de 2024-08-29 21-38-24](https://github.com/user-attachments/assets/70e76fd9-a2c0-4e43-a3bf-97d0b24878bd)
<small><i> Logo criada em: https://looka.com/ </i></small>

<h4 div align="center">
Aplicação desenvolvida para facilitar o encontro entre pessoas professoras e pessoas alunas. O objetivo desse projeto é a disceminação de conhecimentos em assuntos e temas relacionados a programação para iniciantes na área.
</h4></div>

<hr>

## Tecnologias utilizadas:

- Git/Github;
- Node.js;
- Nestjs;
- PostgreSQL.

## Principais funcionalidades:

- Cadastro de pessoas professoras;
- Cadastro de pessoas alunas;
- Busca de pessoas professoras disponíveis com base na localização e disciplina desejada, permitindo que se encontre um docente mais próximo possível, e/ou o mais adequado para o conteúdo.

## Funcionalidades secundárias:

- Sistema de login;
- Controle de cotas para pessoas de baixa renda, de escolas públicas, refugiados, etc.
- Implementação de funcionalidade que permita que pessoas alunas agendem aulas, conforme agenda de docentes.
- Pedidos de reviews em pr's.

<hr>

## Gerenciamento de pessoas professoras:

### POST:

- Rota: **http://localhost:3000/teachers/create**

Exemplo de request:

```{
{
  "name": "Ana Paula Costa",
  "mail": "anapaula.costa@example.com",
  "password": "P@ssw0rd123",
  "phone": "+55 21 91234-5678",
  "description": "Professora de Data Science com foco em Machine Learning e Python.",
  "zipCode": "20040-020",
  "specialities": [
    "Python",
    "Machine Learning",
    "Data Science"
  ],
  "availability": true
}


```

### GET

- Rota para consulta de todos os cadastros: **http://localhost:3000/teachers**
- Rota para consulta com parâmetros de _'location'_ e _'theme'_, possibilitando encontrar o match por proximidade e assunto/tema: **http://localhost:3000/teachers?location=95900680&theme=JavaScript**

<hr>

## Gerenciamento de pessoas alunas:

## POST

- Rota: **http://localhost:3000/students**

Exemplo de request:

```{
{
  "name": "Ana Pereira",
  "email": "ana.pereira@example.com",
  "zipCode": "29101567",
  "password": "anaSenhaSegura321",
  "latitude": -20.3445,
  "longitude": -40.2958,
  "phone": "+55279912345678",
  "interests": ["Python", "Django", "Data Science"]
}
```

### GET

- Rota para consulta de todos os cadastros: **http://localhost:3000/students**
