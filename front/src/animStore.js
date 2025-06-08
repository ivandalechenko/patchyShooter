import { makeAutoObservable } from 'mobx';


class AnimStore {

    framesPerRow = 8
    fps = 24
    framesCount = 61
    shotFramesCount = 21
    bearShotFramesCount = 21

    shotTrigger = 0;
    shotBearTrigger = 0;
    isBlink = false;

    mouseX = 0;
    mouseY = 0;

    constructor() {
        makeAutoObservable(this);
    }

    shot() {
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

    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

export default new AnimStore();
