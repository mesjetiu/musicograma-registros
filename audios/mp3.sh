#!/bin/bash

# Crea una subcarpeta si no existe
mkdir -p reencoded

# Navega a través de todos los archivos MP3
for file in *.mp3; do
    # Cambia la calidad del archivo usando ffmpeg y guárdalo en la subcarpeta "reencoded"
    ffmpeg -i "$file" -b:a 64k "reencoded/$file" 
done

