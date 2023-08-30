console.log("Hello Typescript");

// Helpers
export type Equals<X, Y> = 
    (<T>() => T extends X ? 1 : 2) extends
    (<U>() => U extends Y ? 1 : 2) ? true : false;

// Partial
// 传入的T类型，所有属性置为可选
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type State = {
  messageCount: number;
  emailAddress: string;
  loading: boolean;
}

type nextState = Partial<State>; // Use this in reducer

const next: nextState = {
  loading: true,
}

// Required
// 让所有属性都置为必选，是Partial的反义词
type Required<T> = {
  [P in keyof T]-?: T[P]
}

type requiredState = Required<nextState>;
const equals1: Equals<requiredState, State> = true;

// Readonly
// 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type readonlyState = Readonly<State>;
const equals2: Equals<
  readonlyState,
  {
    readonly messageCount: number;
    readonly emailAddress: string;
    readonly loading: boolean;
  }
> = true;

// Pick
// 从T类型中选择一组属性构造新类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P] 
}

type pickState = Pick<State, 'messageCount'>;
const equals3: Equals<pickState, {
  messageCount: number;
}> = true;

// Record
// 构造一个新类型，key是K中的每个属性，值是T
type Record<K extends keyof any, T> = {
  [P in K]: T
}

type Name = 'Alice' | 'John' | 'Tom';
type Age = Record<Name, number>;
const equals4: Equals<Age, {
  Alice: number;
  John: number;
  Tom: number;
}> = true;

// Exclude
// 从T的*联合类型成员*中排除U的*联合类型成员*
type Exclude<T, U> = T extends U ? never : T
// 这里的extends和泛型extends不同，后者代表的是约束，前者涉及Distributive Conditional Types
// 具体来说，当 条件类型 作用于泛型类型，且这个泛型类型是 联合类型 时，它就是 分布式条件类型
// 其中的条件类型会被应用于Union的所有成员
type GoodPeople = Exclude<Name, 'Tom'>;
const equals5: Equals<GoodPeople, 'Alice' | 'John'> = true;

// Extract
// 和Exclude正好相反，从T的Union中提取可以分配给U的Union的成员
type Extract<T, U> = T extends U ? T : never

type AlsoGoodPeople = Extract<Name, 'Alice' | 'John'>;
const equals6: Equals<GoodPeople, AlsoGoodPeople> = true;

// Omit
// 从T类型中删除所有与K的联合类型成员有交集的键
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type stateWithoutLoading = Omit<State, 'loading'>;
const equals7: Equals<stateWithoutLoading, {
  messageCount: number;
  emailAddress: string;
}> = true;

// NonNullable
// 从T中排除null和undefined
type NonNullable<T> = T extends null | undefined ? never : T;
type NonNullable2<T> = Exclude<T, null | undefined>; // My try

type DogsName = 'husky' | 'corgi' | null | undefined;
type nonNullableDogsName = NonNullable<DogsName>;
const equals9: Equals<nonNullableDogsName, 'husky' | 'corgi'> = true;

// Parameters
// 基于 函数类型T 的参数类型 构造一个 元组类型