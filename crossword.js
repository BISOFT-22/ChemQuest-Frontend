let cellsCollection = document.getElementsByClassName("txtChar");
let txtConsole = document.getElementById("txtConsole");
let txtFilter = document.getElementById("filter");
let wordLog = document.getElementById("wordLog");

//Lista de palabras utilizadas
let wordsSet = new Set();
let UsedWordsSet = new Set();
let crossSize = 10;
let blockChar = "@";
let positionMethod = 0; //Determina el metodo a usar para obtener la celda para probar las palabras
let filledCells = 0;    //Cantidad de celdas con letras o blockChar
let totalIterations = 0;

// Direccion inicial para colocar palabras
let currentDirection = 0;

let crossWord = new Array();



const crossWordCollection = [
    ["E", "U", "R", "O", "P", "I", "O", "@", "B", "@", "S", "@", "@", "@", "@", "@", "@", "@", "R", "@", "C", "@", "H", "@", "B", "A", "R", "I", "O", "@", "A", "@", "A", "@", "I", "@", "@", "@", "M", "@", "N", "@", "F", "O", "S", "F", "O", "R", "O", "@", "D", "@", "N", "@", "M", "@", "@", "@", "@", "T", "I", "@", "I", "@", "U", "R", "A", "N", "I", "O", "O", "R", "O", "@", "T", "@", "@", "@", "@", "R", "@", "@", "@", "@", "O", "@", "@", "@", "@", "I", "Z", "I", "N", "C", "@", "C", "L", "O", "R", "O"],
    ["A","@","","","","","","","","","R","E","","","","","","","","","G","S","","","","","","","","","O","T","@","T","I","T","A","N","I","O","N","R","","@","","","","","","","@","O","","R","@","T","O","R","I","O","","N","","A","","","","","","","","C","","D","","@","Z","I","N","C","","I","","O","@","P","L","O","M","O","","O","","N","@","B","A","R","I","O"],
    ["C", "A", "L", "C", "I", "O", "@", "O", "R", "O", "@", "C", "", "", "", "", "E", "@", "", "", "@", "T", "", "N", "", "", "I", "A", "", "", "B", "I", "", "E", "@", "@", "N", "R", "", "", "I", "N", "@", "O", "D", "I", "S", "S", "@", "", "S", "I", "C", "D", "U", "N", "T", "E", "C", "", "M", "O", "L", "I", "B", "D", "E", "N", "O", "@", "U", "@", "O", "M", "N", "D", "N", "I", "B", "", "T", "", "R", "I", "I", "I", "I", "C", "R", "", "O", "", "O", "O", "O", "O", "O", "O", "E", "",],
    ["","","","","","","","","","B","","","","","","","","","","E","","","","","","","","","","R","@","R","U","T","E","N","I","O","@","K","","","","","","","","","","E","","","","","","","","","","L","","","","","","","","","","I","","","","","","","","","","O","","","","","","","","","","@","","","","","","","","","",""],
    ["O", "X", "I", "G", "E", "N", "O", "@", "@", "@", "R", "@", "@", "A", "@", "I", "@", "@", "@", "@", "G", "@", "@", "L", "U", "T", "E", "C", "I", "O", "A", "@", "@", "I", "@", "R", "@", "U", "@", "@", "N", "@", "@", "O", "R", "O", "@", "R", "@", "@", "E", "@", "Z", "@", "@", "G", "@", "I", "@", "A", "S", "@", "I", "@", "@", "E", "@", "O", "@", "R", "S", "@", "N", "E", "O", "N", "@", "@", "@", "G", "O", "@", "C", "@", "@", "O", "S", "M", "I", "O", "N", "@", "@", "@", "@", "@", "@", "@", "@", "N",]
];

