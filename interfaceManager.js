import os from 'os';
import { execSync } from 'child_process';



export class interfaceManager {
    static getAvailableInterfaces() {
        let result = [];
        for (let property in os.networkInterfaces()) {
            result.push(String(property));
        }
        return result;
    }

    static enableInterface(interfaceName) {
        let result;
        try {
            result = execSync(`netsh interface set interface ${interfaceName} enable`, {windowsHide: true}).toString();
        } catch (e) {
            return String(e);
        }

        if (result.replace('\r', '').replace('\n', '') == '') {
            return true;
        }
    }

    static disableInterface(interfaceName) {
        let result;
        try {
            result = execSync(`netsh interface set interface ${interfaceName} disable`, {windowsHide: true}).toString();
        } catch (e) {
            return String(e);
        }

        if (result.replace('\r', '').replace('\n', '') == '') {
            return true;
        }
    }
}