bouton_jouer.onclick = function () {
//-------------------------------------------------------------//
//                      constantes                             //
//-------------------------------------------------------------//

const jeu = document.getElementById("canvas_jeu");
const contexte = jeu.getContext("2d");
const NB_COLONNES = 10;
const NB_LIGNES = 20;
const NB_MIN_ROTATION = 0;
const NB_MAX_ROTATION = 4;
const TAILLE_CARRE = 20;//20 pixels

const NB_TETROMINOS = 7;
const X_INIT=4;
const Y_INIT=0;
const X_MAX = NB_COLONNES;
const X_MIN = 0;
const Y_MAX = NB_LIGNES-1;
const OCCUPEE = 2;
const TETROMINO = 1;
const LIBRE = 0;



//****************COULEURS DES FIGURES********************/
const noir = "#203d3f"
const gris ="#8d837a"
const cyan = "#00FFFF";
const vert = "#008000";
const orange ="#FFA500";
const bleu ="#0000FF";
const jaune ="#FFFF00";
const violet ="#EE82EE";
const rouge ="#FF0000";
const argent = "silver"
const TETROMINOS_COLOR = [cyan,vert,orange,bleu,jaune,violet,rouge];


//****************FIGURES ********************/
const I = [	[
        [0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];
const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];
const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];
const O = [
	[

		[ 1, 1],
		[ 1, 1],
	
	],
    [

		[ 1, 1],
		[ 1, 1],
	
	],
    [

		[ 1, 1],
		[ 1, 1],
	
	],
    [

		[ 1, 1],
		[ 1, 1],
	
	]
];
const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	]

];
const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];
const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	]
];
const TETROMINOS = [I,Z,J,L,O,T,S];
//-------------------------------------------------------------//
//                       variables                             //
//-------------------------------------------------------------//

var tetromino;
var type_tetromino;
var couleur_tetromino;
var rotation_tetromino;
var x_tetromino;
var y_tetromino;


//-------------------------------------------------------------//
//                      déplacements                           //
//-------------------------------------------------------------//
function deplacer(){
    var key_code=window.event.keyCode;
	if(key_code === 38){
		rotater() 
	}
	if(key_code === 37){	
		deplacerAGauche(); 		
	}
	if(key_code === 39){
		deplacerADroite();		
	}
	if(key_code === 40){
		deplacerEnBas();
        ajouterPoints(1);
	}



}

function deplacerAGauche(){
    x = x_tetromino - 1;
    y = y_tetromino ;
    if((!collision(x,y))&(!collisionGauche())){
        effacerTetromino();
        x_tetromino = x;
        dessinerTetromino();
    }
}

function deplacerADroite(){
    x = x_tetromino + 1;
    y = y_tetromino ;
    if((!collision(x,y))&(!collisionDroite())){
        effacerTetromino();
        x_tetromino = x;
        dessinerTetromino();

    }
}

function deplacerEnBas(){
    
    x = x_tetromino ;
    y = y_tetromino + 1;
    if(!collision(x,y)){
        effacerTetromino();
        y_tetromino = y;
        dessinerTetromino();
        toucheDerniereLigne();
    
    }
    else{
        stopTetromino();
    } 
    
}



function rotater(){
     /**
     * tourne le tetromino et le dessine
     */
    if(!collisionRotation()){
        rotation_tetromino++;
        if(rotation_tetromino==NB_MAX_ROTATION){
            rotation_tetromino = NB_MIN_ROTATION;
        }
        effacerTetromino();
        tetromino = type_tetromino[rotation_tetromino];
        dessinerTetromino();
    }else{
       console.log("ICICICICICICI");
      //  stopTetromino();
    }
}

function collision(x,y){
     /**
     * retourne si il y'a une collision 
     */
    res = false;
    tailleTetromino = tetromino.length;
        for(ligne=0;ligne<tailleTetromino;ligne++){
        for(colonne=0;colonne<tailleTetromino;colonne++){
            if (tetromino[ligne][colonne] == TETROMINO){
				if ((grille[ligne+y][colonne+x] != LIBRE)&(grille[ligne+y][colonne+x] !=TETROMINO)){
					res = true;
				} 
            }     	
	    }	
    }
    return res;
}

function collisionGauche(){
    
    somme = x_tetromino+getColonneVideAGauche()-1;
  
    if((somme)<0){
        return true;
    }
    return false;
}

