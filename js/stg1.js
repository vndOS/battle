
let msj;

let vessel_img_ob = [
			{
			class_h:'vessel_img_h1',
			class_v:'vessel_img_v1',
			class_v_v:'vessel_img_v1_v',
			src_h:'img/one.png',
			src_v:'img/one.png',
            is_set:false,
			v_al:false,
            name_us:'Gato Class Submarine',
            name_jp:'I9 Class Submarine'
			},
			{
			class_h:'vessel_img_h2',
			class_v:'vessel_img_v2',
			class_v_v:'vessel_img_v2_v',
			src_h:'img/two.png',
			src_v:'img/two_v.png',
            is_set:false,
			v_al:false,
            name_us:'Cannon Class Frigate',
            name_jp:'Ukuru Class Frigate'
			},
			{
			class_h:'vessel_img_h3',
			class_v:'vessel_img_v3',
			class_v_v:'vessel_img_v3_v',
			src_h:'img/three.png',
			src_v:'img/three_v.png',
            is_set:false,
			v_al:false,
            name_us:'Fletcher Class Destroyer',
            name_jp:'Akizuki Class Destroyer'
			},
			{
			class_h:'vessel_img_h4',
			class_v:'vessel_img_v4',
			class_v_v:'vessel_img_v4_v',
			src_h:'img/four.png',
			src_v:'img/four_v.png',
            is_set:false,
			v_al:false,
            name_us:'Baltimore Class Cruiser',
            name_jp:'Takao Class Cruiser'
			},
			{
			class_h:'vessel_img_h5',
			class_v:'vessel_img_v5',
			class_v_v:'vessel_img_v5_v',
			src_h:'img/five.png',
			src_v:'img/five_v.png',
            is_set:false,
			v_al:false,
            name_us:'North Carolina Class Battleship',
            name_jp:'Yamato Class Battleship'
			},
			{
			class_h:'vessel_img_h6',
			class_v:'vessel_img_v6',
			class_v_v:'vessel_img_v6_v',
			src_h:'img/six.png',
			src_v:'img/six_v.png',
            is_set:false,
			v_al:false,
            name_us:'Essex Class Carrier',
            name_jp:'Shokaku Class Carrier'
			}
			];



let vessel_img2, vessel_img2_v, num='', flag_align=false, cont1=0, start_flag=true, flag_define=false, current_img;

let shapes = shape_section.querySelectorAll("img");







window.addEventListener('load', start);

function resetBoard(){

board_matrix_rows = [
[],[],[],[],[],[],[],[]
];

    for(let m=0;m<=12;m++){
	for(let n=0;n<=7;n++){
		board_matrix_rows[m,n].push(0); 
        
	}
}

}





function drawScenario(){

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'MidnightBlue';

for(let c=0; c<=12; c++){
    for(let d=0; d<=7; d++){
        ctx.fillRect(c*60, d*46, 60, 46);

    }
}

for(let a=0; a<=12; a++){

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'GreenYellow';

    for(let b=0; b<=7; b++){

    ctx.strokeRect(a*60, b*46, 60, 46);

    }
}
}





function start(){
    buton_one.className = "buton1";
    buton_one.src = "img/undo.svg";
    buton_one.setAttribute("onclick", "undoPos()");
    buton_one.setAttribute("title", "Undo");

    console_user.innerText = "Select and Place Your Vessels";
    
    resetBoard();

    start_flag=true;

    for(let p=0;p<=5;p++){
            vessel_img_ob[p].is_set=false;
        }

    drawScenario();

    canvas.addEventListener('click', getCoords);

}

function switchAlign(){

if(!flag_define){
    return;
}

switch(flag_align){
    case false:

    flag_align=true;
    vessel_img2.className = vessel_img_ob[num].class_v;
    
    break;

    case true:
    flag_align=false;
    vessel_img2.className = vessel_img_ob[num].class_h;
    
    break;
}
}

