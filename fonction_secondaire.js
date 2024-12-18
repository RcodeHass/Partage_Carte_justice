// =====================================================================
// ===============        Autre fonction accessoire      ===============
// =====================================================================

// Fonction qui vas gérer l'ouverture et la fermeture des onglets 
const dialogs = [
    document.getElementById('view-date'),
    document.getElementById('view_description'),
    document.getElementById('view-list'),
    document.getElementById('view-filtre'),
    document.getElementById('full-description'),
    document.getElementById('dev-descrition'),
    document.getElementById('reduit-descrition'),
    document.getElementById('view-apropos')
];

// Gerer les exceptions
let exceptions = [
    document.getElementById('view-list'),
];

// Ouvrir
document.getElementById('date-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[0]));
document.getElementById('desc-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[1]));
document.getElementById('list-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[2], exceptions));
document.getElementById('filtre-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[3]));
document.getElementById('fulldesc-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[4]));
document.getElementById('dev-descrition').addEventListener('click', () => toggleDialog(dialogs, dialogs[4]));
document.getElementById('reduit-descrition').addEventListener('click', () => toggleDialog(dialogs, dialogs[1]));
document.getElementById('apropos-switch').addEventListener('click', () => toggleDialog(dialogs, dialogs[7]));
// Fermer toutes les fenêtres
const closeButtons = document.getElementsByClassName('close-button');

Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', () => {
        dialogs.forEach(dialog => {
            if (dialog) {
                dialog.removeAttribute('open');
            }
        });
    });
});





const addMarkerToMap = ({ latitude, longitude, pratique, domaine, id}, map) => {
        
    const iconUrl = getIconUrl(domaine); // Personaliser les marqueur 
    const icone = L.icon ({
        iconUrl: iconUrl,
        iconSize: [20, 35],
        iconAnchor: [10, 35],
        popupAnchor: [0, -35]
        
    });

    const marker = L.marker([latitude, longitude], { icon: icone }).bindPopup(pratique);
    markerGroup.addLayer(marker);

    marker.on('click', function () {
        const ensemble = DataComplexe.find(ens => ens.id === id);
        const cotes_ecrit = DataCotes.find(cot => cot.id_cote === id && cot.types === 'D');
        const cotes_icono = DataCotes.find(cot => cot.id_cote === id && cot.types === 'I');
        const cotes_plan = DataCotes.find(cot => cot.id_cote === id && cot.types === 'P');
        const descriptionText = ensemble ? ensemble.description : 'Non disponible';

        const image_0 = DataImages.find(img => img.id_image === id && img.num === 1)
        const image_1 = DataImages.find(img => img.id_image === id && img.num === 1)
        const image_2 = DataImages.find(img => img.id_image === id && img.num === 2)
        const image_3 = DataImages.find(img => img.id_image === id && img.num === 3)
        const image_4 = DataImages.find(img => img.id_image === id && img.num === 4)
        const image_5 = DataImages.find(img => img.id_image === id && img.num === 5)

        document.getElementById('titre-description').innerHTML = ensemble ? ensemble.name : 'Non disponible';
        document.getElementById('texte-description').innerHTML = descriptionText? truncateText(descriptionText, 150):'Données indisponibles';
        document.getElementById('description').innerHTML = ensemble ? (ensemble.description): 'Non disponible';
        document.getElementById('titre').innerHTML = ensemble ? ensemble.name :  'Non disponible';
        document.getElementById('addresse').innerHTML = ensemble ? ensemble.adresse :  'Non disponible';
        document.getElementById('docs_event').innerHTML = ensemble ? (ensemble.event) :  'Non disponible';
        document.getElementById('docs_ecrit').innerHTML = cotes_ecrit ? (cotes_ecrit.description_c): 'Non disponible';
        document.getElementById('docs_icono').innerHTML = cotes_icono ? (cotes_icono.description_c): 'Non disponible';
        document.getElementById('docs_plan').innerHTML = cotes_plan ? (cotes_plan.description_c): 'Non disponible';

        updateImageAppercu('id_img0', 'lien_img0', image_0);
        updateImage('id_img1', 'lien_img1', image_1);
        updateImage('id_img2', 'lien_img2', image_2);
        updateImage('id_img3', 'lien_img3', image_3);
        updateImage('id_img4', 'lien_img4', image_4);
        updateImage('id_img5', 'lien_img5', image_5);
        
        // Vérifiez si fulldesc-switch est déjà ouvert
        const fullDescSwitch = document.getElementById('full-description');
        if (!fullDescSwitch || !fullDescSwitch.hasAttribute('open')) {
            document.getElementById('view_description').setAttribute('open', true);
        }
    });
    // marker.description = pratique; 
    return marker;
};