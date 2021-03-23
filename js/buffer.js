const console_user=document.getElementById("console_user"),
buton_one=document.getElementById("buton_one");

let buffer_vessels = [
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:''
    }
];

let flag_end_start=false;

let canvas = document.getElementById("canvas");

let load_zone = document.getElementById('load_zone');

const ctx = canvas.getContext("2d");

console_user.addEventListener('mouseenter', readConsole);



let board_matrix_rows_rival = [
    [],[],[],[],[],[],[],[]
    ];

let board_matrix_rows = [
    [],[],[],[],[],[],[],[]
    ];

function readConsole(){
    console_user.style.height = '200px';

    console_user.addEventListener('mouseleave', playConsole);

}

function playConsole(){
    console_user.style.height = '40px';

    console_user.addEventListener('mouseenter', readConsole);
}

function loadstgOne(){

scr1 = document.createElement("script");
scr1.setAttribute('src', 'js/stg1.js');

load_zone.appendChild(scr1);



}

function loadstgTwo(){

load_zone.removeChild(scr1);

scr2 = document.createElement('script');
scr2.setAttribute('src', 'js/stg2.js');

load_zone.appendChild(scr2);
    
}

function loadstgThree(){

    load_zone.removeChild(scr2);
    
    scr3 = document.createElement('script');
    scr3.setAttribute('src', 'js/stg3.js');
    
    load_zone.appendChild(scr3);
        
}

loadstgOne();