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

 * La primera versión de EduVideo fue escrita por Isaías Yafar

        */
var Video = /** @class */ (function () {
    function Video() {
        this.pausePoints = [];
        this.videoID = "video";
        this.videoElement = document.getElementById(this.videoID);
    }
    Video.prototype.setVideoID = function (id) {
        this.videoID = id;
        this.getVideo();
    };
    Video.prototype.getVideo = function () {
        this.videoElement = document.getElementById(this.videoID);
    };
    Video.prototype.play = function () {
        this.videoElement.play();
    };
    Video.prototype.pause = function () {
        this.videoElement.pause();
    };
    Video.prototype.onEnded = function (callback) {
        this.videoElement.onended = callback;
    };
    Video.prototype.onPlay = function (callback) {
        this.videoElement.onplay = callback;
    };
    Video.prototype.onTimeUpdate = function (callback) {
        this.videoElement.addEventListener("timeupdate", callback);
    };
    Video.prototype.setPausePoints = function (points) {
        this.pausePoints = points;
    };
    return Video;
}());
var Modal = /** @class */ (function () {
    function Modal() {
        this.modalID = "modal";
        this.modalElement = document.getElementById(this.modalID);
    }
    Modal.prototype.createModal = function () {
        this.modalElement = document.createElement("div");
        this.modalElement.id = this.modalID;
        this.modalElement.className = "modal";
        this.modalElement.style.display = "none";
        this.modalElement.style.position = "fixed";
        this.modalElement.style.zIndex = "1";
        this.modalElement.style.left = "0";
        this.modalElement.style.top = "0";
        this.modalElement.style.width = "100%";
        this.modalElement.style.height = "100%";
        this.modalElement.style.overflow = "auto";
        this.modalElement.style.backgroundColor = "rgb(0,0,0)";
        this.modalElement.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.body.appendChild(this.modalElement);
    };
    Modal.prototype.addButtonExit = function () {
        var _this = this;
        var button = document.createElement("button");
        button.innerHTML = "text";
        button.onclick = function () {
            _this.hide();
        };
        this.modalElement.appendChild(button);
    };
    Modal.prototype.setModalID = function (id) {
        this.modalID = id;
        this.createModal();
    };
    Modal.prototype.show = function (id) {
        this.addButtonExit();
        this.modalElement.appendChild(document.getElementById(id));
        var content = document.getElementById(id);
        content.style.display = "block";
        this.modalElement.style.display = "block";
    };
    Modal.prototype.hide = function () {
        this.modalElement.style.display = "none";
        this.modalElement.innerHTML = "";
        video.play();
    };
    return Modal;
}());
var video = new Video();
var modal = new Modal();
/**
 * Main function to initialize the script
 * @param {Object}
 */
function EduVideo(options) {
    video.setVideoID(options.VideoID);
    if (options.SpawnPoints.length > 30) {
        console.error("Atencion: No se recomienda usar más de 30 puntos de aparición. Debido a que puede afectar el rendimiento de la pagina.");
        return;
    }
    video.setPausePoints(options.SpawnPoints);
    modal.setModalID("modal");
    for (var i = 0; i < video.pausePoints.length; i++) {
        var element = document.getElementById(video.pausePoints[i].content);
        element.style.display = "none";
    }
    StopVideoOnTime();
}
function StopVideoOnTime() {
    video.onTimeUpdate(function () {
        video.pausePoints.forEach(function (point) {
            if (Math.round(video.videoElement.currentTime) === point.time) {
                video.pause();
                modal.show(point.content);
                video.pausePoints.splice(video.pausePoints.indexOf(point), 1);
            }
        });
    });
}
