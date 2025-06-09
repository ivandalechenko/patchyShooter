import { makeAutoObservable } from 'mobx';


class AnimStore {
    fps = 24

    shotTrigger = 0;

    mouseX = 0;
    mouseY = 0;

    constructor() {
        makeAutoObservable(this);
    }

    shot() {
        this.shotTrigger = Math.random()
    }
    offShotTrigger() {
        this.shotTrigger = 0
    }

    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

export default new AnimStore();
