#!/usr/bin/env python3
"""
Script para procesar fotos del portafolio:
1. Copiar todas las imágenes de all_extracted
2. Detectar rotación automática (EXIF)
3. Rotar si es necesario
4. Renombrar con índice secuencial
5. Ordenar por color dominante
"""

import os
import glob
from PIL import Image
from PIL.ExifTags import TAGS
import json
from pathlib import Path
from collections import Counter

# Rutas
EXTRACTED_DIR = r"c:\Users\Hp\Desktop\images\all_extracted"
OUTPUT_DIR = r"c:\Users\Hp\Desktop\portafoliovs\assets\images"
IMAGE_DATA_FILE = r"c:\Users\Hp\Desktop\portafoliovs\image_data.json"

def get_exif_orientation(image_path):
    """Obtener orientación EXIF de la imagen"""
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
        if exif_data:
            for tag_id, value in exif_data.items():
                tag = TAGS.get(tag_id, tag_id)
                if tag == "Orientation":
                    return value
    except:
        pass
    return 1  # Normal

def rotate_image(image_path, orientation):
    """Rotar imagen según EXIF"""
    image = Image.open(image_path)
    
    rotations = {
        2: Image.FLIP_LEFT_RIGHT,
        3: Image.ROTATE_180,
        4: Image.FLIP_TOP_BOTTOM,
        5: Image.TRANSPOSE,
        6: Image.ROTATE_270,
        7: Image.TRANSVERSE,
        8: Image.ROTATE_90
    }
    
    if orientation in rotations:
        if orientation == 3:
            image = image.rotate(180, expand=True)
        elif orientation == 6:
            image = image.rotate(270, expand=True)
        elif orientation == 8:
            image = image.rotate(90, expand=True)
        else:
            image = image.transpose(rotations[orientation])
    
    return image

def get_dominant_color(image_path):
    """Obtener color dominante de la imagen"""
    try:
        image = Image.open(image_path)
        image = image.resize((150, 150))  # Redimensionar para rapidez
        image = image.convert('RGB')
        
        pixels = image.getdata()
        color_count = Counter(pixels)
        dominant = color_count.most_common(1)[0][0]
        
        # Retornar como HSV para mejor ordenamiento
        return dominant
    except:
        return (128, 128, 128)  # Gris por defecto

def rgb_to_hsv(rgb):
    """Convertir RGB a HSV para ordenar por tono"""
    r, g, b = [x / 255.0 for x in rgb]
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    l = (max_c + min_c) / 2.0
    
    if max_c == min_c:
        h = s = 0.0
    else:
        d = max_c - min_c
        s = d / (2.0 - max_c - min_c) if l > 0.5 else d / (max_c + min_c)
        if max_c == r:
            h = (60 * ((g - b) / d) + 360) % 360
        elif max_c == g:
            h = (60 * ((b - r) / d) + 120) % 360
        else:
            h = (60 * ((r - g) / d) + 240) % 360
    
    return h, s, l

def main():
    print("=" * 60)
    print("PROCESANDO IMÁGENES DEL PORTAFOLIO")
    print("=" * 60)
    
    # Obtener todas las imágenes
    image_files = sorted(glob.glob(os.path.join(EXTRACTED_DIR, "*.jpeg")))
    print(f"\n📸 Total de imágenes encontradas: {len(image_files)}")
    
    if not image_files:
        print("❌ No se encontraron imágenes")
        return
    
    # Limpiar carpeta de salida si existe
    for f in glob.glob(os.path.join(OUTPUT_DIR, "photo-*.jpg")):
        try:
            os.remove(f)
        except:
            pass
    
    # Procesar imágenes
    image_data = []
    processed_count = 0
    
    for idx, src_path in enumerate(image_files, 1):
        try:
            print(f"  [{idx:03d}/{len(image_files)}] Procesando...", end='\r')
            
            # Obtener orientación EXIF
            orientation = get_exif_orientation(src_path)
            
            # Abrir y rotar si es necesario
            image = Image.open(src_path)
            if orientation != 1:
                image = rotate_image(src_path, orientation)
            
            # Obtener color dominante
            dominant_color = get_dominant_color(src_path)
            h, s, l = rgb_to_hsv(dominant_color)
            
            # Guardar imagen
            output_path = os.path.join(OUTPUT_DIR, f"photo-{idx:03d}.jpg")
            image.save(output_path, "JPEG", quality=90, exif=b'')
            
            # Guardar metadata
            image_data.append({
                "index": idx,
                "filename": f"photo-{idx:03d}.jpg",
                "color_rgb": dominant_color,
                "color_hsv": {"h": h, "s": s, "l": l},
                "rotated": orientation != 1,
                "original_name": os.path.basename(src_path)
            })
            
            processed_count += 1
            
        except Exception as e:
            print(f"  ❌ Error procesando {os.path.basename(src_path)}: {str(e)}")
    
    print(f"\n✓ Imágenes procesadas: {processed_count}")
    print(f"✓ Imágenes rotadas automáticamente: {sum(1 for d in image_data if d['rotated'])}")
    
    # Ordenar por HSV (matiz para agrupar por color)
    image_data_sorted = sorted(image_data, key=lambda x: (x["color_hsv"]["h"], x["color_hsv"]["s"]))
    
    # Crear índices ordenados
    ordered_indices = [d["index"] for d in image_data_sorted]
    
    # Guardar configuración
    config = {
        "total": processed_count,
        "ordered_by_color": ordered_indices,
        "images": image_data_sorted
    }
    
    with open(IMAGE_DATA_FILE, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f"\n✓ Configuración guardada en: image_data.json")
    print(f"\n{'='*60}")
    print(f"PROCESAMIENTO COMPLETADO")
    print(f"Total final: {processed_count} imágenes")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
