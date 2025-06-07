import { makeAutoObservable } from 'mobx';


class AnimStore {

    framesPerRow = 20
    fps = 2
    framesCount = 61
    shotFramesCount = 21

    shotTrigger = 0;

    constructor() {
        makeAutoObservable(this);
    }

    shot() {
        if (this.shotTrigger !== 0) return
        this.shotTrigger = Math.random()
    }
    shotEnd() {
        this.shotTrigger = 0
    }
}

export default new AnimStore();
