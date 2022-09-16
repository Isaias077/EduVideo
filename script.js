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
  SpawnPoints.length > 10 ?
    console.warn(
      "Atencion: No se recomienda usar más de 10 puntos de aparición. Debido a que puede afectar el rendimiento de la pagina."
    ) : null

  if (SpawnPoints[0] !== "empty") {
    videoPoints(SpawnPoints);
  }
  if (PausePoints[0] !== "empty") {
    videoPause(PausePoints);
  }
}

/**
* This function defines pause points
* @param {array} PausePoints 
*/
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

/**
* This function defines spawn points
* @param {array} points 
*/
function videoPoints(points) {
  setInterval(() => {
    time = video.currentTime;
    points.forEach((point) => {
      let elementDOM = document.getElementById(point.element);
      setPoint(time, point.initialTime, point.finalTime, elementDOM);
    });
  }, 1000);
}

/**
* This function control display of elements
* @param {number} time 
* @param {number} initialTime 
* @param {number} finalTime 
* @param {DOMElement} element 
*/
function setPoint(time, initialTime, finalTime, element) {
  try {
    if (time > initialTime && time < finalTime) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  } catch (error) {}
}

/**
* This function pause and play the video
*/
function videoToggle() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