function collisionDroite(){

    somme = x_tetromino+tetromino.length-getColonneVideADroite();

    if((somme)>=NB_COLONNES){
        return true;
    }
    return false;
}



function collisionRotation(){
    /**
     * retourne si il y'a une collision en simulant la rotation 
     */
    res = false;
    r = rotation_tetromino+1;
    tailleTetromino = tetromino.length;
	if(r==NB_MAX_ROTATION){
		r = NB_MIN_ROTATION;
	}
	tetrominoR = type_tetromino[r];	

	for(ligne=0;ligne<tailleTetromino;ligne++){
        for(colonne=0;colonne<tailleTetromino;colonne++){
            if (tetrominoR[ligne][colonne] == TETROMINO){
                if ((grille[ligne+y_tetromino][colonne+x_tetromino] != LIBRE)&(grille[ligne+y_tetromino][colonne+x_tetromino] != TETROMINO)){
                    res = true;			
                } 
            }			
        } 
    }
    return res;
}

function stopTetromino(){
    /**
     * stop le tetromino actuel et le change 
     */
     tailleTetromino = tetromino.length;
     for(ligne=0;ligne<tailleTetromino;ligne++){
        for(colonne=0;colonne<tailleTetromino;colonne++){
            if (tetromino[ligne][colonne] == TETROMINO){              	
				grille[ligne+y_tetromino][colonne+x_tetromino] = couleur_tetromino;
            } 
    	}
	}
    majGrille();
    ligneComplete();
    if(touchePlafond()){
        finJeu();
    }else{
        setTetromino();
    }
		

}

//-------------------------------------------------------------//
//                        graphiques                           //
//-------------------------------------------------------------//


function dessinerCarre(x,y,couleurForme,couleurContour=noir){
    /**
     * dessine un carré 
     * @param x [coordonnée abscisse du carré]
     * @param y [coordonnée ordonnée du carré]
     * @param couleurForme [couleur du carré]
     * @param couleurContour [couleur du contour du carré,par défaut il est noir]
     */
    contexte.fillStyle=couleurForme;
    contexte.fillRect(x*TAILLE_CARRE,y*TAILLE_CARRE,TAILLE_CARRE,TAILLE_CARRE);
    contexte.strokeSyle =couleurContour;
    contexte.strokeRect(x*TAILLE_CARRE,y*TAILLE_CARRE,TAILLE_CARRE,TAILLE_CARRE);
}

function dessinerTetromino(){
     /**
     * dessine un tetromino 
     */
      tailleTetromino = tetromino.length;
      for(ligne=0;ligne<tailleTetromino;ligne++){
        for(colonne=0;colonne<tailleTetromino;colonne++){
            if (tetromino[ligne][colonne] == TETROMINO){
                abscisse = colonne + x_tetromino;
                ordonnee = ligne + y_tetromino;
                dessinerCarre(abscisse,ordonnee,couleur_tetromino);
				grille[ordonnee][abscisse]=TETROMINO;
            } 
  		 }
  	}


}

function effacerTetromino(){
    /**
     * efface un tetromino (pour les animations)
     */
     tailleTetromino = tetromino.length;
     for(ligne=0;ligne<tailleTetromino;ligne++){
       for(colonne=0;colonne<tailleTetromino;colonne++){
           if (tetromino[ligne][colonne] == TETROMINO){
               abscisse = colonne + x_tetromino;
               ordonnee = ligne + y_tetromino;
               dessinerCarre(abscisse,ordonnee,noir);
               grille[ordonnee][abscisse]=LIBRE;
           } 
          }
     }

}

function effacerLigne(ligneAEffacer){
    /**
     * met à jour la valeur de la grille à libre
     * @param ligneAEffacer [la ligne que l'on efface]
     */
    for(colonne=0;colonne<NB_COLONNES;colonne++){
		grille[ligneAEffacer][colonne]=LIBRE;
	//	dessiner(colonne,num_ligne,noir);	
	}
}

function descendreLignes(ligneEffacee){
    /**
     * descend toutes les lignes au dessus de ligneEffacee
     * @param ligneEffacee [la ligne à partir de laquelle on décale les lignes]
     */
    for(ligne=ligneEffacee;ligne>0;ligne--){
        for(colonne=0;colonne<NB_COLONNES;colonne++){

        grille[ligne][colonne]=grille[ligne-1][colonne];
  
        }
    }
   
}

