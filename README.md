	<h2>Deli Fast</h2>

<h3>Instalação</h3>

<h4>Clonagem</h4>

<p>Clone o projeto em sua máquina e instale as dependências com o comando:</p>

> yarn

<h4>Configuração inicial</h4>

<p>Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example:</p>

>cp .env.example .env

<p>Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.</p>

<h4>Aplicando as migrations</h4>

<p>Execute as migrations com o comando:</p>

>yarn typeorm migration:run -d src/data-source.ts

<h3>Bibliotecas ultilizadas</h3>

><ol>
>
><li>bcryptjs</li>
>
><li>express</li>
>
><li>jsonwebtoken</li>
>
><li>typeorm</li>
>
><li>typescript</li>
>
><li>jest</li>
>
><li>pg</li>
>
></ol>