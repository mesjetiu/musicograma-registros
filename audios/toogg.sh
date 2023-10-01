#!/bin/bash

# Crea una subcarpeta si no existe
mkdir -p converted_to_ogg

# Navega a través de todos los archivos MP3
for file in *.mp3; do
    # Extrae el nombre del archivo sin la extensión
    base_name="${file%.mp3}"

    # Convierte el archivo MP3 a OGG usando ffmpeg y guárdalo en la subcarpeta "converted_to_ogg"
    ffmpeg -i "$file" -c:a libvorbis "converted_to_ogg/$base_name.ogg" 
done