const wordCollection = [
    ["ACTINIO", 7],
    ["ALUMINIO", 8],
    ["AMERICIO", 8],
    ["ANTIMONIO", 9],
    ["ARGON", 5],
    ["ARSENICO", 8],
    ["ASTATO", 6],
    ["AZUFRE", 6],
    ["BARIO", 5],
    ["BERILIO", 7],
    ["BERKELIO", 8],
    ["BISMUTO", 7],
    ["BOHRIO", 6],
    ["BORO", 4],
    ["BROMO", 5],
    ["CADMIO", 6],
    ["CALCIO", 6],
    ["CALIFORNIO", 10],
    ["CARBONO", 7],
    ["CERIO", 5],
    ["CESIO", 5],
    ["CLORO", 5],
    ["COBALTO", 7],
    ["COBRE", 5],
    ["COPERNICIUM", 11],
    ["CROMO", 5],
    ["CURIO", 5],
    ["DARMSTADIO", 10],
    ["DISPROSIO", 9],
    ["DUBNIO", 6],
    ["EINSTENIO", 9],
    ["ERBIO", 5],
    ["ESCANDIO", 8],
    ["ESTAÑO", 6],
    ["ESTRONCIO", 9],
    ["EUROPIO", 7],
    ["FERMIO", 6],
    ["FLEROVIUM", 9],
    ["FLUOR", 5],
    ["FOSFORO", 7],
    ["FRANCIO", 7],
    ["GADOLINIO", 9],
    ["GALIO", 5],
    ["GERMANIO", 8],
    ["HAFNIO", 6],
    ["HASSIO", 6],
    ["HELIO", 5],
    ["HIDROGENO", 9],
    ["HIERRO", 6],
    ["HOLMIO", 6],
    ["INDIO", 5],
    ["IODO", 4],
    ["IRIDIO", 6],
    ["ITERBIO", 7],
    ["ITRIO", 5],
    ["KRYPTON", 7],
    ["LANTANO", 7],
    ["LAWRENCIO", 9],
    ["LITIO", 5],
    ["LIVERMORIUM", 11],
    ["LUTECIO", 7],
    ["MAGNESIO", 8],
    ["MANGANESO", 9],
    ["MEITNERIO", 9],
    ["MENDELEVIO", 10],
    ["MERCURIO", 8],
    ["MOLIBDENO", 9],
    ["MOSCOVIUM", 9],
    ["NEODIMIO", 8],
    ["NEON", 4],
    ["NEPTUNIO", 8],
    ["NIHONIUM", 8],
    ["NIOBIO", 6],
    ["NIQUEL", 6],
    ["NITROGENO", 9],
    ["NOBELIO", 7],
    ["ORGANESSON", 10],
    ["ORO", 3],
    ["OSMIO", 5],
    ["OXIGENO", 7],
    ["PALADIO", 7],
    ["PLATA", 5],
    ["PLATINO", 7],
    ["PLOMO", 5],
    ["PLUTONIO", 8],
    ["POLONIO", 7],
    ["POTASIO", 7],
    ["PRASEODIMIO", 11],
    ["PROMECIO", 8],
    ["PROTACTINIO", 11],
    ["RADIO", 5],
    ["RADON", 5],
    ["RENIO", 5],
    ["RODIO", 5],
    ["ROENTGENIUM", 11],
    ["RUBIDIO", 7],
    ["RUTENIO", 7],
    ["RUTHERFORDIO", 12],
    ["SAMARIO", 7],
    ["SEABORGIO", 9],
    ["SELENIO", 7],
    ["SILICE", 6],
    ["SODIO", 5],
    ["TALIO", 5],
    ["TANTALIO", 8],
    ["TECNECIO", 8],
    ["TELURO", 6],
    ["TENNESSINE", 10],
    ["TERBIO", 6],
    ["TITANIO", 7],
    ["TORIO", 5],
    ["TULIO", 5],
    ["URANIO", 6],
    ["VANADIO", 7],
    ["WOLFRAMIO", 9],
    ["XENON", 5],
    ["ZINC", 4],
    ["ZIRCONIO", 8],
];

//Muestra un array en la consola
// console.table(wordCollection);


function DblClick(e) {
    e.target.value = "";
}



function ClearCrossWord(param) {
    GenerateCrossW();
    for (const c of cellsCollection) {
        c.value = "";
        c.style = "";
        c.parentElement.parentElement.className = "cell";
    }

    filledCells = 0;
    wordLog.innerHTML = "";
}

