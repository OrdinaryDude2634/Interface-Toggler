import { interfaceManager } from "./interfaceManager.js";



export class taskScheduler {
    constructor(delay) {
        this.scheduledTasks = [];
        this.delay = delay;
    }

    enableInterfaceLater(interfaceName) {
        let timerId = setTimeout(() => {
            interfaceManager.enableInterface(interfaceName);
        }, this.delay);
        this.scheduledTasks.push(timerId);
    }

    disableInterfaceLater(interfaceName) {
        let timerId = setTimeout(() => {
            interfaceManager.disableInterface(interfaceName);
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