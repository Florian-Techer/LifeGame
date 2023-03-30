window.addEventListener("DOMContentLoaded", setDevice, false);

function setDevice(){
  let DIM_HEIGHT;
  let DIM_WIDTH;

  if(screen.width < 601){
    DIM_HEIGHT = Math.round((screen.height - (Math.round((screen.height * 40) / 100)))/5)//Math.round((screen.height - (Math.round((screen.height * 20) / 100)))/10) //Math.round(screen.height - (Math.round((screen.height * 20) / 100)));
    DIM_WIDTH = Math.round((screen.width - (Math.round((screen.width * 20) / 100)))/5);
  }else{
    DIM_HEIGHT = 50;
    DIM_WIDTH = Math.round(screen.width / 10);
  }

  run(DIM_HEIGHT, DIM_WIDTH)
}

function run(DIM_HEIGHT, DIM_WIDTH) {
  let monde;

  function initTabHtml() {
    let table = document.createElement("table");
    document.body.insertBefore(
      table,
      document.querySelector("#buttonContainer")
    );
    for (let i = 0; i < DIM_HEIGHT; i++) {
      let tr = document.createElement("tr");
      table.appendChild(tr);
      for (let j = 0; j < DIM_WIDTH; j++) {
        let td = document.createElement("td");
        if (i > 0 && j > 0 && i < DIM_HEIGHT - 1 && j < DIM_WIDTH - 1) {
          td.addEventListener("click", swapState, false);
        }
        tr.appendChild(td);
      }
    }
  }

  function swapState() {
    let cellules = document.querySelectorAll("td");
    for (let i = 0; i < DIM_HEIGHT; i++) {
      for (let j = 0; j < DIM_WIDTH; j++) {
        if (cellules[i * DIM_HEIGHT + j] == this) {
          monde[i][j] = !monde[i][j];
          afficheMonde();
        }
      }
    }
  }

  function initMonde() {
    monde = [];
    for (let i = 0; i < DIM_HEIGHT; i++) {
      monde[i] = [];
      for (let j = 0; j < DIM_WIDTH - 1; j++) {
        monde[i][j] = false;
      }
    }
  }

  function initEtatCellules() {
    for (let i = 1; i < DIM_HEIGHT - 1; i++) {
      monde[i] = [];
      for (let j = 1; j < DIM_WIDTH - 1; j++) {
        monde[i][j] = Math.random() < 0.5;
      }
    }
  }

  function afficheMonde() {
    let cellules = document.querySelectorAll("td");
    for (let i = 0; i < DIM_HEIGHT; i++) {
      for (let j = 0; j < DIM_WIDTH; j++) {
        if (monde[i][j]) {
          cellules[i * DIM_WIDTH + j].setAttribute("class", "vivante");
        } else {
          cellules[i * DIM_WIDTH + j].setAttribute("class", "morte");
        }
      }
    }
  }

  function cycle() {
    let monde2 = [];
    for (let i = 1; i < DIM_HEIGHT - 1; i++) {
      monde2[i] = [];
      for (let j = 1; j < DIM_WIDTH - 1; j++) {
        let voisines = 0;
        if (monde[i - 1][j - 1]) {
          voisines++;
        }
        if (monde[i - 1][j]) {
          voisines++;
        }
        if (monde[i - 1][j + 1]) {
          voisines++;
        }
        if (monde[i][j + 1]) {
          voisines++;
        }
        if (monde[i + 1][j + 1]) {
          voisines++;
        }
        if (monde[i + 1][j]) {
          voisines++;
        }
        if (monde[i + 1][j - 1]) {
          voisines++;
        }
        if (monde[i][j - 1]) {
          voisines++;
        }
        if (!monde[i][j]) {
          if (voisines == 3) {
            monde2[i][j] = true;
          } else {
            monde2[i][j] = false;
          }
        } else {
          if (voisines == 2 || voisines == 3) {
            monde2[i][j] = true;
          } else {
            monde2[i][j] = false;
          }
        }
      }
    }
    for (let i = 1; i < DIM_HEIGHT - 1; i++) {
      for (let j = 1; j < DIM_WIDTH - 1; j++) {
        monde[i][j] = monde2[i][j];
      }
    }
  }

  function time() {
    cycle();
    afficheMonde();
  }

  initTabHtml();
  initMonde();
  initEtatCellules();
  afficheMonde();

  startBtn = document.getElementById("start");
  stopBtn = document.getElementById("stop");
  restartBtn = document.getElementById("restart");
  clearBtn = document.getElementById("clear");
  let timer;

  startBtn.addEventListener("click", () => {
    timer = setInterval(time, 100);
  });

  stopBtn.addEventListener("click", () => {
    timer = clearInterval(timer);
  });

  restartBtn.addEventListener("click", () => {
    initMonde();
    initEtatCellules();
    afficheMonde();
    timer = clearInterval(timer);
  });

  clearBtn.addEventListener("click", () => {
    for (let i = 1; i < DIM_HEIGHT - 1; i++) {
      for (let j = 1; j < DIM_WIDTH - 1; j++) {
        monde[i][j] = false;
        afficheMonde();
      }
    }
  });
}
