// caching module

class Student{
    name;
    constructor(name){
        this.name = name;
    }
    getName(name){
        return this.name
    }
    setName(name){
        this.name = name;
    }
}

// export default new Student("Batman")
export default Student