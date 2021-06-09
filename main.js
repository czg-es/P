const frame  = document.getElementById('iframe');

const frame1_contentWindow = frame.contentWindow;
const frame1_Window = frame.window;
const frame1_doc = frame.contentDocument ;
        

let parent_bg = getComputedStyle(document.documentElement).getPropertyValue('--bg_color');
let parent_dark = getComputedStyle(document.documentElement).getPropertyValue('--dark_color');
let parent_text = getComputedStyle(document.documentElement).getPropertyValue('--txt_color');

let child_bg = getComputedStyle(frame1_contentWindow.document.documentElement).getPropertyValue('--bg_color');
let child_dark = getComputedStyle(frame1_contentWindow.document.documentElement).getPropertyValue('--dark_color');
let child_text = getComputedStyle(frame1_contentWindow.document.documentElement).getPropertyValue('--txt_color');

console.log('SELF');
console.log(parent_bg,parent_dark,parent_text);
console.log('CHILD');
console.log(child_bg,child_dark,child_text);