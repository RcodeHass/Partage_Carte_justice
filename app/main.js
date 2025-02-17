// Les imports pour lui dire j'ai besoin de cette app de cette objet ect. 
import './style.css';
import {Map, View} from 'ol';
import { fromLonLat } from 'ol/proj';
import { ImageWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import ScaleLine from 'ol/control/ScaleLine.js' //pour ajouter l'echelle 


// Je sors la couche OSM de l’objet Map pour la stocker dans une variable
const scaleline = new ScaleLine(); //On appelle ici le scale 
const couche_osm = new TileLayer({ source: new OSM() });

// =========================================================================================
// ================================= Import de mes 3 couches wms ===========================
// =========================================================================================

// Impoter la couche deals 
const deals = new ImageLayer({
  source: new ImageWMS({
    url: 'http://localhost:8090/geoserver/data_point_justice/wms',
    params: {'LAYERS' : 'Point_justice:point_justice'
    },
    serverType: 'geoserver',
  }),
});


// Import la couche deals_by_country_centroids
const vecteur_Centroid = new VectorSource({
  format: new GeoJSON(),
  url: 'http://localhost:8090/geoserver/workflow/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=workflow%3Adeals_by_country_centroid&maxFeatures=50&outputFormat=application%2Fjson'
});



// =========================================================================================
// ================================= Import de mes 3 couches wms ===========================
// =========================================================================================

// =========== Impoter la couche Point de justice ================
const pt_justice = new ImageLayer({
  source: new ImageWMS({
    url: 'http://localhost:8090/geoserver/data_point_justice/wms',
    params: {'LAYERS' : 'data_point_justice:point_justice'
    },
    serverType: 'geoserver',
  }),
});



// ============== Impoter la couche Cour d'appel ================
const cour_appel = new ImageLayer({
  source: new ImageWMS({
    url: 'http://localhost:8090/geoserver/data_point_justice/wms',
    params: {'LAYERS' : 'data_point_justice:cour_appel'
    },
    serverType: 'geoserver',
  }),
});

// ================= Impoter la couche Prudhomme =================
const prudhomme = new ImageLayer({
  source: new ImageWMS({
    url: 'http://localhost:8090/geoserver/data_point_justice/wms',
    params: {'LAYERS' : 'data_point_justice:prudhomme'
    },
    serverType: 'geoserver',
  }),
});

// ============== Impoter la couche trib_judiciaire ================
const trib_judiciaire = new ImageLayer({
  source: new ImageWMS({
    url: 'http://localhost:8090/geoserver/data_point_justice/wms',
    params: {'LAYERS' : 'data_point_justice:tribunal judiciaire'
    },
    serverType: 'geoserver',
  }),
});
















// On peux maintenant configurer le style de la couche 
function getStyleCentroid(feature) {
  const nDeals = feature.get('n_deals');
  const rayon = Math.sqrt(nDeals) * 2.2;
  const style = new Style({
    image: new Circle({
      radius: rayon,
      fill: new Fill({ color: '#fac460da'}),
      stroke: new Stroke({ color: 'blue', width: 0.2 }),
    }),
  });
  return style;
}

// On configure ici la couche vecteur 
const deals_by_country_centroids = new VectorLayer({
  source: vecteur_Centroid,
  style: getStyleCentroid  // Pour nommé notre style 
});

// ========================================================================================
// ===============================  On ajoute ici la carte =============================== 
// ========================================================================================
// Création de l’objet map avec appel de mes deux couches "couche_osm" et "ma_couche" dans layers

const map = new Map({
  target: 'map',
  controls: [scaleline], // Pour ajouter l'echelle 
  layers: [ couche_osm, prudhomme, trib_judiciaire, cour_appel,pt_justice, deals_by_country_centroids ],
  view: new View({
    center: fromLonLat([4.385923767089852, 45.43798463466298]),
    zoom: 6
  })
});

// ========================================================================================
// ================  Creer la fonction qui affiche et masque nos couche ================= 
// ========================================================================================

// Ce code masque les couche country centroids
prudhomme.setVisible(false);
trib_judiciaire.setVisible(false);
cour_appel.setVisible(true);

// Fonctions pour afficher et masquer la couche country 
const checkbox_pt_justice = document.getElementById('checkbox-pt_justice');
checkbox_pt_justice.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    // On fait des trucs quand la checkbox est checkée
    pt_justice.setVisible(true);
    console.log('test');
  } else {
    // On fait des trucs quand la checkbox n’est PAS checkée
    pt_justice.setVisible(false);
  }
});

