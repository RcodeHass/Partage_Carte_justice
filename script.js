
var map = L.map('map');
 var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 var osmAttrib = 'Map data © OpenStreetMap contributors';
 var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);
 map.setView([45.719, 4.918], 10);

var baseLayers = {
"osm": osm,
}; 

// Personnalisez le style des marqueurs
const geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#3182bd",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
    };

// Importer les données sans clustering
L.geoJSON(point_justice, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions).addTo(map);
    }
}).addTo(map);

// Ajouter le controle des couches 
L.control.layers(baseLayers).addTo(map);


//  Bouton pour afficher ou masquer le l'onglet itinéraire
document.getElementById('button-recherche').addEventListener('click', function() {
    const dialog = document.getElementById('itineraire');
    if (dialog.open) {
        dialog.close();
    } else {
        dialog.show();
    }
});

//  Bouton pour afficher ou masquer le l'onglet itinéraire
function toggleDialog(buttonId, dialogId, otherDialogId) {
    document.getElementById(buttonId).addEventListener('click', function() {
        const dialog = document.getElementById(dialogId);
        const otherDialog = document.getElementById(otherDialogId);
        
        // Fermer l'autre dialogue s'il est ouvert
        if (otherDialog.open) {
            otherDialog.close();
        }
        
        // Ouvrir ou fermer le dialogue actuel
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.show();
        }
    });
}

// Utilisation de la fonction générique pour les deux boutons
toggleDialog('button-text', 'text-info', 'stat-info');
toggleDialog('button-stat', 'stat-info', 'text-info');


 // Importer les données de point de jsutice
L.geoJSON(point_justice, {
    pointToLayer: function (feature, latlng) {
        const marker = L.circleMarker(latlng, geojsonMarkerOptions).addTo(map);

        // Ajouter un bouton pour afficher ou masquer le l'onglet info
        marker.on('click', function () {
            const dialog = document.getElementById('info');
            if (!dialog.open) {
                dialog.show(); 
            }
        });

        return marker;
    }
}).addTo(map);

// Fermer le dialogue lorsque le bouton est cliqué
document.getElementById('close-dialog').addEventListener('click', function() {
    const dialog = document.getElementById('info');
    if (dialog.open) {
        dialog.close();
    }
});