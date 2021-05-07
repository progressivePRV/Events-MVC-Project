let body = document.getElementsByTagName('body');
console.log('script loaded called');
this.onload = function(){
    console.log("onload called");
    var x = document.getElementById('snackbar');
    if(x.children.length>0){
        if(x.children.length<=3){
            x.className = "show";
            setTimeout(function(){
                x.className = x.className.replace("show", "");
            },3000);
        }else{
            let msg = ""
            for(var i=0;i<x.children.length;i++){
                msg += x.children[i].textContent +"\n";
            }
            alert(msg);
        }
    } 
    
}