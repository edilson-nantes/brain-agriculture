# Brain Agriculture API

## Descrição
A Brain Agriculture API é uma aplicação desenvolvida em NestJS para gerenciar produtores rurais e suas fazendas e safras. A API permite criar, listar, atualizar e excluir produtores rurais, fazendas e safras, além de fornecer dados do dashboard para análise.

## Tecnologias Utilizadas
- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **TypeORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Swagger**: Ferramenta para documentação da API.
- **Jest**: Framework de testes.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.

## Estrutura do Projeto
```plaintext
src/
├── app.module.ts
├── main.ts
├── dashboard/
│   ├── dashboard.controller.ts
│   ├── dashboard.module.ts
│   ├── dashboard.service.ts
│   ├── __tests__/
│   │   └── dashboard.controller.spec.ts
├── farm/
│   ├── dtos/
│   │   ├── createFarm.dto.ts
│   │   ├── returnFarm.dto.ts
│   ├── entities/
│   │   └── farm.entity.ts
│   ├── validators/
│   │   └── farmArea.validator.ts
│   ├── farm.controller.ts
│   ├── farm.module.ts
│   ├── farm.service.ts
│   ├── __tests__/
│   │   └── farm.service.spec.ts
├── farmer/
│   ├── dtos/
│   │   └── createFarmer.dto.ts
│   ├── dtos/
│   │   ├── createFarmer.dto.ts
│   │   ├── returnFarmer.dto.ts
│   ├── entities/
│   │   └── farmer.entity.ts
│   ├── validators/
│   │   └── cpf-cnpj.validator.ts
│   ├── farmer.controller.ts
│   ├── farmer.module.ts
│   ├── farmer.service.ts
│   ├── __tests__/
│   │   └── farmer.service.spec.ts
├── harvest/
│   ├── dtos/
│   │   ├── createHarvest.dto.ts
│   │   ├── returnHarvest.dto.ts
│   ├── entities/
│   │   └── harvest.entity.ts
│   ├── validators/
│   │   └── harvestArea.validator.ts
│   ├── harvest.controller.ts
│   ├── harvest.module.ts
│   ├── harvest.service.ts
│   ├── __tests__/
│   │   └── harvest.service.spec.ts
├── migration/
│   ├── 1734910000675-create_table_farmer.ts
```
## Instalação

### Pré-requisitos
* Docker
* Docker Compose

### Passo a Passo
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/brain-agriculture.git](https://github.com/seu-usuario/brain-agriculture.git)
   cd brain-agriculture
   ```

2. **Configure o arquivo .env:**<br>
   Crie um arquivo .env na raiz do projeto com o seguinte conteúdo (ou use o exemplo fornecido):
   ```bash
     # .env
     DB_HOST=db
     DB_USERNAME=seu-usuario
     DB_PASSWORD=sua-senha
     DB_PORT=5432
     DB_DATABASE=brain-agriculture
   ```

3. **Clone o repositório:**
   ```bash
   docker-compose up -d
   ```
4. **Acesse a aplicação**<br>
  Os endpoints da aplicação estarão disponíveis em: ```http://localhost:3000```.


## Documentação da API
  A documentação da API é gerada automaticamente usando Swagger. Para acessá-la, abra o navegador e vá para ```http://localhost:3000/api```.

## Testes
  Para executar os testes, use o comando:
  ```bash
   npm run test
   ```
## Estrutura dos Endpoints
### Produtores Rurais
- **POST /farmer**: Cria um novo fazendeiro.
- **GET /farmer**: Lista todos os fazendeiros.
- **GET /farmer/:id**: Obtém um fazendeiro pelo ID.
- **GET /farmer/cpf-cnpj/:cpfCnpj**: Obtém um fazendeiro pelo CPF ou CNPJ
- **PATCH /farmer/:id**: Atualiza um fazendeiro.
- **DELETE /farmer/:id**: Exclui um fazendeiro.
### Fazendas
- **POST /farm**: Cria uma nova fazenda.
- **GET /farm**: Lista todas as fazendas.
- **GET /farm/:id**: Obtém uma fazenda pelo ID.
- **GET /farm/farmer/:id**: Obtém uma fazenda pelo ID do produtor rural.
- **PATCH /farm/:id**: Atualiza uma fazenda.
- **DELETE /farm/:id**: Exclui uma fazenda.
### Safras
- **POST /harvest**: Cria uma nova safra.
- **GET /harvest**: Lista todas as safras.
- **GET /harvest/:id**: Obtém uma safra pelo ID.
- **GET /harvest/farm/:id**: Obtém uma safra pelo ID da fazenda.
- **PATCH /harvest/:id**: Atualiza uma safra.
- **DELETE /harvest/:id**: Exclui uma safra.
### Dashboard
- **GET /dashboard**: Obtém dados do dashboard.
