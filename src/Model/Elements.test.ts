
test("Calculation", () => {
    
   const a = {x: 1, y: 2}
   const myFunction = new Function("return this.x")
   console.log(myFunction.call(a))
});