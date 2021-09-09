let users_turn=false, matrix_for_user, matrix_for_rival, matrix_discover_rival, matrix_discover_user,
flag_submarine_user=false, flag_submarine_rival=false, flag_dir, time=0, cont=0, cont_part=0;

const ani_ctx = ani_canvas.getContext("2d");

const ani_ctx2 = ani_canvas2.getContext("2d");

const ani_ctx3 = ani_canvas3.getContext("2d");

const ani_ctx4 = ani_canvas4.getContext("2d");

window.setInterval(waves, 30);

matrix_for_user = [
    [],[],[],[],[],[],[],[]
    ];

matrix_for_rival = [
    [],[],[],[],[],[],[],[]
    ];

    matrix_discover_user = [
    [],[],[],[],[],[],[],[]
    ];

    matrix_discover_rival = [
    [],[],[],[],[],[],[],[]
    ];


function getRandomInt2(min, max) {
    let floor = Math.ceil(min);
    let coil = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



let img_vessel = new Image();

const img_vessel_sub = new Image();
img_vessel_sub.src = 'img/one.png';

const img_torpedo1 = new Image();
img_torpedo1.src = 'img/torpedo1.png';

const img_torpedo2 = new Image();
img_torpedo2.src = 'img/torpedo2.png';

const img_torpedo3 = new Image();
img_torpedo3.src = 'img/torpedo3.png';

const img_torpedo4 = new Image();
img_torpedo4.src = 'img/torpedo4.png';

const img_torpedo5 = new Image();
img_torpedo5.src = 'img/torpedo5.png';

const img_torpedo6 = new Image();
img_torpedo6.src = 'img/torpedo6.png';

const img_torpedo7 = new Image();
img_torpedo7.src = 'img/torpedo7.png';

const img_torpedo8 = new Image();
img_torpedo8.src = 'img/torpedo8.png';

const img_part1 = new Image();
img_part1.src = 'img/part1.png';

const img_part2 = new Image();
img_part2.src = 'img/part2.png';

const img_part3 = new Image();
img_part3.src = 'img/part3.png';

const img_part4 = new Image();
img_part4.src = 'img/part4.png';

const img_part5 = new Image();
img_part5.src = 'img/part5.png';

const img_part6 = new Image();
img_part6.src = 'img/part6.png';

const img_part7 = new Image();
img_part7.src = 'img/part7.png';


const torpedo = [
{
    w:50,
    h:50,
    x:0,
    y:0,
    x_ini:0,
    y_ini:0,
    src:img_torpedo1,
    speed_x:21,
    speed_y:18,
    part_x:140,
    part_y:-90,
    angle:0.785,
    src_part:img_part1
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:0,
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:0,
    src:img_torpedo2,
    speed_x:-21,
    speed_y:18,
    part_x:370,
    part_y:170,
    angle:2.356,
    src_part:img_part2
},
{
    w:50,
    h:50,
    x:0,
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:0,
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo3,
    speed_x:21,
    speed_y:-18,
    part_x:-65,
    part_y:110,
    angle:-0.785,
    src_part:img_part3
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo4,
    speed_x:-21,
    speed_y:-18,
    part_x:155,
    part_y:360,
    angle:-2.356,
    src_part:img_part4
},
{
    w:50,
    h:50,
    x:0,
    y:ani_ctx3.canvas.height*(21/50),
    x_ini:0,
    y_ini:ani_ctx3.canvas.height*(21/50),
    src:img_torpedo5,
    speed_x:21,
    speed_y:0,
    part_x:-5,
    part_y:-50,
    angle:0,
    src_part:img_part5
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(21/50),
    y:0,
    x_ini:ani_ctx3.canvas.width*(21/50),
    y_ini:0,
    src:img_torpedo6,
    speed_x:0,
    speed_y:19,
    part_x:320,
    part_y:-60,
    angle:1.57,
    src_part:img_part6
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:ani_ctx3.canvas.height*(21/50),
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:ani_ctx3.canvas.height*(21/50),
    src:img_torpedo7,
    speed_x:-21,
    speed_y:0,
    part_x:320,
    part_y:298,
    angle:3.142,
    src_part:img_part7
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(21/50),
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:ani_ctx3.canvas.width*(21/50),
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo8,
    speed_x:0,
    speed_y:-19,
    part_x:-20,
    part_y:265,
    angle:-1.57,
    src_part:img_part1
}
];

canvas.addEventListener('click', getshotCoords);


msj.innerText = 'Your Turn';
console_user.appendChild(msj);
console_user.scrollTop = console_user.scrollHeight;

stageThree();



function stageThree(){

    buffer_vessels[0].v_al_rival=false;
    buffer_vessels[0].v_al_user=false;
  

    let msj = document.createElement('p');
    
    msj.innerText = 'Game Start!';
    console_user.appendChild(msj);
    console_user.scrollTop = console_user.scrollHeight;

    

    users_turn=true;

    for(let m=0;m<=12;m++){
	for(let n=0;n<=7;n++){
		matrix_for_user[m,n].push(0);
        matrix_for_rival[m,n].push(0); 
        matrix_discover_user[m,n].push(0);
        matrix_discover_rival[m,n].push(0);
	}
}

    

    buton_one.className = "";
    buton_one.src = "";
    buton_one.setAttribute("onclick", "");
    buton_one.style.display = "none";

    graphicMatrix(matrix_for_user);


}



function graphicMatrix(matrix){



    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    for(let c=0; c<=12; c++){
        for(let d=0; d<=7; d++){

                if(matrix[d][c]==0){
                    ctx.fillStyle = 'MidnightBlue';
                }else if((matrix[d][c]>0)&&(matrix[d][c]<=6)){
                    ctx.fillStyle = 'DimGray';
                }else if(matrix[d][c]==9){
                    ctx.fillStyle = 'MediumBlue';
                }
                
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

function  getshotCoords(event){

let win_result;

if(users_turn==false){
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

    let result = checkShot(click_y, click_x, 'user');


    if(result==true){

        users_turn=true;
        return;

    }else if(result===false){


        msj.innerText = 'No Ships Over There';

        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        msj.innerText = 'Now Is My Turn';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
        users_turn=false;
        graphicMatrix(matrix_for_user);
		
		

        setTimeout(() => rivalsTurn(), 1500);
		
		return;

    }else if((result>1)&&(result<=6)){


        msj.innerText = 'Hit! Fire In The Target.';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
        
		stateShips('rival', result);
		
        graphicMatrix(matrix_for_user);
        
        win_result = searchWinner('rival');

        if(win_result){
            return;
        }

        setTimeout(() => usersTurn(), 1500);

        return;
    }else if(result==='submarine'){

        msj.innerText = 'Hit! Fire In The Target.';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
        
		stateShips('rival', result);
		
        graphicMatrix(matrix_for_user);
        
        win_result = searchWinner('rival');

        if(win_result){
            return;
        }

        setTimeout(() => usersTurn(), 1500);
        
    }

}

function checkShot(y, x, player){

    switch(player){
		
	case 'user':

    if(matrix_discover_user[y][x]==1){

        return true;

    }else if(board_matrix_rows_rival[y][x]==0){

        matrix_for_user[y][x]=9;
        matrix_discover_user[y][x]=1;
        return false;

    }else if((board_matrix_rows_rival[y][x]>1)&&(board_matrix_rows_rival[y][x]<=6)){
       
        matrix_for_user[y][x]=board_matrix_rows_rival[y][x];
        matrix_discover_user[y][x]=1;
        return matrix_for_user[y][x];
		
	}else if(board_matrix_rows_rival[y][x]==1){

		matrix_for_user[y][x]=1;
        matrix_discover_user[y][x]=1;
        return 'submarine';
	}

    break;
	
	
	
	case 'rival':

    if(matrix_discover_rival[y][x]==1){
        return true;
    }else if(board_matrix_rows[y][x]==0){
        matrix_for_rival[y][x]=9;
        matrix_discover_rival[y][x]=1;
        return false;
    }else if((board_matrix_rows[y][x]>1)&&(board_matrix_rows[y][x]<=6)){
        matrix_for_rival[y][x]=board_matrix_rows[y][x];
        matrix_discover_rival[y][x]=1;
        return matrix_for_rival[y][x];
    }else if(board_matrix_rows[y][x]==1){

		matrix_for_rival[y][x]=1;
        matrix_discover_rival[y][x]=1;
        return 'submarine';
	}
	
	break;
	
	}

}

function animateShot(shot){

    

    monitor.appendChild(ani_canvas);
    ani_canvas.style.display = "block";

    if(shot===false){
        failhitAni(shot);
    }else if(shot!==false&&shot!=='submarine'){
        
        ani_canvas2.style.display = "block";
        img_vessel.src = buffer_vessels[shot-1].src_v;

        
        img_vessel.onload = function() {
            switch(shot){

                case 2:

                ani_ctx2.drawImage(img_vessel, 127, 60, 50, 116);

                break;

                case 3:
                
                ani_ctx2.drawImage(img_vessel, 127, 40, 50, 172);

                break;

                case 4:
                
                ani_ctx2.drawImage(img_vessel, 127, 7, 50, 230);

                break;

                case 5:
                
                ani_ctx2.drawImage(img_vessel, 127, 4, 50, 245);

                break;

                case 6:
                
                ani_ctx2.drawImage(img_vessel, 105, 4, 100, 245);

                break;

            }
        }
        

    failhitAni(shot);
    setTimeout(() => clearAni(), 1500);
    

    }else if(shot==='submarine'){

        ani_canvas2.style.display = "block";
        

       
        ani_ctx2.drawImage(img_vessel_sub, 127, 100, 50, 50);
        
        failhitAni(shot);
        setTimeout(() => clearAni(), 1500);   
    }

    

    
}





function rivalsTurn(){


    users_turn=false;

    let y1;
    let x1;

    let result;
    let win_result;

    let coords = defineOption();
    flag_dir = coords.dir;

    if(coords.result==false){

    do{
		
	y1 = getRandomInt2(0, 7);
    x1 = getRandomInt2(0, 12);
    result = checkShot(y1, x1, 'rival');

    
	

    }while(result==true);

    }else if(coords.result==true){

        

        y1 = coords.click_y;
        x1 = coords.click_x;
        result = checkShot(y1, x1, 'rival');

    }

    if(result==false){

        msj.innerText = 'No Ships Over There';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);

        flag_dir=false;
        
        graphicMatrix(matrix_for_rival);

        setTimeout(() => usersTurn(), 1500);
		return;

    }else if((result>1)&&(result<=6)){

        msj.innerText = 'Hit! Fire In The Target.';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
		
        stateShips('user', result);
        
		
        graphicMatrix(matrix_for_rival);

        win_result = searchWinner('user');

        if(win_result){
            return;
        }

        setTimeout(() => rivalsTurn(), 1500);
        return;

    }else if(result==='submarine'){

        msj.innerText = 'Hit! Fire In The Target.';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
		
		stateShips('user', result);
		
        graphicMatrix(matrix_for_rival);

        win_result = searchWinner('user');

        if(win_result){
            return;
        }

        setTimeout(() => rivalsTurn(), 1500);
        return;
    }

}

function usersTurn(){

	
    users_turn=true;

    graphicMatrix(matrix_for_user);

    msj.innerText = 'Your Turn';
    console_user.appendChild(msj);
    console_user.scrollTop = console_user.scrollHeight;
}

function stateShips(player, vessel){
        let result;
        let msj;

        if((vessel>1)&&(vessel<=6)){
		result = countShip(player, vessel);
        }else if(vessel==='submarine'){

            switch(player){

                case 'user':
                flag_submarine_rival=true;
                buffer_vessels[0].sinked_user=true;
                msj = document.createElement('p');
                msj.innerHTML = `<span style=color:blue;font-weight:bold;>`+buffer_vessels[0].name_user+`</span> of <span style='color:MediumBlue;font-weight:bold;'>`+player+`</span> has been sunk`;
                console_user.appendChild(msj);
                console_user.scrollTop = console_user.scrollHeight;
                break;

                case 'rival':


                


                msj = document.createElement('p');
                msj.innerHTML = `<span style=color:OrangeRed;font-weight:bold;>`+buffer_vessels[0].name_rival+`</span> of <span style='color:OrangeRed;font-weight:bold;'>`+player+`</span> has been sunk`;
                console_user.appendChild(msj);
                

                console_user.scrollTop = console_user.scrollHeight;
                flag_submarine_user=true;
                buffer_vessels[0].sinked_rival=true;
                break;

            }

            

            
            return;

        }

		if(result){

            

            switch(player){

                case 'user':

                    buffer_vessels[vessel-1].sinked_user=true;

                    msj = document.createElement('p');
                msj.innerHTML = `<span style=color:blue;font-weight:bold;>`+buffer_vessels[vessel-1].name_user+`</span> of <span style='color:MediumBlue;font-weight:bold;'>`+player+`</span> has been sunk`;
                console_user.appendChild(msj);
                    msj_red = document.createElement('p');
                    console_user.scrollTop = console_user.scrollHeight;

                break;

                case 'rival':

                    buffer_vessels[vessel-1].sinked_rival=true;

                    msj = document.createElement('p');
                msj.innerHTML = `<span style=color:OrangeRed;font-weight:bold;>`+buffer_vessels[vessel-1].name_rival+`</span> of <span style='color:OrangeRed;font-weight:bold;'>`+player+`</span> has been sunk`;
                console_user.appendChild(msj);
                    console_user.scrollTop = console_user.scrollHeight;

                break;

            }
        
			
        }
        

		
}

function countShip(playe, n){
	
	let result=false;
	let cont1_ship=0;
	
	switch(playe){
	
		case 'user':

			for(let a=0;a<=7;a++){
				for(let b=0;b<=12;b++){
					if(matrix_for_rival[a][b]==n){
						cont1_ship++;
					}
				}
			}
		
		break;
		
		case 'rival':
		
			for(let a=0;a<=7;a++){
				for(let b=0;b<=12;b++){
					if(matrix_for_user[a][b]==n){
						cont1_ship++;
					}
				}
			}
		
		break;
	
	}
	
	if((n>0)&&(n<6)){
		if(cont1_ship==n){
			result = true;	
		}
	}else if(n==6){
		if(cont1_ship==8){
			result = true;	
		}
	}
		
	
	
	return result;
}

function defineOption(){

    for(let a=0;a<=7;a++){

        for(let b=0;b<=12;b++){

            if((matrix_for_rival[a][b]>0)&&(matrix_for_rival[a][b]<=6)){

                switch(flag_dir){

                case 'up':

                try{

                if(matrix_for_rival[a-1][b]==0){

                        let coords = {
                            'click_y':(a-1),
                            'click_x':b,
                            'dir':'up',
                            'result':true
                        }

                        return coords;
                }

                }catch(err1){
                }

                break;

                case 'down':

                try{

                    if(matrix_for_rival[a+1][b]==0){
        
                            let coords = {
                                'click_y':(a+1),
                                'click_x':b,
                                'dir':'down',
                                'result':true
                            }
        
                            return coords;
                        }
        
                }catch(err2){
                }

                break;

                case 'left':

                try{

                    if(matrix_for_rival[a][b-1]==0){
                
                            let coords = {
                                'click_y':a,
                                'click_x':(b-1),
                                'dir':'left',
                                'result':true
                            }
                
                            return coords;
                    }
                
                }catch(err3){
                }

                break;

                case 'right':

                try{

                    if(matrix_for_rival[a][b+1]==0){
        
                            let coords = {
                                'click_y':a,
                                'click_x':(b+1),
                                'dir':'right',
                                'result':true
                            }
        
                            return coords;
                    }
        
                }catch(err4){
                }

                break;

                case false:

                    try{

                        if(matrix_for_rival[a-1][b]==0){
        
                                let coords = {
                                    'click_y':(a-1),
                                    'click_x':b,
                                    'dir':'up',
                                    'result':true
                                }
        
                                return coords;
                        }
        
                        }catch(err1){
                        }

                        try{

                            if(matrix_for_rival[a+1][b]==0){
                
                                    let coords = {
                                        'click_y':(a+1),
                                        'click_x':b,
                                        'dir':'down',
                                        'result':true
                                    }
                
                                    return coords;
                                }
                
                        }catch(err2){
                        }

                        try{

                            if(matrix_for_rival[a][b-1]==0){
                        
                                    let coords = {
                                        'click_y':a,
                                        'click_x':(b-1),
                                        'dir':'left',
                                        'result':true
                                    }
                        
                                    return coords;
                            }
                        
                        }catch(err3){
                        }

                        try{

                            if(matrix_for_rival[a][b+1]==0){
                
                                    let coords = {
                                        'click_y':a,
                                        'click_x':(b+1),
                                        'dir':'right',
                                        'result':true
                                    }
                
                                    return coords;
                            }
                
                        }catch(err4){
                        }

                break;

            }       


            }

        }

    }

    let coords = {
        'click_y':false,
        'click_x':false,
        'dir':false,
        'result':false
    }

    return coords;

}

function searchWinner(player){

    let cont_win=0;

    switch(player){

        case 'user':
        
        for(let p=0;p<=5;p++){
            if(buffer_vessels[p].sinked_user===true){
                cont_win++;
            }
        }

        break;

        case 'rival':

            for(let p=0;p<=5;p++){
                if(buffer_vessels[p].sinked_rival===true){
                    cont_win++;
                }
            }

        break;
    }

let win_result;

    if(cont_win===6){
        win_result = endGame(player);
    }else{
        win_result = false;
    }

    return win_result;
}

function endGame(player){

    switch(player){

        case 'user':
        alert('Rival has defeated you!');
        break;

        case 'rival':
        alert('You have defeated Rival!');
        break;

    }

    return true;

}

function waves(){

	ani_ctx.fillStyle = "MediumBlue";
	ani_ctx.fillRect(0, 0, ani_canvas.width, ani_canvas.height);

	ani_ctx.beginPath();
	ani_ctx.strokeStyle = 'RoyalBlue';
	ani_ctx.lineWidth = 5;
	ani_ctx.lineCap = "round";


    
	time++;
	
	if(time===15){
		time=0;
	}


for(let b=0;b<=17;b++){
	for(let a=0;a<=9;a++){
        ani_ctx.beginPath();
        ani_ctx.moveTo(a*30, b*15+time);
        ani_ctx.quadraticCurveTo((a*30)+15, ((b-1)*15)+time, (30+(a*30)), (b*15)+time);
        ani_ctx.stroke();
	}
}
}

function clearAni(){

    ani_ctx2.clearRect(0, 0, ani_ctx2.canvas.width, ani_ctx2.canvas.height);

}



function failhitAni(op){

    let point;

    ani_canvas3.style.display = "block";

    point = getRandomInt2(0, 7);

    if(op!==false&&op!=='submarine'){

        do{
        point = getRandomInt2(0, 7);
        }while(point===5||point===7);

    }

    torpedo[point].x = torpedo[point].x_ini;
    torpedo[point].y = torpedo[point].y_ini;


    let iden = setInterval(function() {  

            clearaniTor();

            drawTor(point);

            newPos(point);

        }, 100);

    setTimeout(()=>{

        clearInterval(iden);

        clearaniTor();

    }, 1500);

    if(op!==false){

    setTimeout(()=>{

        clearInterval(iden);

        drawPart(point);

        clearaniTor();

    }, 750);

    }

}

function clearaniTor(){

    ani_ctx3.clearRect(0, 0, ani_ctx3.canvas.width, ani_ctx3.canvas.height);

}



function drawTor(n3){
    ani_ctx3.drawImage(torpedo[n3].src, torpedo[n3].x, torpedo[n3].y, torpedo[n3].w, torpedo[n3].h);
}

function newPos(n4){
    torpedo[n4].x += torpedo[n4].speed_x;
    torpedo[n4].y += torpedo[n4].speed_y;
}


function drawPart(op){

    

    ani_canvas4.style.display = "block";

    let iden;

    cont_part=0;

    iden = setInterval(function() {  
        ani_ctx4.save();
        drawParts(op);
        ani_ctx4.restore();
    }, 107);

    

    setTimeout(()=>{

        clearInterval(iden);
        ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
        
    }, 750);

}

function drawParts(opt){

    cont_part++;
    ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    
    
    ani_ctx4.translate(torpedo[opt].part_x, torpedo[opt].part_y);
    ani_ctx4.rotate(torpedo[opt].angle);
    ani_ctx4.drawImage(torpedo[cont_part].src_part, ani_ctx4.canvas.width/2, ani_ctx4.canvas.height/2, 100, 100);
    
    if(cont_part===7){
    ani_ctx4.restore();
    ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    }
}
