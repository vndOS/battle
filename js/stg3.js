let users_turn=false, matrix_for_user, matrix_for_rival, matrix_discover_rival, matrix_discover_user,
flag_submarine_user=false, flag_submarine_rival=false, flag_dir;

const ani_ctx = ani_canvas.getContext("2d");



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



canvas.addEventListener('click', getshotCoords);


msj.innerText = 'Your Turn';
console_user.appendChild(msj);
console_user.scrollTop = console_user.scrollHeight;

stageThree();



function stageThree(){

    let msj = document.createElement('p');
    let msj_red;
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

users_turn=false;

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

    }else if(result==false){


        msj.innerText = 'No Ships Over There';

        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        msj.innerText = 'Now Is My Turn';
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;

        animateShot(result);
    
        graphicMatrix(matrix_for_user);
		
		

        setTimeout(() => rivalsTurn(), 500);
		
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

        setTimeout(() => usersTurn(), 500);

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

        setTimeout(() => usersTurn(), 500);

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

    ani_ctx.fillStyle = 'Navy';
    ani_ctx.fillRect(0, 0, ani_canvas.width, ani_canvas.height);

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

        setTimeout(() => usersTurn(), 500);
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

        setTimeout(() => rivalsTurn(), 500);
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

        setTimeout(() => rivalsTurn(), 500);
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

