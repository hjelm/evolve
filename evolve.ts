function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Individual {
    numbers: number[]
    chromosome: string[]
    token: string[]  = ['+', '-', '']
    targetSumValue: number = 100
    numberOfNumbers: number = 10
    sum: number = 0
    fitness: number = 0

    constructor() {
        // TODO: generate the numbers instead
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.randomizeSigns()
    }

    print(): void {
        console.log(`sum: ${this.sum} fitness: ${this.fitness} gene: ${this.combine()}`)
    }

    randomSign(): string {
        return this.token[randomInt(0,2)];
    }

    randomizeSigns() {
        this.chromosome = [];
        for (let i=0; i < 9; i++) {
            this.chromosome[i] = this.randomSign()
        }
    }

    mutate() {
        // console.log(this.chromosome, "before")
        let location = randomInt(0, this.numberOfNumbers - 2)
        this.chromosome[location] = this.randomSign()
        // console.log(this.chromosome, "after")
    }

    combine() {
        return this.numbers.map((e, i) => { 
            return e + this.chromosome.concat([""])[i] 
        }).reduce((total, e) => { 
            return total + e 
        });
    }

    evaluate(): void {
        this.sum = eval(this.combine());

        
         // this.fitness = result
        let f: number
        let difference: number = this.sum - this.targetSumValue;
        if (difference < 0) {
            f = Math.log(-difference) 
        } else {
            f = Math.log(difference)
        }
        this.fitness = f
    }

}

let i = new Individual()

// population
class Population {
    individual: Individual[] = []
    mutationRate: number = 0.1;

    constructor(public size) {
        this.createNewPopulation()
    }

    evaluateIndividuals() {
    }

    createNewPopulation() {
        for (let i=0; i<this.size; i++) {
            this.individual.push(new Individual())
        }
    }

    printPopulation() {
        for (let individual of this.individual) {
            individual.print()
        }
    }

    evolve() {
        // evaluate all individuals of the current generation
        for (let individual of this.individual) {
            individual.evaluate()
        }

        this.individual.sort((a, b) => { 
            if (a.fitness > b.fitness) {
                return 1
            }
            if (a.fitness < b.fitness) {
                return -1
            }
            return 0
        })

        // this.printPopulation()
        // TODO:sort individuals according to fitness
        // this.printPopulation()
        // select the top 10 solutions
        // make 10 copies so that we maintain the population size
        let nextGeneration: Individual[] = []
        for (let i=0; i < 10; i++) {
            for (let clone=0; clone < 10; clone++) {
                let newIndividual = Object.create(this.individual[i])

                // // Mutate 
                // if (Math.random() <= this.mutationRate) {
                //     newIndividual.mutate();
                // }
                // Mutate all clones
                if (i > 0) {
                    newIndividual.mutate();
                }

                nextGeneration.push(newIndividual);
            }
        }
        this.individual = nextGeneration
    }
}

// generation[]

let population = new Population(100);

// for (let epoch=0; epoch < 10; epoch++) {
//     population.evolve()
// }
population.printPopulation()
population.evolve()
population.printPopulation()


// document.body.innerHTML = "testing";
setTimeout(() => {
    // document.body.innerHTML = "testing";
}, 0);
