$(document).ready(function(){
 
   // To select inputs
    const color = $("input[type=color]");
    const row = $("input[name=Height]");
    const column = $("input[name=Width");

    // Picked color variable
    var pickedColor = color.val();
    console.log(pickedColor);

     //Handle color change
    color.on("change",function(){
        pickedColor=$(this).val();
        console.log(pickedColor);
    });

      //Changes color of selected cell
    $("table").click(function(event){
        let clickedCell=event.target;
        console.log(clickedCell);
        $(clickedCell).css("background-color",pickedColor);
    });

    // Drag mouse to apply color to multiple cells
    let mouseDown;
    $("table").mouseup(function(){
        mouseDown = false;
    });
    $("table").mousedown(function(){
        mouseDown = true;
    });
    $("table").on("mouseover", function(event){
        if (mouseDown === true){
            let clickedCell=event.target;
            console.log(clickedCell);
            $(clickedCell).css("background-color",pickedColor);
        }
    });

    //TODO: Function that makes the grid
    function makeGrid(rowNo,columnNo) {

        $("html").css("min-height","100%").css("height","auto"); 
        $("h2").remove();                                        // remove previous canvas header
        $(".canvas").prepend("<h2>Design Canvas</h2>");
        $("table").empty();                                      // empty previous table contents

        for( rowNo; rowNo > 0 ; rowNo--){
            $("table").append("<tr class='row'> </tr>");
        }                                                       // adds table rows

        $(".row").each(function(){
            for(let i = columnNo ; i > 0 ; i--){
                $(this).append("<td class='column'>  </td>");
                }
        });                                                    // adds table data
    }

    // When size is submitted by the user, call makeGrid()
    $("form").on("submit", function(e){
        e.preventDefault();

        let rowNo = $(row).val();
        let columnNo =$(column).val();  

        makeGrid(rowNo,columnNo);                   // call makeGrid function on submit
         $(".canvas").css("margin" ,"0 auto");      // center the canvas
    });


});



