

const mail=document.getElementById("mail");
const mob=document.getElementById("mobile");
const dob=document.getElementById("dob");
const pass=document.getElementById("pass");
const pass1=document.getElementById("pass1")
const arr=document.getElementsByTagName("input");
const mobMsg=document.getElementById("mobMsg");
const passMsg=document.getElementById("passMsg");
const pass1Msg=document.getElementById("pass1Msg");

let validArr=[];//to checkvaildity on focus out

let validity=[];
for (let index = 0; index < arr.length; index++) {
    validArr[index]=0;
    validity[index]=true;
    arr[index].addEventListener("focusout",function() {
        clean(index);//clean the added effectson focus out
    });
    
}
function validate(){
    
    mailValid();
    mobValid();
    passValid();
    confirmValid();
    for (let index = 0; index < arr.length; index++) {
        arr[index].style.border="none" ;
        arr[index].style.borderBottom="2px solid #777";

             
    }

    mobMsg.innerHTML='';
    passMsg.innerHTML='';
    pass1Msg.innerHTML='';
    for (let index = 0; index < validity.length; index++) {
        if (validity[index]==false) {
            arr[index-1].scrollIntoView();
            arr[index].style.border="2px solid red";
            arr[index].focus();
            return false;
        }        
    }
    

}



function clean(i){
    if(validArr[i]===1){//do not change border color if field not valid
        arr[i].style.border="none" ;
        arr[i].style.borderBottom="2px solid #777" ;
    }
    
} 

//email validation
arr[1].addEventListener("keyup",mailValid);
function mailValid(){
    const rxpMail=/^([A-Za-z0-9\.-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if(rxpMail.test(mail.value)){   
        arr[1].style.border="3px solid green"  ;
        validArr[1]=1;   
        validity[1]=true;      
    }else{
        validArr[1]=0;
        arr[1].style.border="3px solid red" ;
        validity[1]=false;
        }
    
}

//mobile validation
arr[2].addEventListener("keyup",mobValid);
function mobValid(){
    const rxpMob=/^(\d{3})([\. -]?)(\d{3})([\. -]?)(\d{4})$/;

    if(rxpMob.test(mob.value)){ 
        arr[2].style.border="3px solid green"  ;
        validArr[2]=1;    
        mobMsg.innerHTML='';   
        validity[2]=true;
    }else{
        validArr[2]=0;
        validity[2]=false;
        arr[2].style.border="3px solid red" ;
        if (mob.value.length>11) {
            
            mobMsg.style.color="red";
            mobMsg.innerHTML=`<p> valid formats <br> xxxxxxxxxx| xxx.xxx.xxxx <br> xxx xxx xxxx | xxx-xxx-xxxx</p></p>`;
        } 
        }
        if (mob.value.length>10) {
            if (mob.value.substring(3,4)!=mob.value.substring(7,8)) {
                validArr[2]=0;
                validity[2]=false;
                arr[2].style.border="3px solid red" ;
                mobMsg.style.color="red";
                mobMsg.innerHTML=`<p> valid formats <br> xxxxxxxxxx| xxx.xxx.xxxx <br> xxx xxx xxxx | xxx-xxx-xxxx</p></p>`;
            }
            else if (!isNaN(parseInt(mob.value.substring(7,8)))) {
                validArr[2]=0;
                validity[2]=false;
                arr[2].style.border="3px solid red" ;
                mobMsg.style.color="red";
                mobMsg.innerHTML=`<p> valid formats <br> xxxxxxxxxx| xxx.xxx.xxxx <br> xxx xxx xxxx | xxx-xxx-xxxx</p></p>`;
            }
        }
           
}

//password validation
arr[5].addEventListener("keyup",passValid);

function passValid(){
    confirmValid();
    if (pass.value.length<8) {
        validArr[5]=0;
        validity[5]=false;
        arr[5].style.border="3px solid red" ;
        passMsg.style.color="blue";
        passMsg.innerHTML=`<p>Minimum 8 characters with no space <br> atleast 1 capital letter , 1 small letter and 1 digit</p> `;

    } else {
        if (/[A-Z]+/.test(pass.value)&&/[a-z]+/.test(pass.value)&&/[0-9]+/.test(pass.value)&&!(/[\ ]+/.test(pass.value))) {
            arr[5].style.border="3px solid green"  ;
            validArr[5]=1;
            validity[5]=true;
            if (pass.value.length<10) {
                passMsg.style.color="brown";
                passMsg.innerHTML=`<i class="fa fa-check text-primary" ></i> Poor password <p>(long passwords increases safety)</p>`;
            } else if (pass.value.length<12) {

                passMsg.style.color="#f60";
                passMsg.innerHTML=`<i class="fa fa-check text-primary" ></i> Medium password`;
            } else {

                passMsg.style.color="green";
                passMsg.innerHTML=`<i class="fa fa-check text-primary" ></i> Strong password!!!`;
            }
            
            
        } else {
            validity[5]=false;
            validArr[5]=0;
            arr[5].style.border="3px solid red" ;
            passMsg.style.color="red";
            passMsg.innerHTML=`<p>Not a valid password <br> atleast 1 capital letter , 1 small letter and 1 digit<p>`;

        }
    }

}

//confirm passord validation
arr[6].addEventListener("keyup",confirmValid);
function confirmValid(){
    validity[6]=false;
    if ((pass.value==pass1.value)&&validArr[5]==1&&pass1.value!='') {
 
        pass1Msg.innerHTML='';
        arr[6].style.border="3px solid green"  ;
        validArr[6]=1;    
        validity[6]=true;
    }
    else if(pass1.value!=''){
        validArr[6]=0;
        arr[6].style.border="3px solid red" ;
        pass1Msg.style.color="red";
        pass1Msg.innerHTML="Password mismatch";
        validity[6]=false;
    }


}
//password visibility
let x=0;
function visible(){
    if(x==0){
        arr[5].setAttribute("type","text");
        arr[6].setAttribute("type","text");
        x=1;
        document.getElementById("eye").innerHTML=`<i class="fa fa-eye-slash" ></i>`;
    }
    else{
        arr[5].setAttribute("type","password");
        arr[6].setAttribute("type","password");
        x=0;
        document.getElementById("eye").innerHTML=`<i class="fa fa-eye" ></i>`;
    }
}