// On vas definir ici le comportement des checkbox 
// est leurs incidences sur les elements de la carte 

// On appelle les checkbox pas leur id
const checkbox_cour_appel = document.getElementById('checkbox-cour_appel');
const checkbox_trib_judiciaire = document.getElementById('checkbox-trib_judiciaire');
const checkbox_prudhomme = document.getElementById('checkbox-prudhomme');


// // legende
// const div_filtre = document.getElementById('production');
// const legende_raster = document.getElementById('legend-raster');
// const legende_vector = document.getElementById('legend-vecteur');


// // Par défaut la legende centroide est masque
// legende_vector.style.display = 'none';

// // Fonctions pour afficher et masquer la couche cour_appel
// // si le chekbox est cocher  la div filtre et affiche 
// checkbox_cour_appel.addEventListener('change', (event) => {
//   console.log("Cour d'appel sélectionné");
//   if (event.currentTarget.checked) {
//     cour_appel.setVisible(true);
//     prudhomme.setVisible(false);
//     trib_judiciaire.setVisible(false);
//     console.log('test');

//     // div_filtre.style.display = 'block';
//     // legende_raster.style.display = 'flex';
//     // legende_vector.style.display = 'none';
//   }
// });

// // Fonctions pour afficher et masquer la couche prudhomme
// // si le chekbox est cocher  la div filtre et masquer
// checkbox_trib_judiciaire.addEventListener('change', (event) => {
//   if (event.currentTarget.checked) {
//     trib_judiciaire.setVisible(true);
//     prudhomme.setVisible(false);
//     cour_appel.setVisible(false);
//     // div_filtre.style.display = 'none';
//     // legende_raster.style.display = 'none';
//     // legende_vector.style.display = 'block';
//   }
// });


// // Fonctions pour afficher et masquer la couche prudhomme
// // si le chekbox est cocher  la div filtre et masquer
// checkbox_prudhomme.addEventListener('change', (event) => {
//   if (event.currentTarget.checked) {
//     prudhomme.setVisible(true);
//     cour_appel.setVisible(false);
//     trib_judiciaire.setVisible(false);
//     // div_filtre.style.display = 'none';
//     // legende_raster.style.display = 'none';
//     // legende_vector.style.display = 'block';
//   }
// });


// ========================================================================================
// ==== Définition de la fonction des ckeckbox pour afficher et masquer les couche  ======= 
// ========================================================================================
document.querySelectorAll('input[name="checkbox-group"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.id === "checkbox-cour_appel") {
      cour_appel.setVisible(true);
      trib_judiciaire.setVisible(false);
      prudhomme.setVisible(false);
    } else if (event.target.id === "checkbox-trib_judiciaire") {
      trib_judiciaire.setVisible(true);
      cour_appel.setVisible(false);
      prudhomme.setVisible(false);
    } else if (event.target.id === "checkbox-prudhomme") {
      prudhomme.setVisible(true);
      cour_appel.setVisible(false);
      trib_judiciaire.setVisible(false);
    }
  });
});


// // ======================= Intéroger la couche WMS ========================

// // On vas ici utiliser la fonction fetch pour allez chercher 
// // les information de la couche et les afficher dans notre rable
// // const infoDialog = document.getElementById("info");
// // const closeDialog = document.getElementById("close-dialog");

// // // Ajoute un écouteur d'événement sur la carte pour afficher la boîte de dialogue
// // map.on("singleclick", function () {
// //   infoDialog.showModal(); // Affiche la boîte de dialogue
// // });

// // // Ajoute un écouteur pour fermer la boîte de dialogue
// // closeDialog.addEventListener("click", () => {
// //   infoDialog.close(); // Ferme la boîte de dialogue
// // });

// // map.on('singleclick', (event) => {
// //   const coord = event.coordinate;
// //   const view = map.getView();
// //   const res = view.getResolution();
// //   const proj = 'EPSG:3857';
// //   const parametres = {'INFO_FORMAT': 'application/json'};

