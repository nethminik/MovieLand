let dashBoardLoad=()=>{
    $(".movieUpdateClass").hide();
    $(".tvSeriesUpdateClass").hide();
    $(".searchIdClass").hide();
    $(".answer-box").hide();
}

let uploadBtnClick=()=>{
    $("#uploadMovie").click(()=>{
        $(".movieUpdateClass").show();
        $(".tvSeriesUpdateClass").hide();
        $(".searchIdClass").hide();
        $(".btn-box2").css("border", "none");
    });
}

let uploadTvSeries=()=>{
    $("#uploadSeries").click(()=>{
        $(".movieUpdateClass").hide();
        $(".searchIdClass").hide();
        $(".tvSeriesUpdateClass").show().css("height", "550px");
        $(".btn-box2").css({"border":"none",
            "margin-top":"0",
            "height":"600px"
        });
    });
}

let searchID = ()=>{
    $("#searchID").click(()=>{
        $(".searchIdClass").show();
        $(".tvSeriesUpdateClass").hide();
        $(".movieUpdateClass").hide();
        $(".btn-box2").css("border","none")
    });
}

//===================  Search an ID =============================

let searchIdBtnClick = document.getElementById("searchIDBtn");
searchIdBtnClick.addEventListener("click", ()=> {

    async function searchID() {
        const searchedName = document.getElementById("SearchName").value;

        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"name": searchedName})
        };

        try {
            $(".answer-box").show();
            $(".searchIdClass").css({"height":"400px", "width":"60%"});
            const response = await fetch("/dashboard/searchID", request);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data received:", data);
            // Handle the received data here
            if (data.length === 0) {
                document.querySelector(".answer-box").textContent = "Sorry, Not Found";
            } else {
                document.querySelector(".answer-box").textContent = JSON.stringify(data, null, 2);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            // Handle fetch error
            document.querySelector(".answer-box").textContent = "Sorry Not Found";
        }
    }
searchID();
});