function DrawCrossWord(params) {

    console.log("Iniciando");

    // RandomCrossWFill();

    let i = 0;
    let j = 0;
    let k = 1;

    for (const c of cellsCollection) {

        c.value = crossWord[i][j];
        c.parentElement.parentElement.children[0].innerHTML = k;

        // console.log(c.value);

        if (c.value === blockChar) {
            c.parentElement.parentElement.className = "blackCell";
            c.style.backgroundColor = "black";
            // c.style.color = "yellow";
        } else {
            c.parentElement.parentElement.className = "cell";
            c.style.backgroundColor = "white";
            // c.style.color = "";
        }

        j++;
        k++;

        if (j == crossSize) {
            j = 0;
            i++;
        }

    }

}

function RandomFill_V0(params) {

    console.log("Iniciando");

    for (const c of cellsCollection) {
        c.value = String.fromCharCode(27 * Math.random() + 64);
        console.log(c.value);

        if (c.value === "@") {
            c.parentElement.parentElement.className = "blackCell";
            c.style.backgroundColor = "black";
            // c.style.color = "yellow";
        } else {
            c.parentElement.parentElement.className = "cell";
            c.style.backgroundColor = "white";
            // c.style.color = "";
        }
    }
}


function RandomCrossWFill(params) {

    console.log("Iniciando");

    for (let i = 0; i < crossSize; i++) {

        for (let j = 0; j < crossSize; j++) {
            crossWord[i][j] = String.fromCharCode(27 * Math.random() + 64);

        }

    }

    console.table(crossWord);

    DrawCrossWord();

}

function ExportCrossW() {
    let str = "[";

    for (const c of cellsCollection) {
        str += '\"' + c.value + '\"' + ",";
    }

    str += "]";
    
    str = str.replace(",]", "]");

    txtConsole.value = str;


}


function LoadCrossWord(e) {

    let i = 0;
    let j = 0;

    let idCrossWord = Number(document.getElementById("cross_id").value);

    crossSize = Math.sqrt(crossWordCollection[idCrossWord].length);
    GenerateCrossW();

    for (const c of crossWordCollection[idCrossWord]) {
        crossWord[i][j] = c;

        j++;

        if (j == crossSize) {
            j = 0;
            i++;
        }
    }

    DrawCrossWord();

}

function GenerateCrossW() {

    //Generar matriz n x n
    crossWord = new Array(crossSize);
    for (let i = 0; i < crossSize; i++) {
        crossWord[i] = new Array(crossSize);

        for (let j = 0; j < crossSize; j++) {
            crossWord[i][j] = "";

        }
    }
}

function FillCrossWord() {
    
    let EmptyCells = 5;
    let totalCells = crossSize * crossSize;
    let str = "";

    totalIterations = 0;
    filledCells = 0;

    for (let index = 0; index < 50; index++) {
        
        if (totalCells - filledCells <= EmptyCells) {
            str = `Existen menos de ${EmptyCells} vacias.`;
            break;
        }
        FillCrossWord_E1();
        
    }

    str += `Iteraciones: ${totalIterations}`;
    DrawCrossWord();
    alert(str);
}

