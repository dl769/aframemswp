document.addEventListener("DOMContentLoaded", function(event) {         
        
        setInterval(()=>changeSphereColor(),500);

        setInterval(()=>rotateBox(),100);

        setInterval(()=>resizeCylinder(),50);

})

/*zmiana koloru sfery za pomocą RGB*/
function changeSphereColor(){
    const sphere = document.getElementById('sphere');
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    sphere.setAttribute("color", `rgb(${r},${g},${b})`)

}

/*rotacja za pomocą THREE js i math rand szescianem*/
function rotateBox(){
    const box = document.getElementById('box');
    let i = Math.floor(Math.random() * 360);
    box.object3D.rotation.set(
        THREE.Math.degToRad(i),
        THREE.Math.degToRad(i),
        THREE.Math.degToRad(i)
      );

}

/*zmiana wielkości tuby, pomocniczy iterator i zmienna określająca czy max punkt(3.0) został osiągnięty*/
var cylinderIteration = 0;
var reach = 0; 
function resizeCylinder(){

    const cylinder = document.getElementById('cylinder');
    
    currHeight = cylinder.getAttribute("height");
    currHeight = Math.round(parseFloat(currHeight)* 100) / 100

    //console.log(`i ${cylinderIteration}, reach${reach}`)

    if(reach == 0 && cylinderIteration<30){
        cylinder.setAttribute('height',`${currHeight+0.1}`)
        cylinderIteration++;
        if(cylinderIteration==30) reach =1;
    }
    else if(reach == 1 && cylinderIteration>0){
        cylinderIteration--;
        cylinder.setAttribute('height',`${currHeight-0.1}`)
        if(cylinderIteration==0) reach = 0;
    }


}

/*zad 6, komponent 'mycomponent' i funkcja tick() z rotacją*/
AFRAME.registerComponent('mycomponent', {
    schema: {
        color: { default: '#00cc66' },
        position: {default: "1.5 3.8 -3"},
        radius: {default: "1"}
    },
    init: function(){
        this.el.setAttribute('color', this.data.color);
        this.el.setAttribute('position', this.data.position);
        this.el.setAttribute('radius', this.data.radius);
        console.log('Komponent zainicjalizowany')
    },
    /*rotacja*/
    tick: function() {
      this.el.object3D.rotation.x = this.el.object3D.rotation.x + Math.PI * 0.3 / 180
      this.el.object3D.rotation.y = this.el.object3D.rotation.y + Math.PI * 0.3 / 180
    }
});


