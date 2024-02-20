## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing) **<- Importante**

## Installation

Primero que nada se tiene que descargar node.  
NVM (Node Version Manager) es muy buena opción, ya que te permite tener diferentes versiones de node simultaneas de manera sencilla, también puedes agregarlas y cambiar entre ellas.  
Para este proyecto se usa la versión **18.16.1** de node.

Después de instalar node, solamente se require un comando para tener listas todas las dependencias.
    
    npm i

**Importante**, para correr este comando tienen que estar en la carpeta *DREAM-lab-backend/functions*

Opcionalmente (si ya lo tienen instalado no hace falta volverlo a instalar), se tiene que instalar el *CLI de Firebase* con el siguiente comando:

    npm install -g firebase-tools

## Usage

Primero que nada, tenemos que iniciar sesión en Firebase con 

    firebase login

Si la terminal no reconoce el comando *firebase*, seguramente sea porque el CLI no está instalado. en [Installation](#installation) viene cómo instalarlo.

### ---- Testing -----

Hay 2 formas de probar las funciones creadas, la primera es por emuladores (pruebas manuales) y la segunda es por pruebas unitarias (jest)

#### Emuladores

Cuando se inician los emuladores, se crea un servidor local al que le puedes enviar POST requests para probar tus funciones manualmente, al iniciar los emuladores te da el link con el que las puedes llamar.  
Para iniciar los emuladores de funciones se tiene que correr este comando en la terminal (dentro de la carpeta de functions).

    firebase emulators:start --only functions

Las funciones definidas con OnCall() esperan un parámetro llamado *data*, para enviarlo desde la post request, el body debería de tener este formato.

    {
        "data": {
            "attr1": "example1",
            "attr2": "example2", 
            ...
        }
    }

#### Pruebas unitarias

Para crear pruebas automatizadas, se tiene que crear un archivo .test.js dentro de la carpeta específica de tu function.  
Un buen ejemplo del formato para escribir pruebas unitarias está en *./Login/getUserDataFromMat/index.test.js*

Hay 2 formas para correr estas pruebas unitarias:

El primero es para correr todas las pruebas unitarias del proyecto. Esta no la recomiendo, ya que puede llegar a tardar mucho.

    npm run test

La segunda es para correr una función específica, esta es la que deberíamos de usar la mayoría del tiempo. Imaginemos que la función está creada en el formato definido para las funciones, entonces el comando sería

    npm run test {functionName}

Donde function name es el nombre de la carpeta de tu función, por ejemplo:

    npm run test getUserDataFromMat


## Contributing

El código de este repositorio no es necesariamente el mismo que corre la función que está en la nube, la mejor manera de evitar inconsistencias es crear una github action que haga deploy cada que se haga un merge en la main branch, pero  de momento, no sé cómo hacer eso, entonces es **MEGA IMPORTANTE** que antes de hacer un push con cambios en una función, antes se le haga deploy a firebase.  
Para hacer esto solamente hace falta correr este comando y esperar a que indique que se subió con éxito.

    firebase deploy --only functions:{functionName}

Si por algún motivo algo sale mal al subir el código, automáticamente se crea un archivo .log en donde vienen todos los mensajes del proceso de deploy de firebase.

## Contact

Ahí por el grupo de whats
