let thrillerClickCount=0;
let HorrorClickCount = 0;

function onLoad(){
    $("#thriller_four").hide();
    $("#thriller_five").hide();
    $("#thriller_six").hide();
    $("#thriller_seven").hide();

    $("#Horror_four").hide();
    $("#Horror_five").hide();
    $("#Horror_six").hide();
    $("#Horror_seven").hide();
}

//======== Start Swap method ========================

let swapMovie = (variable, clickCount)=>{
    if(clickCount === 1){
        $("#" + variable + "_one").hide();
        $("#" + variable + "_two").hide();
        $("#" + variable + "_three").hide();

        $("#" + variable + "_four").show();
        $("#" + variable + "_five").show();
        $("#" + variable + "_six").show();

    }else if(clickCount===2){
        $("#" + variable + "_four").hide();
        $("#" + variable + "_five").hide();
        $("#" + variable + "_six").hide();

        $("#" + variable + "_seven").show();
    }else{
        $("#" + variable + "_seven").hide();
        $("#" + variable + "_one").show();
        $("#" + variable + "_two").show();
        $("#" + variable + "_three").show();
        thrillerClickCount=0;
        HorrorClickCount=0;
    }
}

let btnThrillerNextTab = document.getElementById("thriller");
let btnHorrorNextTab = document.getElementById("Horror");

btnThrillerNextTab.addEventListener("click", (e)=>{
    thrillerClickCount++;
    let variable = e.target.id;
    swapMovie(variable, thrillerClickCount);
});

btnHorrorNextTab.addEventListener("click", (e)=>{
    HorrorClickCount++;
    let variable = e.target.id;
    swapMovie(variable, HorrorClickCount);
});

//======== End Swap method ========================

//============= Click Movie =======================

let items= $(".box");
items.click((e)=>{
    let id = e.target.id;
    sessionStorage.setItem("clickedBox", `${id}`);

    fetch("/movies", {
        method: "GET",
        headers:{
            "Content-Type":"text/html"
        }
    }).then(response=>{
        if(response.ok){
            window.location.href="movies.html";
        }
    })
    .catch(error=> console.log(error.message));
});




