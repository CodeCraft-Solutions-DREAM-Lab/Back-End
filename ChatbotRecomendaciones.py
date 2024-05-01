from openai import OpenAI
import requests
import sys
import os
from dotenv import load_dotenv

load_dotenv('.env')

API_KEY = os.getenv('API_KEY')

client = OpenAI(api_key=API_KEY)

# Get de todas las experiencias
def consultarApi(tipo):
    url = "https://dreamlab-api.azurewebsites.net/" 
    if tipo == "experiencias":
        url += "experiencias"
    elif tipo == "salas":
        url += "salas"
    else:
        print("Error en el tipo de tabla a consultar")
        return "Error en el tipo"
    
    response = requests.get(url)
    if response.status_code == 200:
        datos = response.json()

        texto = ""
        for item in datos:
            if 'idExperiencia' in item:
                texto += f"Tipo: Experiencia, Id: {item['idExperiencia']}, {item['nombre']}: {item['descripcion']}. \n"
            elif 'idSala' in item:
                texto += f"Tipo: Sala, Id: {item['idSala']}, {item['nombre']}: {item['descripcion']}. \n"

        return texto
    else:
        print("Error al obtener los datos de la API.")

# Consulta recomendaciones a chatgpt
def preguntar(prompt):
    response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    model="gpt-3.5-turbo")

    return response.choices[0].message.content.strip()

# Definición de instrucciones
Instrucciones = "Instrucciones: Eres un asistente virtual que solamente recomienda algunos de las siguiente salas y/o experiencias en un laboratorio dependiendo de lo que el usuario diga y la descripción del lugar. Las experiencias son:\n"
Instrucciones += str(consultarApi("experiencias")) 
Instrucciones += "\n Las salas son:\n"
Instrucciones += str(consultarApi("salas")) 
Instrucciones += "Es importante que solo respondas con el Tipo y el Id de las 3 recomendaciones que más se acerquen a lo que pide el usuario a manera de lista de recomendaciones, con el siguiente formato (usando un ejemplo): 1. Tipo: experiencias, Id: 1, Hackers Event y así sucesivamente con las 3, el tipo debe estar en minusculas y en plural (osea solo -experiencias- o -salas-). También es importante que siempre des 3 recomendaciones, PERO es mucho más importante que cuando ninguna experiencia o sala del catálogo es cercana a lo que pide el usuario debes regresar una sola respuesta con lo siguiente _0. Tipo: Error, Id: 0_. SOLO PUEDES HACER UNA RESPUESTA A LA VEZ, es decir no puedes responder por el usuario. Recuerda que si ninguna sala o experiencia es una buena recomendación para el usuario entonces responde _0. Tipo: Error, Id: 0_ \n"

conversacion = Instrucciones

user_input = sys.argv[1] # Toma el input del usuario, prompt en chatbotBridge.js
conversacion += "\nUsuario: " + user_input + "\nAI:" 
response = preguntar(conversacion)
print (response) # Hacer print, regresa el valor al nodo, es decir aquí le hacemos return a la respuesta de recomendaciones

