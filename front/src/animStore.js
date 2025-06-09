import { makeAutoObservable } from 'mobx';


class AnimStore {
    mouseX = 0;
    mouseY = 0;

    constructor() {
        makeAutoObservable(this);
    }


    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

export default new AnimStore();
