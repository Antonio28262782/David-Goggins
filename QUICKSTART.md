# Guide de Démarrage Rapide

## 🚀 Démarrage Local

### Option 1 : Serveur Python (Recommandé)
```bash
# Python 3
python3 -m http.server 8000

# Puis ouvrez http://localhost:8000
```

### Option 2 : Serveur Node.js
```bash
# Installer serve globalement
npm install -g serve

# Lancer le serveur
serve -p 8000
```

### Option 3 : Live Server (VS Code)
- Installez l'extension "Live Server" dans VS Code
- Clic droit sur `index.html` → "Open with Live Server"

## 📋 Fonctionnalités Testables

### ✅ Navigation
- Menu sticky qui change au scroll
- Menu mobile responsive
- Liens de navigation smooth scroll

### ✅ Hero Section 3D
- Animation 3D interactive (Three.js)
- Mouvement de la caméra au survol de la souris
- Effets de particules

### ✅ Produits
- Grille de produits Best Sellers
- Clic sur produit → Page détaillée
- Ajout au panier

### ✅ Panier
- Clic sur l'icône panier → Sidebar
- Ajout/Suppression produits
- Modification quantités
- Total calculé automatiquement
- Persistance localStorage

### ✅ Sections
- **Collections** : Cartes interactives
- **Story** : Section biographie
- **Reviews** : Témoignages clients
- **FAQ** : Accordéon interactif

### ✅ Newsletter
- Popup après 3 secondes
- Formulaire d'inscription
- Ne réapparaît pas après fermeture (localStorage)

## 🎨 Personnalisation Rapide

### Changer les produits
Éditez `js/main.js` ligne ~120 :
```javascript
const products = [
    {
        id: 1,
        name: "Votre Produit",
        description: "Description",
        price: 39.99,
        image: "url-image.jpg",
        category: "tshirts"
    }
];
```

### Changer les couleurs
Éditez `css/style.css` ligne ~7 :
```css
:root {
    --color-red: #DC143C;  /* Changez cette couleur */
    --color-black: #000000;
}
```

## 🔧 Dépannage

### La scène 3D ne s'affiche pas
- Vérifiez la console pour les erreurs
- Assurez-vous que Three.js se charge correctement
- Testez dans Chrome/Firefox (meilleure compatibilité WebGL)

### Le panier ne fonctionne pas
- Vérifiez que `cart.js` est chargé après `main.js`
- Ouvrez la console (F12) pour voir les erreurs
- Videz le localStorage : `localStorage.clear()`

### Images placeholder
Les images utilisent des placeholders. Remplacez-les par vos vraies images :
- Format recommandé : JPG/WebP
- Taille : 800x1000px pour produits
- Optimisez avec TinyPNG ou similaire

## 📱 Test Mobile

1. Ouvrez les DevTools (F12)
2. Activez le mode responsive (Ctrl+Shift+M)
3. Testez différentes tailles d'écran
4. Vérifiez le menu hamburger

## 🎯 Prochaines Étapes

1. **Remplacer les images placeholder** par vos vraies images produits
2. **Intégrer un backend** pour gérer les commandes
3. **Ajouter un système de paiement** (Stripe, PayPal)
4. **Optimiser les images** (WebP, lazy loading)
5. **Ajouter Google Analytics** pour le tracking

## 💡 Astuces

- Utilisez Lighthouse (Chrome DevTools) pour tester les performances
- Testez sur différents navigateurs
- Vérifiez l'accessibilité (contraste, navigation clavier)
- Optimisez les images avant de les mettre en production

---

**Stay Hard! 💪**