function defineVessel(n, el_img){

current_img = el_img;

num=n;

flag_align=false;

if(start_flag==false){
monitor.removeChild(vessel_img);
monitor.removeChild(vessel_img_v);
}

vessel_img = document.createElement('img');
vessel_img_v = document.createElement('img');

vessel_img.setAttribute('src', vessel_img_ob[n].src_h);
vessel_img_v.setAttribute('src', vessel_img_ob[n].src_v);

vessel_img.setAttribute('class', vessel_img_ob[n].class_h);
vessel_img_v.setAttribute('class', vessel_img_ob[n].class_v_v);

vessel_img.setAttribute('onclick', 'switchAlign()');

vessel_img.setAttribute('style', 'cursor:pointer;float:left;');
vessel_img.setAttribute('title', 'Alignment');


vessel_img_v.setAttribute('style', 'display:none;');

vessel_img.setAttribute('id', 'vessel_img');
vessel_img_v.setAttribute('id', 'vessel_img_v');

monitor.appendChild(vessel_img);
monitor.appendChild(vessel_img_v);

vessel_img2 = document.getElementById("vessel_img");
vessel_img2_v = document.getElementById("vessel_img_v");

flag_define=true;

start_flag=false;

}

function  getCoords(event){

    

    let msj;

        if((cont1<6)&&(flag_define==false)){
                num='';
                
                msj = document.createElement('p');
                msj.innerText = 'Select Vessel!';
                console_user.appendChild(msj);
                console_user.scrollTop = console_user.scrollHeight;

                return;
            }

		let x=event.offsetX * canvas.width / canvas.clientWidth;
		let y=event.offsetY * canvas.height / canvas.clientHeight;
        let click_x;
        let click_y;

        

for(let a=0;a<=12;a++){

	for(let b=0;b<=7;b++){

		if((x>(a*60))&&(x<((a+1)*60))){

			click_x=a;
            
			if((y>(b*46))&&(y<((b+1)*46))){
			
				click_y=b;
			
			}
		}

	}

}
try{
placeVessel(num, click_x, click_y);
}catch(err){
undoPos();
}

setTimeout(preConf, 500);

}



