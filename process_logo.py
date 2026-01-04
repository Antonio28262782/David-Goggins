#!/usr/bin/env python3
"""
Script pour traiter le logo GOGGINS :
1. Supprimer le fond blanc (rendre transparent)
2. Convertir le texte et le symbole en rouge
3. Sauvegarder avec un fond transparent
"""
from PIL import Image
import sys
import os

def process_logo(input_path, output_path):
    """
    Traite le logo : supprime le fond blanc et convertit en rouge
    """
    try:
        # Charger l'image
        img = Image.open(input_path)
        
        # Convertir en RGBA si nécessaire (pour la transparence)
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Obtenir les données des pixels
        data = img.getdata()
        
        # Nouvelle liste de pixels
        new_data = []
        
        # Couleur rouge (DC143C en hex = 220, 20, 60 en RGB)
        red_color = (220, 20, 60, 255)
        
        for item in data:
            r, g, b, a = item
            
            # Détecter le fond (noir ou blanc)
            # Si le pixel est noir ou très proche du noir (fond noir)
            is_black_bg = r < 30 and g < 30 and b < 30
            # Si le pixel est blanc ou très proche du blanc (fond blanc)
            is_white_bg = r > 240 and g > 240 and b > 240
            
            if is_black_bg or is_white_bg:
                # Fond -> transparent
                new_data.append((255, 255, 255, 0))
            else:
                # Tout ce qui n'est pas le fond (texte/symbole)
                # Si c'est déjà rouge, le garder tel quel
                if r > 180 and g < 60 and b < 100:
                    # Déjà rouge, garder la couleur mais préserver l'alpha
                    new_data.append((r, g, b, a))
                else:
                    # Convertir en rouge
                    # Utiliser l'intensité pour préserver les nuances
                    intensity = max(r, g, b)
                    if intensity < 50:  # Pixel très sombre/noir -> rouge pur
                        new_data.append(red_color)
                    else:
                        # Pour les pixels colorés, convertir en rouge avec alpha ajusté
                        # Calculer l'alpha basé sur l'intensité
                        alpha = min(255, intensity)
                        new_data.append((220, 20, 60, alpha))
        
        # Créer la nouvelle image
        img.putdata(new_data)
        
        # Sauvegarder en PNG (pour préserver la transparence)
        img.save(output_path, 'PNG')
        
        print(f"✅ Logo traité avec succès !")
        print(f"   Entrée: {input_path}")
        print(f"   Sortie: {output_path}")
        return True
        
    except FileNotFoundError:
        print(f"❌ Erreur: Fichier '{input_path}' introuvable")
        return False
    except Exception as e:
        print(f"❌ Erreur lors du traitement: {e}")
        return False

if __name__ == "__main__":
    # Chemins par défaut
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(script_dir, "assets", "images")
    
    # Chercher l'image source
    # L'utilisateur doit fournir le nom du fichier source
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        # Chercher une image de logo dans le dossier images
        possible_names = [
            "goggins-logo-original.jpg",
            "goggins-logo-complete.jpg",
            "goggins-logo-correct.jpg",
            "logo-symbol.png",
            "logo-symbol.svg"
        ]
        
        input_file = None
        for name in possible_names:
            path = os.path.join(images_dir, name)
            if os.path.exists(path):
                input_file = path
                break
        
        if not input_file:
            print("❌ Aucune image source trouvée.")
            print("   Usage: python process_logo.py <chemin_vers_image>")
            print("   Ou placez une image de logo dans assets/images/")
            sys.exit(1)
    
    # Chemin de sortie - créer un nouveau fichier pour ne pas écraser
    base_name = os.path.splitext(os.path.basename(input_file))[0]
    output_file = os.path.join(images_dir, f"{base_name}-red-transparent.png")
    
    # Traiter l'image
    success = process_logo(input_file, output_file)
    
    if success:
        print(f"\n✅ Le logo a été traité et sauvegardé dans: {output_file}")
        print("   Vous pouvez maintenant l'utiliser dans votre site web.")
    else:
        sys.exit(1)

