/**
 * @author jittagorn pitakmetagoon
 * create 07/01/2014
 */
define('com.pamarin.core.behavioral.CommandManager', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.behavioral.Command',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.ClassNotFoundException',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.creational.Namespace',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.util.Assert'
], function(module, Class, Command, Interface, Types, ClassNotFoundException, IllegalArgumentException, Namespace, HashMap, Assert) {

    /**
     * @class CommandManager
     * 
     * example
     * -------------------------------------------------------------------------
     * - register
     * CommandManager.registerCommand('GrowlCommand', growlCommand);
     * 
     * - execute
     * CommandManager.executeCommand('GrowlCommand', {title : 'Delete post', content : 'delete post success.', sticky : false, time : 5000, type : 'INFO'});
     */
    var CommandManager = Class.define(module.id, (function() {


        /**
         * for keep command in command manager
         */
        var commands = new HashMap();



        return {
            //
            static: {
                /**
                 * for execute command by commandName and object
                 * 
                 * @param {String} commandName
                 * @param {Object} object
                 */
                executeCommand: function(commandName, object) {
                    Assert.assert({
                        String : commandName,
                        Object : object
                    }, module.id + '.executeCommand(String commandName, Object model).');

                    var command = commands.get(commandName);
                    if (Types.isUndefined(command)) {
                        throw new ClassNotFoundException('Command \'' + commandName + '\' not found, ' + module.id + '.executeCommand(String commandName, Object model)');
                    }
                    
                    Types.isString(command) 
                    ? require([command], function(cmd){ Interface.ensureImplements(cmd, Command); cmd.run(object); }) 
                    : command.run(object);
                },
                /**
                 * for register command into command manager
                 * 
                 * @param {String} commandName
                 * @param {String | <T extends Command>} command
                 */
                registerCommand: function(commandName, command) {
                    Assert.assertString(commandName, module.id + '.registerCommand(String commandName, Command command).');

                    if(Types.isString(command)){
                        //do not
                    }else if (Types.isClassInstance(command)) {
                        Interface.ensureImplements(command, Command);
                    }else{
                        throw new IllegalArgumentException('Invalid input type parameters, ' + module.id + '.registerCommand(String commandName, <String | T extends Command> command)');
                    }
                    
                    commands.put(commandName, command);
                }
            }
        };
    })());



    Namespace.createAndSet(module.id, CommandManager);
    return CommandManager;
});