function placeVessel(ship, x, y){


let num = ship;
let click_x = x;
let click_y = y;

switch(flag_align){

case false:

    switch(num){

        case 0:
        if((board_matrix_rows[click_y][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
        click_x='';
        click_y='';
        return;   
        }else{
        board_matrix_rows[click_y][click_x]=1;
        vessel_img_ob[num].is_set=true;
        graphicVessel(click_y, click_x);
        click_x='';
        click_y='';
		return;
        }
        break;

        case 1:

            if((click_x==12)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 2;
                board_matrix_rows[click_y][click_x+1] = 2;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 2:

            if(click_x>=11||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 3;
                board_matrix_rows[click_y][click_x+1] = 3;
                board_matrix_rows[click_y][click_x+2] = 3;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 3:

            if((click_x>=10)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 4;
                board_matrix_rows[click_y][click_x+1] = 4;
                board_matrix_rows[click_y][click_x+2] = 4;
                board_matrix_rows[click_y][click_x+3] = 4;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 4:

        if((click_x>=9)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(board_matrix_rows[click_y][click_x+4]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 5;
                board_matrix_rows[click_y][click_x+1] = 5;
                board_matrix_rows[click_y][click_x+2] = 5;
                board_matrix_rows[click_y][click_x+3] = 5;
                board_matrix_rows[click_y][click_x+4] = 5;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 5:

            if((click_x>=10)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+1][click_x+1]!=0)||(board_matrix_rows[click_y+1][click_x+2]!=0)||(board_matrix_rows[click_y+1][click_x+3]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 6;
                board_matrix_rows[click_y][click_x+1] = 6;
                board_matrix_rows[click_y][click_x+2] = 6;
                board_matrix_rows[click_y][click_x+3] = 6;
                board_matrix_rows[click_y+1][click_x] = 6;
                board_matrix_rows[click_y+1][click_x+1] = 6;
                board_matrix_rows[click_y+1][click_x+2] = 6;
                board_matrix_rows[click_y+1][click_x+3] = 6;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

    }

break;


case true:

    switch(num){

        case 0:
        if((board_matrix_rows[click_y][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
        click_x='';
        click_y='';
        return;   
        }else{
        board_matrix_rows[click_y][click_x]=1;
        vessel_img_ob[num].is_set=true;
        graphicVessel(click_y, click_x);
        click_x='';
        click_y='';
		return;
        }
        break;

        case 1:

            if((click_y==7)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 2;
                board_matrix_rows[click_y+1][click_x] = 2;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 2:

            if(click_y>=6||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 3;
                board_matrix_rows[click_y+1][click_x] = 3;
                board_matrix_rows[click_y+2][click_x] = 3;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 3:

            if((click_y>=5)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 4;
                board_matrix_rows[click_y+1][click_x] = 4;
                board_matrix_rows[click_y+2][click_x] = 4;
                board_matrix_rows[click_y+3][click_x] = 4;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 4:

        if((click_y>=4)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(board_matrix_rows[click_y+4][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 5;
                board_matrix_rows[click_y+1][click_x] = 5;
                board_matrix_rows[click_y+2][click_x] = 5;
                board_matrix_rows[click_y+3][click_x] = 5;
                board_matrix_rows[click_y+4][click_x] = 5;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 5:

            if((click_y>=5)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y+1][click_x+1]!=0)||(board_matrix_rows[click_y+2][click_x+1]!=0)||(board_matrix_rows[click_y+3][click_x+1]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
                num='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 6;
                board_matrix_rows[click_y+1][click_x] = 6;
                board_matrix_rows[click_y+2][click_x] = 6;
                board_matrix_rows[click_y+3][click_x] = 6;
                board_matrix_rows[click_y][click_x+1] = 6;
                board_matrix_rows[click_y+1][click_x+1] = 6;
                board_matrix_rows[click_y+2][click_x+1] = 6;
                board_matrix_rows[click_y+3][click_x+1] = 6;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;


    }

break;


}



}

function graphicVessel(coord_y, coord_x){

let click_x=coord_x;
let click_y=coord_y;
let g=num;

switch(flag_align){

case false:

    if(g==5){

        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, 240, 92);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){
        
        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, (g+1)*60, 46);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
        }
break;


case true:
    if(g==5){

        ctx.drawImage(vessel_img2_v, (click_x)*60, (click_y)*46, 120, 184);
        vessel_img_ob[g].v_al = true;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){

        ctx.drawImage(vessel_img2_v, (click_x)*60, (click_y)*46, 60, (g+1)*46);
        vessel_img_ob[g].v_al = true;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
        }
break;


}



shapes[g].style.display='none';

flag_define=false;



num='';

vessel_img.style.display='none';
vessel_img_v.style.display='none';




}

function preConf(){
            let cont_final=0;

            for(let n=0;n<=5;n++){

                if(vessel_img_ob[n].is_set===true){
                    cont_final++;
                }

            }

            if(cont_final===6){
                confPos();
                return;
            }
}


function confPos(){


    let res = confirm('Is this OK?');

    if(!res){

        

        undoPos();

    }else if(res){

        for(let h=0;h<=5;h++){
            buffer_vessels[h].name_user=vessel_img_ob[h].name_us;
            buffer_vessels[h].name_rival=vessel_img_ob[h].name_jp;
            buffer_vessels[h].v_al_user = vessel_img_ob[h].v_al;
            buffer_vessels[h].src_h = vessel_img_ob[h].src_h;
            buffer_vessels[h].src_v = vessel_img_ob[h].src_v;

            
        }
        
        cont1=0;
        canvas.removeEventListener('click', getCoords);
        loadstgTwo();
        
    }

}




function undoPos(){
    cont1=0;
    monitor.removeChild(vessel_img);
    monitor.removeChild(vessel_img_v);
    vessel_img2='';
    vessel_img2_v='';
    num='';  
    flag_align=false;
    start_flag=true;
    flag_define=false;


    let shape_section = document.getElementById("shape_section");
    

    for(let c=0;c<=shapes.length-1;c++){
        shapes[c].style.display="block";
    }

    start();
}



