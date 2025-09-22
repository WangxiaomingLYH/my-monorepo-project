// 定义一个接口，用于限制person对象的具体属性
export interface PersonInter {
    // 限制数据类型时，需要都是小写的string、number
    id: string,
    name: string,
    age: number
}

// 一个自定义类型
export type Persons = PersonInter[]