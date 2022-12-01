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

// Global variables

interface ISpawnPoint {
  time: number;
  contentToShow: string;
}

interface IOptions {
  VideoID: string;
  SpawnPoints: Array<ISpawnPoint>;
}

class Video {
  public videoID: string;
  public videoElement: HTMLVideoElement;
  public pausePoints: Array<ISpawnPoint> = [];

  constructor(videoId: string = "video"){
    this.videoID = videoId;
    this.videoElement = document.getElementById(this.videoID) as HTMLVideoElement;
  }

  public setVideoID(id: string): void{
    this.videoID = id;
    this.getVideo();
  }
  private getVideo(): void{
    this.videoElement = document.getElementById(this.videoID) as HTMLVideoElement;
  }
  public play(): void{
    this.videoElement.play();
  }
  public pause(): void{
    this.videoElement.pause();
  }
  public onTimeUpdate(callback: () => void): void{
    this.videoElement.addEventListener("timeupdate", callback);
  }
  public setPausePoints(points: Array<ISpawnPoint>): void{
    this.pausePoints = points;
  }
}

class Modal {
  public modalID: string;
  public modalElement: HTMLDivElement;

  constructor(modalId: string = "modal"){
    this.modalID = modalId;
    this.modalElement = document.getElementById(this.modalID) as HTMLDivElement;
  }

  private createModal(){
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
  }

  public setModalID(id: string){
    this.modalID = id;
    this.createModal();
  }

  public show(id: string){
    this.addButtonExit();
    this.modalElement.appendChild(document.getElementById(id) as HTMLDivElement);
    let content = document.getElementById(id) as HTMLDivElement;
    content.style.display = "block";
    this.modalElement.style.display = "block";
  }
  public hide(){
    this.modalElement.style.display = "none";
    this.modalElement.innerHTML = "";
    video.play();
  }

  private addButtonExit() {
    let button = document.createElement("button");
    button.innerHTML = "text";
    button.onclick = () => {
      this.hide();
    };
    this.modalElement.appendChild(button);
  }
}

let video = new Video();
let modal = new Modal();

/**
 * Main function to initialize the script
 * @param options
 */

function EduVideo(options: IOptions) {
  video.setVideoID(options.VideoID);
  if (options.SpawnPoints.length > 30) {
    console.error("Attention: We not recommended use more than 30 points. They can provoke poor performance.");
    return
  }
  video.setPausePoints(options.SpawnPoints);
  modal.setModalID("modal");
  for(let i = 0; i < video.pausePoints.length; i++){
    let element = document.getElementById(video.pausePoints[i].contentToShow) as HTMLDivElement;
    element.style.display = "none";
  }
  StopVideoOnTime();
}


function StopVideoOnTime() {
  video.onTimeUpdate(function () {
    video.pausePoints.forEach((point) => {
      if (Math.round(video.videoElement.currentTime) === point.time) {
        video.pause();
        modal.show(point.contentToShow);
        video.pausePoints.splice(video.pausePoints.indexOf(point), 1);
      }
    });
  });
}
