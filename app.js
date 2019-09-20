var vm = new Vue({
    el: "#app",
    data: function(){
        return {
            startGame: false,
            logs: [],
            messages: {
                enemyWinner: "Enemy is the winner. Do you wan to play Again?",
                playerWinner: "Player is the winner ! Do you want to play again?",
                giveUp: "Do you want to give up?",
                attack: "Attacked to "
            },
            player: {
                name: "Coding_Developing",
                health: 100,
                power: 10,
                attack: function(e, skill){
                    vm.attack(vm.enemy, vm.player, skill);
                    vm.attack(vm.player, vm.enemy, skill);
                },
                healthPlus: function(){
                    var playerHealh = Math.floor(10 * Math.random());
                    var enemyHealth = Math.floor(10 * Math.random());
                    
                    
                    if(vm.enemy.health < 100){
                        vm.logs.unshift({
                            who: vm.enemy.name,
                            msg: "Enemy received " + enemyHealth + " health."
                        });
                        vm.enemy.health += enemyHealth;
                    }
                        
                    if(vm.player.health < 100){
                        vm.logs.unshift({
                            who: vm.player.name,
                            msg: "Player received " + playerHealh + " health."
                        });
                        vm.player.health += playerHealh;
                    }
                }
            },
            enemy: {
                name: "Enemy",
                health: 100,
                power: 10
            }
        }
    },
    methods: {
        rand: function(e, min, max){
            var rand = Math.floor((Math.random() * (max - min - 1)) + min);
            // console.log("Random: " + Math.random());
            return rand;
        },
        setGame: function(e, bool){
            console.log(bool);
            vm.startGame = bool;
            if(vm.startGame){
                vm.player.health = 100;
                vm.enemy.health = 100;
                vm.logs = [];
            }
            console.log(vm.startGame);
        },
        giveUp: function(){
            vm.setGame(event, !confirm(vm.messages.giveUp));
        },
        attack: function(from, to, skill){
            amount = Math.floor(Math.random() * from.power);
            amount = skill ? amount * 2 : amount;
            to.health -= amount;

            vm.logs.unshift({
                "who": from.name,
                msg: vm.messages.attack + to.name + " " + amount
            });
        }
        
    },
    watch: {
    /***/'player.health': function(val){
            vm.player.health = val >= 100 ? 100 : val <= 0 ? 0 : val;
            //console.log(val);
            if(val == 0){
                vm.setGame(event, confirm(vm.messages.enemyWinner));
            }
        },
        'enemy.health': function(val){
            vm.enemy.health = val >= 100 ? 100 : val <= 0 ? 0 : val;
            if(val == 0){
               
                vm.setGame(event, confirm(vm.messages.playerWinner));
                console.log(vm.startGame);
            }
            
        },
        logs: function(value){
            if(vm.logs.length > 8){
                vm.logs.pop();
            }
                
        }
    },
    computed: {

    }
})