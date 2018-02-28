/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
//dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVhY3QtbGF5b3V0LXNhbXBsZS12aWV3ZXIzN2lleGRiZG5xY2Franplc2JocWNlcTVhc2htNzh2My9VcmJhbkhvdXNlLTIwMTUucnZ0

var viewer;
var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
}

var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTAyLTA5LTIxLTAyLTE2LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0hvdXNlJTIwRGVzaWduLnJ2dA';

Autodesk.Viewing.Initializer(options, function onInitialized() {
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
});

/**
 * Autodesk.Viewing.Document.load() success callback.
 * Proceeds with model initialization.
 */
function onDocumentLoadSuccess(doc) {

    // A document contains references to 3D and 2D viewables.
    var viewable = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
        'type': 'geometry',
        'role': '3d'
    }, true);
    if (viewable.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    // Choose any of the available viewable
    var initialViewable = viewable[0]; // You can check for other available views in your model,
    var svfUrl = doc.getViewablePath(initialViewable);
    var modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
    };

    var viewerDiv = document.getElementById('viewer');

    ///////////////USE ONLY ONE OPTION AT A TIME/////////////////////////

    /////////////////////// Headless Viewer /////////////////////////////
    // viewer = new Autodesk.Viewing.Viewer3D(viewerDiv);
    //////////////////////////////////////////////////////////////////////

    //////////////////Viewer with Autodesk Toolbar///////////////////////
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
    //////////////////////////////////////////////////////////////////////

    viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}


/**
 * Autodesk.Viewing.Document.load() failure callback.
 */
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
 * viewer.loadModel() success callback.
 * Invoked after the model's SVF has been initially loaded.
 * It may trigger before any geometry has been downloaded and displayed on-screen.
 */
function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}

/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}


/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

function changeBackground (){
       viewer.setBackgroundColor(0, 59, 111, 255,255, 255);
}

/////////////////////////////////////////////////////////////////////////////////
//
// Unload Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

function resetBackground (){
       viewer.setBackgroundColor(169,169,169, 255,255, 255);
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Markup3D Extension
//
/////////////////////////////////////////////////////////////////////////////////
// 3D Markup extension to display values of the selected objects in the model. 

function loadMarkup3D (){
       viewer.loadExtension('Viewing.Extension.Markup3D');
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Transform Extension
//
/////////////////////////////////////////////////////////////////////////////////
// Transformation is allowed with this extension to move object selected in the XYZ
// position or rotation in XYZ as well.

function loadTransform (){
       viewer.loadExtension('Viewing.Extension.Transform');
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Control Selector Extension
//
/////////////////////////////////////////////////////////////////////////////////
// This extension allows you to remove certain extensions from the original toolbar 
// provided to you.

function loadControlSelector(){
       viewer.loadExtension('_Viewing.Extension.ControlSelector');
}


function Boom(){
    viewer.explode(3);
}

function SearchByTXT(text){
    viewer.search(text,onSuccessCallback,onErrorCallback);
}

function onSuccessCallback(){
    console.log("Good!");
}

function onErrorCallback(){
    console.log("Bad!");
}

function Poly(){
    console.log("Модель");
    console.log(viewer);
    console.log(viewer.model.getFragmentList().fragments);
    console.log(viewer.model.getFragmentList());
    //var list = viewer.model.getFragmentList();
    //var material = list.materialmap[36];
    //viewer.model.getFragmentList().materialmap[36].color.g = 12;
    //console.log(material);
}



function getElem(){
    var elementId = viewer.model.selector.selectedObjectIds;
    console.log("Селектор");
    
    //console.log(viewer.model.selector.getSelection());
    
    // + console.log(elementId);
    //console.log(viewer.model.getProperties(1394, onSuccessCallback1, onErrorCallback));
    var tree;
    //viewer is your viewer object
    viewer.getObjectTree(function (objTree) {
        tree = objTree;
    });
    //console.log(viewer.model.getData().instanceTree);
    
    console.log(viewer.model.selector.getSelection());
    viewer.fitToView(viewer.model.selector.getSelection(),viewer.model);
    
    //viewer.show(1023);
    
    viewer.getProperties(viewer.model.selector.getSelection()[0],onSuccessCallback1,onErrorCallback);

    //viewer.applyCamera(viewer.camera,true);
    
    // + console.log(viewer.getFragmentList().fragments.fragId2dbId[1404]);
    //console.log(Autodesk.Revit.UI.Events);
}

function showProps(e) {
    console.log(e);
}
function showElem(id){
    var elementId = id;
    console.log("Селектор");
    
    //console.log(viewer.model.selector.getSelection());
    
    // + console.log(elementId);
    //console.log(viewer.model.getProperties(1394, onSuccessCallback1, onErrallback));
    var tree;
    //viewer is your viewer object
    viewer.getObjectTree(function (objTree) {
        tree = objTree;
    });
    //console.log(viewer.model.getData().instanceTree);
    // hideAllExepectId(elementId,true);
    viewer.isolateById(elementId);
    console.log(viewer.model.selector.getSelection());
    viewer.fitToView(viewer.model.selector.getSelection(),viewer.model);
    viewer.impl.selector.setSelection([elementId],viewer.impl,0);
    //viewer.show(1023);
    
    viewer.getProperties(viewer.model.selector.getSelection()[0],onSuccessCallback1,onErrorCallback);

    //viewer.applyCamera(viewer.camera,true);
    
    // + console.log(viewer.getFragmentList().fragments.fragId2dbId[1404]);
    //console.log(Autodesk.Revit.UI.Events);
}

function onSuccessCallback1(e){
    console.log(e.properties);
    console.log(e.properties[20].type);
    e.properties[20].type = 10;
    console.log(e.properties[20].type);
    //e.properties[35].displayValue = 100;
    //e.properties[35].precision = 2;
}
function hideAllExepectId(id,type)
{  array = viewer.model.getFragmentList().fragments.fragId2dbId;  array.forEach( function(a) {if(a!=id){viewer.impl.visibilityManager.setNodeOff(a,type);}})
}
function Point(element){

}

function ControlElement(id){
    this.IdOnModel = id;
    this.IsTurnOn = false;
    this.Outlay = 0; // ðàñõîä

    this.scaleElement = function(){
        viewer.fitToView([this.IdOnModel],viewer.model);
    };

    this.turnOn = function(){
        IsTurnOn = true;
    };

    this.turnOff = function(){
        IsTurnOn = false;
    };
}

function Enumerator(type){
    var Point ;
    var Id ;
    var Type  = type;
    var Value ;

    this.drawGraph = function(){

    };
}

function AddControlElem(){
    var newElem = new ControlElement(viewer.model.selector.getSelection()[0]);
    newElem.scaleElement();
    console.log(newElem);
}

function showElems(elementId){
    viewer.isolateById(elementId);
    console.log(viewer.model.selector.getSelection());
    viewer.impl.selector.setSelection(elementId,viewer.impl,0);
    viewer.fitToView(viewer.model.selector.getSelection(),viewer.model);
}


var TestArrayOfLights = [3098, 3099, 3100];

function createSelect(selectName){
    var objSel = document.getElementById(selectName); 

    for (r = objSel.options.length - 1; r >= 0; r--) {
        objSel.options.remove(r);
    }

    var list = getCookie("list");
    list = JSON.parse(list);
    
    list.elements.forEach(function(item, i, arr) {
        if (item.value == -1){
            objSel.options[objSel.options.length] = new Option(item.id + " " + item.category, item.id );
        }
        
    });

    function changeOption(){
        var selectedOption = objSel.options[objSel.selectedIndex];
        console.log("Вы выбрали: " + selectedOption.text);
    }

    objSel.addEventListener("change", changeOption);
}

/////////////////////////
// JSON
/////////////////////////

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
      expires: -1
  })
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; path=/; " + expires;

}

