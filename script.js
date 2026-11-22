const welcome = document.getElementById("wel")
const instruksi = document.getElementById("ins")
const duniaGame = document.querySelector(".game")
const game = document.getElementById("game")
const hitungMundurr = document.querySelector(".waktu-screenn")

const playGame = document.getElementById("playGame")
const tombolInstruksi = document.getElementById("instruksi")
const tutup = document.getElementById("tutup")


// pilihan gun

function simpanPilihanGun() {
    const gunTerpilih = document.querySelector(".instruksi .gun input[name='gun']:checked")

    if (gunTerpilih) {
        localStorage.setItem("savedGun", gunTerpilih.value)
    }
}

document.querySelectorAll("input[name='gun'], input[name='gunInstruksi']").forEach((gun) => {
    gun.addEventListener("change", () => {
        localStorage.setItem("savedGun", gun.value)
    })
})

function pulihkanPilihanGun() {
    const savedGun = localStorage.getItem("savedGun")
    const gunInstruksi = document.querySelector(`.instruksi .gun input[name='gunInstruksi'][value='${savedGun}']`)

    if (gunInstruksi) {
        gunInstruksi.checked = true
    }
}

// pilihan target

function simpanTarget () {
    const targetTerpilih = document.querySelector(".instruksi .target input[name='target']:checked")

    if (targetTerpilih){
        localStorage.setItem("savedTarget", targetTerpilih.value)
    }
}

document.querySelectorAll("input[name='target'], input[name='targetInstruksi']").forEach((target) =>{
    target.addEventListener("change",()=>{
        localStorage.setItem("savedTarget",target.value)
    })
})

function pulihkanPilihanTarget (){
    const savedTarget =localStorage.getItem("savedTarget")
    const targetInstruksi = document.querySelector(`.instruksi .target input[name='targetInstruksi'][value='${savedTarget}'] `)
    if (targetInstruksi){
        targetInstruksi.checked = true
    }
}

// tombol instruksi

if (tombolInstruksi){


    tombolInstruksi.addEventListener("click", (e)=> {

        const usernameValue = document.getElementById("username").value
        localStorage.setItem("savedUsername" , usernameValue)
        const levelValue = document.getElementById("level").value
        localStorage.setItem("savedLevel", levelValue)
        simpanPilihanGun()
        simpanTarget()
        

        instruksi.style.display = "flex"
        welcome.style.display = "none"

        const usernameInputInstruksi = document.querySelector(".instruksi input[type='text']")
        const levelInputInstruksi = document.querySelector(".instruksi #level")
        if (usernameInputInstruksi){
            usernameInputInstruksi.value = usernameValue
        }
        if(levelInputInstruksi){
            levelInputInstruksi.value = levelValue
        }
        pulihkanPilihanGun()
        pulihkanPilihanTarget()
        
        
    })

}

// tombol close
if (tutup){

    tutup.addEventListener("click", (e) => {
        instruksi.style.display = "none"
        welcome.style.display = "flex   "
    })
}


// hitung mundur
const hitung = document.getElementById("waktu-screen")
function  hitungMundur(){
    let waktu = 3

    hitung.style.display ="flex"
    hitung.innerHTML = waktu

    const timer = setInterval(function(){
        waktu--
        if (waktu >0){
            hitung.innerHTML = waktu
            duniaGame.style
        } else{
            clearInterval(timer)
            hitung.style.display ="none"
            game.style.display = "flex"
            mulaigame()
        }
    },1000)
}

