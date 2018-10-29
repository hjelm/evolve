function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Individual = /** @class */ (function () {
    function Individual() {
        this.token = ['+', '-', ''];
        this.targetSumValue = 100;
        this.numberOfNumbers = 10;
        this.sum = 0;
        this.fitness = 0;
        // TODO: generate the numbers instead
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.randomizeSigns();
    }
    Individual.prototype.print = function () {
        console.log("sum: " + this.sum + " fitness: " + this.fitness + " gene: " + this.combine());
    };
    Individual.prototype.randomSign = function () {
        return this.token[randomInt(0, 2)];
    };
    Individual.prototype.randomizeSigns = function () {
        this.chromosome = [];
        for (var i_1 = 0; i_1 < 9; i_1++) {
            this.chromosome[i_1] = this.randomSign();
        }
    };
    Individual.prototype.mutate = function () {
        // console.log(this.chromosome, "before")
        var location = randomInt(0, this.numberOfNumbers - 2);
        this.chromosome[location] = this.randomSign();
        // console.log(this.chromosome, "after")
    };
    Individual.prototype.combine = function () {
        var _this = this;
        return this.numbers.map(function (e, i) {
            return e + _this.chromosome.concat([""])[i];
        }).reduce(function (total, e) {
            return total + e;
        });
    };
    Individual.prototype.evaluate = function () {
        this.sum = eval(this.combine());
        // this.fitness = result
        var f;
        var difference = this.sum - this.targetSumValue;
        if (difference < 0) {
            f = Math.log(-difference);
        }
        else {
            f = Math.log(difference);
        }
        this.fitness = f;
    };
    return Individual;
}());
var i = new Individual();
// population
var Population = /** @class */ (function () {
    function Population(size) {
        this.size = size;
        this.individual = [];
        this.mutationRate = 0.1;
        this.createNewPopulation();
    }
    Population.prototype.evaluateIndividuals = function () {
    };
    Population.prototype.createNewPopulation = function () {
        for (var i_2 = 0; i_2 < this.size; i_2++) {
            this.individual.push(new Individual());
        }
    };
    Population.prototype.printPopulation = function () {
        for (var _i = 0, _a = this.individual; _i < _a.length; _i++) {
            var individual = _a[_i];
            individual.print();
        }
    };
    Population.prototype.evolve = function () {
        // evaluate all individuals of the current generation
        for (var _i = 0, _a = this.individual; _i < _a.length; _i++) {
            var individual = _a[_i];
            individual.evaluate();
        }
        this.individual.sort(function (a, b) {
            if (a.fitness > b.fitness) {
                return 1;
            }
            if (a.fitness < b.fitness) {
                return -1;
            }
            return 0;
        });
        // this.printPopulation()
        // TODO:sort individuals according to fitness
        // this.printPopulation()
        // select the top 10 solutions
        // make 10 copies so that we maintain the population size
        var nextGeneration = [];
        for (var i_3 = 0; i_3 < 10; i_3++) {
            for (var clone = 0; clone < 10; clone++) {
                var newIndividual = Object.create(this.individual[i_3]);
                // // Mutate 
                // if (Math.random() <= this.mutationRate) {
                //     newIndividual.mutate();
                // }
                // Mutate all clones
                if (i_3 > 0) {
                    newIndividual.mutate();
                }
                nextGeneration.push(newIndividual);
            }
        }
        this.individual = nextGeneration;
    };
    return Population;
}());
// generation[]
var population = new Population(100);
// for (let epoch=0; epoch < 10; epoch++) {
//     population.evolve()
// }
population.printPopulation();
population.evolve();
population.printPopulation();
// document.body.innerHTML = "testing";
setTimeout(function () {
    // document.body.innerHTML = "testing";
}, 0);