function FillCrossWord_E1() {
    //Primer palabra al asar
    let wordList = new Array();
    // let direction = Math.trunc(2 * Math.random()); // 0 - Vertical 1 - Horizontal
    // let direction = 0;
    
    let direction = currentDirection;

    if (currentDirection == 0) {
        currentDirection = 1;
    } else {
        currentDirection = 0
    }

    /* */
    
    
    let i = 0;
    let j = 0;
    let r = 0;
    let c = 0;
    let I0 = 0;
    let J0 = 0;

    let bPlaced = false;
    let bChangeWord = false;
    let bRepeatedWord = false;
    let iteration = 1;
    let currIndex = 0;
    let currWord = "";

    // Generar la matriz vacia. Descomentar.
    // GenerateCrossW();

    //TODO: Se puede seleccionar el tamaño de las palabras a usar para rellenar.
    //Llenar lista de palabras disponibles.
    for (const c of wordCollection) {
        wordList.push(c[0]);
    }

    while (!bPlaced) {

        if (iteration++ > 500000) {
            // alert("Maximun quantity of iterations reached!");
            break;
        }

        //METODO 1
        //Si la palabra ya se ha usado se busca otra
        while (!bRepeatedWord) {
            
            //Palabra a colocar
            currIndex = Math.trunc(wordList.length * Math.random());
            
            //Seleccionar la palabra para probar
            currWord = /* blockChar + */ wordList[currIndex] /* + blockChar */;
            // console.log(currWord);

            bRepeatedWord = !UsedWordsSet.has(currWord);
            
        }

        //METODO 2
        //Si la palabra ya se ha usado se busca otra
        // while (!bRepeatedWord) {
            
        //     //Palabra a colocar
        //     //currIndex = Math.trunc(wordList.length * Math.random());
            
        //     //Seleccionar la palabra para probar
        //     currWord = /* blockChar + */ wordList[currIndex] /* + blockChar */;
        //     // console.log(currWord);

        //     currIndex++;

        //     bRepeatedWord = !UsedWordsSet.has(currWord);
            
        // }

        switch (positionMethod) {
            case 0:
                //Se empieza a iterar en todas las celdas en orden
                
                if (j + 1 == crossSize) {
                    j = 0;
                    i++;
                } else {
                    j++;
                }

                if (i + 1 == crossSize) {
                    i = 0;
                    j = 0;
                    direction = (direction == 0 ? 1 : 0);
                }

                break;
            case 1:
                //Se determina una posicion aleatoria para inicar la palabra
                i = Math.trunc(crossSize * Math.random());
                j = Math.trunc(crossSize * Math.random());
                break;
            case 2:
                // TODO: Se usan las celdas que ya tengan letras colocdas
                break;
            case 3:
                // TODO: Se usan las celdas que esten vacias
                break;

            default:
                break;
        }
        

        /*PRUEBA 01 -----------------------------------------------------------------------------*/
       
        // direction = 1;
        // currWord = "TECNECIO";
        // i = 2;
        // j = 1;
        
        
        /*PRUEBA 01 - FIN -----------------------------------------------------------------------*/
        
        
        I0 = i;
        J0 = j;
        

        //Verifica que la palabra quepa en las celdas disponibles
        //dependiendo de la direccion de escritura
        if (direction == 0) {
            if ((crossSize-i) < currWord.length) {
                continue;   //Continuar con otra palabra
            }
        } else {
            if ((crossSize-j) < currWord.length) {
                continue;   //Continuar con otra palabra
            }
        }

        //TODO:Verificar que hay espacio disponible para colocar
        //Que pasa si hay una letra colocada en una celda que la palabra si lleva?
        r = i;
        c = j;

        for (const w of currWord) {

            //Verificar las celdas disponibles de las palabras
            if (crossWord[r][c] == "" || crossWord[r][c] == w && crossWord[r][c] != blockChar) {
                //Todo ok --> verificar siguiente letra
            } else {
                bChangeWord = true; //Cambiar de palabra
            }

            if (direction == 0) {
                r++;
            } else {
                c++;
            }
        }

        //Verificar la posicion anterior y posterior de la palabra

        // Direccion vertical
        if (direction == 0) {

            // Posicion anterior
            if (I0 > 0) {
                if (crossWord[I0 - 1][J0] != "" || crossWord[I0 - 1][J0] == blockChar) {
                    bChangeWord = true; //Cambiar de palabra
                }
            }

            // Posicion posterior
            if (I0 + currWord.length < crossSize) {

                if (!(crossWord[I0 + currWord.length][J0] == "" || crossWord[I0 + currWord.length][J0] == blockChar)) {
                    bChangeWord = true; //Cambiar de palabra
                }
            }
        }

        // Direccion horizontal
        if (direction == 1) {

            // Posicion anterior
            if (J0 < crossSize) {
                if (crossWord[I0][J0 - 1] != "" || crossWord[I0][J0 - 1] == blockChar) {
                    bChangeWord = true; //Cambiar de palabra
                }

                // Posicion posterior
                if (J0 + currWord.length < crossSize) {

                    if (crossWord[I0][J0 + currWord.length] != "" || crossWord[I0][J0 + currWord.length] != blockChar) {
                        bChangeWord = true; //Cambiar de palabra
                    }
                }
            }
        }

        if (bChangeWord) {
            bChangeWord = false; //Reiniciar la variable
            continue;   //Continuar con otra palabra
        }


        //Escribe cada letra de la palabra en crossWord
        for (const w of currWord) {
            crossWord[i][j] = w;
            if (direction == 0) {
                i++;
            } else {
                j++;
            }

            filledCells++;
        }

        //Se agrega la palabra colocada a la lista de palabras usadas
        UsedWordsSet.add(currWord);

        // Se agrega el blockChar al inicio y al final si se puede. Para evitar poner palabras que ocupen esos espacios.
        
        //blockChair al inicio de la palabra
        if (direction == 0) {
            if (I0 > 0) {
                crossWord[I0 - 1][J0] = blockChar;
                filledCells++;
            }
            if (i < crossSize) {
                crossWord[i][J0] = blockChar;
                filledCells++;
            }
        } else {
            if (J0 > 0) {
                crossWord[I0][J0 - 1] = blockChar;
                filledCells++;
            }
            if (j < crossSize) {
                crossWord[i][j] = blockChar;
                filledCells++;
            }
        }


        //La palabra se pudo colocar sin cortarse
        bPlaced = true;

        RefreshWordLog(currWord);


        //Si la palabra se pudo colocar se agrega a la lista de palabras usadas.
        wordsSet.add(currWord);
    }

    totalIterations = iteration;


}

