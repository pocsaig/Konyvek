//GET



function main() {
    fetch("http://localhost:5000/konyv")
    .then(function (adat) {
        return adat.json()
    })
    .then(function (data) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            document.getElementById("GET").innerHTML += `
                <div class="card" style="width: 19rem; opacity: 80%;">
                    <div class="card-body">
                        <h6 style="text-align: center;" class="card-title">Könyv neve: ${data[i].nev}</h6>
                        <h4 style="text-align: center;" class="card-title"> Kiadás éve: ${data[i].kiadasEve}</h4>
                        <h6 style="text-align: center;" class="card-title">Könyv értékelése: ${data[i].ertekeles}</h6>
                        <img src="${data[i].kepneve}" onclick="idk(${data[i].id})" class="card-title img-fluid"></img>  
                        <div id="ikonok" style="text-align: center;">
                            <button class="btn" onclick="Edit(${data[i].id})"><i class="bi bi-pencil"></i></button>
                            <button class="btn" onclick="Delete(${data[i].id})"><i class="bi bi-trash3"></i></button>
                        </div>    
                        
                    </div>
                </div>`
        }
    })
}




//GET ID
function idk(id) {
    
    fetch(`http://localhost:5000/konyv/${id}`)
.then(function (adat) {
    return adat.json()
})
.then(function (data) {
    console.log(data)
        document.getElementById("GET").innerHTML = `
        <div class="card" style="width: 19rem; opacity: 80%;">
            <div class="card-body">
                <h6 style="text-align: center;" class="card-title">Könyv neve: ${data.nev}</h6>
                <h4 style="text-align: center;" class="card-title"> Kiadás éve: ${data.kiadasEve}</h4>
                <h6 style="text-align: center;" class="card-title">Könyv értékelése: ${data.ertekeles}</h6>
                <img src="${data.kepneve}" onclick="idk(${data.id})" class="card-title img-fluid"></img>  
                <div id="ikonok" style="text-align: center;">
                    <button class="btn"><i class="bi bi-pencil"></i></button>
                    <button class="btn" onclick="Delete(${data.id})"><i class="bi bi-trash3"></i></button>
                </div>    
                    
            </div>
        </div>`
})
}

//POST
function ujkonyv() {
    document.getElementById("GET").innerHTML = `
    <label>Könyv neve:</label>
    <input type="text" id="neve">
    <br>
    <label>Kiadás éve:</label>
    <input type="number" id="kiadasEve">
    <br>
    <label>Értékelése:</label>
    <input type="number" id="ertekeles">
    <br>
    <label>Kép:</label>
    <input type="text" id="url">
    <br>
    <button onclick="POST(${1})" class="btn btn-primary">Mentés</button>
    `
}

function POST(id) {
    let BodyForPost = {
        id: id,
        neve: document.getElementById("neve").value,
        kiadasEve: Number(document.getElementById("kiadasEve").value),
        ertekeles: Number(document.getElementById("ertekeles").value),
        kepneve: document.getElementById("url").value
    }
    fetch("http://localhost:5000/konyv", {
        method: "POST",
        body: JSON.stringify(BodyForPost),
        headers: {
            "content-type" : "application/json"
        }
    })
    .then(() => {
        location.reload();
    })
}




function Edit(id) {
    document.getElementById(`GET`).innerHTML=""
    let szerkeszt = document.getElementById('modosit');
    szerkeszt.style.display = 'block';

        fetch(`http://localhost:5000/Konyv/${id}`)
        .then(function(datas) {
            return datas.json();
        })
        .then(function(data) {
            document.getElementById('megadnev').value = data.nev;
            document.getElementById('megadev').value = data.kiadasEve;
            document.getElementById('megadertekeles').value = data.ertekeles;
            document.getElementById('megadimg').value = data.kepneve;
        })
        .catch(error => {
            console.error('Hiba történt a kérés során:', error);
            alert('Hiba történt az adatok lekérése közben.');
        });

    document.getElementById('Modositfinal').addEventListener('click', () => {
        let bodyforput = JSON.stringify({
            id: Number(id),
            nev: document.getElementById('megadnev').value,
            kiadasEve: Number(document.getElementById('megadev').value),
            ertekeles: Number(document.getElementById('megadertekeles').value),
            kepneve: document.getElementById('megadimg').value
        });

        fetch(`http://localhost:5000/Konyv/`+id, {
            method: "PUT",
            body: bodyforput,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.error('Hiba történt a módosítás során:', error);
            alert('Hiba történt a módosítás során.');
        });
    });

    document.getElementById('Modositback').addEventListener('click', () => {
        document.getElementById('modosit').style.display = 'none';
    });
}


function Delete(id) {
    if(confirm("Biztosan törlöd?")) {
      fetch("http://localhost:5000/Konyv/"+id, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function() {
          location.reload()
        })
        .catch(error => {
            console.error('Hiba történt a kérés során:', error);
            alert('Hiba történt az adatok lekérése közben.');
        });
    }
}



main();