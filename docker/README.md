# AmbDev

Este e um ambiente LAMP feito com Docker Compose. Ele consiste em:

* PHP 5.6
* Apache 2.4
* PostgreSQL 12.1
* phpMyAdmin
* Redis

## Instalação

Clone o repositorio em seu computador. Rode os comandos:

* `docker-compose up -d` para rodar em modo desacoplado.
* `docker-compose up`    para rodar em modo interativo.
* `docker-compose -p nome_projeto up` para rodar em modo interativo nomeando o projeto.

```shell
git clone https://gitlab.com/celsoinfra/ambdev.git
cd ambdev/
git fetch --all
git checkout 5.6.x
cp sample.env .env
docker-compose up -d
```

Seu ambiente esta rodando!! Acesse via `http://localhost`.

## Configuração

Este pacote vem com a configuração padrão. Voce pode configurar copiando o arquivo `sample.env` para `.env` e atualizar os valores das variaves para o que precisar.

### Configuração de Variaveis

Existem as seguintes variáveis ​​de configuração disponíveis e você pode personalizá-las substituindo por conta própria o arquivo `.env`.

_**DOCUMENT_ROOT**_

É a raiz do diretorio para o servidor Apache. O valor padrão para ela é `./www`. Todos os seus sites acessam aqui e são sincronizados automaticamente conforma forem disenvolvendo.

_**MYSQL_DATA_DIR**_

É o diretório de dados do MySQL. O valor padrão para ela é `./data/mysql`. Todos os seus arquivos de dados do MySQL serão armazenados aqui.

_**VHOSTS_DIR**_

É para o virtual host. O valor padrão para ela é `./config/vhosts`.  Você pode colocar seus arquivos conf dos virtual hosts aqui.

> Certifique-se de adicionar uma entrada ao arquivo `hosts 'do seu sistema para cada host virtual.

_**APACHE_LOG_DIR**_

Será usado para armazenar logs do Apache. O valor padrão para ela é `./logs/apache2`.

_**MYSQL_LOG_DIR**_

Será usado para armazenar logs do mysql. O valor padrão para ela é `./logs/mysql`.

## Web Server

O Apache está configurado para rodar na porta 80. Portanto, você pode acessá-lo atravez de `http://localhost`.

#### Apache Modules

Por padrão os modulos abaixo ja vem ativos.

* rewrite
* headers

> Se você deseja habilitar mais módulos, basta atualizar `./bin/webserver/Dockerfile`.
> Você deve reconstruir a imagem do Docker executando`docker-compose build` e reiniciar os contêineres do docker.

#### Conectar via SSH

Você pode se conectar ao servidor Web usando o comando `docker-compose exec` para executar várias operações nele. Use o comando abaixo para efetuar login no contêiner via ssh.

```shell
docker-compose exec webserver bash
```

## Database

No caso do PostgreSQL não alterar essa variavel no arquivo .env.

_**DATABASE**_

Alterne o SGBD do banco de dados de mysql para o mariadb ou mysql8. 

## PHP

A versão instalada do PHP é 5.6

#### Extensions

Por padrão, as seguintes extensões estão instaladas.

* mysqli
* pod_mysql
* pdo_pgsql
* pgsql
* mbstring
* zip
* intl
* mcrypt
* curl
* json
* iconv
* xml
* xmlrpc
* gd

> Se você quiser instalar mais extensões, atualize `./bin/webserver/Dockerfile`. 
> Você deve reconstruir a imagem do Docker executando`docker-compose build` e reiniciar os contêineres do docker.

## phpMyAdmin

phpMyAdmin esta configurado na porta 8080. Use as credenciais padrão.

http://localhost:8080/  
username: tecnologia@celsolisboa.edu.br  
password: celsolisboa

## Redis

Vem com Redis. É executado na porta padrão`6379`.