function checkList()
{
  if (getCookie('list') == undefined) {
    setCookie('list', '{"elements":[:[{"id":3098,"state":"off","category":"1floor","value":15},{"id":3099,"state":"off","category":"1floor","value":-1},{"id":3101,"state":"off","category":"2floor","value":-1},{"id":3100,"state":"off","category":"2floor","value":-1},{"id":3102,"state":"off","category":"2floor","value":40},{"id":3103,"state":"off","category":"2floor","value":-1},{"id":3104,"state":"off","category":"2floor","value":12},{"id":3125,"state":"off","category":"2floor","value":-1},{"id":2738,"state":"off","category":"kitchen","value":10},{"id":2729,"state":"off","category":"kitchen","value":15},{"id":2748,"state":"off","category":"kitchen","value":-1},{"id":2770,"state":"off","category":"kitchen","value":-1},{"id":3203,"state":"off","category":"kitchen","value":-1},{"id":2846,"state":"off","category":"kitchen","value":-1}]}', 7);
  }
}

function addElementToList(id, state, category,value)
{
  var list = getCookie("list");
  console.log(list);  
  list = JSON.parse(list);
  console.log(list);
  list.elements.push({id:id, state:state, category:category, value:value});
  console.log(list);
  
  setCookie("list", JSON.stringify(list,""), 7);

}


function editElementStateFromList(id, state)
{
  var list = getCookie("list");
  list = JSON.parse(list);
  console.log(list); 
  for (var i = 0; i < Object.keys(list.elements).length; i++) {
    if (list.elements[i].id == id) {
      list.elements[i].state=state;
      console.log(list); 
      setCookie("list", JSON.stringify(list,""), 7);
      return true;
      
    }
  }
  return false; 
}

function editElementValueFromList(id, value)
{
  var list = getCookie("list");
  list = JSON.parse(list);
  console.log(list); 
  for (var i = 0; i < Object.keys(list.elements).length; i++) {
    if (list.elements[i].id == id) {
      list.elements[i].value=value;
      console.log(list); 
      setCookie("list", JSON.stringify(list,""), 7);
      return true;
      
    }
  }
  return false;
}

function deleteElementFromList(id)
{
  var list = getCookie("list");
  list = JSON.parse(list);

  for (var i = 0; i < Object.keys(list.elements).length; i++) {
    if (list.elements[i].id == id) {
      delete list.elements[i];
      list = JSON.stringify(list);
      list = list.replace(',null', '');
      list = list.replace('null,', '');
      list = list.replace('null', '');
      setCookie("list", list, 7);
      return true;
      
    }
  }
  return false;
}

// ДИАГРАММА


function setDiagramData(){
    var list = getCookie("list");
    list = JSON.parse(list);
    
    var arrayOfLabels = [];
    var arrayOfValue = [];

    list.elements.forEach(function(item, i, arr) {
        if(item.value != -1){
            if(arrayOfLabels.indexOf(item.category) == -1){
                arrayOfLabels[arrayOfLabels.length] = item.category;
                arrayOfValue[arrayOfLabels.length-1] = item.value;
            }else{
                arrayOfValue[arrayOfLabels.indexOf(item.category)] += item.value
            }
        }
    });

    console.log(arrayOfLabels,arrayOfValue);

    window.chart.data.labels = arrayOfLabels;
    window.chart.data.datasets[0].data = arrayOfValue;
    window.chart.update();

    //addData(config, arrayOfLabels, arrayOfValue);

}