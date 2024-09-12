import { select, number, Separator } from "@inquirer/prompts";



export class UI {
    static changeDelay() {
        return number({
            message: 'Enter the delay in milliseconds',
            min: 4000
        });
    }

    static chooseInterface(interfaces) {
        let interfaceChoices = [];

        for (let interfaceName of interfaces) {
            interfaceChoices.push({
                name: interfaceName,
                value: interfaceName
            });
        }
        
        return select({
            message: 'Select the interface you want to manage',
            choices: [...interfaceChoices, new Separator(), {
                name: 'Change Task Scheduler Delay (10 Seconds Default)',
                value: 'delay'
            },
            {
                name: 'Exit',
                value: 'exit'
            }]
        });
    }
    
    static manageInterface(interfaceName) {
        return select({
            message: `Choose the action for interface "${interfaceName}"`,
            choices: [
                {
                    name: 'Enable',
                    value: 'enable'
                },
                {
                    name: 'Disable',
                    value: 'disable'
                },
                {
                    name: 'Enable Later',
                    value: 'enablelater',
                    description: 'Schedule a task to enable the interface later'
                },
                {
                    name: 'Disable Later',
                    value: 'disablelater',
                    description: 'Schedule a task to disable the interface later'
                },
                new Separator(),
                {
                    name: 'Go Back and Cancel All Scheduled Tasks',
                    value: 'back'   
                }
            ]
        }); 
    }
}
