![API DEPLOY](https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End/actions/workflows/dev_dreamlab-api.yml/badge.svg)

# Backend para la aplicación del D.R.E.A.M. Lab

## Proyectos relacionados

Se puede consultar el frontend que consume esta API en el repositorio de [Frontend](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End).

Asimismo, la aplicación que permite la conexión con el chat de voz se puede encontrar en el repositorio de [RecomendacionesDreamLab](https://github.com/CodeCraft-Solutions-DREAM-Lab/RecomendacionesDreamLab).

## Despliegue

Este API se encuentra desplegado como un App Service de Azure en la siguiente liga: [dreamlab-api.azurewebsites.net](dreamlab-api.azurewebsites.net).

## Configuración

Para configurar el proyecto localmente puedes seguir los siguientes pasos:

1. Clona el repositorio utilizando Git. Si no tienes Git instalado, puedes descargarlo desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

    Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

    ```
    git clone https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End.git
    ```

2. Navega al directorio del proyecto:

    Usando la misma terminal con la que se clonó el repositorio, ejecuta el siguiente comando para cambiar el directorio activo en la terminal y que el resto de los comandos se corran dentro del proyecto:

    ```
     cd "DREAM-Lab-Backend"
    ```

3. Instala las dependencias de Node. Para poder correr este comando es necesario tener instalado Node con la versión `20.X`, puedes descargarlo desde [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager):

    ```
    npm install
    ```

4. Crea en la raiz del proyecto el archivo de las variables de entorno:

    4.1. Corre uno de estos dos comandos dependiendo de tu sistema operativo:

    > Unix (macOS, Linux):

    ```
    touch .env && nano .env
    ```

    > Windows

    ```
    echo. > .env && notepad .env
    ```

    4.2. Copia las siguientes variables en el archivo:

    ```
    AZURE_SQL_PORT=1433
    AZURE_SQL_AUTHENTICATIONTYPE=azure-active-directory-password
    TOKEN_SECRET=<SECRET>
    SMTP_PASSWORD=<PASSWORD>
    SMTP_SERVER_EMAIL=<EMAIL_ADDRESS>

    # Entorno de pruebas
    AZURE_SQL_USER=<USER>
    AZURE_SQL_PASSWORD=<PASSWORD>
    AZURE_SQL_DATABASE=<DATABASE_NAME>
    AZURE_SQL_SERVER=<SERVER_URL>
    ```

> [!NOTE]
> Es necesario modificar los valores entre `< >` con los tuyos propios para que funcione la aplicación.

## Inicio

Para iniciar el servidor, ejecuta:

```
npm start
```

## Consultar la documentación

Para consultar la documentación de swagger sobre los endpoints con los que cuenta esta API copia [esta URL](http://localhost:3000/docs) en tu navegador de preferencia:

```
http://localhost:3000/docs
```
