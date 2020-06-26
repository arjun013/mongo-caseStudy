
const pass=document.getElementById("pass");
const arr=document.getElementsByTagName("input");
const passMsg=document.getElementById("passMsg");

function passValid(){
    arr[1].addEventListener("keyup",passValid);
    if (pass.value.length<8) {
        arr[1].style.borderBottom="3px solid red" ;
        passMsg.innerHTML=`<p>Minimum 8 characters </p> `;
        arr[1].focus();
        return false;
        
    } else {
        if (/[A-Z]+/.test(pass.value)&&/[a-z]+/.test(pass.value)&&/[0-9]+/.test(pass.value)&&!(/[\ ]+/.test(pass.value))) {
            arr[1].style.borderBottom="2px solid white"  ;  
            passMsg.innerHTML=``;         
            
        } else {
            arr[1].style.borderBottom="3px solid red";
            passMsg.innerHTML=`<p>atleast 1 capital letter , 1 small letter and 1 digit<p>`;
            arr[1].focus();
            return false;
        }
    }



}