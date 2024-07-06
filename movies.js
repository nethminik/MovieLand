//===================  Search an ID =============================

window.addEventListener("load", ()=> {

    const filmsArr= [{}];
    const seriesArr = [{
        "id":"1f1NQ9fjRuMpmozx_9Bjg0yPp3uQOrgM-",
        "name":"9-1-1.S01E01.Pilot.720p.WEBRip.2CH.x265.HEVC-PSA.mkv"
    }];

    async function getData(){
        let movieID = sessionStorage.getItem("clickedBox");
        if(movieID){
            console.log(movieID);
        }else{
            console.log("Error")
        }
    }
});