// //   // =========== (Tableaux) Récupérer la source de la couche =============
// //   const sourceDeals = deals.getSource();
// //   const url = sourceDeals.getFeatureInfoUrl(coord, res, proj, parametres);
// //   if (url) {
// //     fetch(url)
// //       .then((response) => response.text())
// //       .then((json) => {
// //         const obj = JSON.parse(json);
// //         if (obj.features[0]) {
// //           const properties = obj.features[0].properties;
// //           // On affiche les information dans notre table
// //           document.getElementById('table-deal-id').innerHTML = properties.deal_id;
// //           document.getElementById('table-creation-date').innerHTML = properties.created_at;
// //           document.getElementById('table-country').innerHTML = properties.target_country;
// //           document.getElementById('table-crops').innerHTML = properties.crops;
// //         } else {
// //           // On a cliqué "nulle part" donc on remet des … dans les colonnes
// //           document.getElementById('table-deal-id').innerHTML = "...";
// //           document.getElementById('table-creation-date').innerHTML = "...";
// //           document.getElementById('table-country').innerHTML = "...";
// //           document.getElementById('table-crops').innerHTML = "...";
// //         }
// //       });
// //   }
// // });


// // Sélection des éléments du DOM
// const infoDialog = document.getElementById("info"); // Le dialog principal
// const closeDialog = document.getElementById("close-dialog"); // Bouton de fermeture
// const headInfo = document.getElementById("head-info"); // Titre de l'info
// const textInfo = document.getElementById("text-info"); // Zone de texte

// // Ajout de l'écouteur d'événement sur la carte
// map.on("singleclick", function (event) {
//     const viewResolution = map.getView().getResolution();
//     const source = deals.getSource();
//     const url = source.getFeatureInfoUrl(
//         event.coordinate, // Coordonnées du clic
//         viewResolution,   // Résolution de la vue
//         map.getView().getProjection(), // Projection actuelle
//         { "INFO_FORMAT": "application/json" } // Format JSON pour récupérer les données
//     );

//     if (url) {
//         // Récupérer les données du point cliqué
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.features.length > 0) {
//                     const feature = data.features[0]; // Prendre la première entité cliquée
//                     const properties = feature.properties;

//                     // Mise à jour du contenu du panneau latéral avec les infos récupérées
//                     headInfo.innerHTML = `<strong>${properties.nom}</strong>`;
//                     textInfo.innerHTML = `
//                         <p><strong>Adresse :</strong> ${properties.adresse}</p>
//                         <p><strong>Gérant :</strong> ${properties.gerant}</p>
//                         <p><strong>Téléphone :</strong> ${properties.telephone}</p>
//                     `;

//                     // Afficher le dialog
//                     infoDialog.showModal();
//                 }
//             })
//             .catch(error => console.error("Erreur lors de la récupération des données WMS :", error));
//     }
// });

// // Ajout d'un écouteur pour fermer le panneau
// closeDialog.addEventListener("click", () => {
//     infoDialog.close();
// });



// // ================ Paraméter les checkbox pour les types de productions =================== 

// // Pour tous afficher 
// const buttonTout = document.getElementById('button-tous');
// buttonTout.addEventListener('change', () => {
//   deals.getSource().updateParams({ 'N_CA' : '' });
// });

// const buttonGold = document.getElementById('button-oil_palm');
// buttonGold.addEventListener('change', () => {
//   deals.getSource().updateParams({ 'N_CA' : '23=true' });
// });

// const buttonCharbon = document.getElementById('button-soya_beans');
// buttonCharbon.addEventListener('change', () => {
//   deals.getSource().updateParams({ 'CQL_FILTER' : '23=true' });
// });

// const buttonSilver = document.getElementById('button-sugar_cane');
// buttonSilver.addEventListener('change', () => {
//   deals.getSource().updateParams({ 'CQL_FILTER' : 'sugar_cane=true' });
// });



// // ========================== Légende =============================

// // Nom du style à récupérer
// const styleName = 'agri_deals_by_country';
// const styleName2 = 'deals_agri_style';

// // Génération de l'URL de la légende avec le style spécifié
// const legendUrl = `${deals.getSource().getUrl()}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=workflow:deals_agri&STYLE=${styleName}`;
// const legendUrl2 = `${deals.getSource().getUrl()}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=workflow:deals_agri&STYLE=${styleName2}`;

// // Assignation de l'URL à l'élément <img>
// document.getElementById('legend-image2').src = legendUrl;
// document.getElementById('legend-image1').src = legendUrl2;

