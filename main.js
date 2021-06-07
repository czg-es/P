const frame  = document.getElementById('iframe');
//const bgColor  = getComputedStyle(frame.document.documentElement).getPropertyValue('--bg_color');
//const colore = frame.contentWindow.document.documentElement.style.getProperty('--bg-color');
/* 
var style = getComputedStyle(document.body)
console.log( style.getPropertyValue('--colorin') ) // #336699
console.log( style.getPropertyValue('--bg_color') ) // calc(2px*2)

 */
var oIframe = document.getElementById('iframe');
var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
var style = window.getComputedStyle(oDoc.document.documentElement);
let colour = style.getPropertyValue('--txt_color');
console.log(colour);

//let estilo = window.getComputedStyle(oDoc);


//let coloure = oDoc.getPropertyValue('--txt_color');
//getComputedStyle(document.documentElement).getPropertyValue('--bg_color');
//document.getElementById('iframe').contentWindow.document.documentElement.style.setProperty('--bg_color','blue');

let p_color = getComputedStyle(frame.contentWindow.document.documentElement).getPropertyValue('--bg_color');



function changeFrame()
{
  var oIframe = document.getElementById('iframe');
  var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
  if (oDoc.document) oDoc = oDoc.document;
  oDoc.body.style.backgroundColor = "#00f";
  return true;
}
changeFrame();


function change_bg (){
    //document.getElementById('iframe').contentWindow.document.documentElement.style.setProperty('--bg_color','blue');
    let p_color = getComputedStyle(frame.contentWindow.document.documentElement); //.getPropertyValue('--bg_color');
}
change_bg();