function RefreshWordLog(word) {
    wordLog.innerHTML += `<div>${word}</div>`;
}

//Moverse por las celdas usando las flechas
function OnKeyPress(e) {

    let id = parseInt(e.target.id);
    let min = 1;
    let max = crossSize * crossSize;

    switch (e.keyCode) {
        
        //Left
        case 37:
            document.getElementById(id > min ? id - 1 : min).focus();
            // e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].focus();
            break;
        //Up
        case 38:
            document.getElementById(id > crossSize ? id - crossSize : id).focus();
            // e.target.parentElement.parentElement.nextElementSibling.children[1].children[0].focus();
            break;
        //Right
        case 39:
            document.getElementById(id < max ? id + 1 : max).focus();
            // e.target.parentElement.parentElement.nextElementSibling.children[1].children[0].focus();
            break;
        //Down
        case 40:
            document.getElementById(id < max - crossSize ? id + crossSize : id).focus();
            // e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].focus();
            break;
    
        default:
            //document.getElementById(id < max ? id + 1 : max).focus();
            break;
    }
    

}

function ImportCrossW(){
    let str = txtConsole.value;

    //Eliminar [" y ]
    str = str.substring(2, str.length-2);
    let crossArray = str.split('","');

    let i = 0;
    let j = 0;

    crossSize = Math.sqrt(crossArray.length);
    GenerateCrossW();

    for (const c of crossArray) {
        crossWord[i][j] = c;

        j++;

        if (j == crossSize) {
            j = 0;
            i++;
        }
    }

    DrawCrossWord();
}

function FilterWords() {
    let letter = new RegExp(txtFilter.value,"i");
    let str = "";

    for (const c of wordCollection) {
        if (c[0].search(letter) != -1) {
            str += `<div class="hintword">${c[0]}</div>`;
        }
    }

    document.getElementById("wordHints").innerHTML = str;

}

function OnBlur(e) {
    e.target.value = e.target.value.toUpperCase();

    if (e.target.value === blockChar) {
        e.target.parentElement.parentElement.className = "blackCell";
        e.target.style.backgroundColor = "black";
        // c.style.color = "yellow";
    } else {
        e.target.parentElement.parentElement.className = "cell";
        e.target.style.backgroundColor = "white";
        // c.style.color = "";
    }
}

let id = 1;
for (const c of document.getElementsByClassName("txtChar")) {
    c.addEventListener("keydown", OnKeyPress);
    c.addEventListener("dblclick", DblClick);
    c.addEventListener("blur", OnBlur);

    //Asignar ID a cada celda
    c.id = id;
    id++;

}
GenerateCrossW();
FilterWords();
LoadCrossWord(0);
// GenerateCrossW();
// RandomCrossWFill();
// DrawCrossWord();
// FillCrossWord();