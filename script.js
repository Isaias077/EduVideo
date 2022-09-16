/**

 * @fileoverview Menú aprMenu, desplegable con efecto expansión suavizado

 *

 * @version 1.0

 *

 * @author Isaías Yafar <abdel07noguera@gmail.com>

 * @copyright www.namus.ar

 *

 * History

 * v1.0 – Se mejoró la compatibilidad con navegadores Opera

 * ----

 * La primera versión de aprMenu fue escrita por Isaías Yafar

        */

// Global variables
let video = null;
let time = 0;
let isPausedStatus = false;

// Functions
function EduVideo({
  VideoID = "video",
  SpawnPoints = [{ element: "idElemento", initialTime: 0, finalTime: 0 }],
  PausePoints = [{ element: "idElemento", initialTime: 0, isPause: false }],
}) {
  video = document.getElementById(VideoID);
  if (SpawnPoints.length > 10) {
    console.warn(
      "Atencion: No se recomienda usar más de 10 puntos de aparición. Debido a que puede afectar el rendimiento de la pagina."
    );
  }
  videoPoints(SpawnPoints);
}

function videoPoints(points) {
  setInterval(() => {
    time = video.currentTime;
    points.forEach((point) => {
      let elementDOM = document.getElementById(point.element);
      setPoint(time, point.initialTime, point.finalTime, elementDOM);
    });
  }, 1000);
}

function setPoint(time, initialTime, finalTime, element) {
  if (time > initialTime && time < finalTime) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function videoToggle() {
  if (video.paused) {
    video.play();
    return true;
  } else {
    video.pause();
    return false;
  }
}
