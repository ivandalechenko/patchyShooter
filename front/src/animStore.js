import { makeAutoObservable } from 'mobx';


class AnimStore {

    framesPerRow = 8
    fps = 30
    framesCount = 61
    shotFramesCount = 21
    bearShotFramesCount = 21

    shotTrigger = 0;
    shotBearTrigger = 0;
    isBlink = false;

    constructor() {
        makeAutoObservable(this);
    }

    shot() {
        console.log('shot try');

        if (this.shotTrigger !== 0) return
        if (this.shotBearTrigger !== 0) return
        console.log('shot');
        // this.shotTrigger = Math.random()
        this.shotBearTrigger = Math.random()
    }
    shotEnd() {
        this.shotTrigger = 0
    }

    shotBearEnd() {
        this.shotBearTrigger = 0
    }

    blink() {
        this.isBlink = true;
        setTimeout(() => {
            this.isBlink = false;
        }, (1000 / this.fps) * 20);
    }
}

export default new AnimStore();
