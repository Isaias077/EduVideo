# EduVideo
Library for video magnament, usually for educational purposes

## Table of Contents
- Quick Start
- Contributing
- Licence

## Quick Start

CDN hosted version of EduVide.js that anyone can use. Add these tags to your document's `<head>`
```
<script src="namus.ar/script.js"></script>
```
Next, using EduVideo.js is as simple as creating `<video>` element.
```
<video
    src="beatifulVideo.mp4"
    id="my-video"
    controls
    preload="auto"
    poster="https://cdn.pixabay.com/photo/2018/04/26/12/14/travel-3351825_960_720.jpg"
>
your browser does not support the video tag
</video>
```
Now, it is time to config our script. We have a function called EduVideo, this function receives as parameter an object.

This object have two parameters:
- `VideoID` _of type string_
- `SpawnPoints` _of type array_

`VideoID` Here, we indicate the ID of our video element.

`SpawnPoints` Indicates the "pause points".
```
SpawnPoints: [
   ....
],
```
A "pause points" is an object that contains two values:
- `time` : Which indicates in which second of the video it has to pause
- `content`: Here you enter the id of what you want to appear when you pause the video.

Our script would look like this:
```
<script>
      EduVideo({
        VideoID: "videoTest",
        SpawnPoints: [
          { time: 3, content: "modal1" }, // The video will pause in the second 3 and show the div «modal1»
          { time: 6, content: "modal2" },
        ],
      });
</script>
```
## Contributing

EduVideo.js is a free and open source library, and we appreciate any help you're willing to give - whether it's fixing bugs, improving documentation, or suggesting new features!

## License
EduVide.js is licenced under the LGPL-2.1 License
