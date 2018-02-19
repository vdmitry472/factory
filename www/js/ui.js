var openedPage=0;
function openPage(pageID) {
    openedPage=pageID;
    $(".list"+pageID).addClass("open");
}

function back()
{
    viewer.showAll();
    
    $(".list"+openedPage).removeClass("open");
    
}
function openModal() {
    $(".modal").addClass("open");
}

function closeModal() {
    $(".modal").removeClass("open");
}


// Line Chart
var salesData = {
  labels: ["21.08.2018", "22.08.2018", "23.08.2018", "24.08.2018", "25.08.2018", "26.08.2018", "27.08.2018"],
  datasets: [
    {
      label: "Продукт #1",
      borderWidth: 2,
      
      backgroundColor: "RGBA(50, 192, 178, 0.2)",
      borderColor: "rgba(50, 192, 178,1)",
      pointColor: "rgba(50, 192, 178, 1)",
      pointStrokeColor: "rgba(50, 192, 178, 1)",
      pointHighlightStroke: "rgba(225,225,225,0.9)",
      data: [3400, 3000, 2500, 4500, 2500, 3400, 3000]
    },
    {
      label: "Продукт #2",
      borderWidth: 2,
      backgroundColor:"RGBA(64, 149, 252, 0.2)",  
      borderColor: "rgba(64, 149, 252, 1)",
      pointColor: "rgba(64, 149, 252, 1)",
      pointStrokeColor: "rgba(64, 149, 252, 1)",
      pointHighlightStroke: "rgba(225,225,225,0.9)",
      data: [1900, 1700, 2100, 3600, 2200, 2500, 2000]
    },
    {
      label: "Продукт #3",
      borderWidth: 2,
      backgroundColor: "RGBA(138, 121, 239, 0.2)",
      borderColor: "RGBA(138, 121, 239, 1.00)",
      pointColor: "RGBA(138, 121, 239, 1.00)",
      pointStrokeColor:"RGBA(138, 121, 239, 1.00)",
      pointHighlightStroke: "rgba(225,225,225,0.9)",
      data: [1000, 1400, 1100, 2600, 2000, 900, 1400]
    }
  ]
};
