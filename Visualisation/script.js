
var nbMots = 153345, // T
    nbDocuments = 1500, // T
    nbMotsSansStopwords = 110921, // T
    nbMotsLemmes = 20000, // F
    nbMotsUniques = 53000, // F
    nbDocumentsPositifs = 300,
    nbDocumentsNeutres = 700,
    nbDocumentsNegatifs = 500;

var motsSpeciauxLargeur = 150,
    motsSpeciauxHauteur = 150,
    motsSpeciauxRadius = Math.min(motsSpeciauxLargeur, motsSpeciauxHauteur) / 2;

var documentsValuesLargeur = 250,
    documentsValuesHauteur = 250,
    documentsValuesRadius = Math.min(documentsValuesLargeur, documentsValuesHauteur) / 2;
    
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d; });

var nbMots,
    nbDocuments;

var nbMotsSansStopwords;
var nbMotsLemmes;
var nbMotsUniques;

var pourcentageMotsSansStopwords;
var pourcentageMotsLemmes;
var pourcentageMotsUniques;

var nbDocumentsPositifs;
var nbDocumentsNeutres;
var nbDocumentsNegatifs;

var pourcentageMotsPositifs;
var pourcentageDocumentsNeutres;
var pourcentageDocumentsNegatifs;

function calculPourcentageParMots(nbMotsSpeciaux) {
    return nbMotsSpeciaux * 100 / nbMots;
};

function calculPourcentageParDocuments(nbDocumentsSpeciaux) {
    return nbDocumentsSpeciaux * 100 / nbDocuments;
};

function arrondi(number) {
    return Math.round(number*100)/100;
};

function creerDiagrammeMotsSpeciaux(racine, value, name) {
    var color = d3.scale.ordinal()
        .range(["#ff8c00", "#FFE3BF"]);
    var arc = d3.svg.arc()
        .outerRadius(motsSpeciauxRadius - 10)
        .innerRadius(0);

    var svg = racine.append("svg")
        .attr("width", motsSpeciauxLargeur)
        .attr("height", motsSpeciauxHauteur)
        .append("g")
        .attr("transform", "translate(" + (motsSpeciauxLargeur / 2) + "," + (motsSpeciauxHauteur / 2) + ")");

    var g = svg.selectAll(".arc")
        .data(pie([arrondi(value), 100 - arrondi(value)]))
        .enter()
        .append("g")
        .attr("class", "arc");
        
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data); });
        
    svg.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(arrondi(value) + "%")
        .attr("class", "motSpecialPourcentage");

    var name = racine.append("div")
        .text(name)
        .attr("class", "motSpecialName");
};

// Ordre : Positifs, Neutres, Négatifs
function creerDiagrammeDocumentsValues() {
    var racine = d3.select(".documentsValues");
    var color = d3.scale.ordinal()
        .range(["#25BD0D", "#CBCBCB", "#FD1515"]);
    var arc = d3.svg.arc()
        .outerRadius(documentsValuesRadius - 10)
        .innerRadius(0);

    var svg = racine.append("svg")
        .attr("width", documentsValuesLargeur)
        .attr("height", documentsValuesHauteur)
        .append("g")
        .attr("transform", "translate(" + (documentsValuesLargeur / 2) + "," + (documentsValuesHauteur / 2) + ")");
    var g = svg.selectAll(".arc")
        .data(pie([pourcentageDocumentsPositifs, pourcentageDocumentsNeutres, pourcentageDocumentsNegatifs]))
        .enter()
        .append("g")
        .attr("class", "arc");
        
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data); });
        
    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return arrondi(d.data) + "%"; });

    var name = racine.append("div")
        .text("Classes de documents")
        .attr("class", "motSpecialName");
};

/**
 * Fonction principale
 */
function init() {
    nbMots = 153345; // T
    nbDocuments = 1500; // T
    nbMotsSansStopwords = 110921; // T
    nbMotsLemmes = 20000; // F
    nbMotsUniques = 53000; // F
    nbDocumentsPositifs = 300;
    nbDocumentsNeutres = 700;
    nbDocumentsNegatifs = 500;
    // Nb d'attributs : 12407
    
    // Calcul des pourcentages
    pourcentageMotsSansStopwords = calculPourcentageParMots(nbMotsSansStopwords);
    pourcentageMotsLemmes = calculPourcentageParMots(nbMotsLemmes);
    pourcentageMotsUniques = calculPourcentageParMots(nbMotsUniques);
    pourcentageDocumentsPositifs = calculPourcentageParDocuments(nbDocumentsPositifs);
    pourcentageDocumentsNeutres = calculPourcentageParDocuments(nbDocumentsNeutres);
    pourcentageDocumentsNegatifs = calculPourcentageParDocuments(nbDocumentsNegatifs);
    
    // Affichage du nombre total de mots
    d3.select('.totalMots').text('Nombre total de mots : ' + nbMots);
    // Affichage du nombre total de documents
    d3.select('.totalDocuments').text('Nombre total de documents : ' + nbDocuments);
    
    // Création des diagrammes de mots spéciaux
    creerDiagrammeMotsSpeciaux(d3.select(".motsSansStopwords"), pourcentageMotsSansStopwords, "Mots sans StopWords");
    creerDiagrammeMotsSpeciaux(d3.select(".motsLemmes"), pourcentageMotsLemmes, "Mots lemmes");
    creerDiagrammeMotsSpeciaux(d3.select(".motsUniques"), pourcentageMotsUniques, "Mots uniques");
    
    // Création du diagramme des mots valués
    creerDiagrammeDocumentsValues();
};
