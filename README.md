![API DEPLOY](https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End/actions/workflows/dev_dreamlab-api.yml/badge.svg)

# Dream Lab Backend

Este proyecto utiliza Express.js.

## Configuración

1. Clona el repositorio utilizando Git. Si no tienes Git instalado, puedes descargarlo desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

    Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

    ```
    git clone https://github.com/Jaimedev12/DREAM-Lab-Backend.git
    ```

2. Navega al directorio del proyecto:

    Usando la misma terminar con la que se clonó el repositorio, ejecuta el siguiente comando:

    ```
     cd "DREAM-Lab-Backend"
    ```

3. Instala las dependencias de node:

    ```
    npm install
    ```

4. Crea un ambiente virtual para las dependencias de python, instálalas y termina el ambiente:
    ```
    py -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    deactivate
    ```

## Inicio

Para iniciar el servidor, ejecuta:

```
.venv\Scripts\activate
npm start
```

## Pruebas

Para correr las pruebas, ejecuta:

```
npm test
```
