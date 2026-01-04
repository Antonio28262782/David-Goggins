# David Goggins Store - Site E-commerce

Site e-commerce moderne et immersif pour la boutique David Goggins.

## 🎯 Caractéristiques

- **Design Premium** : Interface moderne avec animations 3D
- **Hero Section 3D** : Scène interactive Three.js avec effets visuels
- **Responsive** : Design mobile-first optimisé pour tous les appareils
- **Performance** : Chargement rapide avec lazy loading
- **Panier** : Gestion complète du panier avec localStorage
- **Animations** : Transitions fluides et micro-interactions

## 🚀 Technologies

- HTML5 / CSS3
- JavaScript (Vanilla)
- Three.js (animations 3D)
- LocalStorage (panier)

## 📁 Structure du Projet

```
goggins/
├── index.html          # Page d'accueil
├── css/
│   ├── style.css       # Styles principaux
│   └── product.css     # Styles page produit
├── js/
│   ├── main.js         # Logique principale
│   ├── 3d.js           # Scène 3D Three.js
│   └── cart.js         # Gestion du panier
└── README.md
```

## 🎨 Design System

### Couleurs
- **Noir** : `#000000` - Fond principal
- **Rouge** : `#DC143C` - Accent, CTA
- **Blanc** : `#FFFFFF` - Texte principal
- **Gris foncé** : `#1a1a1a` - Cartes, sections

### Typographie
- **Display** : Bebas Neue (titres)
- **Body** : Inter (texte)

## 🛠️ Installation

1. Clonez le repository
2. Ouvrez `index.html` dans un navigateur
3. Pour le développement local, utilisez un serveur :
   ```bash
   python -m http.server 8000
   # ou
   npx serve
   ```

## 📱 Fonctionnalités

### Navigation
- Barre de navigation sticky
- Menu mobile responsive
- Scroll smooth

### Hero Section
- Animation 3D interactive
- Effets de parallaxe
- CTAs clairs

### Produits
- Grille de produits responsive
- Pages produits détaillées
- Sélecteurs taille/couleur
- Viewer 3D (optionnel)

### Panier
- Ajout/suppression produits
- Gestion quantités
- Persistance localStorage
- Sidebar animée

### Sections
- Best Sellers
- Collections
- Story / Inspiration
- Reviews
- FAQ (accordéon)

### Newsletter
- Popup après 3 secondes
- Formulaire d'inscription
- Persistance (localStorage)

## 🎬 Animations

- Fade in/up au chargement
- Hover effects sur produits
- Transitions fluides
- Parallax scroll
- 3D scene interactive

## 🔧 Personnalisation

### Ajouter des produits

Modifiez le tableau `products` dans `js/main.js` :

```javascript
const products = [
    {
        id: 1,
        name: "Nom du produit",
        description: "Description",
        price: 39.99,
        image: "url-image",
        category: "tshirts"
    }
];
```

### Modifier les couleurs

Éditez les variables CSS dans `css/style.css` :

```css
:root {
    --color-red: #DC143C;
    --color-black: #000000;
    /* ... */
}
```

## 📦 Intégration E-commerce

Pour une intégration complète avec un backend :

1. **Paiement** : Intégrez Stripe, PayPal, etc.
2. **Backend** : API pour produits, commandes
3. **Base de données** : Stockage produits, utilisateurs
4. **Authentification** : Système de connexion
5. **Email** : Confirmations de commande

## 🌐 SEO

- Meta tags optimisés
- Structure sémantique HTML5
- Images avec alt text
- Performance optimisée

## 📄 Licence

Projet créé pour la boutique David Goggins.

## 🎯 Prochaines Étapes

- [ ] Intégration backend API
- [ ] Système de paiement
- [ ] Authentification utilisateur
- [ ] Dashboard admin
- [ ] Optimisation images (WebP)
- [ ] PWA (Progressive Web App)

---

**Stay Hard. Uncommon Amongst the Uncommon.**

