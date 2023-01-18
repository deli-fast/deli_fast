	<h2>Deli Fast</h2>

<h3>Instalação</h3>

<p>Clone o projeto em sua máquina e instale as dependências com o comando:</p>

> yarn

<p>Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example:</p>

>cp .env.example .env

<p>Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.</p>


<p>Execute as migrations com o comando:</p>

>yarn typeorm migration:run -d src/data-source.ts

<h3>Bibliotecas ultilziadas</h3>

<ol>
<li>bcryptjs</li>
<li>express</li>
<li>jsonwebtoken</li>
<li>typeorm</li>
<li>typescript</li>
<li>jest</li>
<li>pg</li>
</ol>