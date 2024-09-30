import { InterfaceManager } from './InterfaceManager.js';



export class TaskScheduler {
    constructor(delay) {
        this.scheduledTasks = [];
        this.delay = delay;
    }

    enableInterfaceLater(interfaceName) {
        let timerId = setTimeout(() => {
            InterfaceManager.enableInterface(interfaceName);
        }, this.delay);
        this.scheduledTasks.push(timerId);
    }

    disableInterfaceLater(interfaceName) {
        let timerId = setTimeout(() => {
            InterfaceManager.disableInterface(interfaceName);
        }, this.delay);
        this.scheduledTasks.push(timerId);
    }

    clearAllScheduledTasks() {
        for (let timerId of this.scheduledTasks) {
            clearTimeout(timerId);
        }
        this.scheduledTasks = [];
    }
}
