/// <reference path="Scripts/collections.ts" />
var AliveClass = (function () {
    function AliveClass() {
        this.lastTick = 0;
    }
    AliveClass.prototype.onTick = function (time) {
        this.states.getValue(this.currentState).onTick(time);
    };
    AliveClass.prototype.onBackgroundTick = function (time) {
        this.states.getValue(this.currentState).onBackgroundTick(time);
    };
    AliveClass.prototype.onStart = function (handler, disabledPermissions) {
        this.handler = handler;
        this.handler.getActionManager().move(0, this.handler.getConfigurationManager().getScreenHeight(), 200);
        this.handler.getActionManager().draw("activate.png", this.handler.getConfigurationManager().getMaximalResizeRatio(), false);
        this.initializeStates(handler);
    };
    AliveClass.prototype.initializeStates = function (handler) {
        this.states = new collections.Dictionary();
        var sleepingState = new SleepingState(this);
        var passiveState = new PassiveState(this);
        var activeState = new ActiveState(this);
        sleepingState.onStart(handler);
        passiveState.onStart(handler);
        activeState.onStart(handler);
        this.states.setValue(PirateState.SLEEPING, sleepingState);
        this.states.setValue(PirateState.PASSIVE, passiveState);
        this.states.setValue(PirateState.ACTIVE, activeState);
        var now = handler.getConfigurationManager().getCurrentTime();
        this.setupCurrentState(now);
    };
    AliveClass.prototype.setupCurrentState = function (now) {
        if (now.Hour >= 22 || now.Hour < 8) {
            this.currentState = PirateState.SLEEPING;
        }
        else {
            this.currentState = PirateState.PASSIVE;
        }
    };
    AliveClass.prototype.onActionReceived = function (actionName, jsonedData) {
        this.handler.getActionManager().showMessage(actionName);
        this.states.getValue(this.currentState).onActionReceived(actionName);
    };
    AliveClass.prototype.onMove = function (oldX, oldY, newX, newY) {
        this.states.getValue(this.currentState).onMove(oldX, oldY, newX, newY);
    };
    AliveClass.prototype.onRelease = function (currentX, currentY) {
        this.states.getValue(this.currentState).onRelease(currentX, currentY);
    };
    AliveClass.prototype.onPick = function (currentX, currentY) {
        this.states.getValue(this.currentState).onPick(currentX, currentY);
    };
    AliveClass.prototype.onMenuItemSelected = function (itemName) {
        if (this.handler.getSpeechToTextManager().isSpeechRecognitionAvailable() && itemName == "button") {
            this.handler.getSpeechToTextManager().startSpeechRecognition();
        }
        if (itemName == "button2") {
            this.handler.getAwarenessManager().getPlaces();
            var random = Math.random() * 100;
            this.handler.getMenuManager().setProperty("progress", "Progress", random.toString());
        }
        this.states.getValue(this.currentState).onMenuItemSelected(itemName);
    };
    AliveClass.prototype.onResponseReceived = function (response) {
        this.states.getValue(this.currentState).onResponseReceived(response);
    };
    AliveClass.prototype.onLocationReceived = function (location) {
        this.states.getValue(this.currentState).onLocationReceived(location);
    };
    AliveClass.prototype.onUserActivityStateReceived = function (state) {
        this.states.getValue(this.currentState).onUserActivityStateReceived(state);
    };
    AliveClass.prototype.onHeadphoneStateReceived = function (state) {
        this.states.getValue(this.currentState).onHeadphoneStateReceived(state);
    };
    AliveClass.prototype.onWeatherReceived = function (weather) {
        this.states.getValue(this.currentState).onWeatherReceived(weather);
    };
    AliveClass.prototype.onSpeechRecognitionResults = function (results) {
        this.states.getValue(this.currentState).onSpeechRecognitionResults(results);
        this.handler.getActionManager().showMessage(results);
        this.handler.getTextToSpeechManager().say(results);
    };
    AliveClass.prototype.onConfigureMenuItems = function (menuBuilder) {
        var button = new ButtonMenuItem();
        button.InitialX = 0;
        button.InitialY = 0;
        button.Height = 1;
        button.Width = 2;
        button.Text = "Hello Button";
        button.TextColor = "#FFFFFF";
        button.BackgroundColor = "#000000";
        button.Name = "button";
        var button2 = new ButtonMenuItem();
        button2.InitialX = 2;
        button2.InitialY = 0;
        button2.Height = 1;
        button2.Width = 2;
        button2.Text = "Hello Button2";
        button2.TextColor = "#FFFFFF";
        button2.BackgroundColor = "#000000";
        button2.Name = "button2";
        var progress = new ProgressBarMenuItem();
        progress.InitialX = 0;
        progress.InitialY = 1;
        progress.Height = 1;
        progress.Width = 2;
        progress.TextColor = "#FFFFFF";
        progress.BackgroundColor = "#000000";
        progress.Name = "progress";
        progress.Progress = 10;
        progress.MaxProgress = 100;
        progress.FrontColor = "#0FFF0f";
        var progress2 = new ProgressBarMenuItem();
        progress2.InitialX = 2;
        progress2.InitialY = 1;
        progress2.Height = 1;
        progress2.Width = 2;
        progress2.TextColor = "#FFFFFF";
        progress2.BackgroundColor = "#000000";
        progress2.Name = "progress2";
        progress2.Progress = 90;
        progress2.MaxProgress = 100;
        progress2.FrontColor = "#FFAA0f";
        var picture = new PictureMenuItem();
        picture.InitialX = 0;
        picture.InitialY = 2;
        picture.Height = 1;
        picture.Width = 2;
        picture.Name = "picture";
        picture.PictureResourceName = "dead.png";
        var picture2 = new PictureMenuItem();
        picture2.InitialX = 2;
        picture2.InitialY = 2;
        picture2.Height = 1;
        picture2.Width = 2;
        picture2.Name = "picture2";
        picture2.PictureResourceName = "example.gif";
        var checkBox = new CheckBoxMenuItem();
        checkBox.InitialX = 0;
        checkBox.InitialY = 3;
        checkBox.Height = 1;
        checkBox.Width = 2;
        checkBox.Text = "On";
        checkBox.UncheckedText = "Off";
        checkBox.TextColor = "#FAAAFF";
        checkBox.FrontColor = "#333333";
        checkBox.BackgroundColor = "#000000";
        checkBox.Name = "checkbox";
        checkBox.Checked = true;
        var textBox = new TextBoxMenuItem();
        textBox.InitialX = 0;
        textBox.InitialY = 4;
        textBox.Height = 1;
        textBox.Width = 4;
        textBox.Text = "textBox";
        textBox.TextColor = "#AAFAFB";
        textBox.BackgroundColor = "#000000";
        textBox.Name = "textBox";
        var menuHeader = new MenuHeader();
        menuHeader.TextColor = "#1a1a00";
        menuHeader.BackgroundColor = "#ffff99";
        menuBuilder.createMenuHeader(menuHeader);
        menuBuilder.createButton(button);
        menuBuilder.createButton(button2);
        menuBuilder.createTextBox(textBox);
        menuBuilder.createCheckBox(checkBox);
        menuBuilder.createPicture(picture);
        menuBuilder.createPicture(picture2);
        menuBuilder.createProgressBar(progress);
        menuBuilder.createProgressBar(progress2);
    };
    AliveClass.prototype.onPlacesReceived = function (places) {
        this.handler.getActionManager().showMessage(JSON.stringify(places));
    };
    // IStateSwitchable
    AliveClass.prototype.switchTo = function (state) {
        if (this.states.containsKey(state)) {
            this.currentState = state;
            this.states.getValue(state).initializeState();
        }
    };
    return AliveClass;
}());
//# sourceMappingURL=app.js.map
var AgentConstants = (function () {
    function AgentConstants() {
    }
    Object.defineProperty(AgentConstants, "ON_PICK", {
        get: function () { return "ON_PICK"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_RELEASE", {
        get: function () { return "ON_RELEASE"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_MOVE", {
        get: function () { return "ON_MOVE"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "CHARACTER_ACTIVATION", {
        get: function () { return "CHARACTER_ACTIVATION"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "CHARACTER_DEACTIVATION", {
        get: function () { return "CHARACTER_DEACTIVATION"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_MOVE_RIGHT", {
        get: function () { return "ON_MOVE_RIGHT"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_MOVE_LEFT", {
        get: function () { return "ON_MOVE_LEFT"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_MOVE_UP", {
        get: function () { return "ON_MOVE_UP"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_MOVE_DOWN", {
        get: function () { return "ON_MOVE_DOWN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_FALLING_LEFT", {
        get: function () { return "ON_FALLING_LEFT"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ON_FALLING_RIGHT", {
        get: function () { return "ON_FALLING_RIGHT"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "SMS_RECEIVED", {
        get: function () { return "SMS_RECEIVED"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "INCOMING_CALL", {
        get: function () { return "INCOMING_CALL"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "NEW_OUTGOING_CALL", {
        get: function () { return "NEW_OUTGOING_CALL"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "MENU_ACTION_FEED_ME", {
        get: function () { return "Feed me."; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "MENU_ACTION_CURE_ME", {
        get: function () { return "Cure me."; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "MENU_ACTION_REVIVE_ME", {
        get: function () { return "Revive me."; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ORIENTATION_PORTRAIT", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "ORIENTATION_LANDSCAPE", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentConstants, "IConfigurationManager", {
        get: function () { return "IConfigurationManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "IActionManager", {
        get: function () { return "IActionManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "ICharacterManager", {
        get: function () { return "ICharacterManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "IDatabaseManager", {
        get: function () { return "IDatabaseManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "IResourceManager", {
        get: function () { return "IResourceManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "IMenuManager", {
        get: function () { return "IMenuManager"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AgentConstants, "IAwarenessManager", {
        get: function () { return "IAwarenessManager"; },
        enumerable: true,
        configurable: true
    });
    return AgentConstants;
}());
;
//# sourceMappingURL=AgentConstants.js.map
var AliveSmsData = (function () {
    function AliveSmsData() {
    }
    return AliveSmsData;
}());
//# sourceMappingURL=AliveSmsData.js.map
//# sourceMappingURL=IAliveLatLng.js.map
//# sourceMappingURL=IAliveLatLngBounds.js.map
//# sourceMappingURL=IAliveLocation.js.map
//# sourceMappingURL=IAlivePlace.js.map
//# sourceMappingURL=IAlivePlaceLikelihood.js.map
;
//# sourceMappingURL=IAliveResource.js.map
//# sourceMappingURL=IAliveUserActivity.js.map
//# sourceMappingURL=IAliveWeather.js.map
//# sourceMappingURL=ICurrentTime.js.map
//# sourceMappingURL=ITime.js.map
//# sourceMappingURL=IVoice.js.map
var ResourceManagerHelper = (function () {
    function ResourceManagerHelper(resourceManager) {
        this.resourceManager = resourceManager;
        this.setupResourceMap();
    }
    ResourceManagerHelper.prototype.setupResourceMap = function () {
        this.soundResources = new collections.Dictionary();
        this.imageResources = new collections.Dictionary();
        this.soundList = new Array();
        this.imageList = new Array();
        this.setupResourceLists();
        this.setupResourceMaps();
    };
    ResourceManagerHelper.prototype.setupResourceLists = function () {
        var allResources = this.resourceManager.getAllResources();
        for (var i = 0; i < allResources.length; i++) {
            if (allResources[i].getType() === 5) {
                this.soundList.push(allResources[i]);
            }
            else {
                this.imageList.push(allResources[i]);
            }
        }
    };
    ResourceManagerHelper.prototype.setupResourceMaps = function () {
        var arraySoundResources = this.soundList;
        var arrayImageResources = this.imageList;
        for (var i = 0; i < this.soundList.length; i++) {
            this.addResourceToMap(arraySoundResources[i], this.soundResources);
        }
        for (var i = 0; i < this.imageList.length; i++) {
            this.addResourceToMap(arrayImageResources[i], this.imageResources);
        }
    };
    ResourceManagerHelper.prototype.addResourceToMap = function (res, dict) {
        var categoryName = res.getCategoryName();
        if (dict.containsKey(categoryName)) {
            dict.getValue(categoryName).push(res);
        }
        else {
            var newSet = new Array();
            newSet.push(res);
            dict.setValue(categoryName, newSet);
        }
    };
    ResourceManagerHelper.prototype.chooseRandomImage = function (state) {
        var randomIndex = this.getRandomIndex(state, this.imageResources.getValue(state));
        if (randomIndex < 0)
            return null;
        return this.imageResources.getValue(state)[randomIndex].getResourceName();
    };
    ResourceManagerHelper.prototype.chooseRandomSound = function (state) {
        var randomIndex = this.getRandomIndex(state, this.soundResources.getValue(state));
        if (randomIndex < 0)
            return null;
        return this.soundResources.getValue(state)[randomIndex].getResourceName();
    };
    ResourceManagerHelper.prototype.getRandomIndex = function (state, list) {
        var index = -1;
        if (list == null)
            return index;
        index = Math.floor(Math.random() * list.length);
        return index;
    };
    return ResourceManagerHelper;
}());
//# sourceMappingURL=ResourceManagerHelper.js.map
;
//# sourceMappingURL=IActionManager.js.map
;
//# sourceMappingURL=IAliveAgent.js.map
;
//# sourceMappingURL=IAwarenessManager.js.map
//# sourceMappingURL=ICalendarManager.js.map
;
//# sourceMappingURL=ICharacterManager.js.map
;
//# sourceMappingURL=IConfigurationManager.js.map
;
//# sourceMappingURL=IDatabaseManager.js.map
//# sourceMappingURL=IManagersHandler.js.map
//# sourceMappingURL=IMenuBuilder.js.map
;
//# sourceMappingURL=IMenuManager.js.map
;
//# sourceMappingURL=IResourceManager.js.map
//# sourceMappingURL=IRestManager.js.map
;
//# sourceMappingURL=ISpeechManager.js.map
;
//# sourceMappingURL=ISpeechToTextManager.js.map
;
//# sourceMappingURL=ITextToSpeechManager.js.map
//# sourceMappingURL=ActiveState.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlobyState = (function () {
    function BlobyState(switchContext) {
        this.switchContext = switchContext;
    }
    Object.defineProperty(BlobyState, "SLEEPING", {
        get: function () { return "sleeping"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(BlobyState, "PASSIVE", {
        get: function () { return "passive"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(BlobyState, "ACTIVE", {
        get: function () { return "active"; },
        enumerable: true,
        configurable: true
    });
    ;
    BlobyState.prototype.onStart = function (handler) {
        var _this = this;
        this.actionManager = handler.getActionManager();
        this.resourceManager = handler.getResourceManager();
        this.databaseManager = handler.getDatabaseManager();
        this.characterManager = handler.getCharacterManager();
        this.menuManager = handler.getMenuManager();
        this.configurationMananger = handler.getConfigurationManager();
        this.restManager = handler.getRestManager();
        this.awarenessManager = handler.getAwarenessManager();
        this.resourceManagerHelper = new ResourceManagerHelper(this.resourceManager);
        this.timerTrigger = new TimerTriggerSystem(function () { return _this.configurationMananger.getCurrentTime().currentTimeMillis; });
    };
    BlobyState.prototype.shouldEventHappen = function (chance) {
        return Math.random() < chance;
    };
    return BlobyState;
}());
var PassiveSubstate;
(function (PassiveSubstate) {
    PassiveSubstate[PassiveSubstate["LookingAround"] = 0] = "LookingAround";
    PassiveSubstate[PassiveSubstate["Eating"] = 1] = "Eating";
    PassiveSubstate[PassiveSubstate["Reading"] = 2] = "Reading";
    PassiveSubstate[PassiveSubstate["DoingSomethingStupid"] = 3] = "DoingSomethingStupid";
    PassiveSubstate[PassiveSubstate["RespondsToEvents"] = 4] = "RespondsToEvents";
    PassiveSubstate[PassiveSubstate["AskingForInteraction"] = 5] = "AskingForInteraction";
})(PassiveSubstate || (PassiveSubstate = {}));
var PassiveState = (function (_super) {
    __extends(PassiveState, _super);
    function PassiveState(switchContext) {
        _super.call(this, switchContext);
    }
    Object.defineProperty(PassiveState, "LOOKING_AROUND_CHANGE", {
        get: function () { return 0.2; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "CHANGE_PASSIVE_STATE", {
        get: function () { return 0.25; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "EATING_TIME", {
        get: function () { return 10000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "READING_TIME", {
        get: function () { return 20000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "ASKING_FOR_INTERACTION_TIME", {
        get: function () { return 15000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "DOING_SOMETHING_STUPID_TIME", {
        get: function () { return 20000; },
        enumerable: true,
        configurable: true
    });
    ;
    PassiveState.prototype.initializeState = function () {
    };
    PassiveState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
        this.currentState = PassiveSubstate.LookingAround;
    };
    PassiveState.prototype.onTick = function (time) {
        switch (this.currentState) {
            case PassiveSubstate.LookingAround:
                this.lookingAroundTick(time);
                break;
            case PassiveSubstate.Eating:
                this.eatingTick(time);
                break;
            case PassiveSubstate.Reading:
                this.readingTick(time);
                break;
            case PassiveSubstate.DoingSomethingStupid:
                this.doingSomethingStupidTick(time);
                break;
            case PassiveSubstate.RespondsToEvents:
                this.respondsToEventsTick(time);
                break;
            case PassiveSubstate.AskingForInteraction:
                this.askingForInteractionTick(time);
                break;
        }
    };
    PassiveState.prototype.lookingAroundTick = function (time) {
        if (this.shouldEventHappen(PassiveState.LOOKING_AROUND_CHANGE)) {
            if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.DoingSomethingStupid;
                this.timerTrigger.set("doingSomethingStupid", PassiveState.DOING_SOMETHING_STUPID_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.Eating;
                this.timerTrigger.set("eating", PassiveState.EATING_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.Reading;
                this.timerTrigger.set("reading", PassiveState.READING_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.AskingForInteraction;
                this.timerTrigger.set("askingForInteraction", PassiveState.ASKING_FOR_INTERACTION_TIME);
            }
        }
        this.lookingAroundEmote(time);
    };
    PassiveState.prototype.lookingAroundEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("passive-lookingAround");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    PassiveState.prototype.eatingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("eating")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.eatingEmote(time);
    };
    PassiveState.prototype.eatingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("passive-eating");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    PassiveState.prototype.readingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("reading")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.readingEmote(time);
    };
    PassiveState.prototype.readingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("passive-reading");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    PassiveState.prototype.askingForInteractionTick = function (time) {
        if (!this.timerTrigger.isOnGoing("askingForInteraction")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.askingForInteractionEmote(time);
    };
    PassiveState.prototype.askingForInteractionEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("passive-askingForInteraction");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    PassiveState.prototype.doingSomethingStupidTick = function (time) {
        if (!this.timerTrigger.isOnGoing("doingSomethingStupid")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.doingSomethingStupidEmote(time);
    };
    PassiveState.prototype.doingSomethingStupidEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("passive-doingSomethingStupid");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    PassiveState.prototype.respondsToEventsTick = function (time) {
    };
    PassiveState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    PassiveState.prototype.onActionReceived = function (categoryName) {
    };
    PassiveState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    PassiveState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50) {
            this.actionManager.move(0, screenHeight, 0);
        }
    };
    PassiveState.prototype.onPick = function (currentX, currentY) {
    };
    PassiveState.prototype.onMenuItemSelected = function (itemName) {
    };
    PassiveState.prototype.onResponseReceived = function (response) {
    };
    PassiveState.prototype.onLocationReceived = function (location) {
    };
    PassiveState.prototype.onUserActivityStateReceived = function (state) {
    };
    PassiveState.prototype.onPlacesReceived = function (places) {
    };
    PassiveState.prototype.onHeadphoneStateReceived = function (state) {
    };
    PassiveState.prototype.onWeatherReceived = function (weather) {
    };
    PassiveState.prototype.onConfigureMenuItems = function (menuBuilder) { };
    PassiveState.prototype.onSpeechRecognitionResults = function (results) { };
    return PassiveState;
}(BlobyState));
var SleepingSubstate;
(function (SleepingSubstate) {
    SleepingSubstate[SleepingSubstate["Normal"] = 0] = "Normal";
    SleepingSubstate[SleepingSubstate["Snoring"] = 1] = "Snoring";
    SleepingSubstate[SleepingSubstate["SleepWalking"] = 2] = "SleepWalking";
    SleepingSubstate[SleepingSubstate["Annoyed"] = 3] = "Annoyed";
})(SleepingSubstate || (SleepingSubstate = {}));
var SleepingState = (function (_super) {
    __extends(SleepingState, _super);
    function SleepingState(switchContext) {
        _super.call(this, switchContext);
    }
    Object.defineProperty(SleepingState, "ANNOYED_TO_NORMAL_TIME", {
        get: function () { return 5000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "SLEEP_WALK_TO_NORMAL_TIME", {
        get: function () { return 10000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "SNORE_TO_NORMAL_TIME", {
        get: function () { return 5000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "ANNOYED_EMOTE_CHANCE", {
        get: function () { return 0.25; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "NORMAL_TO_SNORE_CHANCE", {
        get: function () { return 0.0027; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "SNORE_TO_SLEEP_WALK_CHANCE", {
        get: function () { return 0.001; },
        enumerable: true,
        configurable: true
    });
    SleepingState.prototype.initializeState = function () {
        this.currentState = SleepingSubstate.Normal;
    };
    SleepingState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
        this.currentState = SleepingSubstate.Normal;
    };
    SleepingState.prototype.onTick = function (time) {
        var now = this.configurationMananger.getCurrentTime();
        if (now.Hour < 22 && now.Hour > 8) {
            this.switchContext.switchTo(BlobyState.PASSIVE);
            return;
        }
        switch (this.currentState) {
            case SleepingSubstate.Annoyed:
                this.annoyedTick(time);
                break;
            case SleepingSubstate.Normal:
                this.normalTick(time);
                break;
            case SleepingSubstate.SleepWalking:
                this.sleepWalkingTick(time);
                break;
            case SleepingSubstate.Snoring:
                this.snoringTick(time);
                break;
        }
    };
    SleepingState.prototype.annoyedTick = function (time) {
        if (!this.timerTrigger.isOnGoing("annoyed")) {
            this.currentState = SleepingSubstate.Normal;
            return;
        }
        if (!this.configurationMananger.getIsSoundPlaying()) {
            if (this.shouldEventHappen(SleepingState.ANNOYED_EMOTE_CHANCE)) {
                this.annoyedEmote(time);
            }
        }
    };
    SleepingState.prototype.annoyedEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-annoyed");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    SleepingState.prototype.normalTick = function (time) {
        if (!this.configurationMananger.getIsSoundPlaying()) {
            if (this.shouldEventHappen(SleepingState.NORMAL_TO_SNORE_CHANCE)) {
                this.currentState = SleepingSubstate.Snoring;
                if (this.shouldEventHappen(SleepingState.SNORE_TO_SLEEP_WALK_CHANCE)) {
                    this.timerTrigger.set("sleep_walk", SleepingState.SLEEP_WALK_TO_NORMAL_TIME);
                    this.currentState = SleepingSubstate.SleepWalking;
                }
                else {
                    this.timerTrigger.set("snoring", SleepingState.SNORE_TO_NORMAL_TIME);
                }
                return;
            }
            this.normalEmote(time);
        }
    };
    SleepingState.prototype.normalEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-normal");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    SleepingState.prototype.sleepWalkingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("sleep_walk")) {
            this.currentState = SleepingSubstate.Normal;
            return;
        }
        this.sleepWalkingEmote(time);
    };
    SleepingState.prototype.sleepWalkingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-sleepWalking");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    SleepingState.prototype.snoringTick = function (time) {
        if (!this.timerTrigger.isOnGoing("snoring")) {
            this.currentState = SleepingSubstate.Normal;
            return;
        }
        this.snoringEmote(time);
    };
    SleepingState.prototype.snoringEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-snoring");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
    };
    SleepingState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    SleepingState.prototype.onActionReceived = function (categoryName) {
        if (categoryName == AgentConstants.NEW_OUTGOING_CALL ||
            categoryName == AgentConstants.INCOMING_CALL ||
            categoryName == AgentConstants.SMS_RECEIVED) {
            this.timerTrigger.set("annoyed", SleepingState.ANNOYED_TO_NORMAL_TIME);
            this.currentState = SleepingSubstate.Annoyed;
        }
    };
    SleepingState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    SleepingState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50) {
            this.actionManager.move(0, screenHeight, 0);
        }
    };
    SleepingState.prototype.onPick = function (currentX, currentY) {
    };
    SleepingState.prototype.onMenuItemSelected = function (itemName) {
    };
    SleepingState.prototype.onResponseReceived = function (response) {
    };
    SleepingState.prototype.onLocationReceived = function (location) {
    };
    SleepingState.prototype.onUserActivityStateReceived = function (state) {
    };
    SleepingState.prototype.onHeadphoneStateReceived = function (state) {
    };
    SleepingState.prototype.onWeatherReceived = function (weather) {
    };
    SleepingState.prototype.onPlacesReceived = function (places) {
    };
    SleepingState.prototype.onConfigureMenuItems = function (menuBuilder) {
    };
    SleepingState.prototype.onSpeechRecognitionResults = function (results) { };
    return SleepingState;
}(BlobyState));
var ActiveSubstate;
(function (ActiveSubstate) {
    ActiveSubstate[ActiveSubstate["PlayingMiniGame"] = 0] = "PlayingMiniGame";
    ActiveSubstate[ActiveSubstate["AnnoyedByDraggingAround"] = 1] = "AnnoyedByDraggingAround";
})(ActiveSubstate || (ActiveSubstate = {}));
var ActiveState = (function (_super) {
    __extends(ActiveState, _super);
    function ActiveState(switchContext) {
        _super.call(this, switchContext);
    }
    ActiveState.prototype.initializeState = function () {
        this.currentState = ActiveSubstate.PlayingMiniGame;
    };
    ActiveState.prototype.onTick = function (time) {
        switch (this.currentState) {
            case ActiveSubstate.PlayingMiniGame:
                this.onPlayingMiniGameTick(time);
                break;
            case ActiveSubstate.AnnoyedByDraggingAround:
                this.onAnnoyedByDraggingAroundTick(time);
                break;
        }
    };
    ActiveState.prototype.onPlayingMiniGameTick = function (time) { };
    ActiveState.prototype.onAnnoyedByDraggingAroundTick = function (time) { };
    ActiveState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    ActiveState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
    };
    ActiveState.prototype.onActionReceived = function (categoryName) {
        var res = this.resourceManagerHelper.chooseRandomSound(categoryName);
        this.actionManager.playSound(res);
    };
    ActiveState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    ActiveState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50) {
            this.actionManager.move(0, screenHeight, 0);
        }
    };
    ActiveState.prototype.onPick = function (currentX, currentY) {
    };
    ActiveState.prototype.onMenuItemSelected = function (itemName) {
    };
    ActiveState.prototype.onResponseReceived = function (response) {
    };
    ActiveState.prototype.onLocationReceived = function (location) {
    };
    ActiveState.prototype.onUserActivityStateReceived = function (state) {
    };
    ActiveState.prototype.onHeadphoneStateReceived = function (state) {
    };
    ActiveState.prototype.onWeatherReceived = function (weather) {
    };
    ActiveState.prototype.onPlacesReceived = function (places) {
    };
    ActiveState.prototype.onConfigureMenuItems = function (menuBuilder) { };
    ActiveState.prototype.onSpeechRecognitionResults = function (results) { };
    return ActiveState;
}(BlobyState));
//# sourceMappingURL=BlobyStates.js.map
//# sourceMappingURL=IStateSwitchable.js.map
//# sourceMappingURL=PassiveState.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PirateState = (function () {
    function PirateState(switchContext) {
        this.switchContext = switchContext;
    }
    Object.defineProperty(PirateState, "SLEEPING", {
        get: function () { return "sleeping"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PirateState, "PASSIVE", {
        get: function () { return "passive"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PirateState, "ACTIVE", {
        get: function () { return "active"; },
        enumerable: true,
        configurable: true
    });
    ;
    PirateState.prototype.onStart = function (handler) {
        var _this = this;
        this.actionManager = handler.getActionManager();
        this.resourceManager = handler.getResourceManager();
        this.databaseManager = handler.getDatabaseManager();
        this.characterManager = handler.getCharacterManager();
        this.menuManager = handler.getMenuManager();
        this.configurationMananger = handler.getConfigurationManager();
        this.restManager = handler.getRestManager();
        this.awarenessManager = handler.getAwarenessManager();
        this.resourceManagerHelper = new ResourceManagerHelper(this.resourceManager);
        this.timerTrigger = new TimerTriggerSystem(function () { return _this.configurationMananger.getCurrentTime().currentTimeMillis; });
    };
    PirateState.prototype.shouldEventHappen = function (chance) {
        return Math.random() < chance;
    };
    return PirateState;
}());
var PassiveSubstate;
(function (PassiveSubstate) {
    PassiveSubstate[PassiveSubstate["LookingAround"] = 0] = "LookingAround";
    PassiveSubstate[PassiveSubstate["Eating"] = 1] = "Eating";
    PassiveSubstate[PassiveSubstate["Drinking"] = 2] = "Drinking";
    PassiveSubstate[PassiveSubstate["Reading"] = 3] = "Reading";
    PassiveSubstate[PassiveSubstate["DoingSomethingStupid"] = 4] = "DoingSomethingStupid";
    PassiveSubstate[PassiveSubstate["RespondsToEvents"] = 5] = "RespondsToEvents";
    PassiveSubstate[PassiveSubstate["AskingForInteraction"] = 6] = "AskingForInteraction";
})(PassiveSubstate || (PassiveSubstate = {}));
var PassiveState = (function (_super) {
    __extends(PassiveState, _super);
    function PassiveState(switchContext) {
        _super.call(this, switchContext);
    }
    Object.defineProperty(PassiveState, "LOOKING_AROUND_CHANGE", {
        get: function () { return 0.2; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "CHANGE_PASSIVE_STATE", {
        get: function () { return 0.25; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "EATING_TIME", {
        get: function () { return 10000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "READING_TIME", {
        get: function () { return 20000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "HAVING_FUN_TIME", {
        get: function () { return 20000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "ASKING_FOR_INTERACTION_TIME", {
        get: function () { return 15000; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PassiveState, "DOING_SOMETHING_STUPID_TIME", {
        get: function () { return 20000; },
        enumerable: true,
        configurable: true
    });
    ;
    PassiveState.prototype.initializeState = function () {
    };
    PassiveState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
        this.currentState = PassiveSubstate.LookingAround;
    };
    PassiveState.prototype.onTick = function (time) {
        switch (this.currentState) {
            case PassiveSubstate.LookingAround:
                this.lookingAroundTick(time);
                break;
            case PassiveSubstate.Eating:
                this.eatingTick(time);
                break;
            case PassiveSubstate.Drinking:
                this.drinkingTick(time);
                break;
            case PassiveSubstate.Reading:
                this.readingTick(time);
                break;
            case PassiveSubstate.DoingSomethingStupid:
                this.doingSomethingStupidTick(time);
                break;
            case PassiveSubstate.RespondsToEvents:
                this.respondsToEventsTick(time);
                break;
            case PassiveSubstate.AskingForInteraction:
                this.askingForInteractionTick(time);
                break;
        }
    };
    PassiveState.prototype.lookingAroundTick = function (time) {
        if (this.shouldEventHappen(PassiveState.LOOKING_AROUND_CHANGE)) {
            if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.DoingSomethingStupid;
                this.timerTrigger.set("doingSomethingStupid", PassiveState.DOING_SOMETHING_STUPID_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.Eating;
                this.timerTrigger.set("eating", PassiveState.EATING_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.Reading;
                this.timerTrigger.set("reading", PassiveState.READING_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.Drinking;
                this.timerTrigger.set("drinking", PassiveState.EATING_TIME);
            }
            else if (this.shouldEventHappen(PassiveState.CHANGE_PASSIVE_STATE)) {
                this.currentState = PassiveSubstate.AskingForInteraction;
                this.timerTrigger.set("askingForInteraction", PassiveState.ASKING_FOR_INTERACTION_TIME);
            }
        }
        this.lookingAroundEmote(time);
    };
    PassiveState.prototype.lookingAroundEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("lookingAround");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("lookingAround");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.eatingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("eating")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.eatingEmote(time);
    };
    PassiveState.prototype.eatingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("eating");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("eating");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.drinkingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("drinking")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.drinkingEmote(time);
    };
    PassiveState.prototype.drinkingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("drinking");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("drinking");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.readingTick = function (time) {
        if (!this.timerTrigger.isOnGoing("reading")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.readingEmote(time);
    };
    PassiveState.prototype.readingEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("reading");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("reading");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.askingForInteractionTick = function (time) {
        if (!this.timerTrigger.isOnGoing("askingForInteraction")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.askingForInteractionEmote(time);
    };
    PassiveState.prototype.askingForInteractionEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("askingForInteraction");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("askingForInteraction");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.doingSomethingStupidTick = function (time) {
        if (!this.timerTrigger.isOnGoing("doingSomethingStupid")) {
            this.currentState = PassiveSubstate.LookingAround;
            return;
        }
        this.doingSomethingStupidEmote(time);
    };
    PassiveState.prototype.doingSomethingStupidEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("doingSomethingStupid");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("doingSomethingStupid");
        this.actionManager.playSound(soundToPlay);
    };
    PassiveState.prototype.respondsToEventsTick = function (time) {
    };
    PassiveState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    PassiveState.prototype.onActionReceived = function (categoryName) {
        if (categoryName == AgentConstants.NEW_OUTGOING_CALL ||
            categoryName == AgentConstants.INCOMING_CALL ||
            categoryName == AgentConstants.SMS_RECEIVED) {
            this.timerTrigger.set("fun", PassiveState.HAVING_FUN_TIME);
            this.switchContext.switchTo(PirateState.ACTIVE);
        }
    };
    PassiveState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    PassiveState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50)
            this.actionManager.move(0, screenHeight, 0);
    };
    PassiveState.prototype.onPick = function (currentX, currentY) {
    };
    PassiveState.prototype.onMenuItemSelected = function (itemName) {
    };
    PassiveState.prototype.onResponseReceived = function (response) {
    };
    PassiveState.prototype.onLocationReceived = function (location) {
    };
    PassiveState.prototype.onUserActivityStateReceived = function (state) {
    };
    PassiveState.prototype.onHeadphoneStateReceived = function (state) {
    };
    PassiveState.prototype.onWeatherReceived = function (weather) {
    };
    PassiveState.prototype.onConfigureMenuItems = function (menuBuilder) { };
    PassiveState.prototype.onSpeechRecognitionResults = function (results) { };
    PassiveState.prototype.onPlacesReceived = function (places) { };
    return PassiveState;
}(PirateState));
var SleepingSubstate;
(function (SleepingSubstate) {
    SleepingSubstate[SleepingSubstate["Normal"] = 0] = "Normal";
    SleepingSubstate[SleepingSubstate["Nap"] = 1] = "Nap";
    SleepingSubstate[SleepingSubstate["Angry"] = 2] = "Angry";
})(SleepingSubstate || (SleepingSubstate = {}));
var SleepingState = (function (_super) {
    __extends(SleepingState, _super);
    function SleepingState(switchContext) {
        _super.call(this, switchContext);
    }
    Object.defineProperty(SleepingState, "ANNOYED_TO_NORMAL_TIME", {
        get: function () { return 5000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "SNORE_TO_NORMAL_TIME", {
        get: function () { return 5000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "ANNOYED_EMOTE_CHANCE", {
        get: function () { return 0.25; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "NORMAL_TO_SNORE_CHANCE", {
        get: function () { return 0.0027; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SleepingState, "SNORE_TO_SLEEP_WALK_CHANCE", {
        get: function () { return 0.001; },
        enumerable: true,
        configurable: true
    });
    SleepingState.prototype.initializeState = function () {
        this.currentState = SleepingSubstate.Normal;
    };
    SleepingState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
        this.currentState = SleepingSubstate.Normal;
    };
    SleepingState.prototype.onTick = function (time) {
        var now = this.configurationMananger.getCurrentTime();
        if (now.Hour < 22 && now.Hour > 8) {
            this.switchContext.switchTo(PirateState.PASSIVE);
            return;
        }
        switch (this.currentState) {
            case SleepingSubstate.Normal:
                this.normalTick(time);
                break;
            case SleepingSubstate.Nap:
                this.napTick(time);
                break;
            case SleepingSubstate.Angry:
                this.angryTick(time);
                break;
        }
    };
    SleepingState.prototype.normalTick = function (time) {
        if (!this.configurationMananger.getIsSoundPlaying()) {
            this.normalEmote(time);
        }
        if (this.shouldEventHappen(0.25)) {
            this.timerTrigger.set("sleep_nap", SleepingState.SNORE_TO_NORMAL_TIME);
            this.currentState = SleepingSubstate.Nap;
        }
    };
    SleepingState.prototype.normalEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-normal");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("sleeping-normal");
        this.actionManager.playSound(soundToPlay);
    };
    SleepingState.prototype.napTick = function (time) {
        if (!this.timerTrigger.isOnGoing("sleep_nap")) {
            this.currentState = SleepingSubstate.Normal;
            return;
        }
        this.napEmote(time);
    };
    SleepingState.prototype.napEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("sleeping-nap");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("sleeping-nap");
        this.actionManager.playSound(soundToPlay);
    };
    SleepingState.prototype.angryTick = function (time) {
        if (!this.timerTrigger.isOnGoing("angry")) {
            this.currentState = SleepingSubstate.Normal;
            return;
        }
        this.angryEmote(time);
    };
    SleepingState.prototype.angryEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("angry");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("angry");
        this.actionManager.playSound(soundToPlay);
    };
    SleepingState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    SleepingState.prototype.onActionReceived = function (categoryName) {
        if (categoryName == AgentConstants.NEW_OUTGOING_CALL ||
            categoryName == AgentConstants.INCOMING_CALL ||
            categoryName == AgentConstants.SMS_RECEIVED) {
            this.timerTrigger.set("angry", SleepingState.ANNOYED_TO_NORMAL_TIME);
            this.currentState = SleepingSubstate.Angry;
        }
    };
    SleepingState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    SleepingState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50)
            this.actionManager.move(0, screenHeight, 0);
    };
    SleepingState.prototype.onPick = function (currentX, currentY) {
    };
    SleepingState.prototype.onMenuItemSelected = function (itemName) {
    };
    SleepingState.prototype.onResponseReceived = function (response) {
    };
    SleepingState.prototype.onLocationReceived = function (location) {
    };
    SleepingState.prototype.onUserActivityStateReceived = function (state) {
    };
    SleepingState.prototype.onHeadphoneStateReceived = function (state) {
    };
    SleepingState.prototype.onWeatherReceived = function (weather) {
    };
    SleepingState.prototype.onConfigureMenuItems = function (menuBuilder) {
    };
    SleepingState.prototype.onSpeechRecognitionResults = function (results) { };
    SleepingState.prototype.onPlacesReceived = function (places) { };
    return SleepingState;
}(PirateState));
var ActiveSubstate;
(function (ActiveSubstate) {
    ActiveSubstate[ActiveSubstate["Fun"] = 0] = "Fun";
})(ActiveSubstate || (ActiveSubstate = {}));
var ActiveState = (function (_super) {
    __extends(ActiveState, _super);
    function ActiveState(switchContext) {
        _super.call(this, switchContext);
    }
    ActiveState.prototype.initializeState = function () {
        this.currentState = ActiveSubstate.Fun;
    };
    ActiveState.prototype.onTick = function (time) {
        switch (this.currentState) {
            case ActiveSubstate.Fun:
                this.onFunTick(time);
                break;
        }
    };
    ActiveState.prototype.onFunTick = function (time) {
        if (!this.timerTrigger.isOnGoing("fun")) {
            this.switchContext.switchTo(PirateState.PASSIVE);
            return;
        }
        this.funEmote(time);
    };
    ActiveState.prototype.funEmote = function (time) {
        var resToDraw = this.resourceManagerHelper.chooseRandomImage("fun");
        this.actionManager.draw(resToDraw, this.configurationMananger.getMaximalResizeRatio(), false);
        var soundToPlay = this.resourceManagerHelper.chooseRandomSound("fun");
        this.actionManager.playSound(soundToPlay);
    };
    ActiveState.prototype.onBackgroundTick = function (time) {
        this.onTick(time);
    };
    ActiveState.prototype.onStart = function (handler) {
        _super.prototype.onStart.call(this, handler);
    };
    ActiveState.prototype.onActionReceived = function (categoryName) {
    };
    ActiveState.prototype.onMove = function (oldX, oldY, newX, newY) {
    };
    ActiveState.prototype.onRelease = function (currentX, currentY) {
        var screenHeight = this.configurationMananger.getScreenHeight();
        if (currentY < screenHeight - 50)
            this.actionManager.move(0, screenHeight, 0);
    };
    ActiveState.prototype.onPick = function (currentX, currentY) {
    };
    ActiveState.prototype.onMenuItemSelected = function (itemName) {
    };
    ActiveState.prototype.onResponseReceived = function (response) {
    };
    ActiveState.prototype.onLocationReceived = function (location) {
    };
    ActiveState.prototype.onUserActivityStateReceived = function (state) {
    };
    ActiveState.prototype.onHeadphoneStateReceived = function (state) {
    };
    ActiveState.prototype.onWeatherReceived = function (weather) {
    };
    ActiveState.prototype.onConfigureMenuItems = function (menuBuilder) { };
    ActiveState.prototype.onSpeechRecognitionResults = function (results) { };
    ActiveState.prototype.onPlacesReceived = function (places) { };
    return ActiveState;
}(PirateState));
//# sourceMappingURL=PirateState.js.map
//# sourceMappingURL=SleepingState.js.map
var TimerTriggerSystem = (function () {
    function TimerTriggerSystem(currentTimeCallback) {
        this.currentTime = currentTimeCallback;
        this.dict = new collections.Dictionary();
    }
    TimerTriggerSystem.prototype.set = function (timerName, length) {
        this.dict.setValue(timerName, this.currentTime() + length);
    };
    TimerTriggerSystem.prototype.isOnGoing = function (timerName) {
        if (!this.dict.containsKey(timerName)) {
            return false;
        }
        return this.currentTime() < this.dict.getValue(timerName);
    };
    return TimerTriggerSystem;
}());
//# sourceMappingURL=TimerTriggerSystem.js.map
// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString(item, join) {
        if (join === void 0) { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var LinkedList = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function LinkedList() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        LinkedList.prototype.add = function (item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };
        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        /**
        * @private
        */
        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        LinkedList.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        LinkedList.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        /**
         * @private
         */
        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };
        /**
         * @private
         */
        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    }());
    collections.LinkedList = LinkedList; // End of linked list 
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    }());
    collections.Dictionary = Dictionary; // End of dictionary
    /**
     * This class is used by the LinkedDictionary Internally
     * Has to be a class, not an interface, because it needs to have
     * the 'unlink' function defined.
     */
    var LinkedDictionaryPair = (function () {
        function LinkedDictionaryPair(key, value) {
            this.key = key;
            this.value = value;
        }
        LinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return LinkedDictionaryPair;
    }());
    var LinkedDictionary = (function (_super) {
        __extends(LinkedDictionary, _super);
        function LinkedDictionary(toStrFunction) {
            _super.call(this, toStrFunction);
            this.head = new LinkedDictionaryPair(null, null);
            this.tail = new LinkedDictionaryPair(null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        LinkedDictionary.prototype.appendToTail = function (entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        };
        /**
         * Retrieves a linked dictionary from the table internally
         */
        LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
            if (collections.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = (this.table[k]);
            return pair;
        };
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        LinkedDictionary.prototype.getValue = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        LinkedDictionary.prototype.remove = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                _super.prototype.remove.call(this, key); // This will remove it from the table
                pair.unlink(); // This will unlink it from the chain
                return pair.value;
            }
            return undefined;
        };
        /**
        * Removes all mappings from this LinkedDictionary.
        * @this {collections.LinkedDictionary}
        */
        LinkedDictionary.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        };
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        LinkedDictionary.prototype.replace = function (oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            // set the new Pair's links to existingPair's links
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            // Delete Existing Pair from the table, unlink it from chain.
            // As a result, the nElements gets decremented by this operation
            this.remove(oldPair.key);
            // Link new Pair in place of where oldPair was,
            // by pointing the old pair's neighbors to it.
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            // To make up for the fact that the number of elements was decremented,
            // We need to increase it by one.
            ++this.nElements;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        LinkedDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            // If there is already an element for that key, we 
            // keep it's place in the LinkedList
            if (!collections.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            }
            else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        };
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.keys = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(key);
            });
            return array;
        };
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.values = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(value);
            });
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this LinkedDictionary. It is done in the order of insertion
        * into the LinkedDictionary
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        LinkedDictionary.prototype.forEach = function (callback) {
            var crawlNode = this.head.next;
            while (crawlNode.next != null) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        };
        return LinkedDictionary;
    }(Dictionary));
    collections.LinkedDictionary = LinkedDictionary; // End of LinkedDictionary
    // /**
    //  * Returns true if this dictionary is equal to the given dictionary.
    //  * Two dictionaries are equal if they contain the same mappings.
    //  * @param {collections.Dictionary} other the other dictionary.
    //  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
    //  * function used to check if two values are equal.
    //  * @return {boolean} true if this dictionary is equal to the given dictionary.
    //  */
    // collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
    // 	var eqF = valuesEqualFunction || collections.defaultEquals;
    // 	if(!(other instanceof collections.Dictionary)){
    // 		return false;
    // 	}
    // 	if(this.size() !== other.size()){
    // 		return false;
    // 	}
    // 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
    // }
    var MultiDictionary = (function () {
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        };
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        MultiDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        MultiDictionary.prototype.remove = function (key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        /**
         * Removes all mappings from this dictionary.
         */
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    }());
    collections.MultiDictionary = MultiDictionary; // end of multi dictionary 
    var Heap = (function () {
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function Heap(compareFunction) {
            /**
             * Array used to store the elements od the heap.
             * @type {Array.<Object>}
             * @private
             */
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        };
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        Heap.prototype.siftDown = function (nodeIndex) {
            //smaller child index
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        };
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        Heap.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        Heap.prototype.contains = function (element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        };
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        Heap.prototype.size = function () {
            return this.data.length;
        };
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };
        /**
         * Removes all of the elements from this heap.
         */
        Heap.prototype.clear = function () {
            this.data.length = 0;
        };
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Heap.prototype.forEach = function (callback) {
            collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    }());
    collections.Heap = Heap;
    var Stack = (function () {
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Stack() {
            this.list = new LinkedList();
        }
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.peek = function () {
            return this.list.first();
        };
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        Stack.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };
        /**
         * Removes all of the elements from this stack.
         */
        Stack.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Stack.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Stack;
    }());
    collections.Stack = Stack; // End of stack 
    var Queue = (function () {
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Queue() {
            this.list = new LinkedList();
        }
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        Queue.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };
        /**
         * Removes all of the elements from this queue.
         */
        Queue.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    }());
    collections.Queue = Queue; // End of queue
    var PriorityQueue = (function () {
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };
        /**
         * Removes all of the elements from this priority queue.
         */
        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    }());
    collections.PriorityQueue = PriorityQueue; // end of priority queue
    var Set = (function () {
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        Set.prototype.add = function (element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        };
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        /**
         * Removes all of the elements from this set.
         */
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        /*
        * Provides a string representation for display
        */
        Set.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        return Set;
    }());
    collections.Set = Set; // end of Set
    var Bag = (function () {
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        Bag.prototype.add = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        };
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        Bag.prototype.remove = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        Bag.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Removes all of the elements from this bag.
         */
        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    }());
    collections.Bag = Bag; // End of bag 
    var BSTree = (function () {
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        BSTree.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };
        /**
         * Removes all of the elements from this tree.
         */
        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        BSTree.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        BSTree.prototype.contains = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };
        /**
        * @private
        */
        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };
        /**
        * @private
        */
        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };
        /**
        * @private
        */
        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };
        /**
          * @private
          */
        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        /*
        * @private
        */
        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                // tree is empty
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    }());
    collections.BSTree = BSTree; // end of BSTree
})(collections || (collections = {})); // End of module 
//# sourceMappingURL=collections.js.map
//# sourceMappingURL=ICalendarEvent.js.map
var BaseMenuItem = (function () {
    function BaseMenuItem() {
    }
    return BaseMenuItem;
}());
var PaintMenuItem = (function () {
    function PaintMenuItem() {
    }
    return PaintMenuItem;
}());
var PictureMenuItem = (function () {
    function PictureMenuItem() {
        this.ViewType = ViewType.Picture;
    }
    PictureMenuItem.UseProfilePicture = "Use Profile Picture";
    PictureMenuItem.UseCoverPicture = "Use Cover Picture";
    return PictureMenuItem;
}());
var ButtonMenuItem = (function () {
    function ButtonMenuItem() {
        this.ViewType = ViewType.Button;
    }
    return ButtonMenuItem;
}());
var CheckBoxMenuItem = (function () {
    function CheckBoxMenuItem() {
        this.ViewType = ViewType.CheckBox;
    }
    return CheckBoxMenuItem;
}());
var TextBoxMenuItem = (function () {
    function TextBoxMenuItem() {
        this.ViewType = ViewType.TextBox;
    }
    return TextBoxMenuItem;
}());
var ProgressBarMenuItem = (function () {
    function ProgressBarMenuItem() {
        this.ViewType = ViewType.ProgressBar;
    }
    return ProgressBarMenuItem;
}());
//# sourceMappingURL=BaseMenuItem.js.map
var MenuHeader = (function () {
    function MenuHeader() {
    }
    return MenuHeader;
}());
//# sourceMappingURL=MenuHeader.js.map
var ViewType = (function () {
    function ViewType() {
    }
    Object.defineProperty(ViewType, "Button", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewType, "Picture", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewType, "ProgressBar", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewType, "CheckBox", {
        get: function () { return 3; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewType, "TextBox", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    return ViewType;
}());
//# sourceMappingURL=ViewType.js.map
//# sourceMappingURL=IBaseMenuItem.js.map
//# sourceMappingURL=IButtonMenuItem.js.map
//# sourceMappingURL=ICheckBoxMenuItem.js.map
//# sourceMappingURL=IMenuHeader.js.map
//# sourceMappingURL=IPaintMenuItem.js.map
//# sourceMappingURL=IPictureMenuItem.js.map
//# sourceMappingURL=IProgressBarMenuItem.js.map
//# sourceMappingURL=ITextBoxMenuItem.js.map
//# sourceMappingURL=IAliveLatLng.js.map
//# sourceMappingURL=IAliveLatLngBounds.js.map
//# sourceMappingURL=IAliveLocation.js.map
//# sourceMappingURL=IAlivePlace.js.map
//# sourceMappingURL=IAlivePlaceLikelihood.js.map
var PlaceType = (function () {
    function PlaceType() {
    }
    Object.defineProperty(PlaceType, "TYPE_OTHER", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ACCOUNTING", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_AIRPORT", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_AMUSEMENT_PARK", {
        get: function () { return 3; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_AQUARIUM", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ART_GALLERY", {
        get: function () { return 5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ATM", {
        get: function () { return 6; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BAKERY", {
        get: function () { return 7; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BANK", {
        get: function () { return 8; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BAR", {
        get: function () { return 9; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BEAUTY_SALON", {
        get: function () { return 10; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BICYCLE_STORE", {
        get: function () { return 11; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BOOK_STORE", {
        get: function () { return 12; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BOWLING_ALLEY", {
        get: function () { return 13; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_BUS_STATION", {
        get: function () { return 14; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAFE", {
        get: function () { return 15; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAMPGROUND", {
        get: function () { return 16; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAR_DEALER", {
        get: function () { return 17; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAR_RENTAL", {
        get: function () { return 18; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAR_REPAIR", {
        get: function () { return 19; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CAR_WASH", {
        get: function () { return 20; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CASINO", {
        get: function () { return 21; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CEMETERY", {
        get: function () { return 22; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CHURCH", {
        get: function () { return 23; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CITY_HALL", {
        get: function () { return 24; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CLOTHING_STORE", {
        get: function () { return 25; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_CONVENIENCE_STORE", {
        get: function () { return 26; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_COURTHOUSE", {
        get: function () { return 27; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_DENTIST", {
        get: function () { return 28; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_DEPARTMENT_STORE", {
        get: function () { return 29; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_DOCTOR", {
        get: function () { return 30; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ELECTRICIAN", {
        get: function () { return 31; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ELECTRONICS_STORE", {
        get: function () { return 32; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_EMBASSY", {
        get: function () { return 33; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ESTABLISHMENT", {
        get: function () { return 34; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FINANCE", {
        get: function () { return 35; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FIRE_STATION", {
        get: function () { return 36; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FLORIST", {
        get: function () { return 37; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FOOD", {
        get: function () { return 38; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FUNERAL_HOME", {
        get: function () { return 39; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FURNITURE_STORE", {
        get: function () { return 40; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_GAS_STATION", {
        get: function () { return 41; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_GENERAL_CONTRACTOR", {
        get: function () { return 42; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_GROCERY_OR_SUPERMARKET", {
        get: function () { return 43; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_GYM", {
        get: function () { return 44; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HAIR_CARE", {
        get: function () { return 45; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HARDWARE_STORE", {
        get: function () { return 46; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HEALTH", {
        get: function () { return 47; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HINDU_TEMPLE", {
        get: function () { return 48; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HOME_GOODS_STORE", {
        get: function () { return 49; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_HOSPITAL", {
        get: function () { return 50; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_INSURANCE_AGENCY", {
        get: function () { return 51; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_JEWELRY_STORE", {
        get: function () { return 52; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LAUNDRY", {
        get: function () { return 53; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LAWYER", {
        get: function () { return 54; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LIBRARY", {
        get: function () { return 55; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LIQUOR_STORE", {
        get: function () { return 56; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LOCAL_GOVERNMENT_OFFICE", {
        get: function () { return 57; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LOCKSMITH", {
        get: function () { return 58; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LODGING", {
        get: function () { return 59; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MEAL_DELIVERY", {
        get: function () { return 60; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MEAL_TAKEAWAY", {
        get: function () { return 61; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MOSQUE", {
        get: function () { return 62; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MOVIE_RENTAL", {
        get: function () { return 63; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MOVIE_THEATER", {
        get: function () { return 64; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MOVING_COMPANY", {
        get: function () { return 65; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_MUSEUM", {
        get: function () { return 66; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_NIGHT_CLUB", {
        get: function () { return 67; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PAINTER", {
        get: function () { return 68; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PARK", {
        get: function () { return 69; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PARKING", {
        get: function () { return 70; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PET_STORE", {
        get: function () { return 71; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PHARMACY", {
        get: function () { return 72; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PHYSIOTHERAPIST", {
        get: function () { return 73; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PLACE_OF_WORSHIP", {
        get: function () { return 74; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PLUMBER", {
        get: function () { return 75; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POLICE", {
        get: function () { return 76; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POST_OFFICE", {
        get: function () { return 77; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_REAL_ESTATE_AGENCY", {
        get: function () { return 78; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_RESTAURANT", {
        get: function () { return 79; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ROOFING_CONTRACTOR", {
        get: function () { return 80; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_RV_PARK", {
        get: function () { return 81; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SCHOOL", {
        get: function () { return 82; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SHOE_STORE", {
        get: function () { return 83; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SHOPPING_MALL", {
        get: function () { return 84; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SPA", {
        get: function () { return 85; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_STADIUM", {
        get: function () { return 86; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_STORAGE", {
        get: function () { return 87; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_STORE", {
        get: function () { return 88; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBWAY_STATION", {
        get: function () { return 89; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SYNAGOGUE", {
        get: function () { return 90; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_TAXI_STAND", {
        get: function () { return 91; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_TRAIN_STATION", {
        get: function () { return 92; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_TRAVEL_AGENCY", {
        get: function () { return 93; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_UNIVERSITY", {
        get: function () { return 94; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_VETERINARY_CARE", {
        get: function () { return 95; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ZOO", {
        get: function () { return 96; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ADMINISTRATIVE_AREA_LEVEL_1", {
        get: function () { return 1001; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ADMINISTRATIVE_AREA_LEVEL_2", {
        get: function () { return 1002; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ADMINISTRATIVE_AREA_LEVEL_3", {
        get: function () { return 1003; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_COLLOQUIAL_AREA", {
        get: function () { return 1004; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_COUNTRY", {
        get: function () { return 1005; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_FLOOR", {
        get: function () { return 1006; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_GEOCODE", {
        get: function () { return 1007; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_INTERSECTION", {
        get: function () { return 1008; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_LOCALITY", {
        get: function () { return 1009; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_NATURAL_FEATURE", {
        get: function () { return 1010; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_NEIGHBORHOOD", {
        get: function () { return 1011; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POLITICAL", {
        get: function () { return 1012; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POINT_OF_INTEREST", {
        get: function () { return 1013; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POST_BOX", {
        get: function () { return 1014; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POSTAL_CODE", {
        get: function () { return 1015; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POSTAL_CODE_PREFIX", {
        get: function () { return 1016; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_POSTAL_TOWN", {
        get: function () { return 1017; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_PREMISE", {
        get: function () { return 1018; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ROOM", {
        get: function () { return 1019; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_ROUTE", {
        get: function () { return 1020; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_STREET_ADDRESS", {
        get: function () { return 1021; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY", {
        get: function () { return 1022; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY_LEVEL_1", {
        get: function () { return 1023; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY_LEVEL_2", {
        get: function () { return 1024; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY_LEVEL_3", {
        get: function () { return 1025; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY_LEVEL_4", {
        get: function () { return 1026; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBLOCALITY_LEVEL_5", {
        get: function () { return 1027; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SUBPREMISE", {
        get: function () { return 1028; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_SYNTHETIC_GEOCODE", {
        get: function () { return 1029; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceType, "TYPE_TRANSIT_STATION", {
        get: function () { return 1030; },
        enumerable: true,
        configurable: true
    });
    return PlaceType;
}());
//# sourceMappingURL=PlaceType.js.map