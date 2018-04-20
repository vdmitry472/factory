var openedPage=0;
function openPage(pageID) {
    openedPage=pageID;
    $(".list"+pageID).addClass("open");
}
function addDevice()
{
  if ($("#DeviceSelector").val()!="" && $("#DeviceName").val()!="")
  {
  var Template = document.getElementById("DeviceTemplate");
  var container = document.getElementById("newElements");
    var newElement= Template.cloneNode(true);
    newElement.classList.remove("hidden");
  //   newElement.setAttribute("post-id", json[key].postId);      

    newElement.children[0].innerText = $("#DeviceName").val();

    newElement.children[0].addEventListener("click", function()
  {
    showElem(parseInt($("#DeviceSelector").val()));
    if($(this).parent().hasClass("on"))
    {
      $(this).parent().removeClass("on");
      $(this).parent().addClass("off");
      
  }
  else {
    $(this).parent().removeClass("off");
      $(this).parent().addClass("on");
      

  }
  });
    container.appendChild(newElement);
    // newElement.insertBefore($("addDevice"));
    $(".modal").removeClass("open");
}
else
{
  alert("Заполните все поля");
}
}
function showLabel()
{
  $("#triggerLabel").removeClass("hidden");
  document.getElementById("triggerLabel").innerText = $("#triggerSelector").val();
  $("#DateTime").removeClass("hidden");
  

}

function addAutomatization()
{
  if ($("#DeviceName1").val()!="")
  {
  var Template = document.getElementById("automatizationTemplate");
  var container = document.getElementById("newElements2");
    var newElement= Template.cloneNode(true);
    newElement.classList.remove("hidden");
  //   newElement.setAttribute("post-id", json[key].postId);      

    newElement.children[0].innerText = $("#DeviceName1").val() + " в "+$("#DateTime").val();

  
    container.appendChild(newElement);
    // newElement.insertBefore(document.getElementById("addAutomatization"));
    $(".modalAuto").removeClass("open");
}
else
{
  alert("Заполните все поля");
}
}

$(document).ready(
    
    
  function () {


$('.burger').click( function(){
      $(".menu").addClass("open");
      
  
})
$('.menu .close').click( function(){
  $(".menu").removeClass("open");
  
  
})
  })
function date_time(id)
{
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}
function back()
{
  viewer.autocam.goHome();
    viewer.showAll();
    viewer.impl.selector.setSelection(0,viewer.impl,0);
    $(".list"+openedPage).removeClass("open");
    
}
function showNotification()
{

}
function addNotification(title,type)
{
  $(".push").addClass("active");
  $(".push").removeClass("red");
  $(".push").removeClass("yellow");
  $(".push").removeClass("green");
  $(".push").addClass(type);
  $(".push p").html("<div></div>" +title);
  setTimeout(function(){
  $(".push").removeClass("active");
  },2000);


  var selectingTemplate = $('.notifications > :nth-child(2)');
  var newSelectFrom = selectingTemplate.clone();
  newSelectFrom.html("<div></div><p>"+title+"</p>");
  newSelectFrom.removeClass("red");
  newSelectFrom.removeClass("yellow");
  newSelectFrom.removeClass("green");
  
  newSelectFrom.addClass(type);
  newSelectFrom.insertBefore(selectingTemplate);
 var n = newSelectFrom.clone().insertBefore($('#аll-notifications > :nth-child(2)'));
  
}
function openNotification(title, desc,type)
{ 
  $("#notification-details").addClass("open");
  $("#notification-details h3").addClass(type);
  $("#notification-details p").text(desc)
  $("#notification-details h3").html("<div></div>"+title)
  
}
function openModal() {
    $(".modal").addClass("open");
    createSelect("DeviceSelector");
}

function closeModal() {
    $(".modal").removeClass("open");
}

function openModalAuto() {
  $(".modalAuto").addClass("open");
}

function closeModalAuto() {
  $(".modalAuto").removeClass("open");
}