// saat berada diGame
if (playGame){

    playGame.addEventListener("click",(e) =>{

        const usernameValue = document.getElementById("username").value
        const levelValue = document.getElementById("level").value
        const gunTerpilih = document.querySelector(".welcome .gun input[name='gun']:checked")
        const targetTerpilih = document.querySelector(".welcome .target input[name='target']:checked")

        if (!usernameValue){
            alert ("masukkan user dulu!")
            return
        }
        if (!levelValue){
            alert("masukkan level dulu!")
            return
        }
        if (!gunTerpilih){
            alert("isi gun dulu!")
            return
        }
        if (!targetTerpilih){
            alert("isi target!")
            return
        }

        localStorage.setItem("savedUsername",usernameValue)
        localStorage.setItem("savedLevel",levelValue)
        simpanPilihanGun()
        simpanTarget()

        instruksi.style.display = "none"
        welcome.style.display = "none"
        hitung.style.display = "flex"
        hitungMundur()

    })
}


//kode mulaigame
function mulaigame(){
    const nameuser = localStorage.getItem("savedUsername")
    document.getElementById("name").innerHTML =nameuser

    const waktuGame = document.getElementById("waktu")
    let waktuMain = getDurasiWaktu()
    waktuGame.innerHTML = waktuMain
    timerGame = setInterval(function(){
        waktuMain--
        waktuGame.innerHTML =waktuMain
        if  (waktuMain <=0){
            clearInterval(timerGame)
            akhiriGame()
        }

    },1000)

    gunpilih()
    muculkanTaget()
}

//akhiri game
let gameBerakhir = false
const hasil = document.getElementById("dataa")
function akhiriGame(){
    const skorAkhir = parseInt(document.getElementById("score").innerHTML) || 0
    document.getElementById("Score-tinggi").innerHTML = skorAkhir

    hasil.style.display = "flex"
    gameBerakhir = true
}


// Pilihan waktu Level
function getDurasiWaktu(){
    const level = localStorage.getItem("savedLevel")
    switch (level){
        case "level1": return 60
        case "level2": return 30
        case "level3": return 15
    }
}


// gun dan saat digame
let gunElement = null
function gunpilih(){
    const savedGun = localStorage.getItem("savedGun")
    const img = document.createElement("img")

    img.src = `assets/gun${savedGun}.png`
    img.classList.add("gun-aktif")
    img.style.position ="fixed"
    img.style.bottom = "0px"
    img.style.left = "40%"
    img.style.transform ="translateX(-50%)"
    img.style.transformOrigin = "bottom center"


    peralatan.appendChild(img)
    gunElement = img
}


// target dan saat digame

let daftarTarget =[]
const jumlah_target = 3
const peralatan = document.querySelector(".peralatan")

function buatSatuTarget(){
    const savedTarget = localStorage.getItem("savedTarget")
    const img = document.createElement("img")
    
    img.src = `assets/target${savedTarget}.png`
    img.classList.add("target-aktif")
    img.style.position = "absolute"

    posisiAcak(img) 
    peralatan.appendChild(img)

    return img
}

function posisiAcak(img){
    const lebarGame = duniaGame.clientWidth
    const tinggiGame = duniaGame.clientHeight
    const ukuranTarget = 220

    const atas =document.querySelector(".atas")
    const kanan =document.querySelector(".data")
    const bawah = 220
    const batasAtas = atas ? atas.offsetHeight :0
    const batasKanan = kanan ? kanan.offsetWidth :220

    let posY, posX
    let cocok = false
    let percobaan =0

    while (!cocok && percobaan <50){
    posX = Math.random() * (lebarGame - ukuranTarget-batasKanan)
    posY = batasAtas + Math.random() * (tinggiGame - ukuranTarget - batasAtas - bawah)

    cocok =!bertabrakan(posX, posY, ukuranTarget)
    percobaan++
   }

    img.style.left= posX + "px"
    img.style.top = posY + "px"
}

function bertabrakan(posX, posY, ukuranTarget){
    return daftarTarget.some((target) => {
        const targetX = parseFloat(target.style.left)
        const targetY = parseFloat(target.style.top)

        const jarakX = Math.abs(posX - targetX)
        const jarakY = Math.abs(posY - targetY)

        return jarakX < ukuranTarget && jarakY < ukuranTarget
    })
}

function muculkanTaget (){
    for (let i =0; i <jumlah_target; i++){
        const target =  buatSatuTarget()
        daftarTarget.push(target)
    }

}