function majGrille(){
    /**
     * met à jour à grille selon ses valeurs
     */
    for(ligne=0;ligne<NB_LIGNES;ligne++){
        for(colonne=0;colonne<NB_COLONNES;colonne++){
            carre = grille[ligne][colonne];
            if(carre == LIBRE){
              dessinerCarre(colonne,ligne,noir,gris);   
            } 
            else if(carre != TETROMINO ){
                dessinerCarre(colonne,ligne,grille[ligne][colonne]);   
            }
            
        }
    }
}

//-------------------------------------------------------------//
//                   initialisation du jeu                     //
//-------------------------------------------------------------//
function setTetromino(){
    /**
     * initialise un tetromino au hasard, première rotation
     * et le dessine
     */

    let numero =  Math.floor(Math.random() * (NB_TETROMINOS-1));
	type_tetromino = TETROMINOS[numero];
	couleur_tetromino = TETROMINOS_COLOR[numero];
	rotation_tetromino = NB_MIN_ROTATION;
	tetromino = type_tetromino[rotation_tetromino];
	x_tetromino=X_INIT;
	y_tetromino=Y_INIT;
	dessinerTetromino();

}



function setGrille(){
    /**
     * initialise la grille du jeu selon le nombre de lignes 
     * et de colonnes, toutes les cases sont LIBRE
     * dessine la grille
     */
     grille=[];
     for(ligne=0;ligne<NB_LIGNES;ligne++){
         grille[ligne]=[]
         for(colonne=0;colonne<NB_COLONNES;colonne++){
             grille[ligne][colonne] = LIBRE; 
             dessinerCarre(colonne,ligne,noir,gris);   
            }
     }
     return grille;
}

//-------------------------------------------------------------//
//                    gestion du jeu                           //
//-------------------------------------------------------------//

function ligneComplete(){
    /**
     * Vérifie si il y' a une ou des lignes complètes
     * et met à jour la grille
     */
    
	for(ligne=NB_LIGNES-1;ligne>0;ligne--){
        somme = 0;
        for(colonne=0;colonne<NB_COLONNES;colonne++){
            if(grille[ligne][colonne]!= LIBRE){
                somme += OCCUPEE ;    
            }
            
   		}
        if (somme==NB_COLONNES*2){ //20
			effacerLigne(ligne);
            descendreLignes(ligne);
            majGrille();
            ajouterLigne();
            ajouterPoints(100);
 
		}
	
    }
    
}

function touchePlafond(){
    res = false;
	for(colonne=0;colonne<NB_COLONNES;colonne++){
		if((grille[0][colonne] != LIBRE)&(grille[0][colonne]!= TETROMINO)){
		   res = true;          
		}
	}
    return res;
}

function  toucheDerniereLigne(){
	for(colonne=0;colonne<NB_COLONNES;colonne++){
		if(grille[NB_LIGNES-1][colonne] == TETROMINO){
		   stopTetromino();            
		}
	}
}

function getColonneVideAGauche(){
    res=0;
    somme=0;
    somme2=0;
    tailleTetromino = tetromino.length;
    for(ligne=0;ligne<tailleTetromino;ligne++){       
        if((tetromino[ligne][0])!=TETROMINO){
            somme++;
        }  
         if ((tetromino[ligne][1])!=TETROMINO){
            somme2++;
        }   
    }
    
    if(somme==tailleTetromino){
        res=1;
        if(somme2==tailleTetromino){
        res=2;
        }
    }
    

    return res;
}

function getColonneVideADroite(){
    res=0;
    somme=0;
    somme2=0;
    tailleTetromino = tetromino.length;
    for(ligne=0;ligne<tailleTetromino;ligne++){       
        if((tetromino[ligne][tailleTetromino-1])!=TETROMINO){
            somme++;
        }  
    }
    
    if(somme==tailleTetromino){
        res=1;
    }
    

    return res;
}


function ajouterPoints(nombre){
    points=points+nombre; 
    document.getElementById("points").innerHTML= points;
        
}

function ajouterLigne(){
    lignesCompletes++;
    document.getElementById("lignes").innerHTML= lignesCompletes;
}




function finJeu(){
    var tenure = prompt("FIN DU JEU");
    alert(tenure);
   
}

bouton_jouer.style.opacity = 0;
var audio = new Audio('tetris.mp3');
audio.play();
window.addEventListener('keydown', deplacer);
points=0;
lignesCompletes=0;
niveau = 1;
vitesse = 1000;
setGrille();
setTetromino();
timer = setInterval(deplacerEnBas,vitesse);


}