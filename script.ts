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

// Global variables

interface ISpawnPoint {
  time: number;
  content: string;
}

interface IOptions {
  VideoID: string;
  SpawnPoints: Array<ISpawnPoint>;
}

class Video {
  constructor(){
    this.videoID = "video";
    this.videoElement = document.getElementById(this.videoID) as HTMLVideoElement;
  }  

  public videoID: string;
  public videoElement: HTMLVideoElement;
  public pausePoints: Array<ISpawnPoint> = [];
  
  public setVideoID(id: string){
    this.videoID = id;
    this.getVideo();
  }
  private getVideo(){
    this.videoElement = document.getElementById(this.videoID) as HTMLVideoElement;
  }
  public play(){
    this.videoElement.play();
  }
  public pause(){
    this.videoElement.pause();
  }
  public onEnded(callback: any){
    this.videoElement.onended = callback;
  }
  public onPlay(callback: any){
    this.videoElement.onplay = callback;
  }
  public onTimeUpdate(callback: any): void{
    this.videoElement.addEventListener("timeupdate", callback);
  }
  public setPausePoints(points: Array<ISpawnPoint>){
    this.pausePoints = points;
  }
}

class Modal {
  constructor(){
    this.modalID = "modal";
    this.modalElement = document.getElementById(this.modalID) as HTMLDivElement;
  }

  public modalID: string;
  public modalElement: HTMLDivElement;

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
  
  private addButtonExit() {
    let button = document.createElement("button");
    button.innerHTML = "text";
    button.onclick = () => {
      this.hide();
    };
    this.modalElement.appendChild(button);
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
}

let video = new Video();
let modal = new Modal();

/**
 * Main function to initialize the script
 * @param {Object} 
 */

function EduVideo(options: IOptions) {
  video.setVideoID(options.VideoID);
  if (options.SpawnPoints.length > 30) {
    console.error(
      "Atencion: No se recomienda usar más de 30 puntos de aparición. Debido a que puede afectar el rendimiento de la pagina."
    );
    return;
  }
  video.setPausePoints(options.SpawnPoints);
  modal.setModalID("modal");
  for(let i = 0; i < video.pausePoints.length; i++){
    let element = document.getElementById(video.pausePoints[i].content) as HTMLDivElement;
    element.style.display = "none";
  }
  StopVideoOnTime();
}


function StopVideoOnTime() {
  video.onTimeUpdate(function () {
    video.pausePoints.forEach((point) => {
      if (Math.round(video.videoElement.currentTime) === point.time) {
        video.pause();
        modal.show(point.content);
        video.pausePoints.splice(video.pausePoints.indexOf(point), 1);
      }
    });
  });
}