function cekJumlahTarget() {

    if (daftarTarget.length < jumlah_target) {
        const targetBaru = buatSatuTarget()
        daftarTarget.push(targetBaru)
    }
}

function targetKena (){
    targetKena.remove()
    daftarTarget = daftarTarget.filter(
        (target) => target !== targetKena
    )
    cekJumlahTarget()

}


// score 
function addScore(){
    const scoreText = document.getElementById("score")
    score = parseFloat(scoreText.innerHTML)
    score ++
    scoreText.innerHTML = score
}


// fungsi mouse 

const bidikan = document.getElementById("bidikan")
document.addEventListener("mousemove" ,function(event){
    bidikan.style.left = event.clientX - bidikan.clientWidth/2 + "px"
    bidikan.style.top = event.clientY - bidikan.clientHeight/2+ "px"

    const boom = document.getElementById("boom")
    document.addEventListener("click" ,function(event){

        if(gameBerakhir) return
        boom.style.display= "block"

        boom.style.left = event.clientX - boom.clientWidth/2 + "px"
        boom.style.top = event.clientY - boom.clientHeight/2 + "px"

        setTimeout (function(){
            boom.style.display = "none"
        },500)

        const terkenaTarget = cekTembakan(event.clientX , event.clientY)
        if(terkenaTarget){
            terkenaTarget.remove()
            addScore()

            daftarTarget = daftarTarget.filter((t) => t !== targetKena)

            const targetBaru = buatSatuTarget()
            daftarTarget.push(targetBaru)
        }
    })

    if (gunElement){
        const rect = gunElement.getBoundingClientRect()
        const gunX = rect.left + rect.width / 2
        const gunY = rect.top + rect.height / 2

        
        const dx = event.clientX - gunX
        const dy = event.clientY - gunY
        let sudut = Math.atan2(dy, dx) * (180 / Math.PI)

        sudut += 90

        gunElement.style.transform = `translateX(-50%) rotate(${sudut}deg)`
    }
})

function cekTembakan (x,y){
    return daftarTarget.find((target) =>{
        const rect = target.getBoundingClientRect()
        return(
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        )
    })
}


//tombol simpan
const simpan = document.getElementById("iya")
const tidak = document.getElementById("tidak")

simpan.addEventListener("click", ()=>{
    const scoreAkhir = parseInt(document.getElementById("score").innerHTML)
    const name = localStorage.getItem("savedUsername")

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]")
    leaderboard.push({ nama: name, skor: scoreAkhir })
    leaderboard.sort((a, b) => b.skor - a.skor)
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)))

    // update skor tertinggi kalau memecahkan rekor
    const skorTertinggiTersimpan = parseInt(localStorage.getItem("highScore") || "0")
    if (scoreAkhir > skorTertinggiTersimpan) {
        localStorage.setItem("highScore", scoreAkhir)
        localStorage.setItem("highScoreName", name)
    }
    tampilkanSkorTertinggi()
    tutupPopupSimpan()

})

tidak.addEventListener("click", () => {
    tutupPopupSimpan()
})

function tutupPopupSimpan(){
    document.getElementById("dataa").style.display = "none"
    game.style.display = "none"
    welcome.style.display = "flex"
    gameBerakhir = false

    // bersihkan target & gun, siap untuk permainan berikutnya
    daftarTarget.forEach((t) => t.remove())
    daftarTarget = []
    if (gunElement) {
        gunElement.remove()
        gunElement = null
    }
    document.getElementById("score").innerHTML = 0
}

function tampilkanSkorTertinggi() {
    const skorTertinggi = localStorage.getItem("highScore") || "0"
    const namaTertinggi = localStorage.getItem("highScoreName") || "-"

    document.getElementById("topname").innerHTML = namaTertinggi
    document.getElementById("hight-scoree").innerHTML = skorTertinggi
}

tampilkanSkorTertinggi()