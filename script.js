/**

 * @fileoverview Library for creating and managing HTML5 video elements.

 *

 * @version 0.5

 *

 * @author Isaías Yafar <abdel07noguera@gmail.com>

 *

 * History

 * v0.5 – Improved the compatibility with Opera navigators

 * ----

 * The first version of EduVideo was written by Isaías Yafar

        */
var Video = /** @class */ (function () {
    function Video(videoId) {
        if (videoId === void 0) { videoId = "video"; }
        this.pausePoints = [];
        this.videoID = videoId;
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
    Video.prototype.onTimeUpdate = function (callback) {
        this.videoElement.addEventListener("timeupdate", callback);
    };
    Video.prototype.setPausePoints = function (points) {
        this.pausePoints = points;
    };
    return Video;
}());
var Modal = /** @class */ (function () {
    function Modal(modalId) {
        if (modalId === void 0) { modalId = "modal"; }
        this.modalID = modalId;
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
    Modal.prototype.addButtonExit = function () {
        var _this = this;
        var button = document.createElement("button");
        button.innerHTML = "text";
        button.onclick = function () {
            _this.hide();
        };
        this.modalElement.appendChild(button);
    };
    return Modal;
}());
var video = new Video();
var modal = new Modal();
/**
 * Main function to initialize the script
 * @param options
 */
function EduVideo(options) {
    video.setVideoID(options.VideoID);
    if (options.SpawnPoints.length > 30) {
        console.error("Attention: We not recommended use more than 30 points. They can provoke poor performance.");
        return;
    }
    video.setPausePoints(options.SpawnPoints);
    modal.setModalID("modal");
    for (var i = 0; i < video.pausePoints.length; i++) {
        var element = document.getElementById(video.pausePoints[i].contentToShow);
        element.style.display = "none";
    }
    StopVideoOnTime();
}
function StopVideoOnTime() {
    video.onTimeUpdate(function () {
        video.pausePoints.forEach(function (point) {
            if (Math.round(video.videoElement.currentTime) === point.time) {
                video.pause();
                modal.show(point.contentToShow);
                video.pausePoints.splice(video.pausePoints.indexOf(point), 1);
            }
        });
    });
}
