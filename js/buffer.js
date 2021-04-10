const console_user=document.getElementById("console_user"),
buton_one=document.getElementById("buton_one");

let ani_canvas_el = document.createElement('canvas');
ani_canvas_el.setAttribute("wdith", "250px");
ani_canvas_el.setAttribute("height", "250px");
ani_canvas_el.setAttribute("style", "box-shadow:0 0 40px 30px DarkCyan;cursor:none;display:none;position:absolute;z-index:1;");
ani_canvas_el.setAttribute("id", "ani_canvas");

monitor.appendChild(ani_canvas_el);


const ani_canvas = document.getElementById("ani_canvas");

let ani_canvas_el2 = document.createElement('canvas');
ani_canvas_el2.setAttribute("wdith", "250px");
ani_canvas_el2.setAttribute("height", "250px");
ani_canvas_el2.setAttribute("style", "box-shadow:0 0 40px 30px DarkCyan;cursor:none;display:none;position:absolute;z-index:2;");
ani_canvas_el2.setAttribute("id", "ani_canvas2");

monitor.appendChild(ani_canvas_el2);


const ani_canvas2 = document.getElementById("ani_canvas2");

let ani_canvas_el3 = document.createElement('canvas');
ani_canvas_el3.setAttribute("wdith", "250px");
ani_canvas_el3.setAttribute("height", "250px");
ani_canvas_el3.setAttribute("style", "box-shadow:0 0 40px 30px DarkCyan;cursor:none;display:none;position:absolute;z-index:3;");
ani_canvas_el3.setAttribute("id", "ani_canvas3");

monitor.appendChild(ani_canvas_el3);


const ani_canvas3 = document.getElementById("ani_canvas3");

let buffer_vessels = [
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:false
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    v_al_user:'',
    v_al_rival:''
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

    console_user.style.opacity = .8;

}

function playConsole(){
    console_user.style.height = '40px';

    console_user.addEventListener('mouseenter', readConsole);

    console_user.style.opacity = 1;
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