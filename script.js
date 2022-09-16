/**

 * @fileoverview Library for creating and managing HTML5 video elements.

 *

 * @version 0.5

 *

 * @author Isaías Yafar <abdel07noguera@gmail.com>

 * @copyright www.namus.ar

 *

 * History

 * v0.5 – Se mejoró la compatibilidad con navegadores Opera

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
  SpawnPoints = ["empty"],
  PausePoints = ["empty"],
}) {
  video = document.getElementById(VideoID);
  if (SpawnPoints.length > 10) {
    console.warn(
      "Atencion: No se recomienda usar más de 10 puntos de aparición. Debido a que puede afectar el rendimiento de la pagina."
    );
  }
  if (SpawnPoints[0] !== "empty") {
    videoPoints(SpawnPoints);
  }
  if (PausePoints[0] !== "empty") {
    videoPause(PausePoints);
  }
}

function videoPause(PausePoints) {
  setInterval(() => {
    time = video.currentTime;
    PausePoints.forEach((point) => {
      if (point !== "empty" && point.pauseTime === Math.round(time)) {
        video.pause();
      }
    });
  }, 1000);
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
  try {
    if (time > initialTime && time < finalTime) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  } catch (error) {}
}

function videoToggle() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
