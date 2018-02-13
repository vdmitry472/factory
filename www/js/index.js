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

function onSuccessCallback1(e){
    console.log(e.properties);
    console.log(e.properties[20].type);
    e.properties[20].type = 10;
    console.log(e.properties[20].type);
    //e.properties[35].displayValue = 100;
    //e.properties[35].precision = 2;
}

function Point(element){

}