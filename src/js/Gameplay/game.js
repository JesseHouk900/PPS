import Player from './player.js';
import Yard from './yard.js';
import UI from '../UI/ui.js';
import WaveGenerator from './wave_generator.js';
import * as Enemy from '../Enemies/enemy.js';
import MainMenu from '../UI/MainMenu/main_menu.js';
import HurtBoundry from './hurt_boundry.js';
import {ImpoundedTowerManager} from '../UI/Buttons/impounded_tower.js';
import PoundMenu from '../UI/PoundMenu/pound_menu.js';
import EndDayMenu from '../UI/EndDayMenu/end_day_menu.js';

window.currentScene;
window.updateCalls = {};


export default class Game extends Phaser.Scene
{
    constructor() {
        super({key: 'Game'});
        this.yard = {};
        this.UI = {};
        this.waveGenerator = {};
        window.currentScene = this;
		this.gameState = "bootUp";
    }
    
    preload() {
        this.load.image('ground', 'assets/images/Frontyard.png');
        this.load.image('red', 'assets/Examples/red.png');
        this.load.image('treat', 'assets/images/Treat.png');
		this.load.image('buttonBackground', 'assets/images/ButtonBackground.png');
		this.load.image('poundBackground', 'assets/images/PoundKennel.png');
		this.load.image('poundCage', 'assets/images/PoundKennelCage.png');
		this.load.image('backButton', 'assets/images/BackButton.png');
		this.load.image('endDayBackground', 'assets/images/EndDayBackground.png');
		this.load.image('towerInfoBackground', 'assets/images/EndDayBackground.png');
		
		this.load.spritesheet('plant', 'assets/sprites/Flower.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('basicDog', 'assets/sprites/BasicDog.png', {frameWidth: 128, frameHeight: 128});
    }
    
    
    create() {
		this.mainMenu = new MainMenu();
        //this.createGameObjects();
        
        this.anims.create({
            key: 'plantIdle',
            frames: [{key: 'plant', frame: 0,}],
            frameRate: 20
        });
		this.anims.create({
            key: 'basicDogIdle',
            frames: [{key: 'basicDog', frame: 0,}],
            frameRate: 20
        });
        
        
    }
    
    update() {
        //console.log(window.updateCalls);
        for (const f in window.updateCalls) {
            //console.log(window.updateCalls[f])
            window.updateCalls[f]();
            
        }
    }
    
    createGameObjects() {
        self = this;
        this.__create_game_object__(this, {objectName: 'yard'})
        .then(function(result) {self.__create_game_object__(self, {objectName: 'UI'});}, function(error) {console.log(error);})
        .then(function(result) {self.__create_game_object__(self, {objectName: 'enemyManager'});}, function(error) {console.log(error);})
        .then(function(result) {self.__create_game_object__(self, {objectName: 'hurtBoundry'});}, function(error) {console.log(error);})
        .then(function(result) {self.__create_game_object__(self, {objectName: 'start'});}, function(error) {console.log(error);});
    }
    
    __create_game_object__(self, params = {objectName: "object", params: "..."}) {
        return new Promise(function(resolve, reject) {
			// for createGameObjects
            if (params.objectName == 'yard') {
                window.currentScene.yard = new Yard();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'UI') {
                window.currentScene.UI = new UI();
				window.currentScene.setListener(window.currentScene.yard.background, 'pointerup', () => {window.currentScene.UI.onClick();});
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'waveManager') {
                window.currentScene.waveManager = new WaveManager();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'enemyManager') {
                window.currentScene.enemyManager = new Enemy.EnemyManager();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'player') {
                window.currentScene.player = new Player();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'hurtBoundry') {
                window.currentScene.hurtBoundry = new HurtBoundry();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'start') {
                WaveGenerator.generateWave();
                setTimeout(function() {resolve();}, 100);
            }
			
			// for createPoundObjects
			else if (params.objectName == 'impoundedTowersManager') {
				window.currentScene.impoundedTowersManager = new ImpoundedTowerManager();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'poundMenu') {
                window.currentScene.poundMenu = new PoundMenu({from: params.from});
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'impoundedTowers') {
				window.currentScene.poundMenu.createTowers();
                setTimeout(function() {resolve();}, 100);
            }
            else if (params.objectName == 'endDayMenu') {
                console.log("madeIt")
				window.currentScene.endDayMenu = new EndDayMenu();
                setTimeout(function() {resolve();}, 100);
            }
            // else if (params.objectName == 'player') {
                // window.currentScene.player = new Player();
                // setTimeout(function() {resolve();}, 100);
            // }
            
            
        }
        );
    }
	
	/* returns z index for layering objects
	* returns:
	* 0 - background
	* 1 - mail box/owner
	* 2-6 - lanes
	* 7 - foreground
	* 8 - ui */
	/** @param {!Object=} obj **/
	/** @return {number} **/
	calculateZIndex(obj)
	{
		if (obj.constructor)
		{
			//console.log(Object.getPrototypeOf(obj.constructor.name))
			switch (obj.constructor.name)
			{
				case "Yard":
					return 0;
					break;
				case "MailBox":
				case "Owner":
					return 1000;
					break;
				case "Tower":
				case "Enemy":
				case "Treat":
					var num = window.currentScene.yard.getYardSquarePosition([obj.sprite.x, obj.sprite.y])[1];
					return (num + 2) * 1000;
					break;
				case "ScreenEffect":
					
					return 7000;
					break;
				case "MainMenu":
				case "UI":
				case "PPSButton":
					return 8000;
					break;
				default:
					return 9000;
					break;
			}
		}
	}
	
	/** @param {!Object=} target **/
	/** @param {string} key **/
	/** @param {function():} callback **/
	setListener(target, key, callback) {
        if (callback) {
            target.off(key);
            target.on(key, callback);
        }
        else {
            target.on(key, () =>{console.log(key)});

        }
    }
	
	cleanUp() {
		if (this.enemyManager && this.enemyManager.enemies)
		{
			this.enemyManager.removeAllEnemies();
		}
		if (this.player && this.player.towers)
		{
			this.player.removeAllTowers();
		}
	}
	
	yardStartup() {
		window.currentScene.createGameObjects();
	}
	
	poundStartup(params = {from: "menuName"}) {
		self = window.currentScene;
        this.__create_game_object__(self, {objectName: 'impoundedTowersManager'})
        .then(function(result) {if (!self.player) {self.__create_game_object__(self, {objectName: 'player'});}}, function(error) {console.log(error);})
		.then(function(result) {self.__create_game_object__(self, {objectName: 'poundMenu', from: params.from});}, function(error) {console.log(error);})
		.then(function(result) {self.__create_game_object__(self, {objectName: 'impoundedTowers'});}, function(error) {console.log(error);})
	}
	
	checkIfWaveIsOverAndOpenEndOfDayMenuIfTrue(){
		console.log(WaveGenerator.isWaveOver())
		if (WaveGenerator.isWaveOver())
		{console.log("madeIt")
			window.currentScene.UI.switchFromYardToEndOfDayMenu();
		}
	}
	
}