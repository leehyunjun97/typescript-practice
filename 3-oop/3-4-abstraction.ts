{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface ICommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMaker implements ICoffeeMaker, ICommercialCoffeeMaker {
    private static BEANS_CRAMM_PER_SHOT: number = 7; //class level
    private coffeeBeans: number = 0; //instance level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMathine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('0보다 큰 값을 넣어주세요');
      }
      this.coffeeBeans += beans;
    }

    clean(): void {
      console.log(`cleaning the machine`);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_CRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_CRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up...');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      };
    }
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class AmateurUser {
    constructor(private machine: ICoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: ICommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const maker = CoffeeMaker.makeMathine(32);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  pro.makeCoffee();
}
